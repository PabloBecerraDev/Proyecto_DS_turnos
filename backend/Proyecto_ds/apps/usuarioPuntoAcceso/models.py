from django.db import models

from apps.usuario.models import Usuario
from apps.puntoAcceso.models import PuntoAcceso

class UsuarioPuntoAcceso(models.Model):
    id_puntoAcceso = models.ForeignKey(PuntoAcceso, on_delete=models.CASCADE, db_column='id_puntoAcceso', primary_key=True)  # Clave primaria equivalente a SERIAL
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')
    hora_atencion = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "usuarioPuntoAcceso"
        unique_together = (('id_puntoAcceso', 'id_usuario'),)  # Define la clave primaria compuesta

    def __str__(self):
        return f"Opción {self.id_ticket}"