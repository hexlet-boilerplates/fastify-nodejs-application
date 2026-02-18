# Docker для разработки

Этот проект настроен для работы с Docker в режиме разработки, что решает проблемы со старыми зависимостями.

## Требования

- Docker
- Docker Compose

## Быстрый старт

```bash
# Собрать и запустить приложение
docker compose up

# Или в фоновом режиме
docker compose up -d

# Или с пересборкой
docker compose up --build

# Просмотр логов
docker compose logs -f

# Остановка
docker compose down
```

Приложение будет доступно на http://localhost:3000

## Особенности

- **Легковесный образ**: Docker образ содержит только окружение (Node.js + build tools), без зависимостей проекта
- **Runtime dependencies**: зависимости устанавливаются при запуске контейнера и хранятся в volume
- **Hot-reload**: изменения в коде автоматически применяются без перезапуска контейнера
- **Legacy dependencies**: используется флаг `--legacy-peer-deps` для работы со старыми зависимостями
- **Volume mounting**: исходный код монтируется в контейнер, не нужно пересобирать образ после изменений
- **Автомиграции**: миграции базы данных применяются автоматически при запуске

## Переменные окружения

Создайте файл `.env` в корне проекта (или используйте значения по умолчанию):

```bash
SESSION_KEY=4fe91796c30bd989d95b62dc46c7c3ba0b6aa2df2187400586a4121c54c53b85
```

## База данных

База данных SQLite хранится в файле `database.sqlite` в корне проекта. Файл создается автоматически при первом запуске. Миграции применяются автоматически при запуске контейнера.

## Полезные команды

```bash
# Пересобрать образ
docker compose build

# Пересобрать без использования кэша
docker compose build --no-cache

# Установить зависимости (если контейнер не запущен)
docker compose run --rm app npm ci --legacy-peer-deps

# Запустить команду внутри контейнера
docker compose exec app bash

# Установить дополнительную зависимость
docker compose exec app npm install --legacy-peer-deps <package-name>

# Обновить зависимости
docker compose exec app npm ci --legacy-peer-deps

# Просмотр логов
docker compose logs -f

# Остановить и удалить контейнеры
docker compose down

# Остановить и удалить контейнеры + volumes (включая node_modules)
docker compose down -v

# Запустить тесты
docker compose exec app npm test

# Запустить миграции вручную
docker compose exec app npx knex migrate:latest

# Запустить линтер
docker compose exec app npm run lint
```

## Решение проблем

### Проблемы с установкой зависимостей

Зависимости устанавливаются при запуске контейнера с флагом `--legacy-peer-deps`. Если возникают проблемы:

1. Удалите volume с node_modules и переустановите зависимости:
```bash
docker compose down -v
docker compose up
```

2. Или установите зависимости вручную:
```bash
docker compose run --rm app npm ci --legacy-peer-deps
docker compose up
```

### База данных не создается

База данных создается автоматически. Если возникают проблемы, проверьте права доступа к директории:

```bash
ls -la database.sqlite
```

### Порт 3000 занят

Измените порт в `docker-compose.yml`:

```yaml
ports:
  - "3000:3000"  # Внешний:Внутренний
```

### Изменения в коде не применяются

Проверьте, что volume правильно смонтирован:

```bash
docker compose exec app ls -la /app
```

Если проблема сохраняется, перезапустите контейнер:

```bash
docker compose restart
```
