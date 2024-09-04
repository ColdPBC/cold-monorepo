<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://cold-public-assets.s3.us-east-2.amazonaws.com/Asset+4Logotype_Preferred.svg" width="699" alt="Cold Climate Logo" /></a>
</p>

# Cold Climate Stripe Platform

This is the Stripe platform for Cold Climate. It is used to interface into the Stripe API to retrieve and handle our customer's subscriptions and product data.  It is built using NestJS and TypeORM.

## Getting Started
To get started and install the dependencies, run the following command while in the monorepo root directory:

```bash
yarn install
```

There are different environments to run the application in:

Stripe Test Mode Scripts (Staging will connect to the Staging DB, for Development you will need to set up a local DB):
```bash
nx run cold-platform-stripe:serve:development
```
```bash
nx run cold-platform-stripe:serve:staging
```

Stripe Live Mode Scripts:
```bash
nx run cold-platform-stripe:serve:production
```

Configurations are located in the `.run` folder in the src directory. Here are the environments and their configuration files:
1. Development: cold-platform-stripe:serve:development.run.xml
2. Staging: cold-platform-stripe:serve:staging.run.xml
3. Production: cold-platform-stripe:serve:production.run.xml


The server will start on `http://localhost:7005`.

