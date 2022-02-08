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
	# npx nodemon --exec npx babel-node server/bin/server.js
	npm start -- --verbose-watch -l info -P

start-frontend:
	npx webpack --watch --progress

lint:
	npx eslint .

test:
	SESSION_KEY=4fe91796c30bd989d95b62dc46c7c3ba0b6aa2df2187400586a4121c54c53b85 \
	NODE_OPTIONS=--experimental-vm-modules \
		     npm test -s
