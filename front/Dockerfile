FROM node:16-alpine as builder
WORKDIR /usr/src/app
RUN apk add git
COPY package*.json yarn.lock ./
RUN yarn install --force
COPY . .
RUN rm -rf build

RUN yarn build
FROM nginx:1.22-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY site.conf /etc/nginx/conf.d/default.conf

EXPOSE 5022
CMD ["nginx", "-g", "daemon off;"]
