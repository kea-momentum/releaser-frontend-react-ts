FROM node:18.16.0 as builder
WORKDIR /app
ENV PATH app/node_modules/.bin:$PATH

COPY . ./
COPY ./package.json /package.json
COPY ./yarn.lock /yarn.lock

RUN yarn build

FROM nginx:latest

COPY --from=builder /_app/build /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

