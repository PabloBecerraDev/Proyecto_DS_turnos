#  Instrucciones de Configuración

##  Backend
1. **Crear el entorno virtual** dentro de la carpeta `entornos`:
   ```sh
   python -m venv entornos/.venv
   ```
2. **Activar el entorno virtual**:
   - En Windows:
     ```sh
     entornos\.venv\Scripts\activate
     ```
3. **Instalar dependencias**:
   ```sh
   pip install -r local.txt
   ```
4. **Ejecutar el servidor**:
   ```sh
   py manage.py runserver
   ```

##  Frontend
1. **Moverse a la carpeta `frontend`**:
   ```sh
   cd frontend
   ```
2. **Instalar dependencias**:
   ```sh
   npm install
   ```
3. **Iniciar el servidor de desarrollo**:
   ```sh
   npm run dev
   ```

---

##   **Estas instrucciones se actualizarán luego a medida que se agregen mas cosas.** 
