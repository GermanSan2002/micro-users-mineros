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
- [Uso de Swagger](#uso-de-swagger)
- [Despliegue](#despliegue)
- [Contribución](#contribución)
- [Licencia](#licencia)
- [Publicación en npm](#publicación-en-npm)
- [Instalación desde npm](#instalación-desde-npm)
- [Uso del Paquete npm](#uso-del-paquete-npm)
- [Despliegue con Kubernetes](#despliegue-con-kubernates)

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

## Uso de Swagger

Swagger es una herramienta que permite la documentación y prueba de APIs de forma interactiva. En esta aplicación NestJS, Swagger está configurado para proporcionar una interfaz gráfica que facilita la visualización y prueba de los endpoints de la API.

### Cómo Acceder a la Documentación de Swagger

1. **Inicia la Aplicación**: Asegúrate de que tu aplicación NestJS esté en ejecución. Puedes iniciar la aplicación con el siguiente comando:

    ```bash
    npm run start
    ```

2. **Accede a Swagger**: Una vez que la aplicación esté en ejecución, puedes acceder a la documentación de Swagger en la siguiente URL en tu navegador:

    ```
    http://localhost:3000/api
    ```

   - **`http://localhost:3000`**: Es la URL base de tu aplicación NestJS.
   - **`/swagger`**: Es la ruta donde Swagger UI está disponible (esta ruta puede ser diferente si has configurado Swagger en una ruta diferente).

### Configuración de Swagger

Swagger está configurado en el archivo `main.ts` de tu aplicación NestJS. Aquí está la configuración básica:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Microservicio de Gestión de Usuarios')
    .setDescription('Documentación de la API para el microservicio de gestión de usuarios')
    .setVersion('1.0')
    .addTag('users')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

### Explicación de la Configuración

- **`DocumentBuilder`**: Permite construir la configuración de la documentación de Swagger.
  - `setTitle()`: Establece el título de la documentación.
  - `setDescription()`: Proporciona una descripción de la API.
  - `setVersion()`: Define la versión de la API.
  - `addTag()`: Añade etiquetas a la documentación para organizar los endpoints.

- **`SwaggerModule.createDocument()`**: Crea el documento Swagger basado en la configuración proporcionada.

- **`SwaggerModule.setup()`**: Configura el endpoint para servir la documentación Swagger. En este caso, la documentación está disponible en la ruta `/api`.

### Uso de Swagger UI

Una vez que accedas a la interfaz de Swagger UI, podrás:

- **Ver la Lista de Endpoints**: Explora todos los endpoints disponibles en tu API.
- **Probar Endpoints**: Ejecuta llamadas a tus endpoints directamente desde la interfaz de Swagger.
- **Ver Detalles de cada Endpoint**: Consulta los parámetros, respuestas y detalles de cada endpoint de la API.

### Personalización Adicional

Puedes personalizar aún más la documentación de Swagger añadiendo decoradores adicionales en tus controladores y DTOs. Por ejemplo:

- **@ApiTags**: Añade etiquetas a los controladores.
- **@ApiOperation**: Describe la operación de un endpoint.
- **@ApiResponse**: Especifica las posibles respuestas de un endpoint.

Para más detalles sobre cómo personalizar Swagger en NestJS, consulta la [documentación oficial](https://docs.nestjs.com/openapi/introduction).

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

## Publicación en npm

Para publicar una nueva versión del paquete en npm:

1. Asegúrate de haber iniciado sesión en npm:
    ```sh
    npm login
    ```

2. Incrementa la versión en `package.json` siguiendo el versionado semántico (semver):
    ```sh
    npm version patch # o "minor" o "major"
    ```

3. Publica el paquete:
    ```sh
    npm publish
    ```

4. Crea un nuevo tag y push a GitHub:
    ```sh
    git tag vX.X.X
    git push origin vX.X.X
    ```

## Instalación desde npm

Puedes instalar este paquete desde npm usando npm o yarn:

```sh
npm install microservicio-usuarios
```

o

```sh
yarn add microservicio-usuarios
```

## Uso del Paquete npm

Una vez instalado desde npm, puedes importar y utilizar el paquete en tu proyecto de la siguiente manera:

```javascript
const { UserService } = require('microservicio-gestion-usuarios');

// Ejemplo de uso del servicio de usuarios
const userService = new UserService();

// Llamada a métodos del servicio
userService.createUser({ email: 'usuario@ejemplo.com', password: 'contraseña' })
  .then(user => console.log('Usuario creado:', user))
  .catch(error => console.error('Error al crear usuario:', error));
```

## Despliegue con Kubernetes

Esta sección describe los pasos necesarios para desplegar la aplicación en un clúster de Kubernetes.

### 1. Crear el archivo Dockerfile

Asegúrate de tener el siguiente `Dockerfile` en la raíz de tu proyecto:

```dockerfile
# Usar la imagen oficial de Node.js 18 como base
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Compilar la aplicación
RUN npm run build

# Exponer el puerto de la aplicación
EXPOSE 3000

# Definir el comando de inicio
CMD ["npm", "run", "start:prod"]
```

### 2. Crear el archivo .dockerignore

Crea un archivo `.dockerignore` en la raíz de tu proyecto con el siguiente contenido:

```plaintext
# Ignorar archivos de configuración de control de versiones
.git
.gitignore

# Ignorar directorio de dependencias
node_modules

# Ignorar directorios de salida de compilación
dist

# Ignorar archivos de configuración del entorno local
.env
.env.local
.env.test
.env.production

# Ignorar logs
npm-debug.log
yarn-debug.log
yarn-error.log

# Ignorar archivos de configuración de herramientas de desarrollo
.vscode
.idea

# Ignorar archivos temporales y del sistema operativo
.DS_Store
Thumbs.db

# Ignorar carpetas de pruebas
test

# Ignorar carpetas de documentación
docs
```

### 3. Crear la imagen Docker

Ejecuta el siguiente comando para crear la imagen Docker de la aplicación:

```bash
docker build -t nombre-imagen:latest .
```

### 4. Probar la imagen Docker localmente

Para probar la imagen Docker localmente, ejecuta el siguiente comando:

```bash
docker run --env-file .env -p 3000:3000 nombre-imagen:latest
```

Accede a `http://localhost:3000` para asegurarte de que la aplicación esté funcionando correctamente.

### 5. Crear los archivos YAML para Kubernetes

Crea los siguientes archivos YAML en el directorio de despliegue (`k8s/`):

**deployment.yaml**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nombre-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nombre-app
  template:
    metadata:
      labels:
        app: nombre-app
    spec:
      containers:
        - name: nombre-app
          image: nombre-imagen:latest
          ports:
            - containerPort: 3000
          env:
            - name: PORT
              value: "3000"
            - name: DB_HOST
              valueFrom:
                secretKeyRef:
                  name: nombre-secreto
                  key: DB_HOST
            - name: DB_PORT
              valueFrom:
                secretKeyRef:
                  name: nombre-secreto
                  key: DB_PORT
            - name: DB_USERNAME
              valueFrom:
                secretKeyRef:
                  name: nombre-secreto
                  key: DB_USERNAME
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: nombre-secreto
                  key: DB_PASSWORD
            - name: DB_DATABASE
              valueFrom:
                secretKeyRef:
                  name: nombre-secreto
                  key: DB_DATABASE
            - name: JWT_SECRET
              valueFrom:
                secretKeyRef:
                  name: nombre-secreto
                  key: JWT_SECRET
            - name: JWT_EXPIRATION_TIME
              valueFrom:
                secretKeyRef:
                  name: nombre-secreto
                  key: JWT_EXPIRATION_TIME
            - name: MAIL_HOST
              valueFrom:
                secretKeyRef:
                  name: nombre-secreto
                  key: MAIL_HOST
            - name: MAIL_PORT
              valueFrom:
                secretKeyRef:
                  name: nombre-secreto
                  key: MAIL_PORT
            - name: MAIL_USER
              valueFrom:
                secretKeyRef:
                  name: nombre-secreto
                  key: MAIL_USER
            - name: MAIL_PASS
              valueFrom:
                secretKeyRef:
                  name: nombre-secreto
                  key: MAIL_PASS
            - name: MAIL_FROM
              valueFrom:
                secretKeyRef:
                  name: nombre-secreto
                  key: MAIL_FROM
```

**service.yaml**

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nombre-service
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 3000
  selector:
    app: nombre-app
```

**secret.yaml**

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: nombre-secreto
type: Opaque
data:
  DB_HOST: base64-de-db-host
  DB_PORT: base64-de-db-port
  DB_USERNAME: base64-de-db-username
  DB_PASSWORD: base64-de-db-password
  DB_DATABASE: base64-de-db-database
  JWT_SECRET: base64-de-jwt-secret
  JWT_EXPIRATION_TIME: base64-de-jwt-expiration-time
  MAIL_HOST: base64-de-mail-host
  MAIL_PORT: base64-de-mail-port
  MAIL_USER: base64-de-mail-user
  MAIL_PASS: base64-de-mail-pass
  MAIL_FROM: base64-de-mail-from
```

Para codificar las variables de entorno a base64, puedes usar el siguiente comando en tu terminal:

```bash
echo -n 'valor' | base64
```

#### Nota sobre `nombre-secreto`

El nombre `nombre-secreto` en los archivos YAML se refiere al secreto que contiene las variables de entorno necesarias para la aplicación. Asegúrate de reemplazar `nombre-secreto` con un nombre significativo para tu aplicación.

### 6. Desplegar en Kubernetes

Ejecuta los siguientes comandos para aplicar los archivos de configuración en el clúster de Kubernetes:

```bash
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### 7. Verificar el despliegue

Para verificar que los pods y servicios se están ejecutando correctamente, usa los siguientes comandos:

```bash
kubectl get pods
kubectl get services
```

### 8. Despliegue con Docker Compose (opcional)

Si prefieres usar Docker Compose para incluir una base de datos en tu entorno de desarrollo, crea el siguiente archivo `docker-compose.yml`:

**docker-compose.yml**

```yaml
version: '3'
services:
  app:
    image: nombre-imagen:latest
    env_file:
      - .env
    ports:
      - "3000:3000"
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      POSTGRES_USER: usuario_db
      POSTGRES_PASSWORD: password_db
      POSTGRES_DB: nombre_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Para iniciar los servicios, ejecuta:

```bash
docker-compose up
```

Con estos pasos, podrás probar tu imagen Docker localmente, realizar el despliegue en Kubernetes, y utilizar Docker Compose para incluir una base de datos en tu entorno de desarrollo.