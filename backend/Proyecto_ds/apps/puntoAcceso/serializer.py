from rest_framework import serializers
from .models import PuntoAcceso

class PuntoAccesoUserSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = PuntoAcceso
    fields = '__all__'