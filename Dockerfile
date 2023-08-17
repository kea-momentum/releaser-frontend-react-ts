FROM node:18.16.0 as builder
WORKDIR /app
ENV PATH app/node_modules/.bin:$PATH  #환경변수 지정
COPY package.json yarn.lock .
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=builder ./build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
