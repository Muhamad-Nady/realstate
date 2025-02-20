from django.urls import path
from .views import UserRegistrationView, UserLoginView, UserLogoutView, CustomTokenRefreshView, UserProfileView
from rest_framework_simplejwt.views import TokenRefreshView  # or your CustomTokenRefreshView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('refresh-token/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('user/profile/', UserProfileView.as_view(), name='user_profile'),  # New profile endpoint
]
