FROM node:14-alpine3.15 AS compile-image

RUN npm install -g @angular/cli

WORKDIR /opt/ng
COPY  package.json angular.json ./
RUN rm -rf /opt/ng/node_modules
RUN npm install
COPY . ./
RUN ng build --configuration production

FROM nginx:1.23.2-alpine
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/ng/www /usr/share/nginx/html
