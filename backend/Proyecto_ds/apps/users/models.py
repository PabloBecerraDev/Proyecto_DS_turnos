from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserManager

# Modelo de usuario
class User(AbstractBaseUser, PermissionsMixin):

    # Campos rincipales del usuario
    cedula = models.CharField(max_length=20, unique=True)
    nombre = models.CharField(max_length=50)
    codigo = models.CharField(max_length=20, unique=True, blank=True, null=True) # Codigo identificatorio del trabajador

    # Campos de estado
    is_trabajador = models.BooleanField(default=False) # Marca si el usuario es un trabajador
    tiene_prioridad = models.BooleanField(default=False) # Indica si el usuario tiene prioridad
    is_staff = models.BooleanField(default=False) # Indica si el usuario puede entrar al Django Admin

    objects = UserManager() # Se asigna el administrador a utilizar
    USERNAME_FIELD = "cedula" # Se define el identificador unico del usuario (el usuario iniciara sesión con su cedula)
    REQUIRED_FIELDS = ["nombre"] # Campos obligatorios al crear un usuario con createsuperuser

    def save(self, *args, **kwargs):
        if self.is_trabajador:
            if not self.codigo:
                raise ValueError("El trabajador debe tener un codigo")
        else:
            self.codigo = None # Asegura que solo los trabajadores tienen un codigo

        # Guarda el objeto en la base de datos
        super().save(*args, **kwargs)
    
    # Devuelve el nombre
    def __str__(self):
        return f"{self.nombre}"