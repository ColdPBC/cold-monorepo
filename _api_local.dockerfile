# Use the official Node.js image as the base
ARG NODE_VERSION=22.8
FROM node:${NODE_VERSION} as base
USER root

RUN apt-get update
RUN apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev libtool autoconf automake zlib1g-dev libicu-dev libpng-dev libjpeg-dev libtiff-dev libgif-dev python3 python3-pip python3-setuptools python3-wheel
RUN rm -rf /var/lib/apt/lists/*

WORKDIR /repo

# Capture the build arguments
ARG NODE_ENV
ARG DATABASE_URL
ARG DD_SERVICE
ARG DD_VERSION
ARG DD_API_KEY

# Set the environment variables
ENV NODE_ENV=${NODE_ENV}
ENV DD_ENV=${NODE_ENV}
ENV DD_API_KEY=${DD_API_KEY}
ENV DATABASE_URL=${DATABASE_URL}
ENV DD_SERVICE=${DD_SERVICE}
ENV DD_VERSION=${DD_VERSION}

ADD . .

RUN npm install -g nx
RUN corepack enable
RUN yarn set version latest
RUN yarn
RUN yarn prisma generate

RUN yarn prebuild

RUN nx run cold-api:build:development

# Run the application (replace with your actual command)
CMD ["sh", "-c", "nx run cold-api:serve:production"]
