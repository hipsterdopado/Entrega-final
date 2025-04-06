
# Guía para ejecutar el proyecto en local

## Requisitos
- Node.js (v18 o superior)
- MySQL Server (v8 o superior)
- MySQL Workbench

## Pasos a seguir
1. Clona el repositorio o extrae los archivos del .zip
2. Crea una base de datos llamada `centro_deportivo` (o la que definas en tu .env)
3. Importa el archivo `schema.sql` desde MySQL Workbench
4. Para crear el usuario admin principal en la terminal de vscode hay que ejecutar: node generateHash.js
   tras haber modificado si se quiere en el archivo generateHash.js el apartado contraseña
5. El resultado sera: Hash generado: $2b$10$h3q7l9hJdD/e... etc y eso hay que copiarlo y pegarlo en el apartado 'contraseña' de la sentencia sql al crear el usuario admin principal de manera manual

5. Ejecuta `npm install` para instalar las dependencias
6. Lanza el servidor con `node server.js`
7. Abre `frontend/index.html` en el navegador para comenzar a usar la app

---
