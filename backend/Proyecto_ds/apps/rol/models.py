from django.db import models

class Rol(models.Model):
    id_rol = models.AutoField(primary_key=True)  # Clave primaria equivalente a SERIAL
    nombre = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        db_table = "rol"

    def __str__(self):
        return f"Opción {self.id_rol}"