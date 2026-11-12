# AGENTS.md

Веб-приложение на Fastify с сессиями, Drizzle ORM и Vite. Сервер лежит в `server/`, миграции в `drizzle/`, стили в `assets/`, тесты в `__tests__/`, данные для тестов в `__fixtures__/`.

## Команды

| Команда | Что делает |
| --- | --- |
| `make setup` | Копирует `.env.example` в `.env`, ставит зависимости, собирает фронтенд и применяет миграции |
| `make install` | Ставит зависимости |
| `make hooks` | Ставит git-хуки hk, нужен mise |
| `make start` | Запускает бэкенд и пересборку стилей вместе |
| `make db-generate` | Создаёт миграцию по изменённой схеме |
| `make db-migrate` | Применяет миграции |
| `make build` | Собирает фронтенд через Vite |
| `make test` | Запускает тесты Jest |
| `make lint` | Проверяет код через oxlint и oxfmt, `Dockerfile` через hadolint и запускает knip |

## Проверки

`make lint` также проверяет Markdown (`rumdl`), опечатки (`typos`) и workflow GitHub Actions (`jactionlint`). knip ищет неиспользуемые файлы и зависимости и только сообщает о них, решение по находкам принимает человек. `make hooks` ставит git-хуки hk, перед коммитом они запускают `make lint`, перед push `make test`.

Перед завершением задачи запусти `make lint` и `make test`, обе команды должны проходить.

## Окружение

Инструменты и их версии задаёт `mise.toml`, ставит их `mise install`.

`make setup` и `make install` обходятся без mise, потому что его нет в образе автопроверки Хекслета и у части студентов. Поэтому хуки ставятся отдельной целью `make hooks`.

Без `DATABASE_URL` в `.env` приложение работает на встроенном PGlite, его данные лежат в `.pglite/`.
