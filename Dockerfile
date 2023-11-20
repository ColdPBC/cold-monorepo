ARG NODE_VERSION=20.9

FROM node:${NODE_VERSION}-bullseye-slim as base
WORKDIR /app

# uninstall old yarn or pnpm
#RUN npm uninstall -g yarn pnpm

# install global dependencies
RUN yarn global add nx nx-cloud prisma zod-prisma zod-prisma-types @vegardit/prisma-generator-nestjs-dto ts-node eslint

# install latest yarn
#RUN corepack enable
#RUN yarn set version stable

# Install Dependencies

FROM base as build
WORKDIR /app

COPY . /app
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

COPY --from=build --chown=node:node /app/dist/apps/cold-api /home/node/app
COPY --from=build --chown=node:node /app/node_modules /home/node/app/node_modules
COPY --from=build --chown=node:node /app/package.json /home/node/app/package.json
COPY --from=build --chown=node:node /app/yarn.lock /home/node/app/yarn.lock
#RUN yarn install
# Expose the port that the application listens on.
EXPOSE 7001

CMD ["node", "/home/node/app/main.js"]
# Run the application.
