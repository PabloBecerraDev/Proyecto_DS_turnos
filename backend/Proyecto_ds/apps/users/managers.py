from django.contrib.auth.models import BaseUserManager

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

        user.save(using=self.db)
        return user
    
    # Metodo que crea y retorna un superusuario
    def create_superuser(self, cedula, password, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)
        #extra_fields.setdefault("is_trabajador", True)
        return self.create_user(cedula, password, **extra_fields)