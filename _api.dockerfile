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

RUN if [ "${DATABASE_URL}" = "" ] ; then echo "DATABASE_URL is empty; skipping migration" ; else yarn prisma migrate deploy ; fi
RUN if [ "${DATABASE_URL}" = "" ] ; then echo "DATABASE_URL is empty; skipping seed" ; else yarn prisma db seed ; fi

RUN if [ "${NODE_ENV}" = "production" ] ; then echo "building for production..." && yarn dlx nx@latest run --skip-nx-cache ${DD_SERVICE}:build:production ; else echo "building development..." && yarn dlx nx@latest run --skip-nx-cache ${DD_SERVICE}:build:development ; fi

FROM node:${NODE_VERSION}-bullseye-slim as final
USER root
WORKDIR /home/node/apps/${DD_SERVICE}

RUN npm uninstall -g yarn pnpm

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

ADD --chown=node:node ./apps/${DD_SERVICE}/project.json .
ADD --chown=node:node ./apps/${DD_SERVICE}/package.json .
ADD --chown=node:node ./apps/${DD_SERVICE}/webpack.config.js .
ADD --chown=node:node ./yarn.lock .

COPY --from=build --chown=node:node /app/dist/apps/${DD_SERVICE} ./src
COPY --from=build --chown=node:node /app/node_modules ./node_modules

# Expose the port that the application listens on.
EXPOSE 7001

RUN ls -la .
RUN ls -la ./src

# Run the application.
CMD ["sh", "-c", "export DD_GIT_REPOSITORY_URL=github.com/coldPBC/cold-monorepo export DD_GIT_COMMIT_SHA=$FC_GIT_COMMIT_SHA && node ./src/main.js"]

