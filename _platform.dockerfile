ARG NODE_VERSION=20.9
FROM node:${NODE_VERSION}-bullseye-slim as base
VOLUME /var/run/docker.sock:/var/run/docker.sock:ro

WORKDIR /repo
# uninstall old yarn or pnpm
#RUN npm uninstall -g yarn pnpm

# install global dependencies
RUN yarn global add nx nx-cloud prisma zod-prisma zod-prisma-types @vegardit/prisma-generator-nestjs-dto ts-node eslint

ADD . /repo

# Install Dependencies

FROM base as dependencies
WORKDIR /repo
ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}
# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# Leverage a bind mounts to package.json and yarn.lock to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock,readwrite \
    --mount=type=cache,target=/root/.yarn \
    if [ "${NODE_ENV}" = "production" ] ; then echo "installing production dependencies..." && yarn workspaces focus --all --production ; else echo "installing dev dependencies..." && yarn ; fi


RUN yarn add -D @typescript-eslint/eslint-plugin

FROM dependencies as build
ARG DD_SERVICE
ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}
ENV DD_SERVICE=${DD_SERVICE}

WORKDIR /repo
RUN yarn dlx nx run cold-nest-library:prisma-generate
RUN yarn prebuild
RUN if [ "${NODE_ENV}" = "production" ] ; then \
        echo "building for production..." && \
        DD_GIT_COMMIT_SHA=$(cat commit_hash) npx nx run --skip-nx-cache cold-api:build:production ; \
    else \
        echo "building development..." && \
        DD_GIT_COMMIT_SHA=$(cat commit_hash) npx nx run --skip-nx-cache cold-api:build:development ; \
    fi

FROM node:${NODE_VERSION}-bullseye-slim as final
USER root

RUN apt-get update
RUN apt-get install graphicsmagick -y

RUN apt-get update && \
    apt-get install -y git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* \

USER node

ARG DD_SERVICE
ARG NODE_ENV
ARG DD_VERSION
ARG DD_API_KEY
ARG FC_GIT_COMMIT_SHA
ARG PORT

RUN export DD_GIT_REPOSITORY_URL=https://github.com/ColdPBC/cold-monorepo
RUN export DD_GIT_COMMIT_SHA=$(git rev-parse HEAD)

ENV NODE_ENV=${NODE_ENV}
ENV DD_SERVICE=${DD_SERVICE}
ENV DD_ENV=${NODE_ENV}
ENV DD_API_KEY=${DD_API_KEY}
ENV DATABASE_URL=${DATABASE_URL}
ENV DD_VERSION=${DD_VERSION}

WORKDIR /home/node/apps/${DD_SERVICE}

LABEL com.datadoghq.tags.service=${DD_SERVICE}
LABEL com.datadoghq.tags.version=${DD_VERSION}
LABEL com.datadoghq.tags.env=${NODE_ENV}

ADD --chown=node:node apps/${DD_SERVICE}/project.json /home/node/apps/${DD_SERVICE}/project.json
ADD --chown=node:node apps/${DD_SERVICE}/package.json /home/node/apps/${DD_SERVICE}/package.json

ADD --chown=node:node ./package.json /home/node/package.json
ADD --chown=node:node ./yarn.lock /home/node/yarn.lock

COPY --from=build --chown=node:node /repo/dist/apps/${DD_SERVICE} /home/node/apps/${DD_SERVICE}/
COPY --from=build --chown=node:node /repo/node_modules /home/node/node_modules

# Expose the port that the application listens on.
EXPOSE ${PORT}

CMD ["sh", "-c", "export DD_GIT_COMMIT_SHA=$(git rev-parse HEAD) && node main.js"]

# Run the application.
