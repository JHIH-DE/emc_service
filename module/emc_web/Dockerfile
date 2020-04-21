FROM nginx:1.13.10
COPY config/nginx/ /etc/nginx/
COPY build /usr/share/nginx/html

VOLUME /var/log/nginx/
CMD ["nginx","-g","daemon off;"]