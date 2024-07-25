# Microservicio de Gestión de Usuarios

## Descripción
Este microservicio gestiona la creación, modificación, eliminación, y bloqueo de usuarios, así como la recuperación de contraseñas. Está construido con Node.js, NestJS, y utiliza TypeORM para interactuar con la base de datos.

## Enlaces de Despliegue

La aplicación está desplegada en los siguientes enlaces:

- **Google Kubernetes Engine (GKE)**: [http://34.46.95.132](http://34.46.95.132) (Este enlace estará disponible mientras dure la prueba gratuita de Google Cloud)
- **Render**: [https://micro-users-wj9l.onrender.com](https://micro-users-wj9l.onrender.com)


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
- [Despliegue con Kubernetes en Google Cloud](#despliegue-con-kubernetes-en-google-cloud)
- [Despliegue en Render](#despliegue-en-render)
- [Despliegue con Kubernetes en AWS](#despliegue-con-kubernetes-en-aws)
- [Contribución](#contribución)
- [Licencia](#licencia)
- [Publicación en npm](#publicación-en-npm)
- [Instalación desde npm](#instalación-desde-npm)
- [Uso del Paquete npm](#uso-del-paquete-npm)

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
├── dist/                # Directorio de salida para archivos compilados
├── k8s/                 # Directorio para archivos de Kubernetes
│   ├── deployment.yaml  # Despliegue de la aplicación
│   ├── mysql.yaml       # Configuración de MySQL
│   ├── secrets.yaml     # Secretos del entorno
│   └── service.yaml     # Servicio de Kubernetes
├── node_modules/        # Dependencias instaladas por npm
├── src/                 # Código fuente del proyecto
│   ├── app.controller.ts # Controlador principal
│   ├── app.module.ts    # Módulo raíz de la aplicación
│   ├── app.service.ts   # Servicio principal
│   ├── main.ts          # Punto de entrada de la aplicación
│   ├── modules/         # Módulos del proyecto
│   │   ├── users/       # Módulo de gestión de usuarios
│   │   │   ├── dto/     # Objetos de transferencia de datos (DTOs)
│   │   │   ├── entities/# Entidades de la base de datos
│   │   │   ├── users.controller.ts # Controlador relacionado con los usuarios
│   │   │   ├── users.module.ts     # Módulo de gestión de usuarios
│   │   │   └── users.service.ts    # Servicios relacionados con los usuarios
│   │   ├── auth/        # Módulo de autenticación
│   │   │   ├── auth.module.ts      # Módulo de autenticación
│   │   │   └── auth.service.ts     # Servicios relacionados con la autenticación
│   │   ├── mail/        # Módulo de gestión de correo electrónico
│   │       ├── mail.module.ts      # Módulo de correo electrónico
│   │       └── mail.service.ts     # Servicios relacionados con el correo electrónico
├── test/                # Configuraciones y archivos de pruebas
│   ├── jest-e2e.json    # Configuración de pruebas end-to-end con Jest
│   └── ...              # Otros archivos de prueba
├── .gitignore           # Archivos y directorios ignorados por Git
├── package.json         # Archivo de configuración de npm
├── tsconfig.json        # Configuración del compilador TypeScript
└── README.md            # Documentación del proyecto
```

### Explicación de la Estructura

- **dist/**: Directorio donde se almacenan los archivos compilados después de construir el proyecto.
- **k8s/**: Contiene los archivos de configuración necesarios para el despliegue en Kubernetes.
  - **deployment.yaml**: Configuración del despliegue de la aplicación.
  - **mysql.yaml**: Configuración de la base de datos MySQL.
  - **secrets.yaml**: Archivos que contienen secretos y variables sensibles del entorno.
  - **service.yaml**: Configuración del servicio en Kubernetes.
- **node_modules/**: Directorio donde se almacenan las dependencias instaladas por npm.
- **src/**: Contiene el código fuente del proyecto.
  - **app.controller.ts**: Controlador principal que maneja las rutas y solicitudes de la aplicación.
  - **app.module.ts**: Módulo raíz de la aplicación.
  - **app.service.ts**: Servicio principal que contiene la lógica de negocio de la aplicación.
  - **main.ts**: Punto de entrada de la aplicación donde se configura y arranca la aplicación.
  - **modules/**: Directorio que contiene los diferentes módulos del proyecto.
    - **users/**: Módulo de gestión de usuarios.
      - **dto/**: Directorio para Objetos de Transferencia de Datos (DTOs).
      - **entities/**: Directorio para las entidades de la base de datos.
      - **users.controller.ts**: Controlador que maneja las rutas y solicitudes relacionadas con los usuarios.
      - **users.module.ts**: Módulo que agrupa todos los componentes relacionados con la gestión de usuarios.
      - **users.service.ts**: Servicios que contienen la lógica de negocio relacionada con los usuarios.
    - **auth/**: Módulo de autenticación.
      - **auth.module.ts**: Módulo que agrupa todos los componentes relacionados con la autenticación.
      - **auth.service.ts**: Servicios que contienen la lógica de negocio relacionada con la autenticación.
    - **mail/**: Módulo de gestión de correo electrónico.
      - **mail.module.ts**: Módulo que agrupa todos los componentes relacionados con el correo electrónico.
      - **mail.service.ts**: Servicios que contienen la lógica de negocio relacionada con el correo electrónico.
- **test/**: Contiene los archivos de configuración y pruebas.
  - **jest-e2e.json**: Configuración de pruebas end-to-end con Jest.
- **.gitignore**: Archivos y directorios que Git debe ignorar.
- **package.json**: Archivo de configuración de npm que incluye información sobre el proyecto y sus dependencias.
- **tsconfig.json**: Archivo de configuración del compilador TypeScript.
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

## Despliegue con Kubernetes en Google Cloud

### Pasos para Desplegar la Aplicación en Kubernetes usando Google Cloud

1. **Iniciar sesión en gcloud**

   Asegúrate de tener el SDK de Google Cloud instalado y luego inicia sesión en tu cuenta de Google Cloud:

   ```sh
   gcloud auth login
   ```

2. **Crear el Cluster si no Existe**

   Crea un clúster de Kubernetes usando `gcloud` si aún no tienes uno. A continuación se muestra un ejemplo de cómo crear un clúster:

   ```sh
   gcloud container clusters create my-cluster --zone us-central1-a --num-nodes=3
   ```

3. **Construir las Imágenes Docker con Docker Compose**

   Usa Docker Compose para construir las imágenes Docker:

   ```sh
   docker-compose build
   ```

4. **Subir las Imágenes Generadas a Docker Hub o a GCR**

   Etiqueta las imágenes construidas y súbelas a Docker Hub o Google Container Registry (GCR). En este caso, usaremos GCR:

   ```sh
   docker tag micro-users-app gcr.io/your-gcp-project-id/micro-users-app:v1
   docker tag mysql gcr.io/your-gcp-project-id/mysql:v1
   ```

5. **Autenticar Docker con GCR**

   Autentica Docker con GCR para poder subir las imágenes:

   ```sh
   gcloud auth configure-docker
   ```

6. **Subir las Imágenes a GCR**

   Sube las imágenes etiquetadas a GCR:

   ```sh
   docker push gcr.io/your-gcp-project-id/micro-users-app:v1
   docker push gcr.io/your-gcp-project-id/mysql:v1
   ```

7. **Verificar que las Imágenes se han Subido**

   Verifica que las imágenes se hayan subido correctamente a GCR:

   ```sh
   gcloud container images list --repository=gcr.io/your-gcp-project-id
   ```

8. **Actualizar y Aplicar la Configuración en Kubernetes**

   Asegúrate de que tus archivos YAML de configuración estén actualizados con el nombre correcto de las imágenes si has usado Docker Hub. Aquí tienes los archivos YAML usados:

   - `k8s/secrets.yaml`

     ```yaml
     apiVersion: v1
     kind: Secret
     metadata:
       name: app-secrets
     type: Opaque
     data:
       jwt_secret: eW91cl9qd3Rfc2VjcmV0
       db_password: MTIzNDU2Nzg5
       mail_user: c29neWdvayBkaW9zQGdtYWlsLmNvbQ==
       mail_pass: bWJ4Z2ZneGJwdWp6enhk
     ```

   - `k8s/mysql.yaml`

     ```yaml
     apiVersion: v1
     kind: PersistentVolumeClaim
     metadata:
       name: mysql-pv-claim
     spec:
       accessModes:
         - ReadWriteOnce
       resources:
         requests:
           storage: 20Gi
     ---
     apiVersion: v1
     kind: Service
     metadata:
       name: mysql
     spec:
       ports:
         - port: 3306
       selector:
         app: mysql
     ---
     apiVersion: apps/v1
     kind: Deployment
     metadata:
       name: mysql
     spec:
       selector:
         matchLabels:
           app: mysql
       template:
         metadata:
           labels:
             app: mysql
         spec:
           containers:
           - name: mysql
             image: gcr.io/your-gcp-project-id/mysql:v1
             ports:
             - containerPort: 3306
             env:
             - name: MYSQL_ROOT_PASSWORD
               valueFrom:
                 secretKeyRef:
                   name: app-secrets
                   key: db_password
             - name: MYSQL_DATABASE
               value: "users_service"
     ```

   - `k8s/deployment.yaml`

     ```yaml
     apiVersion: apps/v1
     kind: Deployment
     metadata:
       name: micro-users
     spec:
       selector:
         matchLabels:
           app: micro-users
       template:
         metadata:
           labels:
             app: micro-users
         spec:
           containers:
           - name: micro-users
             image: gcr.io/your-gcp-project-id/micro-users-app:v1
             ports:
             - containerPort: 3000
             env:
             - name: JWT_SECRET
               valueFrom:
                 secretKeyRef:
                   name: app-secrets
                   key: jwt_secret
             - name: HASH_SALT_ROUNDS
               value: "10"
             - name: DB_HOST
               value: "mysql"
             - name: DB_PORT
               value: "3306"
             - name: DB_USERNAME
               value: "root"
             - name: DB_PASSWORD
               valueFrom:
                 secretKeyRef:
                   name: app-secrets
                   key: db_password
             - name: DB_DATABASE
               value: "users_service"
             - name: MAIL_HOST
               value: "smtp.gmail.com"
             - name: MAIL_PORT
               value: "587"
             - name: MAIL_USER
               valueFrom:
                 secretKeyRef:
                   name: app-secrets
                   key: mail_user
             - name: MAIL_PASS
               valueFrom:
                 secretKeyRef:
                   name: app-secrets
                   key: mail_pass
             - name: MAIL_FROM
               value: "soygokussjdios@gmail.com"
             - name: FRONTEND_URL
               value: "frontend.com"
     ```

   - `k8s/service.yaml`

     ```yaml
     apiVersion: v1
     kind: Service
     metadata:
       name: micro-users
     spec:
       type: LoadBalancer
       ports:
         - port: 80
           targetPort: 3000
       selector:
         app: micro-users
     ```

   Aplica las configuraciones en Kubernetes:

   ```sh
   kubectl apply -f k8s/secrets.yaml
   kubectl apply -f k8s/mysql.yaml
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

### Nota

- Reemplaza `your-gcp-project-id` con el ID de tu proyecto en Google Cloud.
- Asegúrate de codificar en base64 las variables de entorno sensibles en el archivo `secrets.yaml`.

---

Este es un ejemplo de cómo podrías estructurar la sección de despliegue en Kubernetes en tu archivo `README.md`. Ajusta los detalles específicos según tu proyecto y configuración.

## Despliegue en Render

También se ha realizado el despliegue en Render con una base de datos de Clever Cloud debido a que se usó la prueba gratuita de GCloud, la cual hará que el servicio deje de estar disponible cuando se acabe la prueba. En Render, el servicio y la base de datos seguirán siendo accesibles una vez que finalice la prueba de GCloud. La aplicación está ejecutándose en https://micro-users-wj9l.onrender.com.

## Despliegue con Kubernetes en AWS

### Pasos para Desplegar la Aplicación en Kubernetes usando Amazon EKS

1. **Configurar AWS CLI**

   Asegúrate de tener la AWS CLI instalada y configurada con tus credenciales de AWS:

   ```sh
   aws configure
   ```

2. **Crear un Clúster de EKS**

   Utiliza `eksctl` para crear un clúster de EKS. Si no tienes `eksctl` instalado, sigue las instrucciones [aquí](https://docs.aws.amazon.com/eks/latest/userguide/eksctl.html) para instalarlo.

   ```sh
   eksctl create cluster --name my-cluster --region us-west-2 --nodegroup-name standard-workers --node-type t3.medium --nodes 3
   ```

3. **Construir las Imágenes Docker con Docker Compose**

   Usa Docker Compose para construir las imágenes Docker:

   ```sh
   docker-compose build
   ```

4. **Subir las Imágenes Generadas a Amazon ECR**

   Etiqueta las imágenes construidas y súbelas a Amazon ECR. Primero, crea un repositorio en Amazon ECR:

   ```sh
   aws ecr create-repository --repository-name micro-users-app
   aws ecr create-repository --repository-name mysql
   ```

   Obtén el URI del repositorio y etiqueta las imágenes:

   ```sh
   docker tag micro-users-app:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/micro-users-app:latest
   docker tag mysql:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/mysql:latest
   ```

5. **Autenticar Docker con Amazon ECR**

   Autentica Docker con tu registro de Amazon ECR:

   ```sh
   aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <aws_account_id>.dkr.ecr.<region>.amazonaws.com
   ```

6. **Subir las Imágenes a Amazon ECR**

   Sube las imágenes etiquetadas a Amazon ECR:

   ```sh
   docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/micro-users-app:latest
   docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/mysql:latest
   ```

7. **Verificar que las Imágenes se han Subido**

   Verifica que las imágenes se hayan subido correctamente a Amazon ECR:

   ```sh
   aws ecr describe-images --repository-name micro-users-app
   aws ecr describe-images --repository-name mysql
   ```

8. **Actualizar y Aplicar la Configuración en Kubernetes**

   Asegúrate de que tus archivos YAML de configuración estén actualizados con el nombre correcto de las imágenes en Amazon ECR. Aquí tienes los archivos YAML usados:

   - `k8s/secrets.yaml`

     ```yaml
     apiVersion: v1
     kind: Secret
     metadata:
       name: app-secrets
     type: Opaque
     data:
       jwt_secret: eW91cl9qd3Rfc2VjcmV0
       db_password: MTIzNDU2Nzg5
       mail_user: c29neWdvayBkaW9zQGdtYWlsLmNvbQ==
       mail_pass: bWJ4Z2ZneGJwdWp6enhk
     ```

   - `k8s/mysql.yaml`

     ```yaml
     apiVersion: v1
     kind: PersistentVolumeClaim
     metadata:
       name: mysql-pv-claim
     spec:
       accessModes:
         - ReadWriteOnce
       resources:
         requests:
           storage: 20Gi
     ---
     apiVersion: v1
     kind: Service
     metadata:
       name: mysql
     spec:
       ports:
         - port: 3306
       selector:
         app: mysql
     ---
     apiVersion: apps/v1
     kind: Deployment
     metadata:
       name: mysql
     spec:
       selector:
         matchLabels:
           app: mysql
       template:
         metadata:
           labels:
             app: mysql
         spec:
           containers:
           - name: mysql
             image: <aws_account_id>.dkr.ecr.<region>.amazonaws.com/mysql:latest
             ports:
             - containerPort: 3306
             env:
             - name: MYSQL_ROOT_PASSWORD
               valueFrom:
                 secretKeyRef:
                   name: app-secrets
                   key: db_password
             - name: MYSQL_DATABASE
               value: "users_service"
     ```

   - `k8s/deployment.yaml`

     ```yaml
     apiVersion: apps/v1
     kind: Deployment
     metadata:
       name: micro-users
     spec:
       selector:
         matchLabels:
           app: micro-users
       template:
         metadata:
           labels:
             app: micro-users
         spec:
           containers:
           - name: micro-users
             image: <aws_account_id>.dkr.ecr.<region>.amazonaws.com/micro-users-app:latest
             ports:
             - containerPort: 3000
             env:
             - name: JWT_SECRET
               valueFrom:
                 secretKeyRef:
                   name: app-secrets
                   key: jwt_secret
             - name: HASH_SALT_ROUNDS
               value: "10"
             - name: DB_HOST
               value: "mysql"
             - name: DB_PORT
               value: "3306"
             - name: DB_USERNAME
               value: "root"
             - name: DB_PASSWORD
               valueFrom:
                 secretKeyRef:
                   name: app-secrets
                   key: db_password
             - name: DB_DATABASE
               value: "users_service"
             - name: MAIL_HOST
               value: "smtp.gmail.com"
             - name: MAIL_PORT
               value: "587"
             - name: MAIL_USER
               valueFrom:
                 secretKeyRef:
                   name: app-secrets
                   key: mail_user
             - name: MAIL_PASS
               valueFrom:
                 secretKeyRef:
                   name: app-secrets
                   key: mail_pass
             - name: MAIL_FROM
               value: "soygokussjdios@gmail.com"
             - name: FRONTEND_URL
               value: "frontend.com"
     ```

   - `k8s/service.yaml`

     ```yaml
     apiVersion: v1
     kind: Service
     metadata:
       name: micro-users
     spec:
       type: LoadBalancer
       ports:
         - port: 80
           targetPort: 3000
       selector:
         app: micro-users
     ```

   Aplica las configuraciones en Kubernetes:

   ```sh
   kubectl apply -f k8s/secrets.yaml
   kubectl apply -f k8s/mysql.yaml
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

### Nota

- Reemplaza `<aws_account_id>` y `<region>` con tu ID de cuenta de AWS y la región correspondiente.
- Asegúrate de codificar en base64 las variables de entorno sensibles en el archivo `secrets.yaml`.

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