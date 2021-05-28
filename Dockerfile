FROM node:alpine

RUN mkdir -p /usr/src/mimron-microservice && chown -R node:node /usr/src/mimron-microservice

WORKDIR /usr/src/mimron-microservice

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000
