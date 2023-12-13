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
ENV DD_SERVICE=${DD_SERVICE}
ENV DD_VERSION=${DD_VERSION}

LABEL com.datadoghq.tags.service="cold-climatiq"
LABEL com.datadoghq.tags.version=${DD_VERSION}
LABEL com.datadoghq.tags.env=${NODE_ENV}

VOLUME /var/run/docker.sock:/var/run/docker.sock:ro

WORKDIR /repo
# uninstall old yarn or pnpm
#RUN npm uninstall -g yarn pnpm

# install global dependencies
RUN yarn global add nx nx-cloud ts-node eslint

ADD . /repo

# Install Dependencies

FROM base as dependencies
WORKDIR /repo
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
WORKDIR /repo
RUN if [ "${NODE_ENV}" = "production" ] ; then echo "building for production..." && npx nx run --skip-nx-cache cold-provider-climatiq:build:production ; else echo "building development..." && npx nx run --skip-nx-cache cold-provider-climatiq:build:development ; fi
RUN npx nx reset

FROM base as final
USER node
WORKDIR /home/node/repo

ADD --chown=node:node ./apps/cold-provider-climatiq/project.json /home/node/apps/cold-provider-climatiq/project.json
ADD --chown=node:node ./apps/cold-provider-climatiq/package.json /home/node/apps/cold-provider-climatiq/package.json

ADD --chown=node:node ./package.json /home/node/package.json
ADD --chown=node:node ./yarn.lock /home/node/yarn.lock

COPY --from=build --chown=node:node /repo/dist/apps/cold-provider-climatiq /home/node/apps/cold-provider-climatiq/
COPY --from=build --chown=node:node /repo/node_modules /home/node/node_modules

# Expose the port that the application listens on.
EXPOSE 7002

CMD ["node", "/home/node/apps/cold-provider-climatiq/main.js"]
# Run the application.
