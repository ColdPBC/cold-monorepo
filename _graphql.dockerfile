# Use the official Node.js image as the base
FROM node:20.9-bullseye-slim as base
USER root
WORKDIR /home/node

RUN corepack enable
RUN yarn set version latest

COPY . .

RUN yarn
RUN yarn sync
RUN yarn build

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

# Set the working directory within the container
COPY ./apps/cold-graphql/src ./src
COPY ./apps/cold-graphql/tsconfig.json .
COPY ./apps/cold-graphql/package.json .
#COPY ./apps/cold-graphql/pnpm-lock.yaml .



# Expose the port your app will run on (e.g., 9001)
EXPOSE 9001

# Run the application (replace with your actual command)
CMD ["sh", "-c", "export DD_GIT_REPOSITORY_URL=github.com/ColdPBC/cold-monorepo && export DD_GIT_COMMIT_SHA=$FC_GIT_COMMIT_SHA && yarn start"]
