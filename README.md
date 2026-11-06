# fastify-nodejs-application

[![Node CI](https://github.com/hexlet-boilerplates/fastify-nodejs-application/workflows/Node%20CI/badge.svg)](https://github.com/hexlet-boilerplates/fastify-nodejs-application/actions)

## Requirements

Needs [mise](https://mise.jdx.dev): it installs Node.js and the project tools from `mise.toml`.

## Setup

```bash
make setup
```

`make setup` also installs the git hooks through hk.

## Database

[Drizzle ORM](https://orm.drizzle.team) on PostgreSQL. The schema is `server/db/schema.js`.

The database is chosen by `DATABASE_URL`:

- set (Render, your own server): the app connects to that PostgreSQL;
- not set: the app runs [PGlite](https://pglite.dev), PostgreSQL embedded in the Node.js process, and keeps the data in `.pglite/`. Nothing to install, no Docker.

Tests always use PGlite in memory.

```bash
make db-generate # create a migration from the schema
make db-migrate  # apply migrations
```

## Run

```bash
make start
# Open localhost:3000
```

---

[![Hexlet Ltd. logo](https://raw.githubusercontent.com/Hexlet/assets/master/images/hexlet_logo128.png)](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=fastify-nodejs-application)

This repository is created and maintained by the team and the community of Hexlet, an educational project. [Read more about Hexlet](https://hexlet.io?utm_source=github&utm_medium=link&utm_campaign=fastify-nodejs-application).
