Для обновления проекта предыдущей версии с использованием babel до актуальной версии нужно будет выполнить несколько действий:

* Переименуйте файл *webpack.config.babel.js* в *webpack.config.js*
* Удалите конфигурацию babel, файл *babel.config.js* и все зависимости связанные с babel
* В файлах *webpack.config.js*, *knexfile.js* и всех миграциях _migrations/*.js_ нужно заменить использование синтаксиса commonjs (`require`, `module.exports`, `__dirname`) на аналогичный es6
* В *package.json* добавьте свойство `"type": "module"`
* Обновите версии зависимостей *knex*, *objection*, *objection-unique*, *fastify-objectionjs*, и установите зависимость *@vscode/sqlite3*. Используйте версии пакетов как в [текущем репозитории](./package.json)
* У файлов содержащих описания моделей _models/*.js_ и *lib/secure.js* необходимо изменить расширение на _*.cjs_, и использовать в них синтаксис commonjs. Смотрите примеры: [models](./server/models/), [encrypt.cjs](./server/lib/secure.cjs)
* Добавьте использование базового класса [BaseModel](./server/models/BaseModel.cjs)
* В модели [User.cjs](./server/models/User.cjs) в json схеме замените для поля `email` свойство `format: email` на `minLength: 1`
