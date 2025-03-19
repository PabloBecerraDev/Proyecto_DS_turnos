from django.db import models

from apps.usuarioPuntoAcceso import Users

class PuntoAcceso(models.Model):
    id_puntoAcceso = models.AutoField(primary_key=True)  # Clave primaria equivalente a SERIAL
    id_usuario = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='id_usuario')  
    horario_atencion = models.TimeField(null=True, blank=True, db_column='horario_atencion') 
    discapacitados = models.BooleanField(default=False, db_column='discapacitados')

    class Meta:
        db_table = "puntoAcceso"

    def __str__(self):
        return f"Opción {self.id_puntoAcceso}: {self.id_usuario}"