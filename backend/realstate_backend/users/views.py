from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserRegistrationSerializer, UserProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenRefreshView
from django.contrib.auth.models import User

class CustomTokenRefreshView(TokenRefreshView):
    # Customize the view as needed
    pass


class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            print('Registration request data:', request.data)
            serializer = UserRegistrationSerializer(data=request.data)
            
            if serializer.is_valid():
                print('Serializer is valid. Validated data:', serializer.validated_data)
                user = serializer.save()
                token = RefreshToken.for_user(user)
                return Response({
                    'msg': 'User registered successfully.',
                    'refresh': str(token),
                    'access': str(token.access_token),
                }, status=status.HTTP_201_CREATED)
            else:
                print('Serializer errors:', serializer.errors)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print('Registration error:', str(e))
            return Response({
                'error': 'Registration failed.',
                'detail': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "msg": "Login successful.",
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        return Response({"msg": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)


class UserLogoutView(APIView):
    permission_classes = []  # No authentication required, refresh token is used

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"msg": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

            # Validate and blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"msg": "Logout successful."}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"msg": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        user = request.user
        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Profile updated successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)