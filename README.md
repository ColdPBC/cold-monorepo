<p align="center">
  <img src="https://cold-public-assets.s3.us-east-2.amazonaws.com/Asset+4Logotype_Preferred.svg" width="699" alt="Cold Climate Logo" />
</p>

<p align="center"><strong>Welcome to the Cold Climate monorepo</strong></p>

### What is this?
Cold Climate is a multi-service platform built with Nx. This repository hosts:

- apps/cold-ui — React front-end (Vite, MUI)
- apps/cold-api — NestJS REST API (Swagger/OpenAPI, Prisma)
- apps/cold-graphql — Graphweaver admin/GraphQL backed by PostgreSQL
- apps/cold-platform-openai — NestJS service for LLM-related functionality
- libs/nest — shared NestJS modules (Prisma, RabbitMQ, auth, utilities)
- libs/react — shared React components and utilities

The services talk to shared infrastructure (PostgreSQL, RabbitMQ, Redis, Traefik) defined in docker-compose. Nx manages builds, tasks, and caching across the workspace.

### Quick start (10–15 minutes)
1) Prerequisites
- macOS/Linux/WSL with Docker Desktop running
- Node 20.9.0 (nvm recommended)
- Yarn 4 (Corepack)

2) Set up Node and Yarn
```bash
nvm install 20.9.0
nvm use 20.9.0
corepack enable
node -v   # v20.9.0
yarn -v   # >= 4.4.1
```

3) Clone and install dependencies
```bash
git clone https://github.com/ColdPBC/cold-monorepo.git
cd cold-monorepo
yarn
```

4) Create a .env file
At the repository root, create `.env` with at least:
```dotenv
NODE_ENV=development
# Local database (default from docker-compose)
DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/colddb
# Optional: for Graphweaver admin auth and other integrations
# AUTH0_DOMAIN=...
# AUTH0_CLIENT_ID=...
```

5) Start local infrastructure (one time per session)
```bash
docker network create cold 2>/dev/null || true
docker compose up -d proxy postgres rabbit cache n8n
```

6) Run services during development (in separate terminals)
- REST API
```bash
yarn start:api
```
- Graphweaver (GraphQL/Admin UI)
```bash
yarn start:graph
```
- UI (example Nx serve; adjust if your IDE provides a run config)
```bash
nx serve cold-ui
```

7) Open the apps
- UI: https://proxy.coldclimate.local:4200 or http://localhost:4200 (if served directly)
- Graphweaver admin: http://localhost:5555 (default Graphweaver) or per your run output
- Traefik dashboard: http://proxy.coldclimate.local:8080
- RabbitMQ: http://rabbit.coldclimate.local
- n8n: https://n8n.coldclimate.local

Note: The provided docker-compose exposes Traefik and commonly used ports. If a service binds a different port, follow the terminal output.

### Project scripts and tooling
From `package.json` (selected):
- `yarn build` — build UI, API, and platform-openai and then graphweaver build
- `yarn build:dev` — dev build
- `yarn build:prod` — production UI build
- `yarn start:api` — run `apps/cold-api`
- `yarn start:graph` — run Graphweaver for `apps/cold-graphql`
- `yarn watch:graph` — watch mode for Graphweaver
- `yarn generate` — Prisma generate, prebuild barrels, lint
- `yarn lint` / `yarn format` — lint/format code
- `yarn test` — API tests (Jest)
- `yarn chromatic` — publish Storybook to Chromatic

Nx tips:
- `nx <target> <project>` (e.g., `nx serve cold-ui`)
- `nx run-many -t build -p cold-api cold-ui`
- Check `nx.json` for cache and target defaults

### Architecture highlights
- Monorepo managed by Nx (React + NestJS + shared libs)
- API: NestJS 10/11, Prisma ORM, Swagger/OpenAPI
- GraphQL/Admin: Graphweaver configured via `apps/cold-graphql/graphweaver-config.js` using `DATABASE_URL`
- Messaging: RabbitMQ via `@golevelup/nestjs-rabbitmq`
- Caching/queues: Redis and Bull
- Front-end: React (Vite), MUI, Storybook/Chromatic
- Observability: Datadog (browser logs + RUM), via Docker labels in deployment
- CI/CD & Infra: Flightcontrol (see `flightcontrol*.json`), ECS/EC2 targets, Traefik for local

### Working with the database
Prisma schema lives at `libs/nest/prisma/schema.prisma`.

- Generate client
```bash
yarn generate
```

- Run migrations (typical CI/CD uses `prisma migrate deploy`)
```bash
yarn migrate
```

- Seed data
```bash
yarn seed
```

Make sure `DATABASE_URL` is set in your environment when running these commands.

### Running Storybook for UI
```bash
yarn build-storybook
yarn storybook
```
Then open the provided URL or `http://localhost:4400` if served via the dev server.

### Environment variables
Minimum for local dev:
```dotenv
NODE_ENV=development
DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/colddb
```
Additional environment variables exist for third-party integrations (Auth0, Datadog, LaunchDarkly, etc.). Check per-app configuration and deployment files like `flightcontrol_platform.json` and in-app `.env` usage.

### Secrets management
This project uses environment variables for configuration in all environments. Treat any credential-bearing variables as secrets.

- Examples of secrets you might need: `DATABASE_URL`, `OPENAI_API_KEY`, `STRIPE_API_KEY`, `CLIMATIQ_API_KEY`, `AUTH0_CLIENT_SECRET`, `DD_API_KEY`, `LD_SDK_KEY`.

Local development
- Store secrets only in your local developer environment, never commit them.
- Use a root-level `.env` file for local runs. Optionally, add `.env.local` for overrides. Both are ignored by Git (verify your IDE doesn’t expose them).
- Do not place secrets inside source files, Dockerfiles, or checked-in JSON/YAML.
- If you use Docker Compose directly, you can export vars in your shell or use an `.env` file at the repo root; Compose will read from it.

CI/CD and deployments (Flightcontrol)
- Production and staging secrets are provided as environment variables in Flightcontrol. Configure or rotate them in the Flightcontrol dashboard rather than committing anything to the repo.
- Flightcontrol injects environment variables at build and/or runtime per the service config in `flightcontrol*.json` (for example, `includeEnvVariablesInBuild` / `injectEnvVariablesInDockerfile`).
- Never print secrets in logs. Avoid echoing env values in build steps.

Cloud services
- Database credentials and other runtime settings are supplied via `DATABASE_URL` and related env vars. Ensure these are set in the deployment environment before releasing.
- AWS or third-party API keys should be stored only in the deployment environment (Flightcontrol) and rotated periodically.

Adding or rotating a secret
1) Local: add/update the key in your local `.env`; re-run the affected service.
2) Staging/Production: update the variable in Flightcontrol’s environment settings for the target service; trigger a new deployment if required.
3) Clean up: remove any old values from terminals, shells, and notes. If a secret was exposed, rotate it immediately and document the incident.

Do and don’t checklist
- Do: keep secrets in env vars and secret managers, use least privilege, and rotate regularly.
- Do: prefer per-environment values; don’t reuse production secrets in dev.
- Don’t: commit `.env` files, paste secrets into code, PRs, or ticket comments.
- Don’t: hardcode secrets in Dockerfiles or JSON configs.

### Local infrastructure reference
The main services in `docker-compose.yml` include:
- Traefik reverse proxy (dashboard at `proxy.coldclimate.local:8080`)
- PostgreSQL (`postgres` service; DB name `colddb`)
- RabbitMQ (`rabbit` with management UI at `rabbit.coldclimate.local`)
- Redis (`cache`)
- n8n automation runner (`n8n` at `n8n.coldclimate.local`)

Tip: If `.local` hostnames do not resolve, you can access services via localhost-bound ports or update your hosts file to map `*.coldclimate.local` to `127.0.0.1` for convenience.

### Using the docker-compose files

The repo includes multiple compose files to spin up local infra and selected services. They all expect an external Docker network named `cold` to exist.

- docker-compose.yml — primary local stack with Traefik proxy, PostgreSQL, RabbitMQ, Redis, n8n, and Graphweaver
- docker-compose-core.yml — core infra plus API and Graphweaver wired for local dev
- docker-compose-openAi.yml — platform services (openai, climatiq, bayou) and API

You can mix-and-match by starting the proxy/infra from one file and app services from another, as long as everything joins the `cold` network.

Prerequisites
- Docker Desktop running
- Create the shared network once:
  ```bash
  docker network create cold 2>/dev/null || true
  ```
- Optional env for compose (used by Traefik/n8n):
  ```dotenv
  # For ACME email (Traefik). Not required for local-only HTTP.
  SSL_EMAIL=dev@yourdomain.com
  # For n8n URL if you want to expose via Traefik
  DOMAIN_NAME=coldclimate.local
  SUBDOMAIN=n8n
  GENERIC_TIMEZONE=America/Chicago
  ```

Start the core infra (proxy, db, redis, rabbit)
```bash
# Option A: main stack
docker compose up -d proxy postgres rabbit cache

# Option B: core stack (includes API + GraphQL too)
docker compose -f docker-compose-core.yml up -d proxy postgres rabbit cache
```

Start application services
```bash
# Graphweaver (from main file)
docker compose up -d graphql

# API + Graphweaver (from core file)
docker compose -f docker-compose-core.yml up -d api graphql

# Platform services (require proxy/infra to already be running)
docker compose -f docker-compose-openAi.yml up -d api climatiq openai bayou
```

Stopping, logs, and rebuilds
- Stop without removing: `docker compose stop`
- Stop and remove: `docker compose down`
- Remove including volumes (data reset!): `docker compose down -v`
- Follow logs for one service: `docker compose logs -f postgres`
- Rebuild a service image: `docker compose build api`
- Force rebuild without cache: `docker compose build --no-cache api`
- Restart a service: `docker compose restart rabbit`

Accessing services and URLs
- Traefik dashboard: `http://proxy.coldclimate.local:8080` (main/core file)
- RabbitMQ UI: `http://rabbit.coldclimate.local:15672` (user/pass default: `guest`/`guest`)
- PostgreSQL: `localhost:5432` (service host `postgres` from within Docker)
- Redis: `localhost:6379` (service host `cache` from within Docker)
- Graphweaver (core files): `http://localhost:9001`
- API (core/openAi files): `http://localhost:7001` (also routed via Traefik host rules like `api.coldclimate.wtf` in core/openAi)
- OpenAI service (openAi file): `http://localhost:7003`
- Climatiq service (openAi file): `http://localhost:7002`
- n8n (main file): `https://${SUBDOMAIN}.${DOMAIN_NAME}` or `http://127.0.0.1:5678`

Hosts file tips
Most dev machines don’t support wildcard DNS for `.local` by default. If you want pretty hostnames, add entries to `/etc/hosts` like:
```
127.0.0.1 proxy.coldclimate.local rabbit.coldclimate.local cache.coldclimate.local db.coldclimate.local
127.0.0.1 api.coldclimate.wtf climatiq.coldclimate.wtf openai.coldclimate.wtf bayou.coldclimate.wtf
```
Otherwise, use `localhost` ports listed above.

Database URL and service-to-service connectivity
- From your host machine (e.g., running Nx apps):
  ```dotenv
  DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/colddb
  ```
- From containers on the `cold` network, use service names:
  - Postgres: `postgres:5432`
  - RabbitMQ: `rabbit:5672` (HTTP UI at `rabbit:15672`)
  - Redis: `cache:6379`

Data persistence
- Main compose uses a named volume `traefik_data` for ACME; postgres uses a host path under `~/apps/postgres` (or `~/apps/postgres/15` in the main file) to persist data across restarts.
- To reset Postgres completely, stop containers and remove the data directory (e.g., `rm -rf ~/apps/postgres/15`). Be careful—this is destructive.

TLS and Traefik notes
- The main compose enables Traefik and configures ACME TLS challenge using `SSL_EMAIL`. For true HTTPS with real certificates, you need routable domains pointing to your machine. For local development, you can:
  - Use plain HTTP via `localhost` ports, or
  - Use self-signed certs, or
  - Map hosts and accept browser warnings for self-issued certs.
- n8n is configured to run with HTTPS in the compose labels; for local convenience you can access it on `http://127.0.0.1:5678` or adjust `N8N_PROTOCOL` to `http` in your environment if needed.

Common issues and fixes
- “network cold not found”: run `docker network create cold`
- Port already in use (80, 443, 5432, 5672, 6379, 8080): stop the other process or change the mapped port in the compose file
- `DATABASE_URL` errors from Graphweaver/API: ensure Postgres is up and the URL matches host networking (inside Docker use `postgres`, on host use `127.0.0.1`)
- Traefik dashboard not reachable: confirm `proxy` is running and your hosts file contains `proxy.coldclimate.local`
- Permission denied on Docker socket: ensure your user can access `/var/run/docker.sock` or run through Docker Desktop

Examples
```bash
# 1) Full local infra (proxy, db, redis, rabbit) + Graphweaver via main file
docker network create cold || true
docker compose up -d proxy postgres rabbit cache graphql

# 2) Core stack (infra) + API + Graphweaver
docker compose -f docker-compose-core.yml up -d proxy postgres rabbit cache api graphql

# 3) Add platform services (requires infra first)
docker compose -f docker-compose-openAi.yml up -d api climatiq openai bayou
```

### Deployment overview
Production deployments are defined via Flightcontrol JSON configs (`flightcontrol.json`, `flightcontrol_platform.json`):
- ECS on EC2, with health checks, autoscaling, and Docker-based builds
- Services such as `cold-platform-openai` deploy from `main` by manual trigger

For a new developer, local development via Docker + Nx is sufficient. Coordinate with the team before triggering any remote deployment.

### Troubleshooting
- Yarn complains or installs v1: run `corepack enable` and re-open your terminal
- Port conflicts (4200, 4400, 5432, 5672, 6379, 8080, 443): stop other local services or change bound ports
- `DATABASE_URL is not set` when starting Graphweaver: ensure `.env` is present or export `DATABASE_URL`
- Prisma errors: re-run `yarn generate`; confirm Postgres is running and reachable
- Docker network missing: `docker network create cold`

### Contributing and conventions
- Keep changes type-checked and linted (`yarn generate`, `yarn lint`)
- Follow Nx app/lib boundaries; put shared code into `libs/`
- Prefer consistent import barrels; `yarn prebuild` generates barrels automatically
- Write small, focused commits; update `CHANGELOG.md` when appropriate

### Useful links
- Nx docs: https://nx.dev
- Graphweaver: https://graphweaver.com
- Prisma: https://www.prisma.io
- NestJS: https://nestjs.com
- MUI: https://mui.com

Welcome aboard! If you get stuck, check the scripts in `package.json`, the docker-compose services, or ask the team in Slack.
