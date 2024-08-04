FROM node:22.5.1

ENV NODE_ENV development

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD [ "node", "app.mjs" ]

EXPOSE 3000
