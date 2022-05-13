FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .


RUN npm run install-all

EXPOSE 80
CMD [ "node", "start" ]