setup:
	npm install

prepare:
	touch .env

start:
	npm start

develop:
	npx nodemon --exec npx babel-node server/bin/server.js

lint:
	npx eslint .
