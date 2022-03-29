FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod


EXPOSE 8081

CMD [ "node", "server.js" ]
