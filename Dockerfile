FROM node:18.16.0 as builder
WORKDIR /app
ENV PATH app/node_modules/.bin:$PATH

COPY . ./
COPY ./package.json /package.json

RUN npm install install-peerdeps --global && \
    npm install --save-dev eslint-config-airbnb eslint-config-airbnb-base && \
    install-peerdeps --dev eslint-config-airbnb && \
    install-peerdeps --dev eslint-config-airbnb-base
RUN yarn install

RUN yarn build

FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=builder ./build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
