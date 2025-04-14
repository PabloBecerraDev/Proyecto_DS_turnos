from django.contrib.auth.models import BaseUserManager

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

        
        return self.create_usuario(cedula, password, **extra_fields)
    
