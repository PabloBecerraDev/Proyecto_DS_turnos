# Configurar la Conexión de Django con Supabase

pip install supabase psycopg2-binary

## Configurar la base de datos en setting.py

```
# Cargar variables de entorno
env = environ.Env()
environ.Env.read_env()

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('SUPABASE_DB_NAME'),  # Nombre de la base de datos
        'USER': env('SUPABASE_DB_USER'),  # Usuario de la base de datos
        'PASSWORD': env('SUPABASE_DB_PASSWORD'),  # Contraseña
        'HOST': env('SUPABASE_DB_HOST'),  # Host de Supabase (es la URL de Supabase sin 'https://')
        'PORT': '5432',  # Puerto estándar de PostgreSQL
    }
}
```