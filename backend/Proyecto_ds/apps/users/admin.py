from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Atencion

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ('cedula', 'nombre', 'is_trabajador', 'is_admin', 'rol', 'is_active', 'tiene_prioridad', 'codigo', 'is_staff')
    search_fields = ('cedula', 'nombre')
    list_filter = ('is_trabajador', 'is_admin', 'rol',)
    ordering = ('cedula',)
    fieldsets = (
        ('Informacion', {'fields':('cedula', 'nombre', 'password')}),
        ("Información adicional", {"fields": ("codigo", "tiene_prioridad")}),
        ('Permisos', {'fields':('is_trabajador', 'is_admin', 'rol', 'is_active', 'is_staff')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('cedula', 'nombre', 'password1', 'password2', 'rol', 'is_active', 'tiene_prioridad', 'codigo')}
        ),
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(Atencion)