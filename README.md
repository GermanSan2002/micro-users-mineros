# Microservicio para la gestión de usarios

Este proyecto es un microservicio para la gestión de usuarios utilizando Node.js, Express y TypeORM.

## Requisitos

- Node.js
- npm
- PostgreSQL (por defecto)

## Instalación

1. Clona este repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Configura tu base de datos en el archivo `ormconfig.js`.

## Configuración de la Base de Datos

El proyecto está configurado por defecto para usar PostgreSQL. Si deseas utilizar otro motor de base de datos, sigue estos pasos:

### Cambiar el Motor de Base de Datos

1. **Instala el paquete del motor de base de datos deseado**. TypeORM soporta varios motores de bases de datos. Aquí tienes algunos ejemplos de cómo instalar los paquetes correspondientes:

   - **MySQL / MariaDB**:
     ```bash
     npm install mysql2
     ```

   - **SQLite**:
     ```bash
     npm install sqlite3
     ```

   - **Microsoft SQL Server**:
     ```bash
     npm install mssql
     ```

   - **Oracle**:
     ```bash
     npm install oracledb
     ```

2. **Actualiza el archivo `ormconfig.js`**. Modifica las propiedades en este archivo para reflejar la configuración de tu motor de base de datos. Aquí hay algunos ejemplos de configuraciones para diferentes motores:

   - **PostgreSQL** (por defecto):
     ```javascript
     module.exports = {
       type: 'postgres',
       host: 'localhost',
       port: 5432,
       username: 'yourusername',
       password: 'yourpassword',
       database: 'yourdatabase',
       synchronize: true,
       logging: false,
       entities: [
         'src/entities/**/*.js'
       ],
       migrations: [
         'src/migrations/**/*.js'
       ],
       subscribers: [
         'src/subscribers/**/*.js'
       ],
       cli: {
         entitiesDir: 'src/entities',
         migrationsDir: 'src/migrations',
         subscribersDir: 'src/subscribers'
       }
     };
     ```

   - **MySQL / MariaDB**:
     ```javascript
     module.exports = {
       type: 'mysql',
       host: 'localhost',
       port: 3306,
       username: 'yourusername',
       password: 'yourpassword',
       database: 'yourdatabase',
       synchronize: true,
       logging: false,
       entities: [
         'src/entities/**/*.js'
       ],
       migrations: [
         'src/migrations/**/*.js'
       ],
       subscribers: [
         'src/subscribers/**/*.js'
       ],
       cli: {
         entitiesDir: 'src/entities',
         migrationsDir: 'src/migrations',
         subscribersDir: 'src/subscribers'
       }
     };
     ```

   - **SQLite**:
     ```javascript
     module.exports = {
       type: 'sqlite',
       database: 'database.sqlite',
       synchronize: true,
       logging: false,
       entities: [
         'src/entities/**/*.js'
       ],
       migrations: [
         'src/migrations/**/*.js'
       ],
       subscribers: [
         'src/subscribers/**/*.js'
       ],
       cli: {
         entitiesDir: 'src/entities',
         migrationsDir: 'src/migrations',
         subscribersDir: 'src/subscribers'
       }
     };
     ```

   - **Microsoft SQL Server**:
     ```javascript
     module.exports = {
       type: 'mssql',
       host: 'localhost',
       port: 1433,
       username: 'yourusername',
       password: 'yourpassword',
       database: 'yourdatabase',
       synchronize: true,
       logging: false,
       entities: [
         'src/entities/**/*.js'
       ],
       migrations: [
         'src/migrations/**/*.js'
       ],
       subscribers: [
         'src/subscribers/**/*.js'
       ],
       cli: {
         entitiesDir: 'src/entities',
         migrationsDir: 'src/migrations',
         subscribersDir: 'src/subscribers'
       },
       options: {
         enableArithAbort: true
       }
     };
     ```

3. **Asegúrate de que la base de datos esté configurada y en ejecución**. Dependiendo del motor de base de datos, puede que necesites ajustar configuraciones adicionales o asegurarte de que los servicios de base de datos estén en funcionamiento.

4. **Inicia la aplicación**:
   ```bash
   npm run start

