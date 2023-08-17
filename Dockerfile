FROM node:18.16.0 as builder
WORKDIR /app

RUN yarn install

COPY . ./app
RUN yarn build

FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=builder ./build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
