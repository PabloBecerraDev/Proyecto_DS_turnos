from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import UserManager
from django.core.validators import RegexValidator, EmailValidator

class User(AbstractBaseUser, PermissionsMixin):
    nombre = models.CharField(
        max_length=50,
        validators=[
            RegexValidator(
                regex=r'^[a-zA-Z ]+$',
                message="Solo se permiten letras",
                code='nombre_invalido'
            )
        ]
    )

    cedula = models.PositiveBigIntegerField(
        unique=True,
        validators=[
            RegexValidator(
                regex=r'^\d{7,10}$',
                message="No es un numero de documento valido",
                code="cedula_invalida"
            )
        ],
        verbose_name='Cedula de ciudadania')
    
    email = models.EmailField(
        unique=True, 
        validators=[
            EmailValidator(message="Correo electronico invalido")
        ],
        verbose_name="Correo electronico"
    )

    phone_number = models.CharField(
        max_length=15, 
        validators=[
            RegexValidator(
                regex=r'^\d{10,15}$',
                message="No es un numero de celular valido",
                code="numero_invalido"
            )
        ],
        verbose_name="Numero de celular"
    ) 

    is_staff = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = 'cedula'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.nombre} ({self.cedula})"
    
    class Meta:
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['id']



class Actor(User):
    has_priority = models.BooleanField(default=False)
    MOTIVE_CHOICES = [
        ('A', 'Adulto de tercera edad.'),
        ('B', 'Mujer embarazada.'),
        ('C', 'Persona en silla de ruedas o muletas.'),
        ('D', 'Otros.'),
    ]

    motive = models.CharField(max_length=100, choices=MOTIVE_CHOICES, blank = True, null = True)

    class Meta:
        verbose_name = 'Actor'
        verbose_name_plural = 'Actores'
        ordering = ['id']

class Worker(User):
    code = models.CharField(max_length=20, unique=True)

    def save(self, *args, **kwargs):
        if not self.code:
            last_worker = Worker.objects.order_by('id').last()
            next_id = (last_worker.id + 1) if last_worker else 1
            self.code = f'CODE-{next_id}'
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Trabajador'
        verbose_name_plural = 'Trabajadores'
        ordering = ['id']