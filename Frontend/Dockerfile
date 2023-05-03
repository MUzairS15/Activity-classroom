FROM nginx:latest
WORKDIR /app
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./build/ /app/build
CMD ["nginx", "-g", "daemon off;"]