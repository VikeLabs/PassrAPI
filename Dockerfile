FROM node:lts

WORKDIR /app

COPY . /app

RUN npm install

ENTRYPOINT [ "node", "dist/index.js" ]