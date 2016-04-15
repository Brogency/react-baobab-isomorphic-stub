import babelPolyfill from 'babel-polyfill';
import Koa from 'koa';
import koaProxy from 'koa-proxy';
import koaStatic from 'koa-static';
import convert from 'koa-convert';
import React from 'react';
import { match as routerMatch, RouterContext } from 'react-router';

import initialRoutes from 'js/routes/route';
import { renderToString } from 'js/baobab-resolver';

function match(options) {
  return new Promise((resolve) => {
    routerMatch(options, (...args) => resolve(args));
  });
}

try {
  const app = new Koa();
  const hostname = '0.0.0.0';
  const port = process.env.PORT || 8000;
  let routes = initialRoutes;
  app.use(convert(koaStatic('static')));

  app.use(async (ctx, next) => {
    const webserver = __PRODUCTION__ ? '' : `//${ctx.hostname}:8080`;
    const location = ctx.path;

    const [error, redirectLocation, renderProps] = await match({ routes, location });

    if (redirectLocation) {
      ctx.redirect(redirectLocation.pathname + redirectLocation.search, '/');
      return;
    }

    if (error || !renderProps) {
      await next(error);
      return;
    }

    const { reactString, initialTree } = await renderToString(<RouterContext {...renderProps} />);

    ctx.type = 'text/html';
    ctx.body = (
      `<!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Stub Project</title>
          </head>
          <body>
            <div id="react-root">${reactString}</div>
          </body>
          <script>
            window.__TREE__ = ${JSON.stringify(initialTree)};
          </script>
          <script src='${webserver + '/dist/client.js'}'></script>
        </html>`
    );
    await next();
  });

  app.listen(port, () => {
    console.info('==> ✅  Server is listening');
    console.info('==> 🌎  Go to http://%s:%s', hostname, port);
  });

  if (__DEV__) {
    if (module.hot) {
      console.log('[HMR] Waiting for server-side updates');

      module.hot.accept('js/routes/route', () => {
        routes = require('js/routes/route').default;
      });

      module.hot.addStatusHandler((status) => {
        if (status === 'abort') {
          setTimeout(() => process.exit(0), 0);
        }
      });
    }
  }
}
catch (error) {
  console.error(error.stack || error);
}
