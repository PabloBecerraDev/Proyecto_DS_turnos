from django.db import models
from apps.usuario.models import Usuario

class Ticket(models.Model):
    id_actor = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')  
    numero = models.IntegerField(null=True, db_column='numero')  # Texto de la opción

    class Meta:
        db_table = "ticket"

    def __str__(self):
        return f"Opción {self.id_ticket}"