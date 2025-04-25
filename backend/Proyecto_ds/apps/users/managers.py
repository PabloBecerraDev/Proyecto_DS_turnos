from django.contrib.auth.models import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self, cedula, password, **extra_fields):
        if not cedula:
            raise ValueError("El usuario debe tener una cedula")
        if not password:
            raise ValueError("El usuario debe tener una contraseña") # Si no hay contraseña, usa la cédula
        
        user = self.model(cedula=cedula, **extra_fields)
        user.set_password(password if password else cedula)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, cedula, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(cedula, password, **extra_fields)