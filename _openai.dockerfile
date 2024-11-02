ARG NODE_VERSION=20
FROM node:${NODE_VERSION} as base
ARG NODE_ENV
ARG DATABASE_URL
ARG DD_SERVICE
ARG DD_VERSION
ARG DD_API_KEY

ENV NODE_ENV=${NODE_ENV}
ENV DD_ENV=${NODE_ENV}
ENV DD_API_KEY=${DD_API_KEY}
ENV DATABASE_URL=${DATABASE_URL}
ENV DD_SERVICE=${DD_SERVICE}
ENV DD_VERSION=${DD_VERSION}

LABEL com.datadoghq.ad.check_names='["postgres"]'
LABEL com.datadoghq.ad.init_configs='[{}]'
LABEL com.datadoghq.ad.instances='[{"database_autodiscovery":{"enabled":true},"collect_schemas":{"enabled":true},"dbm":true,"host":"${DATABASE_URL}","port": 5432,"username":"datadog","password":"${DD_POSTGRES_PASSWORD}", "tags":["service:cold-rds-fc-${NODE_ENV}","env:${NODE_ENV}"]'

LABEL com.datadoghq.tags.service=${DD_SERVICE}
LABEL com.datadoghq.tags.version=${DD_VERSION}
LABEL com.datadoghq.tags.env=${NODE_ENV}

RUN echo "DD_SERVICE: ${DD_SERVICE}"

VOLUME /var/run/docker.sock:/var/run/docker.sock:ro

#RUN npm uninstall -g yarn pnpm
RUN apt-get update
RUN apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev libtool autoconf automake
RUN rm -rf /var/lib/apt/lists/*

WORKDIR /app
# uninstall old yarn or pnpm

ADD . /app/

# Install Dependencies

FROM base as dependencies
WORKDIR /app
USER root

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# Leverage a bind mounts to package.json and yarn.lock to avoid having to copy them into
# into this layer.
#RUN #--mount=type=bind,source=package.json,target=package.json \
    #--mount=type=bind,source=yarn.lock,target=yarn.lock,readwrite \
RUN  --mount=type=cache,target=/root/.yarn

COPY package.json package.json ./

RUN yarn

    #if [ "${NODE_ENV}" = "production" ] ; then echo "installing production dependencies..." && yarn workspaces focus cold-api ; else echo "installing dev dependencies..." && yarn ; fi \

#RUN yarn dedupe --strategy highest

FROM dependencies as build
WORKDIR /app
USER root

ARG NODE_ENV
ARG DATABASE_URL
ARG DD_SERVICE
ARG DD_VERSION
ARG DD_API_KEY

ENV NODE_ENV=${NODE_ENV}
ENV DD_ENV=${NODE_ENV}
ENV DD_API_KEY=${DD_API_KEY}
ENV DATABASE_URL=${DATABASE_URL}
ENV DD_SERVICE=${DD_SERVICE}
ENV DD_VERSION=${DD_VERSION}

LABEL com.datadoghq.ad.check_names='["postgres"]'
LABEL com.datadoghq.ad.init_configs='[{}]'
LABEL com.datadoghq.ad.instances='[{"database_autodiscovery":{"enabled":true},"collect_schemas":{"enabled":true},"dbm":true,"host":"${DATABASE_URL}","port": 5432,"username":"datadog","password":"${DD_POSTGRES_PASSWORD}", "tags":["service:cold-rds-fc-${NODE_ENV}","env:${NODE_ENV}"]'

LABEL com.datadoghq.tags.service=${DD_SERVICE}
LABEL com.datadoghq.tags.version=${DD_VERSION}
LABEL com.datadoghq.tags.env=${NODE_ENV}

RUN echo "DD_SERVICE: ${DD_SERVICE}"

RUN corepack enable
RUN yarn set version latest

RUN yarn dlx nx@latest run cold-nest-library:prisma-generate
RUN yarn prebuild

RUN if [ "${NODE_ENV}" = "production" ] ; then echo "building for production..." && yarn dlx nx@latest run --skip-nx-cache ${DD_SERVICE}:build:production ; else echo "building development..." && yarn dlx nx@latest run --skip-nx-cache ${DD_SERVICE}:build:development ; fi

FROM node:${NODE_VERSION}-bullseye-slim as final
USER root
WORKDIR /home/node/app

RUN apt-get update
RUN apt-get install graphicsmagick -y
RUN apt-get update && apt-get install -y --no-install-recommends \
  fonts-liberation \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdrm2 \
  libgbm1 \
  libgtk-3-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  libu2f-udev \
  libxshmfence1 \
  libglu1-mesa \
  chromium \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* \

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium"

RUN corepack enable
RUN yarn set version latest

ARG NODE_ENV
ARG DATABASE_URL
ARG DD_SERVICE
ARG DD_VERSION
ARG DD_API_KEY

ENV NODE_ENV=${NODE_ENV}
ENV DD_ENV=${NODE_ENV}
ENV DD_API_KEY=${DD_API_KEY}
ENV DATABASE_URL=${DATABASE_URL}
ENV DD_SERVICE=${DD_SERVICE}
ENV DD_VERSION=${DD_VERSION}

LABEL com.datadoghq.ad.check_names='["postgres"]'
LABEL com.datadoghq.ad.init_configs='[{}]'
LABEL com.datadoghq.ad.instances='[{"database_autodiscovery":{"enabled":true},"collect_schemas":{"enabled":true},"dbm":true,"host":"${DATABASE_URL}","port": 5432,"username":"datadog","password":"${DD_POSTGRES_PASSWORD}", "tags":["service:cold-rds-fc-${NODE_ENV}","env:${NODE_ENV}"]'

LABEL com.datadoghq.tags.service=${DD_SERVICE}
LABEL com.datadoghq.tags.version=${DD_VERSION}
LABEL com.datadoghq.tags.env=${NODE_ENV}

VOLUME /var/run/docker.sock:/var/run/docker.sock:ro

ADD --chown=node:node ./apps/${DD_SERVICE}/project.json /home/node/app/
ADD --chown=node:node ./apps/${DD_SERVICE}/src/assets /home/node/app/
ADD --chown=node:node ./package.json /home/node/app/
ADD --chown=node:node ./yarn.lock /home/node/app/

COPY --from=build --chown=node:node /app/dist/apps/${DD_SERVICE} home/node/app/${DD_SERVICE}
COPY --from=build --chown=node:node /app/node_modules /home/node/app/node_modules

#RUN yarn add puppeteer
RUN yarn workspaces focus ${DD_SERVICE} --production
RUN yarn dedupe --strategy highest

# Expose the port that the application listens on.
EXPOSE 7001

# Run the application.
CMD ["sh", "-c", "export DD_GIT_REPOSITORY_URL=github.com export DD_GIT_COMMIT_SHA=$FC_GIT_COMMIT_SHA && node /home/node/app/${DD_SERVICE}/main.js"]
