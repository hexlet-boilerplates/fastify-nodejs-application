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

# Бэкенд и пересборка стилей идут параллельно, Ctrl+C гасит оба
start:
	$(MAKE) -j2 start-backend start-frontend

start-backend:
	npm start -- --watch --verbose-watch --ignore-watch='node_modules .git .sqlite'

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
