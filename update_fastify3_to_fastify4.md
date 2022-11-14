Для обновления проекта с fastify версии 3 до версии 4 нужно выполнить несколько действий

Удалите библиотеки командой:

```shell
npm uninstall \
  fastify \
  fastify-cli \
  fastify-static \
  fastify-error-page \
  fastify-secure-session \
  fastify-passport \
  fastify-sensible \
  fastify-formbody \
  point-of-view
```

Установите новые библиотеки на замену командой:

```shell
npm i \
  fastify \
  fastify-cli \
  @fastify/formbody \
  @fastify/passport \
  @fastify/secure-session \
  @fastify/sensible \
  @fastify/static \
  @fastify/view
```

Замените файлы **server/plugin** и **server/lib/passportStrategies/FormStrategy.js** на новые из шаблона в этом репозитории. В этих файлах заменены импорты библиотек:

| Старая | Новая |
| --- | --- |
| fastify-passport | @fastify/passport |
| fastify-static | @fastify/static |
| fastify-sensible | @fastify/sensible |
| fastify-formbody | @fastify/formbody |
| fastify-secure-session | @fastify/secure-session |
| point-of-view | @fastify/view |

Библиотека `fastify-error-page` пока не поддерживает fastify 4.x

