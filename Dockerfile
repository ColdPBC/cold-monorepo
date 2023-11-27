ARG NODE_VERSION=20.9
FROM node:${NODE_VERSION}-bullseye-slim as base
ARG NODE_ENV
ARG DATABASE_URL
ENV NODE_ENV=${NODE_ENV}
ENV DATABASE_URL=${DATABASE_URL}
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
RUN yarn prebuild
RUN npx nx run coldpbc/nest:prisma-generate
RUN if [ "${NODE_ENV}" = "production" ] ; then echo "building for production..." && npx nx run cold-api:build:production ; else echo "building development..." && npx nx run cold-api:build:development ; fi
RUN npx nx reset

FROM base as final
USER node
WORKDIR /home/node/app

ADD --chown=node:node ./apps/cold-api/src/public /home/node/app/
ADD --chown=node:node ./apps/cold-api/src/assets /home/node/app/
ADD --chown=node:node ./package.json /home/node/app/
ADD --chown=node:node ./yarn.lock /home/node/app/

COPY --from=build --chown=node:node /app/dist/apps/cold-api /home/node/app/cold-api
COPY --from=build --chown=node:node /app/node_modules /home/node/app/node_modules

# Expose the port that the application listens on.
EXPOSE 7001

CMD ["node", "/home/node/app/cold-api/main.js"]
# Run the application.
