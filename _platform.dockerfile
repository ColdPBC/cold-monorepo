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

RUN npx nx run --skip-nx-cache ${DD_SERVICE}:build:production


FROM node:${NODE_VERSION}-bullseye-slim as final
USER root

RUN npm uninstall -g yarn pnpm

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

ENV NODE_ENV=${NODE_ENV}
ENV DD_SERVICE=${DD_SERVICE}
ENV DD_ENV=${NODE_ENV}
ENV DD_API_KEY=${DD_API_KEY}
ENV DATABASE_URL=${DATABASE_URL}
ENV DD_VERSION=${DD_VERSION}

WORKDIR /home/node

LABEL com.datadoghq.tags.service=${DD_SERVICE}
LABEL com.datadoghq.tags.version=${DD_VERSION}
LABEL com.datadoghq.tags.env=${NODE_ENV}

ADD --chown=node:node ./apps/${DD_SERVICE}/project.json .
ADD --chown=node:node ./apps/${DD_SERVICE}/package.json .

RUN mkdir ./apps
RUN mkdir ./apps/${DD_SERVICE}

ADD --chown=node:node ./apps/${DD_SERVICE}/project.json ./apps/${DD_SERVICE}
ADD --chown=node:node ./apps/${DD_SERVICE}/package.json ./apps/${DD_SERVICE}

ADD --chown=node:node ./apps/${DD_SERVICE}/webpack.config.js .
ADD --chown=node:node ./yarn.lock .

COPY --from=build --chown=node:node /app/dist/apps/${DD_SERVICE} ./apps/${DD_SERVICE}/src
COPY --from=build --chown=node:node /app/node_modules ./node_modules

# Expose the port that the application listens on.
EXPOSE ${PORT}

RUN ls -la .
RUN ls -la ./apps
RUN ls -la ./apps/${DD_SERVICE}
RUN ls -la ./apps/${DD_SERVICE}/src

CMD ["sh", "-c", "export DD_GIT_REPOSITORY_URL=github.com/ColdPBC/cold-monorepo && export DD_GIT_COMMIT_SHA=$FC_GIT_COMMIT_SHA && node ./apps/${DD_SERVICE}/src/main.js"]

# Run the application.
