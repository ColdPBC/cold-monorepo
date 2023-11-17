# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20.9

# set in docker-compose.yml
ARG DATABASE_URL

FROM node:${NODE_VERSION}-bullseye-slim as base
WORKDIR /home/node/app
# uninstall old yarn or pnpm
#RUN npm uninstall -g yarn pnpm

# install global dependencies
RUN npm i -g prisma zod-prisma zod-prisma-types @vegardit/prisma-generator-nestjs-dto ts-node eslint

# install latest yarn
#RUN corepack enable
#RUN yarn set version stable

# Install Dependencies

FROM base as build
WORKDIR /home/node/build

COPY . /home/node/build
# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# Leverage a bind mounts to package.json and yarn.lock to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock,readwrite \
    --mount=type=cache,target=/root/.yarn \
    yarn install
#RUN chown -R node:node /home/node/build
RUN yarn add -D @typescript-eslint/eslint-plugin
RUN yarn prebuild
RUN npx nx run nest:prisma-generate
#RUN eslint "{src,apps,libs,test}/**/*.ts" --fix

RUN npx nx run cold-api:build:development



FROM base as final
USER node
WORKDIR /home/node/app
#RUN npm i -g corepack @nestjs/cli @typescript-eslint/eslint-plugin zod-prisma zod-prisma-types @vegardit/prisma-generator-nestjs-dto prisma ts-node eslint

# install latest yarn
#RUN corepack enable
#RUN yarn set version stable

COPY --from=build --chown=node:node /home/node/build/node_modules /home/node/app/node_modules

COPY --from=build --chown=node:node /home/node/build/dist/apps/cold-api /home/node/app/prisma
COPY --from=build --chown=node:node /home/node/build/dist/public /home/node/app/public
COPY --from=build --chown=node:node /home/node/build/dist/src /home/node/app/src

COPY --from=build --chown=node:node /home/node/build/tsconfig.json /home/node/app/tsconfig.json
COPY --from=build --chown=node:node /home/node/build/tsconfig.build.json /home/node/app/tsconfig.build.json

COPY --from=build --chown=node:node /home/node/build/package.json /home/node/app/package.json
COPY --from=build --chown=node:node /home/node/build/yarn.lock /home/node/app/yarn.lock
COPY --from=build --chown=node:node /home/node/build/nest-cli.json /home/node/app/nest-cli.json
#RUN yarn install
# Expose the port that the application listens on.
EXPOSE 7001

CMD ["node", "/home/node/app/main.js"]
# Run the application.
