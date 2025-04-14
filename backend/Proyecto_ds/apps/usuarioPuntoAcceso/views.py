from .models import UsuarioPuntoAcceso

from rest_framework import generics, status
from rest_framework.response import Response

from .serializer import UsuarioPuntoAccesoSerializer

class ListCreateUsuarioPuntoAcceso(generics.ListAPIView):
  queryset = UsuarioPuntoAcceso.objects.all()
  serializer_class = UsuarioPuntoAccesoSerializer
  
  def post(self, request, *args, **kwargs):
    data= request.data
    serr = UsuarioPuntoAccesoSerializer(data=data)
    if (serr.is_valid()):
      serr.save()
      return Response(serr.validated_data, status=status.HTTP_200_OK)  
    
    return Response(status=status.HTTP_400_BAD_REQUEST)