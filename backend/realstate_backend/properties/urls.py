# properties/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('properties/', views.PropertyListView.as_view(), name='property-list'),  # To fetch all properties
    path('properties/<int:pk>/', views.PropertyDetailView.as_view(), name='property-detail'),  # To view individual property
]
