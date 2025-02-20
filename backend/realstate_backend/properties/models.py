from django.db import models
from django.utils import timezone
from django.conf import settings

class PropertyImage(models.Model):
    property = models.ForeignKey('Property', related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='property_images/')
    created_at = models.DateTimeField(auto_now_add=True)

class PropertyVideo(models.Model):
    property = models.ForeignKey('Property', related_name='videos', on_delete=models.CASCADE)
    video = models.FileField(upload_to='property_videos/')
    created_at = models.DateTimeField(auto_now_add=True)

class Property(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='properties', null=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=255)
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    square_footage = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_available = models.BooleanField(default=True)

    def __str__(self):
        return self.title