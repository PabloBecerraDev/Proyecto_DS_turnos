from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

class Ticket(models.Model):
    """
    Representa un ticket de turno solicitado por un usuario (Actor).
    El servicio puede ser uno predefinido o uno personalizado.
    """

    class TicketStatus(models.TextChoices):
        PENDIENTE = 'PENDIENTE', _('Pendiente')
        LLAMADO = 'LLAMADO', _('Llamado')
        ATENDIDO = 'ATENDIDO', _('Atendido')
        CANCELADO = 'CANCELADO', _('Cancelado')
        NO_ASISTIO = 'NO_ASISTIO', _('No Asistió')

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='tickets',
        verbose_name=_('Usuario Solicitante')
    )

    service = models.CharField(
        max_length=200,
        verbose_name=_('Servicio Solicitado')
    )

    is_priority = models.BooleanField(
        default=False,
        verbose_name=_('Es Prioritario')
    )
    ticket_number = models.CharField(
        max_length=10,
        unique=True,
        blank=True,
        verbose_name=_('Número de Ticket')
    )
    status = models.CharField(
        max_length=20,
        choices=TicketStatus.choices, 
        default=TicketStatus.PENDIENTE,
        verbose_name=_('Estado del Ticket')
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name=_('Fecha de Creación')
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name=_('Última Actualización')
    )

    
    def _generate_ticket_number(self):
        prefix = 'P-' if self.is_priority else 'N-'
        last_ticket = Ticket.objects.filter(ticket_number__startswith=prefix).order_by('id').last()
        next_num = 1
        if last_ticket and last_ticket.ticket_number:
            try:
                last_num_str = last_ticket.ticket_number.split('-')[1]
                next_num = int(last_num_str) + 1
            except (IndexError, ValueError):
                count = Ticket.objects.filter(ticket_number__startswith=prefix).count()
                next_num = count + 1
        return f"{prefix}{next_num:03d}"

    def save(self, *args, **kwargs):
        if self._state.adding and not self.ticket_number:
            self.ticket_number = self._generate_ticket_number()
            while Ticket.objects.filter(ticket_number=self.ticket_number).exists():
                 print(f"Advertencia [Ticket Save]: Colisión para {self.ticket_number}. Regenerando.")
                 self.ticket_number = self._generate_ticket_number()
        super().save(*args, **kwargs)

    def __str__(self):
        try:
            user_display = self.user.get_full_name() if self.user.get_full_name() else self.user.get_username()
        except AttributeError:
             user_display = str(self.user_id)

        priority_flag = "[Prioritario]" if self.is_priority else "[Normal]"

        service_display = self.service
        return f"Ticket {self.ticket_number or 'SIN NÚMERO'} ({service_display}) {priority_flag} - {user_display}"

    class Meta:
        verbose_name = _('Ticket')
        verbose_name_plural = _('Tickets')
        ordering = ['-created_at']