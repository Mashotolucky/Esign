FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . /app/

RUN npm run build --prod


EXPOSE 4313

CMD [ "npm", "start" ]
