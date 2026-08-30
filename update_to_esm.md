Для обновления проекта предыдущей версии с использованием babel до актуальной версии нужно будет выполнить несколько действий:

- Переименуйте файл _webpack.config.babel.js_ в _webpack.config.js_
- Удалите конфигурацию babel, файл _babel.config.js_ и все зависимости связанные с babel
- В файлах _webpack.config.js_, _knexfile.js_ и всех миграциях _migrations/*.js_ нужно заменить использование синтаксиса commonjs (`require`, `module.exports`, `__dirname`) на аналогичный es6
- В _package.json_ добавьте свойство `"type": "module"`
- Обновите версии зависимостей _knex_, _objection_, _objection-unique_, _fastify-objectionjs_, и установите зависимость _@vscode/sqlite3_. Используйте версии пакетов как в [текущем репозитории](./package.json)
- У файлов содержащих описания моделей _models/*.js_ и _lib/secure.js_ необходимо изменить расширение на _*.cjs_, и использовать в них синтаксис commonjs. Смотрите примеры: [models](./server/models/), [encrypt.cjs](./server/lib/secure.cjs)
- Добавьте использование базового класса [BaseModel](./server/models/BaseModel.cjs)
- В модели [User.cjs](./server/models/User.cjs) в json схеме замените для поля `email` свойство `format: email` на `minLength: 1`
