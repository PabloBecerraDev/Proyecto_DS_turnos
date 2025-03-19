from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

# Administrador de usuarios 
class UserManager(BaseUserManager):

    # Metodo que crea y retorna un usuario con cédula y contraseña obligatoria
    def create_user(self, cedula, password, **extra_fields):

        # Se verifica si se proporciono los atributos cedula y contraseña
        if not cedula:
            raise ValueError("El usuario debe tener una cedula")
        if not password:
            raise ValueError("El usuario debe tener una contraseña") 
        
        # Se crea una instancia (un objeto) del modelo customUsuario con la cedula y otros campos
        user = self.model(cedula=cedula, **extra_fields)

        # Metodo de la clase AbstractBaseUser para encriptar la contraseña antes de guardarla en la base de datos
        user.set_password(password)

        # Se guarda el usuario en la base de datos utilizando la base de datos por default
        user.save(using=self.db)

        # Se retorna el usuario creado
        return user
    
    # Metodo que crea y retorna un superusuario
    def create_superuser(self, cedula, password, **extra_fields):

        # Establece 'is_admin' en True si no se ha proporcionado en extra_fields
        extra_fields.setdefault("is_admin", True)

        # Establece 'is_trabajador' en True si no se ha proporcionado en extra_fields
        extra_fields.setdefault("is_trabajador", True)

        # Establece 'is_superuser' en True si no se ha proporcionado en extra_fields
        extra_fields.setdefault("is_superuser", True)

        extra_fields.setdefault("is_staff", True)
        
        # Llama a 'create_user' para crear el usuario con los permisos de superusuario
        return self.create_user(cedula, password, **extra_fields)

# Modelo de usuario
class User(AbstractBaseUser, PermissionsMixin):

    # Campos principales del usuario
    cedula = models.CharField(max_length=20, unique=True) # Identificacion unica del usuario
    nombre = models.CharField(max_length=50) # Nombre del usuario
    id_unico = models.AutoField(primary_key=True) # ID unico generado automáticamente
    codigo = models.CharField(max_length=20, unique=True, blank=True, null=True) # Codigo identificatorio del trabajador

    # Campos de estado
    is_active = models.BooleanField(default=True) # Indica si el usuario puede iniciar sesion
    is_trabajador = models.BooleanField(default=False) # Marca si el usuario es un trabajador
    is_admin = models.BooleanField(default=False) # Marca si el usuario es un administrador
    tiene_prioridad = models.BooleanField(default=False) # Indica si el usuario tiene prioridad
    is_staff = models.BooleanField(default=False)  # Determina si un usuario puede acceder al panel de administracion

    # Definicion de los roles que puede tener un usuario (valorAlmacenadoenBD, valorUtilizadoEnFormularios)
    ROLES = (
        ("usuario", "Usuario"),
        ("trabajador", "Trabajador"),
        ("admin", "Administrador"),
    )

    # Campo para definir el rol del usuario
    rol = models.CharField(max_length=15, choices=ROLES, default="usuario")

    objects = UserManager() # Se asigna el administrador a utilizar
    USERNAME_FIELD = "cedula" # Se define el identificador unico del usuario (el usuario iniciara sesión con su cedula)
    REQUIRED_FIELDS = ["nombre"] # Campos obligatorios al crear un usuario con createsuperuser

    def save(self, *args, **kwargs):
        # Se ajusta el rol al usuario antes de guardarlo en la base de datos
        if self.rol == "trabajador":
            self.is_trabajador = True
            self.is_staff = False
            self.is_admin = False
            if not self.codigo:
                raise ValueError("El trabajador debe tener un codigo")
        else:
            self.codigo = None # Asegura que solo los trabajadores tienen un codigo
        
        if self.rol == "admin":
            self.is_admin = True
            self.is_staff = True
            self.is_trabajador = False

        # Guarda el objeto en la base de datos
        super().save(*args, **kwargs)
    
    # Devuelve el nombre y el rol en texto
    def __str__(self):
        return f"{self.nombre} / {self.rol}"

# Relacion de atencion (muchos a muchos)
class Atencion(models.Model):
    '''
    Key foranea que referencia al modelo CustomUser, el cual representa al trabajador o administrador
    que realizo la atencion. Si el trabajador es eliminado, tambien se eliminan sus resgistros de atencion  
    '''
    trabajador = models.ForeignKey(User, on_delete=models.CASCADE, related_name="atendio")

    ''' 
    Key foranea que referencia al modelo CustomUser, el cual representa al usuario
    que recibio la atencion. Si el usuario es eliminado, tambien se eliminan sus resgistros de atencion  
    '''
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name="atendido")

    # Devuelve la representacion en fila del objeto atencion
    def __str__(self):
        return f"{self.trabajador.nombre} atendio a {self.usuario.nombre}"