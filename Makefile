# export NODE_OPTIONS=--openssl-legacy-provider

setup: prepare install db-migrate

install:
	npm install

db-migrate:
	npx knex migrate:latest

build:
	npm run build

prepare:
	cp -n .env.example .env || true

start:
	heroku local -f Procfile.dev

start-backend:
	npm start -- --watch --verbose-watch

start-frontend:
	npx webpack --watch --progress

lint:
	npx eslint .

test:
	npm test -s
