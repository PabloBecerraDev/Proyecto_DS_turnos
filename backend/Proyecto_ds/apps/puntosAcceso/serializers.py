from rest_framework import serializers
from .models import AccessPoint, AccessPointActor

class AccessPointSerializer(serializers.ModelSerializer):
    class Meta():
        model = AccessPoint
        fields = '__all__'

class AccessPointActorSerializer(serializers.ModelSerializer):
    class Meta():
        model = AccessPointActor
        fields = '__all__'