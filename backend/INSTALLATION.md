# Backend Component

## Summary

The backend component is responsible for handling business logic, data processing, and providing an interface between the database and frontend components. 

## Steps run the backend without Docker

### 1. Create python environment

Inside backend folder:

```
# Create the virtual environment
python -m venv env
```

or

```
# Create the virtual environment
virtualenv -p python3 env
```

### 2. Activate python environment

```
# Activate the virtual environment (Linux/Mac)
source env/bin/activate
```

```
# Activate the virtual environment (Windows)
env\Scripts\activate
```

### 3. Install dependencies

```
pip install -r requirements.txt
```

### 4. Configure database connection

In the settings.py file, configure the database you want to use (SQLite is the default).

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'Pp31415926535pP@',
        'HOST': 'db.baoxyiiwcbghqjiyiygt.supabase.co',
        'PORT': '5432',
    }
}
```

### 5. Run the development server

```
python manage.py runserver
```

### 6. (Optional) Create migrations

After of delete all migrations folders in each application into backend folder, run:

```bash
python manage.py makemigrations --merge
```

### 7. (Optional) Migrate table structure

```bash
python manage.py migrate
```

Go to `step 5`