from django.db import models
from apps.users.models import Actor

class Ticket(models.Model):
    number = models.PositiveBigIntegerField()
    actor = models.ForeignKey(Actor, on_delete=models.CASCADE)
    ticket_vencido = models.BooleanField(default=False)

    def __str__(self):
        return f"Usuario: {self.actor.nombre} con numero de ticket {self.number}"