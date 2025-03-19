from django.db import models

from apps.users import Users

class UsuarioPuntoAcceso(models.Model):
    id_puntoAcceso = models.AutoField(primary_key=True)  # Clave primaria equivalente a SERIAL
    id_usuario = models.ForeignKey(Users, on_delete=models.CASCADE, db_column='id_usuario')
    hora_atencion = models.DateTimeField(null=True, blank=True, db_column='hora_atencion')

    class Meta:
        db_table = "usuarioPuntoAcceso"

    def __str__(self):
        return f"Opción {self.id_ticket}"