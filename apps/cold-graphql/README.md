<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://cold-public-assets.s3.us-east-2.amazonaws.com/Asset+4Logotype_Preferred.svg" width="699" alt="Cold Climate Logo" /></a>
</p>
<center><img alt="GraphQL_Logo.svg" height="300" src="GraphQL_Logo.svg" width="300"/></center>

# Cold Climate GraphQL API

This is a GraphQL API for cold climate data. It is built with Node.js, Fastify, and Apollo Server.  The Schema & Resolvers are generated dynamically using [Graphweaver](https://graphweaver.com) 

## Getting Started
This repository uses PNPM as the package manager. To install the dependencies, run the following command:

```bash
pnpm install
```

To sync the schema with the database, run the following command:

`IMPORTANT`: Graphweaver requires that ACLs be set up on each entity in order to support RBAC (role based access controls).  Unfortunately this means that the ACLs will be overwritten anytime the schema is synced.  Graphweaver has said they are working on fixing this issue but in the meantime, to work around this issue we use a custom script `acl_utils/apply_acl_to_entities.ts` to reapply the ACLs after the schema is synced.  

This script is automatically run after the schema is synced.

To Sync the schema with the database, run the following command:
```bash
pnpm sync
```

To control which ACLs get automatically applied to entities after the schema is synced, you can modify the `acl_utils/acl.ts` file.  This file contains a list of ACLs that will be applied to each entity.  

There are three string arrays: `publicEntities`, `ownerAndAdminEntities`, and `coldAdminEntities`.  Simply add the name of the postgres table that the entity represents to the appropriate array.  

A table name can only be applied to one array at a time as only one ACL can be applied to an entity.  If a table name is in multiple arrays, that entity will not have any ACL applied to it and an error message for that entity will appear in the console log .

For example, to add the entity `PolicyDefinition` to the `publicEntities` array, you would modify the file like so:
```typescript
export const publicEntities = [
  'policy_definitions',
  // Add more entities here
];
```

NOTE: Your Local Postgres will need to be running in order to sync the schema.  

To start the server, run the following command:

```bash
pnpm start
```

The server will start on `http://localhost:9001`.

The AdminUI will be available at `http://localhost:9000`.

To access the GraphQL Playground, navigate to `http://localhost:9000/playground`.
