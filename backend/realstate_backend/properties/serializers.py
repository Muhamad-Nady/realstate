from rest_framework import serializers
from .models import Property, PropertyImage, PropertyVideo
from users.serializers import UserProfileSerializer

class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'created_at']

class PropertyVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyVideo
        fields = ['id', 'video', 'created_at']

class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    videos = PropertyVideoSerializer(many=True, read_only=True)
    owner = UserProfileSerializer(read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )
    uploaded_videos = serializers.ListField(
        child=serializers.FileField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Property
        fields = ['id', 'owner', 'title', 'description', 'location', 'bedrooms', 
                 'bathrooms', 'price', 'square_footage', 'created_at', 
                 'is_available', 'images', 'videos', 'uploaded_images', 'uploaded_videos']
        read_only_fields = ['owner']

    def create(self, validated_data):
        uploaded_images = validated_data.pop('uploaded_images', [])
        uploaded_videos = validated_data.pop('uploaded_videos', [])
        
        property = Property.objects.create(**validated_data)
        
        for image in uploaded_images:
            PropertyImage.objects.create(property=property, image=image)
        
        for video in uploaded_videos:
            PropertyVideo.objects.create(property=property, video=video)
        
        return property
