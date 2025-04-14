from .models import Ticket

from rest_framework import generics, status
from rest_framework.response import Response

from .serializer import TicketSerializer

class ListCreateTickets(generics.ListAPIView):
  queryset = Ticket.objects.all()
  serializer_class = TicketSerializer
  
  def post(self, request, *args, **kwargs):
    data= request.data
    serr = TicketSerializer(data=data)
    if (serr.is_valid()):
      serr.save()
      return Response(serr.validated_data, status=status.HTTP_200_OK)  
    
    return Response(status=status.HTTP_400_BAD_REQUEST)