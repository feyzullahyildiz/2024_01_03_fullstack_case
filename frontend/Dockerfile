FROM node:20-alpine as build

WORKDIR /app

ADD package.json .
ADD package-lock.json .

RUN npm install
ADD . .
ARG VITE_API_BASE_URL=/api
RUN npm run build



FROM nginx:1.21-alpine


# Override nginx.conf file
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html


EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]