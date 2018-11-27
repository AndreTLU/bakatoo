FROM node

RUN mkdir /var/app
WORKDIR /var/app

COPY package.json /var/app/package.json
COPY package-lock.json /var/app/package-lock.json
RUN npm install
RUN npm install nodemon -g

VOLUME /var/app