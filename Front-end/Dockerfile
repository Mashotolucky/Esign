FROM node:14-alpine

RUN mkdir -p /app

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

#stage 2
#FROM nginx:alpine
#COPY  /app/dist/Front-end /usr/share/nginx/html

