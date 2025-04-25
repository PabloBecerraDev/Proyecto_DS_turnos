from rest_framework import viewsets, permissions
from .models import AccessPoint, AccessPointActor
from .serializers import AccessPointSerializer, AccessPointActorSerializer

class AccessPointViewSet(viewsets.ModelViewSet):
    queryset = AccessPoint.objects.all()
    serializer_class = AccessPointSerializer
    permission_classes = [permissions.IsAuthenticated]

class AccessPointActorViewSet(viewsets.ModelViewSet):
    queryset = AccessPointActor.objects.all()
    serializer_class = AccessPointActorSerializer
    permission_classes = [permissions.IsAuthenticated]
