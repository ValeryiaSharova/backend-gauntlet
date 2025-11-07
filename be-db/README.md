# be-db

Development database

## Pre requirements

- `node.js`: `22.*`
- `yarn`: `4.*`
- `docker`: `20.*` or higher
- `docker compose`: `2.*` or higher
- [shared](../shared/README.md)

## Development

1. install `node`, `yarn` and `docker`
2. run `yarn install`
3. run `yarn run pg:start` to start the database in Docker
4. run `yarn run "make migrate" up` to apply migrations

The database runs in a Docker container and is available on port `5433`.

## How to check?

- Use the [dbdiagram.io](https://dbdiagram.io/) [scheme](./postgres.dbml) to view the structure of the database.
- Use [TablePlus](https://tableplus.com/) or alternative tool to view the database.

## Available Scripts

In the project directory, you can run:

### `yarn run build`

Build the package for production to the `build` folder.

### `yarn run watch`

Watch code changes and rebuild package.

### `yarn run lint`

Run eslint.

### `yarn run "make migrate" [command]`

Run migrations.\
Available commands: `up`, `down`, `create`, and others.\
See the [documentation](https://www.npmjs.com/package/node-pg-migrate) for the `node-pg-migrate` package for details.

Examples:

- `yarn run "make migrate" up` - apply all migrations
- `yarn run "make migrate" down` - rollback the last migration
- `yarn run "make migrate" create migration-name` - create a new migration

### `yarn run pg:start`

Start the database in Docker container in the background.

### `yarn run pg:stop`

Stop and remove the Docker container with the database.
