FROM node:20-alpine AS builder

WORKDIR /webapp

COPY package.json .

RUN yarn install --no-lockfile --network-timeout 600000

COPY . .
RUN yarn run build:stag

RUN ls -a

# stage 2
FROM nginx:alpine

COPY --from=builder /webapp/dist /usr/share/nginx/html

COPY conf.d/default.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /webapp

# CMD ["nginx", "-g", "daemon off;"]