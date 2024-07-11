# Microservicio de Gestión de Usuarios

## Descripción
Este microservicio gestiona la creación, modificación, eliminación, y bloqueo de usuarios, así como la recuperación de contraseñas. Está construido con Node.js, NestJS, y utiliza TypeORM para interactuar con la base de datos.

## Dependencias

Las principales dependencias utilizadas en este proyecto son:

- **NestJS**: Framework para construir aplicaciones Node.js eficientes y escalables.
- **TypeScript**: Superset de JavaScript que añade tipado estático opcional y otras características avanzadas.
- **TypeORM**: ORM (Object-Relational Mapping) para TypeScript y JavaScript.
- **Jest**: Framework de pruebas unitarias y de integración.
- **bcrypt**: Librería para el hash seguro de contraseñas.
- **jsonwebtoken (JWT)**: Implementación de JSON Web Tokens para la autenticación.
- **Nodemailer**: Librería para enviar correos electrónicos desde Node.js.
- **dotenv**: Carga variables de entorno desde un archivo `.env`.

Estas dependencias están especificadas en el archivo `package.json` y pueden ser instaladas usando npm o yarn.

## Tabla de Contenidos
- [Instalación](#instalación)
- [Uso](#uso)
- [Comandos Disponibles](#comandos-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Variables de Entorno](#variables-de-entorno)
- [Pruebas](#pruebas)
- [Despliegue](#despliegue)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Instalación
1. Clonar el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/microservicio-usuarios.git
    cd microservicio-usuarios
    ```

2. Instalar las dependencias:
    ```sh
    npm install
    ```

3. Configurar las variables de entorno (ver [Variables de Entorno](#variables-de-entorno)).

## Uso

### Iniciar el Servidor en Modo Desarrollo

Para iniciar el servidor en modo desarrollo con recarga en caliente:

```sh
npm run start:dev
```

El servidor estará disponible en [http://localhost:3000](http://localhost:3000).

### Endpoints Disponibles
1. **Login**
    - URL: `/users/login`
    - Método: `POST`
    - Descripción: Autentica un usuario y devuelve un token.
    - Cuerpo de la Solicitud:
      ```json
      {
        "email": "usuario@ejemplo.com",
        "password": "tu_contraseña"
      }
      ```
    - Cuerpo de la Respuesta:
      ```json
      {
        "token": "jwt_token"
      }
      ```
2. **Crear Usuario**
    - URL: `/users`
    - Método: `POST`
    - Descripción: Crea un nuevo usuario.
    - Cuerpo de la Solicitud:
      ```json
      {
        "email": "usuario@ejemplo.com",
        "password": "tu_contraseña"
      }
      ```
    - Cuerpo de la Respuesta:
      ```json
      {
        "id": "1",
        "nombre": "John Doe",
        "email": "usuario@ejemplo.com",
        "estado": "active",
        "fechaCreacion": "2024-07-10T00:00:00.000Z",
        "fechaModificacion": "2024-07-10T00:00:00.000Z"
      }
      ```
3. **Modificar Usuario**
    - URL: `/users/:id`
    - Método: `PUT`
    - Descripción: Modifica la información de un usuario existente.
    - Cuerpo de la Solicitud:
      ```json
      {
        "nombre": "Jane Doe",
        "email": "nuevo_usuario@ejemplo.com",
        "estado": "inactive"
      }
      ```
    - Cuerpo de la Respuesta:
      ```json
      {
        "id": "1",
        "nombre": "Jane Doe",
        "email": "nuevo_usuario@ejemplo.com",
        "estado": "inactive",
        "fechaCreacion": "2024-07-10T00:00:00.000Z",
        "fechaModificacion": "2024-07-10T01:00:00.000Z"
      }
      ```
4. **Bloquear Usuario**
    - URL: `/users/:id/block`
    - Método: `PATCH`
    - Descripción: Bloquea un usuario existente.
    - Cuerpo de la Solicitud:
      ```json
      {
        "motivo": "violación de términos"
      }
      ```
    - Cuerpo de la Respuesta:
      ```json
      {
        "id": "1",
        "nombre": "John Doe",
        "email": "usuario@ejemplo.com",
        "estado": "blocked",
        "fechaCreacion": "2024-07-10T00:00:00.000Z",
        "fechaModificacion": "2024-07-10T01:00:00.000Z"
      }
      ```
5. **Recuperar Contraseña**
    - URL: `/users/recover-password`
    - Método: `POST`
    - Descripción: Envía un correo electrónico para recuperar la contraseña del usuario.
    - Cuerpo de la Solicitud:
      ```json
      {
        "email": "usuario@ejemplo.com"
      }
      ```
    - Cuerpo de la Respuesta:
      ```json
      {
        "message": "Password recovery email sent"
      }
      ```

## Comandos Disponibles

### `npm run start`

Inicia el servidor en modo producción.

```sh
npm run start
```

### `npm run start:dev`

Inicia el servidor en modo desarrollo con recarga en caliente.

```sh
npm run start:dev
```

### `npm run start:debug`

Inicia el servidor en modo depuración.

```sh
npm run start:debug
```

### `npm run start:prod`

Inicia el servidor utilizando el código compilado en dist.

```sh
npm run start:prod
```

### `npm run build`

Compila el proyecto TypeScript a JavaScript.

```sh
npm run build
```

### `npm run test`

Ejecuta las pruebas unitarias usando Jest.

```sh
npm run test
```

### `npm run test:watch`

Ejecuta las pruebas unitarias en modo observación para que se vuelvan a ejecutar automáticamente cuando se detecten cambios.

```sh
npm run test:watch
```

### `npm run test:cov`

Ejecuta las pruebas unitarias y genera un reporte de cobertura de código.

```sh
npm run test:cov
```

### `npm run test:debug`

Ejecuta las pruebas unitarias en modo depuración.

```sh
npm run test:debug
```

### `npm run test:e2e`

Ejecuta las pruebas de extremo a extremo (e2e).

```sh
npm run test:e2e
```

### `npm run lint`

Ejecuta ESLint para analizar y encontrar problemas en el código.

```sh
npm run lint
```

### `npm run format`

Formatea el código utilizando Prettier.

```sh
npm run format
```

## Estructura del Proyecto

El proyecto sigue una estructura estándar de NestJS, con los siguientes directorios y archivos principales:

```plaintext
project-root/
│
├── dist/ # Directorio de salida para archivos compilados
├── node_modules/ # Dependencias instaladas por npm
├── src/ # Código fuente del proyecto
│ ├── app.controller.ts # Controlador principal
│ ├── app.module.ts # Módulo raíz de la aplicación
│ ├── app.service.ts # Servicio principal
│ ├── main.ts # Punto de entrada de la aplicación
│ ├── ...
│ ├── users/ # Módulo de usuarios
│ │ ├── dto/ # Objetos de transferencia de datos (DTOs)
│ │ ├── entities/ # Entidades de la base de datos
│ │ ├── services/ # Servicios relacionados con los usuarios
│ │ ├── controllers/ # Controladores de gestión de usuarios
│ │ ├── users.module.ts # Módulo de gestión de usuarios
│ │ └── ...
│ └── ...
├── test/ # Configuraciones y archivos de pruebas
│ ├── jest-e2e.json # Configuración de pruebas end-to-end con Jest
│ └── ...
├── .gitignore # Archivos y directorios ignorados por Git
├── package.json # Archivo de configuración de npm
├── tsconfig.json # Configuración del compilador TypeScript
└── README.md # Documentación del proyecto
```

### Explicación de la Estructura

- **`dist/`**: Directorio donde se generan los archivos compilados cuando ejecutas `npm run build`.
- **`src/`**: Directorio que contiene todo el código

 fuente de la aplicación. Aquí es donde se desarrollan los módulos, controladores, servicios y entidades.
- **`node_modules/`**: Directorio generado automáticamente por npm, que contiene todas las dependencias instaladas.
- **`test/`**: Directorio donde se colocan las configuraciones y archivos relacionados con las pruebas.
- **`package.json`**: Archivo de configuración de npm, donde se definen las dependencias, scripts, y otra configuración del proyecto.
- **`tsconfig.json`**: Archivo de configuración de TypeScript, donde se especifican las opciones del compilador.
- **`.gitignore`**: Archivo que define qué archivos y directorios deben ser ignorados por Git.
- **`README.md`**: Archivo de documentación del proyecto, que estás leyendo actualmente.

## Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno en un archivo `.env` en la raíz de tu proyecto o como variables de entorno del sistema.

```plaintext
# Configuración del servidor
PORT=3000

# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=usuario_db
DB_PASSWORD=password_db
DB_DATABASE=nombre_db

# JWT
JWT_SECRET=secreto_jwt
JWT_EXPIRATION_TIME=3600 # Tiempo de expiración en segundos (ejemplo: 1 hora)

# Nodemailer (SMTP)
MAIL_HOST=email-smtp.us-east-2.amazonaws.com
MAIL_PORT=587
MAIL_USER=AKIAU6GDYDSVWASILWUP
MAIL_PASS=BLnQaI2sI0Ku6zvCoOM+r2AaG2GUOy3vjNpcD6pcZ9ew
MAIL_FROM=your_email@example.com
```

## Pruebas

El proyecto utiliza Jest para pruebas unitarias y de integración. Puedes ejecutar las pruebas con los siguientes comandos:

```sh
npm run test
```

Para ejecutar las pruebas en modo observación (watch):

```sh
npm run test:watch
```

Para generar un reporte de cobertura de código:

```sh
npm run test:cov
```

Para ejecutar pruebas end-to-end (e2e):

```sh
npm run test:e2e
```

## Despliegue

Para desplegar el proyecto en producción, asegúrate de compilar el código TypeScript a JavaScript:

```sh
npm run build
```

Luego, puedes iniciar el servidor usando el comando:

```sh
npm run start:prod
```

El proyecto también está configurado para ser desplegado utilizando Docker y Kubernetes en AWS. Para más detalles sobre el despliegue, consulta la documentación adicional proporcionada en el repositorio.

## Contribución

¡Contribuciones son bienvenidas! Por favor, sigue estos pasos para contribuir:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commits (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

Asegúrate de que tu código sigue las normas de estilo del proyecto y pasa todas las pruebas.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.