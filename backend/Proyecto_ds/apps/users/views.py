from rest_framework import viewsets, permissions, status, views
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, ActorSerializer, WorkerSerializer, CustomTokenObtainPairSerializer
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Actor, Worker

User = get_user_model()

class LogoutView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist
            return Response({'message': 'Sesion cerrada correctamente'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST) 

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permission() for permission in self.permission_classes]
    
    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def create_user(self, request):
        """
        Crear un nuevo usuario (Actor o Worker según la información proporcionada)
        """
        data = request.data

        # Crear el usuario base
        try:
            user = User.objects.create_user(
                nombre=data['nombre'],
                cedula=data['cedula'],
                email=data['email'],
                phone_number=data['phone_number'],
                password=data['password'],
                is_staff=data.get('is_staff', False)
            )

            # Crear Actor si es necesario
            if data.get('user_type') == 'actor':
                actor = Actor.objects.create(
                    user=user,
                    has_priority=data.get('has_priority', False),
                    motive=data.get('motive', '')
                )
                actor.save()

            # Crear Worker si es necesario
            elif data.get('user_type') == 'worker':
                worker = Worker.objects.create(
                    user=user,
                    code=data.get('code', '')
                )
                worker.save()

            return Response({"message": "Usuario creado con éxito"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
class ActorViewSet(viewsets.ModelViewSet):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permission() for permission in self.permission_classes]

class WorkerViewSet(viewsets.ModelViewSet):
    queryset =  Worker.objects.all()
    serializer_class = WorkerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permission() for permission in self.permission_classes]

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
