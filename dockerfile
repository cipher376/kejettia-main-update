FROM node:14.17.0 AS compile-image

RUN npm install -g @angular/cli

WORKDIR /opt/ng
COPY  package.json angular.json ./
RUN npm install
COPY . ./
RUN ng build --prod

FROM nginx:1.17.1-alpine
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/ng/dist/kejettia-main-update /usr/share/nginx/html
