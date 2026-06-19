# Build
FROM node:20-alpine AS build

WORKDIR /my-frontend

COPY my-frontend/package*.json ./

RUN npm install

COPY my-frontend/ .

RUN npm run build

# Serve
FROM nginx:alpine

COPY --from=build /my-frontend/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
