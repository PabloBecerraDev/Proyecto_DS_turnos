# backend/Proyecto_ds/apps/tickets/views.py

from rest_framework import viewsets, mixins # Asegúrate que mixins esté importado
from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response # No es necesario si no personalizas create/list

from .models import Ticket
from .serializers import TicketSerializer

class TicketViewSet(mixins.CreateModelMixin, # Para POST (crear ticket)
                    mixins.ListModelMixin,   # <<< --- AÑADE O ASEGURA QUE ESTÉ ESTE MIXIN para GET (listar tickets) --- <<<
                    # mixins.RetrieveModelMixin, # Opcional: si quieres una vista GET /tickets/{id}/ para ver un ticket
                    viewsets.GenericViewSet):
    """
    ViewSet para manejar la creación y listado de Tickets del usuario.
    """
    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated] # Solo usuarios autenticados

    def get_queryset(self):
        """
        Esta vista solo devolverá los tickets pertenecientes al usuario autenticado.
        """
        user = self.request.user
        # Es buena práctica verificar explícitamente la autenticación aquí también
        if user.is_authenticated:
            return Ticket.objects.filter(user=user).order_by('-created_at') # Ordena por más reciente
        return Ticket.objects.none() # No devuelve nada si no está autenticado o es anónimo

    def perform_create(self, serializer): # Este ya lo teníamos para la creación
        user = self.request.user
        user_priority = False
        if hasattr(user, 'actor'):
            try:
                if user.actor.has_priority:
                    user_priority = True
            except AttributeError:
                pass
        serializer.save(user=user, is_priority=user_priority)

# No se necesitan cambios en urls.py de tickets si el router ya está configurado,
# DefaultRouter maneja las rutas para 'list' automáticamente si el mixin está.