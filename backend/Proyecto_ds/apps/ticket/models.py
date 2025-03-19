from django.db import models

class Ticket(models.Model):
    id_ticket = models.AutoField(primary_key=True)  # Clave primaria equivalente a SERIAL
    numero = models.IntegerField(null=True, db_column='numero')  # Texto de la opción

    class Meta:
        db_table = "ticket"

    def __str__(self):
        return f"Opción {self.id_ticket}"