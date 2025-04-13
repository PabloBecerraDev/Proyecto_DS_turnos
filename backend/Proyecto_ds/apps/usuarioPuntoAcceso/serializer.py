from rest_framework import serializers
from .models import UsuarioPuntoAcceso

class UsuarioPuntoAccesoSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = UsuarioPuntoAcceso
    fields = '__all__'