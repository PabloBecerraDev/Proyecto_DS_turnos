# backend/Proyecto_ds/apps/tickets/serializers.py
from rest_framework import serializers
from .models import Ticket

class TicketSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.get_username', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    # --- NUEVO CAMPO PARA MODALIDAD DISPLAY ---
    modality_display = serializers.CharField(source='get_modality_display', read_only=True)
    # ------------------------------------------

    class Meta:
        model = Ticket
        fields = [
            'id',
            'user',
            'service',        # Aceptará el string del servicio (predefinido o personalizado)
            'modality',       # <<< --- AÑADIDO: Aceptará 'VIRTUAL' o 'PRESENCIAL' --- <<<
            'is_priority',
            'ticket_number',
            'status',
            'created_at',
            'updated_at',
            'user_username',
            'status_display',
            'modality_display' # <<< --- AÑADIDO --- <<<
        ]
        read_only_fields = [
            'id',
            'user',
            'is_priority',
            'ticket_number',
            'status',
            'created_at',
            'updated_at',
            'user_username',
            'status_display',
            'modality_display' # Es solo para mostrar
        ]

    # La validación de 'service' actual (si no está vacío) sigue siendo útil.
    def validate_service(self, value):
        if isinstance(value, str):
            cleaned_value = value.strip()
            if not cleaned_value:
                raise serializers.ValidationError(_("El servicio no puede estar vacío."))
            return cleaned_value
        raise serializers.ValidationError(_("Formato de servicio inválido."))

    # --- NUEVA VALIDACIÓN PARA MODALIDAD ---
    def validate_modality(self, value):
        """Asegura que la modalidad sea una de las opciones válidas."""
        valid_modalities = [choice[0] for choice in Ticket.ModalityType.choices]
        if value not in valid_modalities:
            raise serializers.ValidationError(
                _("Modalidad inválida. Opciones válidas: %(options)s") % {'options': ", ".join(valid_modalities)}
            )
        return value
    # ------------------------------------