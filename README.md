# Microservicio para la gestión de usarios

Este proyecto es un microservicio para la gestión de usuarios utilizando Node.js, Express y TypeORM.

## Requisitos

- Node.js
- npm
- PostgreSQL (por defecto)

## Instalación

1. Clona este repositorio.
2. Ejecuta `npm install` para instalar las dependencias.

## Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno antes de iniciar la aplicación:

- `JWT_SECRET`: Secret para JWT.
- `HASH_SALT_ROUNDS`: Número de rondas para el hashing de contraseñas.
- `DB_TYPE`: Tipo de base de datos (por ejemplo, `postgres`, `mysql`, `sqlite`, `mssql`, etc.).
- `DB_HOST`: Host de la base de datos.
- `DB_PORT`: Puerto de la base de datos.
- `DB_USERNAME`: Usuario de la base de datos.
- `DB_PASSWORD`: Contraseña de la base de datos.
- `DB_DATABASE`: Nombre de la base de datos.
- `PORT`: Puerto donde se ejecuta la aplicacion.


## Scripts Disponibles

El proyecto incluye los siguientes scripts en el archivo `package.json`:

- `start`: Inicia la aplicación.
- `build`: Compila el código TypeScript a JavaScript.
- `dev`: Inicia la aplicación en modo desarrollo con reinicio automático.
- `test`: Ejecuta las pruebas utilizando Jest.
- `lint`: Ejecuta ESLint para verificar el estilo del código.
- `lint-fix`: Ejecuta ESLint para corregir automáticamente problemas de estilo.

Para iniciar la aplicación:

```bash
npm run start

3. **Asegúrate de que la base de datos esté configurada y en ejecución**. Dependiendo del motor de base de datos, puede que necesites ajustar configuraciones adicionales o asegurarte de que los servicios de base de datos estén en funcionamiento.

4. **Inicia la aplicación**:
   ```bash
   npm run start



## Ejecución de la Aplicación

Para iniciar la aplicación, asegúrate de tener configurada tu base de datos y sigue estos pasos:

1. **Configuración de Variables de Entorno**:
   Antes de ejecutar la aplicación, asegúrate de configurar las siguientes variables de entorno:

   ```dotenv
   JWT_SECRET=your_jwt_secret
   HASH_SALT_ROUNDS=10
   DB_TYPE=postgres
   DB_HOST=yourhost
   DB_PORT=5432
   DB_USERNAME=youruser
   DB_PASSWORD='yourpassword'
   DB_DATABASE='yourdatabase'

   Reemplaza your_jwt_secret, yourhost, youruser, yourpassword, y yourdatabase con los valores específicos de tu entorno y base de datos.

2. **Instalación de Dependencias**:
  Si aún no has instalado las dependencias del proyecto, ejecuta:
  ```bash
   npm install

3. **Compilación del Código (Opcional)**:
  Si deseas compilar el código TypeScript a JavaScript, ejecuta:
  ```bash
   npm run build

4. **Inicio de la Aplicación**:
  Para iniciar la aplicación en modo producción, ejecuta:
  ```bash
   npm run start
  
  Esto iniciará la aplicación en el puerto configurado o en el puerto 3000 si process.env.PORT no está definido.


## Ejecución de pruebas
Para ejecutar las pruebas unitarias, utiliza el siguiente comando:
```bash
  npm test
Este comando ejecutará las pruebas utilizando Jest y mostrará los resultados en la consola.