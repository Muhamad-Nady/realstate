from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserRegistrationSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenRefreshView

class CustomTokenRefreshView(TokenRefreshView):
    # Customize the view as needed
    pass


class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = RefreshToken.for_user(user)
            return Response({
                'msg': 'User registered successfully.',
                'refresh': str(token),
                'access': str(token.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    # No authentication needed since refresh token will be used
    permission_classes = []  # Remove the IsAuthenticated requirement

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