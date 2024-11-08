# properties/views.py

from rest_framework import status, generics
from rest_framework.response import Response
from .models import Property
from .serializers import PropertySerializer

class PropertyListView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def perform_create(self, serializer):
        # You can add any custom logic if necessary for property creation
        serializer.save()

class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
