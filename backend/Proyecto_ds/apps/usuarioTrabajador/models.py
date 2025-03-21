from django.db import models

from apps.usuario.models import Usuario

class UsuarioTrabajador(models.Model):
    id_usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='usuario', db_column='id_usuario', primary_key=True)  # Clave primaria equivalente a SERIAL
    id_trabajador = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='trabajador', db_column='id_trabajador') 

    class Meta:
        db_table = "usuarioTrabajador"
        unique_together = (('id_trabajador', 'id_usuario'),)  # Define la clave primaria compuesta

    def __str__(self):
        return f"Opción {self.id_usuario}"