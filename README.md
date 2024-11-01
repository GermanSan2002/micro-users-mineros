### Descripción

El **Microservicio de Gestión de Usuarios** es una solución basada en NestJS diseñada para manejar de manera eficiente la administración de usuarios en aplicaciones web. Este microservicio abarca funcionalidades clave como el registro de usuarios, autenticación mediante JWT, recuperación de contraseñas, y la validación de tokens, asegurando que solo usuarios autorizados puedan acceder a los recursos de la aplicación. 

El servicio está optimizado para despliegue en entornos cloud, utilizando contenedores Docker y Kubernetes, y se integra fácilmente en pipelines de CI/CD para un flujo de trabajo ágil y automatizado. 

Este proyecto no solo busca cumplir con los requisitos de seguridad y eficiencia, sino también implementar las mejores prácticas en desarrollo y operaciones (DevOps) para asegurar su escalabilidad y mantenibilidad en entornos de producción.

### Tabla de Contenidos

1. [Descripción](#descripción)
2. [Tabla de Contenidos](#tabla-de-contenidos)
3. [Explicación del Proyecto](#explicación-del-proyecto)
   - [Motivación](#motivación)
   - [Uso de npm y DevOps](#uso-de-npm-y-devops)
   - [GitHub Actions](#github-actions)
4. [Instalación y Requerimientos](#instalación-y-requerimientos)
   - [Variables de Entorno](#variables-de-entorno)
   - [Instalación](#instalación)
5. [Uso](#uso)
   - [Instalación desde npm](#instalación-desde-npm)
   - [Ejemplo de Uso](#ejemplo-de-uso)
   - [Comandos Disponibles](#comandos-disponibles)
   - [Endpoints Disponibles](#endpoints-disponibles)
6. [Despliegue](#despliegue)
   - [Despliegue en Producción](#despliegue-en-producción)
   - [Despliegue con Kubernetes en Google Cloud](#despliegue-con-kubernetes-en-google-cloud)
   - [Despliegue en Render](#despliegue-en-render)
   - [Despliegue con Kubernetes en AWS](#despliegue-con-kubernetes-en-aws)
   - [Enlaces de Despliegue](#enlaces-de-despliegue)
7. [Documentación](#documentación)
8. [Contribución](#contribución)
9. [Licencia](#licencia)
### Explicación del Proyecto

#### Motivación
El microservicio de gestión de usuarios se desarrolló para proporcionar un sistema confiable y seguro que pueda integrarse fácilmente en aplicaciones web modernas. La administración de usuarios es fundamental para la seguridad y la experiencia del usuario, y este proyecto busca implementar estas funcionalidades utilizando tecnologías avanzadas como NestJS, Docker, y Kubernetes.

#### Uso de npm y DevOps
Este microservicio está disponible como un paquete npm, lo que facilita su integración y despliegue en diferentes entornos. Además, se han implementado prácticas de DevOps, como pipelines de CI/CD con GitHub Actions, para asegurar un flujo de trabajo automatizado, eficiente y libre de errores.

#### GitHub Actions
Se utiliza GitHub Actions para automatizar el proceso de pruebas, construcción y despliegue del microservicio. Esto garantiza que cada cambio en el código pase por un proceso riguroso de validación antes de ser desplegado en producción, asegurando la calidad y estabilidad del servicio.

### Instalación y Requerimientos

#### Requerimientos
Para ejecutar este microservicio, se necesitan los siguientes componentes:

- **Node.js** v14 o superior
- **npm** v6 o superior
- **Docker** para la contenedorización
- **Kubernetes** (compatible con GKE o AWS)

#### Variables de Entorno
Asegúrate de configurar las siguientes variables de entorno para el correcto funcionamiento del microservicio:

- `JWT_SECRET`: Secreto para la generación de tokens JWT.
- `HASH_SALT_ROUNDS`: Número de rondas para hashing de contraseñas.
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`: Configuraciones para la base de datos.
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`, `MAIL_FROM`: Configuraciones para el servicio de correo.
- `FRONTEND_URL`: URL del frontend asociado.

### Instalación y Requerimientos

#### Requerimientos
Para ejecutar este microservicio, asegúrate de contar con los siguientes componentes:

- **Node.js** v14 o superior
- **npm** v6 o superior
- **Docker** para contenedores
- **Kubernetes** (compatible con GKE o AWS)

#### Variables de Entorno
Configura las siguientes variables de entorno:

- `JWT_SECRET`: Secreto para JWT.
- `HASH_SALT_ROUNDS`: Rondas de hashing.
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_DATABASE`: Configuración de base de datos.
- `MAIL_HOST`, `MAIL_PORT`, `MAIL_USER`, `MAIL_PASS`, `MAIL_FROM`: Configuración de correo.
- `FRONTEND_URL`: URL del frontend.

#### Instalación
1. Clonar el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/microservicio-usuarios.git
    cd microservicio-usuarios
    ```

2. Instalar las dependencias:
    ```bash
    npm install
    ```

3. Configurar las variables de entorno (ver sección Variables de Entorno).

Esta sección te guía a través de los pasos necesarios para clonar el repositorio, instalar las dependencias, y configurar el entorno antes de usar el microservicio.

### Uso

#### Instalación desde npm
Instala el microservicio directamente desde npm:

```bash
npm install micro-users-service
```

#### Ejemplo de Uso
Ejemplo básico de uso:

```javascript
const UserService = require('micro-users-service');

const userService = new UserService();
userService.registerUser({ name: 'John Doe', email: 'john.doe@example.com' });
```

#### Comandos Disponibles
- `npm run start`: Inicia el servidor en modo producción.
- `npm run start:dev`: Inicia el servidor en modo desarrollo con recarga en caliente.
- `npm run start:debug`: Inicia el servidor en modo depuración.
- `npm run start:prod`: Inicia el servidor utilizando el código compilado en `dist`.
- `npm run build`: Compila el proyecto TypeScript a JavaScript.
- `npm run test`: Ejecuta pruebas unitarias con Jest.
- `npm run test:watch`: Ejecuta pruebas unitarias en modo observación.
- `npm run test:cov`: Ejecuta pruebas unitarias y genera un reporte de cobertura de código.
- `npm run test:debug`: Ejecuta pruebas unitarias en modo depuración.
- `npm run test:e2e`: Ejecuta pruebas de extremo a extremo (e2e).
- `npm run lint`: Ejecuta ESLint para encontrar problemas en el código.
- `npm run format`: Formatea el código utilizando Prettier.

#### Endpoints Disponibles
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

### Despliegue

#### Despliegue en Producción

1. **Compila el código TypeScript a JavaScript**:
   ```sh
   npm run build
   ```
2. **Inicia el servidor en modo producción**:
   ```sh
   npm run start:prod
   ```

#### Despliegue con Kubernetes en Google Cloud

1. **Inicia sesión en gcloud**:
   ```sh
   gcloud auth login
   ```
2. **Crea un clúster de Kubernetes**:
   ```sh
   gcloud container clusters create my-cluster --zone us-central1-a --num-nodes=3
   ```
3. **Construye las imágenes Docker**:
   ```sh
   docker-compose build
   ```
4. **Etiqueta y sube las imágenes a Google Container Registry (GCR)**:
   ```sh
   docker tag micro-users-app gcr.io/your-gcp-project-id/micro-users-app:v1
   docker push gcr.io/your-gcp-project-id/micro-users-app:v1
   ```

5. **Autentica Docker con GCR**:
   ```sh
   gcloud auth configure-docker
   ```

6. **Configura los archivos YAML de Kubernetes**:
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

7. **Aplica las configuraciones en Kubernetes**:
   ```sh
   kubectl apply -f k8s/secrets.yaml
   kubectl apply -f k8s/mysql.yaml
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

#### Despliegue en Render

El proyecto también puede desplegarse en Render, conectando tu repositorio y configurando las variables de entorno directamente en la plataforma.

#### Despliegue con Kubernetes en AWS

1. **Configura AWS CLI**:
   ```sh
   aws configure
   ```

2. **Crea un clúster EKS**:
   ```sh
   eksctl create cluster --name my-cluster --region us-west-2 --nodegroup-name standard-workers --node-type t3.medium --nodes 3
   ```

3. **Sube las imágenes Docker a Amazon ECR**:
   ```sh
   docker tag micro-users-app:latest <aws_account_id>.dkr.ecr.<region>.amazonaws.com/micro-users-app:latest
   docker push <aws_account_id>.dkr.ecr.<region>.amazonaws.com/micro-users-app:latest
   ```

4. **Configura los archivos YAML de Kubernetes para AWS**:

   Usa configuraciones similares a las usadas para GKE, pero asegúrate de actualizar los nombres de las imágenes para apuntar a tu Amazon ECR.

5. **Aplica las configuraciones en Kubernetes**:
   ```sh
   kubectl apply -f k8s/secrets.yaml
   kubectl apply -f k8s/mysql.yaml
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

#### Enlaces de Despliegue

La aplicación está desplegada en los siguientes enlaces:

- **Google Kubernetes Engine (GKE)**: [http://34.46.95.132](http://34.46.95.132) (Este enlace estará disponible mientras dure la prueba gratuita de Google Cloud)
- **Render**: [https://micro-users-wj9l.onrender.com](https://micro-users-wj9l.onrender.com)

### Documentación

#### GitHub Actions
El proyecto está configurado con GitHub Actions para implementar CI/CD, automatizando el proceso de pruebas, compilación, y despliegue. Los flujos de trabajo se encuentran en el directorio `.github/workflows/` y están diseñados para:

- Ejecutar pruebas unitarias con cada push al repositorio.
- Construir y publicar imágenes Docker en un registro (como GCR o ECR).
- Desplegar automáticamente el microservicio en un clúster de Kubernetes.

#### Swagger
Para facilitar la exploración y prueba de la API, se ha integrado Swagger en el proyecto. Swagger genera automáticamente la documentación interactiva de la API, permitiendo a los desarrolladores probar los endpoints directamente desde el navegador. Puedes acceder a la documentación de Swagger en `/api/docs` una vez que el servidor esté en ejecución.

### Contribución

¡Contribuciones son bienvenidas! Por favor, sigue estos pasos para contribuir:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commits (`git commit -am 'Añadir nueva funcionalidad'`).
4. Sube tus cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

Asegúrate de que tu código sigue las normas de estilo del proyecto y pasa todas las pruebas.

### Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.