# Build des sources react.js
FROM node:13.13-alpine3.10  as ui-build
WORKDIR /ui
COPY package.json yarn.lock ./
RUN yarn
COPY . . 
RUN yarn build



# Construction de l'image de l'application

FROM nginx:1.17-alpine

## Copie des fichiers de l'image de build de l'UI
COPY --from=ui-build ui/build /app/ui

## Reverse proxy
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx
EXPOSE 80

# Lancement du serveur de l'API
ENTRYPOINT [ "gunicorn", "-w 1", "codenames:app, "&"]
# Lancement du reverse-proxy
CMD ["nginx", "-g", "daemon off;"]