from rest_framework import viewsets, permissions, status, views
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, ActorSerializer, WorkerSerializer, CustomTokenObtainPairSerializer, get_user_instance_and_serializer, SendEmailSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Actor, Worker
from django.core.mail import send_mail
from django.conf import settings




from .permission import *

User = get_user_model()

class LogoutView(views.APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request):
        print(request)
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({'message': 'Sesión cerrada correctamente'}, status=status.HTTP_200_OK)
        except TokenError as e:
            return Response({'message': 'Token ya está invalidado'}, status=status.HTTP_200_OK)
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
    
class ActorViewSet(viewsets.ModelViewSet):
    queryset = Actor.objects.all()
    serializer_class = ActorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action == 'create':
            return [IsWorker()]
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






@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])  
def get_user_by_id(request, user_id):
    instance, serializer_class = get_user_instance_and_serializer(user_id)

    if instance is None:
        return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)

    serializer = serializer_class(instance)
    return Response(serializer.data, status=status.HTTP_200_OK)




# view encargada de enviar el correo con los datos al usuario

class SendEmailAPIView(views.APIView):

    def post(self, request):

        serializer = SendEmailSerializer(data = request.data)

        # permisos de este endpoint 
        permission_classes = [IsAuthenticated]

        if serializer.is_valid():
            email = serializer.validated_data['email']
            cedula = serializer.validated_data['cedula']
            password = serializer.validated_data['password']

            print(settings.DEFAULT_FROM_EMAIL)    

            subject = "Tu acceso a la plataforma - Q Manager"
            message = f"""
                        Hola, se ha registrado tu usuario en Q Manager

                        Estos son tus datos de acceso:

                        Correo: {email}
                        Cédula: {cedula}
                        Contraseña: {password}

                        Por favor, guarda esta información de forma segura.

                        Saludos,
                        El equipo de Q Manager.
                        """
            
            try:
                send_mail(
                    subject,
                    message,
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )
                return Response({"message": "Correo enviado con éxito."}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({"error": f"Error al enviar el correo: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



