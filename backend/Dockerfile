FROM node:12

WORKDIR /app/server

COPY ./packege*.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node","server.js"]