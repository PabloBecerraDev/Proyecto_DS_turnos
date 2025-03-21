from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

from apps.rol.models import Rol
from apps.ticket.models import Ticket

class UsuarioManager(BaseUserManager):
    def create_usuario(self, cedula, password, **extra_fields):
        if not cedula:
            raise ValueError("El usuario debe tener una cédula")
        if not password:
            raise ValueError("El usuario debe tener una contraseña")
        
        usuario = self.model(cedula=cedula, **extra_fields)
        usuario.set_password(password if password else cedula)  # Si no hay contraseña, usa la cédula
        usuario.save(using=self._db)
        return usuario
        
    def create_superuser(self, cedula, password, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)

        try:
            rol_superadmin = Rol.objects.get(id_rol=1)  # 🔹 Corrección aquí
        except Rol.DoesNotExist:
            raise ValueError("El rol con ID 1 no existe. Debes crearlo en la base de datos.")

        return self.create_usuario(cedula, password, id_rol=rol_superadmin, **extra_fields)

class Usuario(AbstractBaseUser, PermissionsMixin):
    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)
    cedula = models.CharField(max_length=20, unique=True)
    codigo = models.CharField(max_length=20, unique=True, blank=True, null=True)
    password = models.CharField(max_length=200, unique=True, default="123")
    id_rol = models.ForeignKey(Rol, on_delete=models.CASCADE, db_column='id_rol')
    id_ticket = models.ForeignKey(Ticket, on_delete=models.CASCADE, db_column='id_ticket', blank=True, null=True)

    # Campos de estado
    is_active = models.BooleanField(default=True)  # Indica si el usuario puede iniciar sesión
    tiene_prioridad = models.BooleanField(default=False)  # Indica si el usuario tiene prioridad
    is_staff = models.BooleanField(default=False)  # Necesario para acceso al Django Admin
    is_superuser = models.BooleanField(default=False)  # Para permisos de superusuario

    objects = UsuarioManager() 

    USERNAME_FIELD = 'cedula'

    def __str__(self):
        return f"{self.cedula} - {self.nombre}"

    def save(self, *args, **kwargs):
        """Se asegura que el campo is_staff e is_superuser sean consistentes con el rol."""
        if self.id_rol and self.id_rol.nombre_rol.lower() in ["admin", "superusuario"]:
            self.is_staff = True
        if self.id_rol and self.id_rol.nombre_rol.lower() == "superusuario":
            self.is_superuser = True
        super().save(*args, **kwargs)

# # Modelo de usuario
# class User(AbstractBaseUser, PermissionsMixin):

#     # Campos principales del usuario
#     cedula = models.CharField(max_length=20, unique=True) # Identificacion unica del usuario
#     nombre = models.CharField(max_length=50) # Nombre del usuario
#     id_usuario = models.AutoField(primary_key=True) # ID unico generado automáticamente
#     codigo = models.CharField(max_length=20, unique=True, blank=True, null=True) # Codigo identificatorio del trabajador

#     # Campos de estado
#     is_active = models.BooleanField(default=True) # Indica si el usuario puede iniciar sesion
#     is_trabajador = models.BooleanField(default=False) # Marca si el usuario es un trabajador
#     is_admin = models.BooleanField(default=False) # Marca si el usuario es un administrador
#     tiene_prioridad = models.BooleanField(default=False) # Indica si el usuario tiene prioridad
#     is_staff = models.BooleanField(default=False)  # Determina si un usuario puede acceder al panel de administracion

#     # Definicion de los roles que puede tener un usuario (valorAlmacenadoenBD, valorUtilizadoEnFormularios)
#     ROLES = (
#         ("usuario", "Usuario"),
#         ("trabajador", "Trabajador"),
#         ("admin", "Administrador"),
#     )

#     # Campo para definir el rol del usuario
#     rol = models.CharField(max_length=15, choices=ROLES, default="usuario")

#     objects = UserManager() # Se asigna el administrador a utilizar
#     USERNAME_FIELD = "cedula" # Se define el identificador unico del usuario (el usuario iniciara sesión con su cedula)
#     REQUIRED_FIELDS = ["nombre"] # Campos obligatorios al crear un usuario con createsuperuser

#     def save(self, *args, **kwargs):
#         # Se ajusta el rol al usuario antes de guardarlo en la base de datos
#         if self.rol == "trabajador":
#             self.is_trabajador = True
#             self.is_staff = False
#             self.is_admin = False
#             if not self.codigo:
#                 raise ValueError("El trabajador debe tener un codigo")
#         else:
#             self.codigo = None # Asegura que solo los trabajadores tienen un codigo
        
#         if self.rol == "admin":
#             self.is_admin = True
#             self.is_staff = True
#             self.is_trabajador = False

#         # Guarda el objeto en la base de datos
#         super().save(*args, **kwargs)
    
#     # Devuelve el nombre y el rol en texto
#     def __str__(self):
#         return f"{self.nombre} / {self.rol}"