FROM nginx:1.12-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]