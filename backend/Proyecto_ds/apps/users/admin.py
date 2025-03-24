from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('cedula', 'nombre', 'is_trabajador', 'tiene_prioridad', 'codigo')
    search_fields = ('cedula', 'nombre', 'codigo')
    list_filter = ('is_trabajador', 'tiene_prioridad')
    ordering = ('cedula',)
    fieldsets = (
        ('Informacion', {'fields':('cedula', 'nombre', 'password')}),
        ('Información adicional', {'fields': ('codigo', 'tiene_prioridad', 'is_trabajador', 'is_staff')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('cedula', 'nombre', 'password1', 'password2', 'tiene_prioridad', 'is_trabajador', 'codigo')}
        ),
    )

admin.site.register(User, CustomUserAdmin)