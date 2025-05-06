# backend/Proyecto_ds/apps/tickets/serializers.py

from rest_framework import serializers
from .models import Ticket # Importa el modelo Ticket de la misma app

class TicketSerializer(serializers.ModelSerializer):
    """
    Serializador para crear y leer (opcionalmente) Tickets.
    """

    # --- Campos Adicionales (Solo Lectura) ---
    # Puedes añadir campos extra para facilitar la lectura en la respuesta JSON
    # Opcional: Muestra el username del usuario además del ID
    user_username = serializers.CharField(source='user.get_username', read_only=True)
    # Opcional: Muestra el texto legible del estado además del código
    status_display = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Ticket # Especifica el modelo a serializar
        fields = [
            # Campos principales
            'id',             # ID del ticket (PK)
            'user',           # ID del usuario (FK - read_only en creación)
            'service',        # Servicio solicitado (String - Writable en creación)
            'is_priority',    # Prioridad determinada por backend (read_only en creación)
            'ticket_number',  # Número generado (read_only en creación)
            'status',         # Estado del ticket (read_only en creación, usa default)
            'created_at',     # Fecha creación (read_only)
            'updated_at',     # Fecha actualización (read_only)

            # Campos adicionales de solo lectura (opcionales)
            'user_username',
            'status_display',
        ]
        # --- Campos de Solo Lectura ---
        # Estos campos NO pueden ser establecidos directamente por el cliente al crear (POST)
        # Serán asignados por la vista (user, is_priority) o por el modelo (ticket_number, status default, timestamps)
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

    # --- Validación (Opcional pero Recomendado) ---
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
            # Aquí podrías añadir más lógica de validación o limpieza si es necesario
            # Ejemplo: Convertir a mayúsculas si quieres cierta consistencia
            # cleaned_value = cleaned_value.upper()
            return cleaned_value
        # Si no es string (inesperado pero posible), lanza error
        raise serializers.ValidationError(_("Formato de servicio inválido."))