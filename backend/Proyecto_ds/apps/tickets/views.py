# backend/Proyecto_ds/apps/tickets/views.py
from rest_framework import viewsets, mixins, status
from rest_framework.permissions import IsAuthenticated
# ... otros imports ...
from .models import Ticket
from .serializers import TicketSerializer

class TicketViewSet(mixins.CreateModelMixin, # SOLO POST
                    # mixins.ListModelMixin, # Opcional GET lista
                    # mixins.RetrieveModelMixin, # Opcional GET detalle
                    viewsets.GenericViewSet):

    serializer_class = TicketSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self): # Es bueno tenerlo definido
        user = self.request.user
        if user.is_authenticated:
            return Ticket.objects.filter(user=user)
        return Ticket.objects.none()

    # --- ¡¡ASEGÚRATE DE QUE ESTE MÉTODO ESTÉ PRESENTE Y ACTIVO!! ---
    def perform_create(self, serializer):
        user = self.request.user # 'user' es una instancia del modelo base User
        user_priority = False # Valor por defecto

        # Intentamos acceder al objeto Actor relacionado a través del enlace 'actor'
        # Django crea este enlace automáticamente (nombre de la clase hija en minúsculas)
        if hasattr(user, 'actor'): # Comprueba si el usuario tiene una instancia Actor asociada
            try:
                # Si existe, accedemos al atributo has_priority del objeto Actor
                if user.actor.has_priority:
                    user_priority = True
            except AttributeError:
                # En caso de error raro al acceder a user.actor o user.actor.has_priority
                print(f"Advertencia: No se pudo leer has_priority desde user.actor para User ID: {user.id}")
                pass # Mantenemos user_priority como False

        # --- Prints de Depuración (Recomendado mantener temporalmente) ---
        print(f"--- DEBUG TicketViewSet.perform_create ---")
        print(f"Usuario base (request.user): {user} (Tipo: {type(user)})")
        print(f"¿Tiene atributo 'actor'?: {hasattr(user, 'actor')}")
        if hasattr(user, 'actor'):
            # Imprime el valor directamente desde el actor relacionado
            try:
                print(f"Valor user.actor.has_priority: {user.actor.has_priority}")
            except Exception as e:
                print(f"Error al acceder a user.actor.has_priority: {e}")
        print(f"Prioridad final determinada para el ticket: {user_priority}")
        # --- Fin Prints de Depuración ---

        # Guardamos el ticket pasando el usuario base y la prioridad correctamente determinada
        serializer.save(user=user, is_priority=user_priority)