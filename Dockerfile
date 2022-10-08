FROM --platform=linux/amd64 node:16-buster

WORKDIR /root

COPY package.json .
COPY yarn.lock .


RUN yarn install

COPY . .

RUN yarn electron:build
