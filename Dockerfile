FROM node:lts

WORKDIR /app

COPY . /app

RUN npm install

RUN npm run build:app

ENTRYPOINT [ "node", "dist/index.js" ]
