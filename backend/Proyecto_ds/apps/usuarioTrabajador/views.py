from .models import UsuarioTrabajador

from rest_framework import generics, status
from rest_framework.response import Response

from .serializer import UsuarioTrabajadorSerializer

class ListCreateUsuarioTrabajador(generics.ListAPIView):
  queryset = UsuarioTrabajador.objects.all()
  serializer_class = UsuarioTrabajadorSerializer
  
  def post(self, request, *args, **kwargs):
    data= request.data
    serr = UsuarioTrabajadorSerializer(data=data)
    if (serr.is_valid()):
      serr.save()
      return Response(serr.validated_data, status=status.HTTP_200_OK)  
    
    return Response(status=status.HTTP_400_BAD_REQUEST)