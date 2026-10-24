setup: prepare install db-migrate

install:
	npm install
	mise exec -- hk install --mise

db-migrate:
	node server/db/migrate.js

db-generate:
	npx drizzle-kit generate

build:
	npm run build

prepare:
	cp -n .env.example .env || true

start:
	heroku local -f Procfile.dev

start-backend:
	npm start -- --watch --verbose-watch --ignore-watch='node_modules .git .sqlite'

start-frontend:
	npx vite build --watch

lint:
	npx oxlint --deny-warnings && npx oxfmt --check
	rumdl check .
	typos
	jactionlint

test:
	npm test -s
