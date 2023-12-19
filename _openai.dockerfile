ARG NODE_VERSION=20.9
FROM node:${NODE_VERSION}-bullseye-slim as base
ARG NODE_ENV
ARG DD_SERVICE
ARG DD_VERSION
ARG DD_API_KEY
ARG FC_GIT_COMMIT_SHA

ENV DD_GIT_REPOSITORY_URL=https://github.com/ColdPBC/cold-monorepo
ENV DD_GIT_COMMIT_SHA=${FC_GIT_COMMIT_SHA}

ENV NODE_ENV=${NODE_ENV}
ENV DD_ENV=${NODE_ENV}
ENV DD_API_KEY=${DD_API_KEY}
ENV DATABASE_URL=${DATABASE_URL}
ENV DD_SERVICE=${DD_SERVICE}
ENV DD_VERSION=${DD_VERSION}

LABEL com.datadoghq.tags.service="cold-platform-openai"
LABEL com.datadoghq.tags.version=${DD_VERSION}
LABEL com.datadoghq.tags.env=${NODE_ENV}

VOLUME /var/run/docker.sock:/var/run/docker.sock:ro

WORKDIR /app
# uninstall old yarn or pnpm
#RUN npm uninstall -g yarn pnpm

# install global dependencies
RUN yarn global add nx nx-cloud prisma zod-prisma zod-prisma-types @vegardit/prisma-generator-nestjs-dto ts-node eslint

ADD . /app/

# Install Dependencies

FROM base as dependencies
WORKDIR /app
# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# Leverage a bind mounts to package.json and yarn.lock to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock,readwrite \
    --mount=type=cache,target=/root/.yarn \
    if [ "${NODE_ENV}" = "production" ] ; then echo "installing production dependencies..." && yarn workspaces focus --all --production ; else echo "installing dev dependencies..." && yarn ; fi
#RUN chown -R node:node /home/node/build
RUN echo  "****NODE ENV**** ${NODE_ENV}"
RUN yarn add -D @typescript-eslint/eslint-plugin

FROM dependencies as build
WORKDIR /app
RUN yarn dlx nx run cold-nest-library:prisma-generate
RUN yarn prebuild
RUN if [ "${NODE_ENV}" = "production" ] ; then echo "building for production..." && npx nx run --skip-nx-cache cold-platform-openai:build:production ; else echo "building development..." && npx nx run --skip-nx-cache cold-platform-openai:build:development ; fi
RUN npx nx reset

FROM node:${NODE_VERSION}-bullseye-slim as final
USER node
WORKDIR /home/node/app

ADD --chown=node:node apps/cold-platform-openai/src/assets /home/node/app/
ADD --chown=node:node apps/cold-platform-openai/project.json /home/node/app/
ADD --chown=node:node ./package.json /home/node/app/
ADD --chown=node:node ./yarn.lock /home/node/app/

COPY --from=build --chown=node:node /app/dist/apps/cold-platform-openai /home/node/app/cold-platform-openai
COPY --from=build --chown=node:node /app/node_modules /home/node/app/node_modules

# Expose the port that the application listens on.
EXPOSE 7003

CMD ["node", "/home/node/app/cold-platform-openai/main.js"]
# Run the application.
