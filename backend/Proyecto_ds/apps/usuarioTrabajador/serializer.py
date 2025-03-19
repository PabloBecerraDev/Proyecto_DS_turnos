from rest_framework import serializers
from .models import UsuarioTrabajador

class UsuarioTrabajadorSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = UsuarioTrabajador
    fields = '__all__'