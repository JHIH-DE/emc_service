FROM mysql:5.7.21
ENV LANG=C.UTF-8

ADD ./init/ /docker-entrypoint-initdb.d/

CMD ["mysqld", "--character-set-server=utf8", "--collation-server=utf8_general_ci"]
