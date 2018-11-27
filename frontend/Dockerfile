FROM node:latest

WORKDIR /tmp
COPY package.json /tmp/
RUN npm install

RUN mkdir -p /var/www/opik

WORKDIR /var/www/opik

COPY . /var/www/opik/
RUN cp -a /tmp/node_modules /var/www/opik/

VOLUME /var/www/opik
