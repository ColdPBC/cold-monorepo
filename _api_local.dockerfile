# Use the official Node.js image as the base
ARG NODE_VERSION=22.8
FROM node:${NODE_VERSION} AS base
USER root

RUN apt-get update
RUN apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev libtool autoconf automake zlib1g-dev libicu-dev libpng-dev libjpeg-dev libtiff-dev libgif-dev python3 python3-pip python3-setuptools python3-wheel
RUN rm -rf /var/lib/apt/lists/*

WORKDIR /repo

ADD . .

RUN npm install -g nx
RUN npm install -g corepack@latest

RUN corepack enable
RUN yarn set version latest
RUN yarn
RUN yarn prisma generate

RUN yarn prebuild

RUN nx run cold-api:build:development

# Run the application (replace with your actual command)
CMD ["sh", "-c", "nx run cold-api:serve:production"]
