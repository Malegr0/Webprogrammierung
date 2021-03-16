FROM node:lts-alpine

RUN apk add --no-cache git

RUN git clone https://github.com/Malegr0/Webprogrammierung public 

WORKDIR /public

RUN npm install

EXPOSE 8080
CMD [ "node", "app.js" ]