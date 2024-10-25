# Use the official Node.js image as the base
FROM node:20.9-bullseye-slim as base
USER root
WORKDIR /home/node/app

# Set the working directory within the container
COPY ./apps/cold-graphql/src ./src
COPY ./apps/cold-graphql/tsconfig.json .
COPY ./apps/cold-graphql/package.json .
COPY ./apps/cold-graphql/pnpm-lock.yaml .

RUN corepack enable
RUN corepack use pnpm@9.12.2


RUN pnpm install --frozen-lockfile

# Expose the port your app will run on (e.g., 9001)
EXPOSE 9001

# Run the application (replace with your actual command)
CMD ["sh", "-c", "export DD_GIT_REPOSITORY_URL=github.com/ColdPBC/cold-monorepo && export DD_GIT_COMMIT_SHA=$FC_GIT_COMMIT_SHA && pnpm start"]
