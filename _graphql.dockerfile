ARG NODE_VERSION=20
FROM node:${NODE_VERSION} as base
USER root
WORKDIR /home/node

RUN apt-get update
RUN apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev libtool autoconf automake
RUN rm -rf /var/lib/apt/lists/*

ADD . ./repo

FROM node:20.9-bullseye-slim as final
USER root
WORKDIR /home/node

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

RUN corepack enable
RUN yarn set version latest

ADD --chown=node:node ./apps/${DD_SERVICE}/project.json .
ADD --chown=node:node ./apps/${DD_SERVICE}/package.json .

RUN mkdir ./apps
RUN mkdir ./apps/${DD_SERVICE}

ADD --chown=node:node ./apps/${DD_SERVICE}/project.json ./apps/${DD_SERVICE}
ADD --chown=node:node ./apps/${DD_SERVICE}/package.json ./apps/${DD_SERVICE}

ADD --chown=node:node ./yarn.lock .

COPY --from=base --chown=node:node /home/node/repo/apps/${DD_SERVICE} ./apps/${DD_SERVICE}

RUN cd ./apps/${DD_SERVICE}
RUN yarn
RUN yarn build
RUN yarn sync

EXPOSE 9001

CMD ["sh", "-c", "export DD_GIT_REPOSITORY_URL=github.com/ColdPBC/cold-monorepo && export DD_GIT_COMMIT_SHA=$FC_GIT_COMMIT_SHA && yarn start"]
