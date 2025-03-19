from django.db import models

class UsuarioTrabajador(models.Model):
    id_usuario = models.AutoField(primary_key=True)  # Clave primaria equivalente a SERIAL
    id_trabajador = models.ForeignKey(db_column='id_trabajador') 

    class Meta:
        db_table = "usuarioTrabajador"

    def __str__(self):
        return f"Opción {self.id_usuario}"