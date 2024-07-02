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

2. **Actualiza el archivo `orm.config.ts`**. Modifica las propiedades en este archivo para reflejar la configuración de tu motor de base de datos. Aquí hay algunos ejemplos de configuraciones para diferentes motores:

   - **PostgreSQL** (por defecto):
     ```typescript
      import { DataSource } from 'typeorm';
      import { User } from './entities/User';
      import { Operation } from './entities/Operation';
      
      export const AppDataSource = new DataSource({
        type: 'postgres',
        host: 'yourhost', // Nombre del servicio de Docker, no 'localhost'
        port: 5432,
        username: 'youruser',
        password: 'yourpassword',
        database: 'yourdatabase',
        synchronize: true,
        logging: false,
        entities: [User, Operation],
        migrations: ['src/migrations/**/*.ts'],
        subscribers: ['src/subscribers/**/*.ts'],
      });
     ```

   - **MySQL / MariaDB**:
     ```typescript
      import { DataSource } from 'typeorm';
      import { User } from './entities/User';
      import { Operation } from './entities/Operation';
      
      export const AppDataSource = new DataSource({
        type: 'postgres',
        host: 'yourhost',
        port: 5432,
        username: 'youruser',
        password: 'yourpassword',
        database: 'yourdatabase',
        synchronize: true,
        logging: false,
        entities: [User, Operation],
        migrations: ['src/migrations/**/*.ts'],
        subscribers: ['src/subscribers/**/*.ts'],
      });
     ```

   - **SQLite**:
     ```typescript
      import { DataSource } from 'typeorm';
      import { User } from './entities/User';
      import { Operation } from './entities/Operation';
      
      export const AppDataSource = new DataSource({
        type: 'sqlite',
        database: 'database.sqlite',
        synchronize: true,
        logging: false,
        entities: [User, Operation],
        migrations: ['src/migrations/**/*.ts'],
        subscribers: ['src/subscribers/**/*.ts'],
      });
     ```

   - **Microsoft SQL Server**:
     ```typescript
      import { DataSource } from 'typeorm';
      import { User } from './entities/User';
      import { Operation } from './entities/Operation';
      
      export const AppDataSource = new DataSource({
        type: 'mssql',
        host: 'yourhost',
        port: 1433,
        username: 'youruser',
        password: 'yourpassword',
        database: 'yourdatabase',
        synchronize: true,
        logging: false,
        entities: [User, Operation],
        migrations: ['src/migrations/**/*.ts'],
        subscribers: ['src/subscribers/**/*.ts'],
        options: {
          enableArithAbort: true,
        },
      });
     ```

3. **Asegúrate de que la base de datos esté configurada y en ejecución**. Dependiendo del motor de base de datos, puede que necesites ajustar configuraciones adicionales o asegurarte de que los servicios de base de datos estén en funcionamiento.

4. **Inicia la aplicación**:
   ```bash
   npm run start

