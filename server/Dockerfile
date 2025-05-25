ARG NODE_VERSION=18.0.0

FROM node:${NODE_VERSION}-alpine


WORKDIR /app

COPY package*.json ./


RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD node dist/server.js