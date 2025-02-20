from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from .models import Property, PropertyImage, PropertyVideo
from .serializers import PropertySerializer

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user

class PropertyListView(generics.ListCreateAPIView):
    queryset = Property.objects.all().prefetch_related('images', 'videos')
    serializer_class = PropertySerializer

    @method_decorator(cache_page(60 * 5))  # Cache for 5 minutes
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.select_related('owner')
    parser_classes = (MultiPartParser, FormParser)

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def create(self, request, *args, **kwargs):
        # Extract uploaded files from request.FILES
        uploaded_images = request.FILES.getlist('uploaded_images[]', [])
        uploaded_videos = request.FILES.getlist('uploaded_videos[]', [])

        # Add files to the request data
        data = request.data.copy()
        data['uploaded_images'] = uploaded_images
        data['uploaded_videos'] = uploaded_videos

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        
        if not request.user.phone_number:
            raise permissions.PermissionDenied('Phone number is required to post properties')
        
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    permission_classes = [IsOwnerOrReadOnly]

    @action(detail=True, methods=['post'])
    def add_images(self, request, pk=None):
        property = self.get_object()
        if property.owner != request.user:
            return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
        
        images = request.FILES.getlist('images', [])
        for image in images:
            PropertyImage.objects.create(property=property, image=image)
        
        return Response({'status': 'Images added'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def add_videos(self, request, pk=None):
        property = self.get_object()
        if property.owner != request.user:
            return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
        
        videos = request.FILES.getlist('videos', [])
        for video in videos:
            PropertyVideo.objects.create(property=property, video=video)
        
        return Response({'status': 'Videos added'}, status=status.HTTP_200_OK)
