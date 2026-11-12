FROM node:jod-alpine3.24
MAINTAINER name Chennakeshava reddy Busupalle
LABEL This is a flight booking application
EXPOSE 5000
WORKDIR node-js
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "app.js"]
