# Usa una imagen base de Node para compilar la aplicación
FROM node:18 AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app    

# Copia los archivos del proyecto y compila
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Usa una imagen base de NGINX para servir la aplicación
FROM nginx:alpine

# Copia los archivos compilados en el directorio de NGINX
COPY --from=build /app/dist /usr/share/nginx/html

COPY /etc/letsencrypt /etc/letsencrypt

# Copia la configuración personalizada de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80 para el contenedor
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
