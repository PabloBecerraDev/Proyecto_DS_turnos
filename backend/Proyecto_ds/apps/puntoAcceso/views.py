from .models import PuntoAcceso

from rest_framework import generics, status
from rest_framework.response import Response

from .serializer import PuntoAccesoUserSerializer

class ListCreatePuntosAcceso(generics.ListAPIView):
  queryset = PuntoAcceso.objects.all()
  serializer_class = PuntoAccesoUserSerializer
  
  def post(self, request, *args, **kwargs):
    data= request.data
    serr = PuntoAccesoUserSerializer(data=data)
    if (serr.is_valid()):
      serr.save()
      return Response(serr.validated_data, status=status.HTTP_200_OK)  
    
    return Response(status=status.HTTP_400_BAD_REQUEST)