from rest_framework import serializers
from .models import Usuario
from django.contrib.auth import get_user_model, authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UsuarioSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)
  
  class Meta:
    model = Usuario
    fields = ['id', 'nombre', 'cedula', 'codigo', 'password', 
                  'is_admin', 'is_active', 'tiene_prioridad', 'is_staff', 'is_superuser']

  def create(self, validated_data):
        user = Usuario.objects.create_usuario(
            nombre=validated_data['nombre'],
            cedula=validated_data['cedula'],
            codigo=validated_data['codigo'],
            password=validated_data['password'],
            is_admin=validated_data['is_admin'],
            is_active=validated_data['is_active'],
            tiene_prioridad=validated_data['tiene_prioridad'],
            is_staff=validated_data['is_staff'],
            is_superuser=validated_data['is_superuser']
        )
        return user
  
  def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance
    
  

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
         #Añadir claims personalizados al token
        token['cedula'] = user.cedula
        token['nombre'] = user.nombre
        
        return token