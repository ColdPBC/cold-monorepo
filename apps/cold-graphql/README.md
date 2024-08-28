<center><img alt="GraphQL_Logo.svg" height="300" src="GraphQL_Logo.svg" width="300"/></center>

# Cold Climate GraphQL API

This is a GraphQL API for cold climate data. It is built with Node.js, Fastify, and Apollo Server.  The Schema & Resolvers are generated dynamically using [Graphweaver](https://graphweaver.com) 

## Getting Started
This repository uses PNPM as the package manager. To install the dependencies, run the following command:

```bash
pnpm install
```

To sync the schema with the database, run the following command:

```bash
pnpm sync
```

To start the server, run the following command:

```bash
pnpm start
```

The server will start on `http://localhost:9001`.

The AdminUI will be available at `http://localhost:9000`.

To access the GraphQL Playground, navigate to `http://localhost:9000/playground`.
