# backend/Proyecto_ds/apps/tickets/serializers.py

from rest_framework import serializers
from .models import Ticket 

class TicketSerializer(serializers.ModelSerializer):

    user_username = serializers.CharField(source='user.get_username', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Ticket 
        fields = [
            'id',             # ID del ticket (PK)
            'user',           # ID del usuario (FK)
            'service',        # Servicio solicitado 
            'is_priority',    # Prioridad determinada por backend 
            'ticket_number',  # Número generado 
            'status',         # Estado del ticket
            'created_at',     # Fecha creación 
            'updated_at',     # Fecha actualización (read_only)

            # Campos adicionales de solo lectura 
            'user_username',
            'status_display',
        ]
    
        read_only_fields = [
            'id',
            'user',           # Se asigna en la vista desde request.user
            'is_priority',    # Se determina en la vista desde user.has_priority
            'ticket_number',  # Se genera en el modelo .save()
            'status',         # Usa el default del modelo ('PENDIENTE') al crear
            'created_at',
            'updated_at',
            # También los campos adicionales que definimos arriba
            'user_username',
            'status_display',
        ]

    # --- Validación---
    def validate_service(self, value):
        """
        Valida el campo 'service'.
        Podríamos añadir lógica aquí si quisiéramos, por ejemplo:
        - Asegurar que no esté vacío después de quitar espacios.
        - Limitar la longitud máxima (aunque el modelo ya lo hace).
        - Potencialmente, normalizar algunos valores comunes (ej: 'asesoria' -> 'ASESORIA').
        """
        if isinstance(value, str):
            # Quita espacios al inicio y al final
            cleaned_value = value.strip()
            if not cleaned_value:
                raise serializers.ValidationError(_("El servicio no puede estar vacío."))
            return cleaned_value

        raise serializers.ValidationError(_("Formato de servicio inválido."))