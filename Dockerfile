FROM node:18.16.0 as builder
WORKDIR /app
ENV PATH app/node_modules/.bin:$PATH

COPY . ./
COPY ./package.json /package.json
COPY ./yarn.lock /yarn.lock

RUN yarn build


