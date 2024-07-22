# Usa la última versión de Node.js
FROM node:latest

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Compila el proyecto
RUN npm run build

# Expone el puerto en el que correrá la aplicación
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]