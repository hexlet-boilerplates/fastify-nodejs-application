// @ts-check

import fp from 'fastify-plugin';
import methodOverrideModule from 'fastify-method-override';

// fastify-method-override — CJS-пакет с `exports.default`, поэтому Node отдаёт
// `module.exports` целиком. Обычно `.default` разворачивает сам `app.register`,
// но здесь плагин вызывается напрямую, так что разворачиваем вручную.
const methodOverride = methodOverrideModule.default ?? methodOverrideModule;

/**
 * fastify-method-override@1.5.10 (последний релиз — февраль 2023) объявлен как
 * `async (fastify, opts, next)` и при этом вызывает `next()`. Fastify 4 такое терпел,
 * а Fastify 5 падает с ошибкой «mixes async and callback styles».
 *
 * Вызываем плагин напрямую, подставляя пустой `next`, и заворачиваем в fastify-plugin,
 * чтобы `addHook('onRoute')` и `setNotFoundHandler` внутри него применялись
 * к родительскому инстансу, а не к инкапсулированному дочернему.
 */
export default fp(
  async (app, opts) => {
    await methodOverride(app, opts, () => {});
  },
  { name: 'fastify-method-override' },
);
