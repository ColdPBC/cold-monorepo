# Use the official Node.js image as the base
FROM node:20.9-bullseye-slim as base
USER root
WORKDIR /home/node/app

ARG DD_GIT_REPOSITORY_URL
ARG DD_GIT_COMMIT_SHA

ENV DD_GIT_REPOSITORY_URL=${DD_GIT_REPOSITORY_URL}
ENV DD_GIT_COMMIT_SHA=${DD_GIT_COMMIT_SHA}

RUN git rev-parse HEAD > commit_hash && \
    export DD_GIT_COMMIT_SHA=$(cat commit_hash) \
RUN export DD_GIT_REPOSITORY_URL=https://github.com/ColdPBC/cold-monorepo

# Set the working directory within the container
COPY ./apps/cold-graphql/src ./src
COPY ./apps/cold-graphql/tsconfig.json .
COPY ./apps/cold-graphql/package.json .

RUN corepack enable

RUN pnpm install
RUN pnpm build

# Expose the port your app will run on (e.g., 9001)
EXPOSE 9001

# Run the application (replace with your actual command)
CMD ["pnpm", "watch"]
