from .models import Usuario

from rest_framework import generics, status
from rest_framework.response import Response

from .serializer import UsuarioSerializer

class ListCreateUsuarios(generics.ListAPIView):
  queryset = Usuario.objects.all()
  serializer_class = UsuarioSerializer
  
  def post(self, request, *args, **kwargs):
    data= request.data
    serr = UsuarioSerializer(data=data)
    if (serr.is_valid()):
      serr.save()
      return Response(serr.validated_data, status=status.HTTP_200_OK)  
    
    return Response(status=status.HTTP_400_BAD_REQUEST)