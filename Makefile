USER_ID := $(shell id -u)
GROUP_ID := $(shell id -g)
HOMEDIR := current

compose-setup: prepare compose-build compose-install compose-db-setup

prepare:
	touch .bash_history
	touch .env
	echo 'USER_ID=$(USER_ID)' > .env
	echo 'GROUP_ID=$(GROUP_ID)' >> .env
	echo 'HOMEDIR=$(HOMEDIR)' >> .env
	echo 'ACTION=' >> .env

compose-build:
	docker-compose build \
		--build-arg USER_ID=$(USER_ID) \
		--build-arg GROUP_ID=$(GROUP_ID) \
		--build-arg HOMEDIR=$(HOMEDIR)

compose-install:
	docker-compose run web npm install

compose-db-setup:
	docker-compose run web npx sequelize db:migrate

compose-bash:
	docker-compose run web bash

compose-lint:
	docker-compose run web make lint

compose:
	ACTION='make start' docker-compose up

compose-develop:
	ACTION='make develop' docker-compose up

compose-kill:
	docker-compose kill

start:
	npm start

develop:
	npm run develop

lint:
	npx eslint .
