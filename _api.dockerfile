ARG NODE_VERSION=20.9
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

LABEL com.datadoghq.tags.service="cold-api"
LABEL com.datadoghq.tags.version=${DD_VERSION}
LABEL com.datadoghq.tags.env=${NODE_ENV}

VOLUME /var/run/docker.sock:/var/run/docker.sock:ro

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

# uninstall old yarn or pnpm
RUN npm uninstall -g yarn pnpm

RUN corepack enable
RUN yarn set version latest

ADD . /app/

# Install Dependencies

FROM base as dependencies
WORKDIR /app
USER root
VOLUME /tmp:/tmp

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# Leverage a bind mounts to package.json and yarn.lock to avoid having to copy them into
# into this layer.
RUN yarn install
#RUN yarn dedupe --strategy highest

FROM dependencies as build
WORKDIR /app
USER root

RUN corepack enable
RUN yarn set version latest

RUN yarn dlx nx@latest run cold-nest-library:prisma-generate
RUN yarn prebuild

RUN if [ "${DATABASE_URL}" = "" ] ; then echo "DATABASE_URL is empty; skipping migration" ; else prisma migrate deploy ; fi
RUN if [ "${DATABASE_URL}" = "" ] ; then echo "DATABASE_URL is empty; skipping seed" ; else prisma db seed ; fi

RUN if [ "${NODE_ENV}" = "production" ] ; then echo "building for production..." && yarn dlx nx@latest run --skip-nx-cache cold-api:build:production ; else echo "building development..." && yarn dlx nx@latest run --skip-nx-cache cold-api:build:development ; fi

FROM node:${NODE_VERSION}-bullseye-slim as final
USER root
WORKDIR /home/node/app

ADD --chown=node:node ./apps/cold-api/project.json /home/node/app/
ADD --chown=node:node ./apps/cold-api/src/assets /home/node/app/
ADD --chown=node:node ./package.json /home/node/app/
ADD --chown=node:node ./yarn.lock /home/node/app/

COPY --from=build --chown=node:node /app/dist/apps/cold-api /home/node/app/cold-api
COPY --from=build --chown=node:node /app/node_modules /home/node/app/node_modules

# Expose the port that the application listens on.
EXPOSE 7001

# Run the application.
CMD ["sh", "-c", "export DD_GIT_REPOSITORY_URL=github.com export DD_GIT_COMMIT_SHA=$FC_GIT_COMMIT_SHA && node /home/node/app/cold-api/main.js"]

