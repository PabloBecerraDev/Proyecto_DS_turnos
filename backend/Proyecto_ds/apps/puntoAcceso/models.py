from django.db import models

from apps.usuario.models import Usuario

class PuntoAcceso(models.Model):
    id_administrador = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='id_usuario')  
    horario_atencion = models.TimeField(null=True, blank=True, db_column='horario_atencion') 
    discapacitados = models.BooleanField(default=False, db_column='discapacitados')

    class Meta:
        db_table = "puntoAcceso"

    def __str__(self):
        return f"Opción {self.id_puntoAcceso}: {self.id_usuario}"