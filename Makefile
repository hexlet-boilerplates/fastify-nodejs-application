setup: prepare install build db-migrate

install:
	npm install

# mise пока раскатан не везде: его нет в образе автопроверки Хекслета и у части
# студентов. Поэтому setup и install без него обходятся, а git-хуки hk ставятся
# отдельной целью для тех, у кого mise есть.
hooks:
	mise exec -- hk install --mise

db-migrate:
	node server/db/migrate.js

db-generate:
	npx drizzle-kit generate

build:
	npm run build

prepare:
	cp -n .env.example .env || true

# Бэкенд и пересборка стилей идут параллельно с подписанным выводом; падение одного гасит оба
start:
	npx concurrently -k -n backend,frontend "make start-backend" "make start-frontend"

start-backend:
	npm start -- --watch --verbose-watch --ignore-watch='node_modules .git .pglite'

start-frontend:
	npx vite build --watch

lint:
	npx oxlint --deny-warnings && npx oxfmt --check
	rumdl check .
	typos
	jactionlint
	$(MAKE) --no-print-directory knip
	hadolint Dockerfile

test:
	npm test -s

# Только отчёт, без --fix: находки решает человек
knip:
	npx knip
