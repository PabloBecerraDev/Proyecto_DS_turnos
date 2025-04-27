Dentro de la carpeta backend

# Configurar la Conexión de Django con Supabase

## Instalar en el entorno virtual

pip install python-dotenv psycopg2

## Tipo de conexion

Crear un archivo en la carpeta backend llamado .env

No olvidar añadir el .env en el archivo .gitignore de 
la carpeta raiz del proyecto

Debe tener esta forma:

```
user=postgres.abcd
password=[YOUR-PASSWORD] 
host=xyzw
port=6543
dbname=postgres
```
Las credenciales se pueden ver en supabase en la parte 
superior de la pagina web, Connect--> type --> Python

## Establecer conexion 

Hay dos maneras directamente con psycopg2 o configurando 
DATABASES en el settings.py

### Forma uno (usada)

En archivo settings.py

```
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv("dbname"),
        'USER': os.getenv("user"),
        'PASSWORD': os.getenv("password"),
        'HOST': os.getenv("host"),
        'PORT': os.getenv("port"),
    }
}
```

### Forma dos

Crear un archivo llamado main.py dentro del backend

```
import psycopg2
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Fetch variables
USER = os.getenv("user")
PASSWORD = os.getenv("password")
HOST = os.getenv("host")
PORT = os.getenv("port")
DBNAME = os.getenv("dbname")

# Connect to the database
try:
    connection = psycopg2.connect(
        user=USER,
        password=PASSWORD,
        host=HOST,
        port=PORT,
        dbname=DBNAME
    )
    print("Connection successful!")
    
    # Create a cursor to execute SQL queries
    cursor = connection.cursor()
    
    # Example query
    cursor.execute("SELECT NOW();")
    result = cursor.fetchone()
    print("Current Time:", result)

    # Close the cursor and connection
    cursor.close()
    connection.close()
    print("Connection closed.")

except Exception as e:
    print(f"Failed to connect: {e}")
```