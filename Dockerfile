FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm run install-all

COPY . .

EXPOSE 80
CMD [ "node", "start" ]