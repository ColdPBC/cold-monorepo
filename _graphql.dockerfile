# Use the official Node.js image as the base
FROM node:20.9-bullseye-slim as base
USER root
WORKDIR /home/node/app
COPY .git ./.git
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
