import babelPolyfill from "babel-polyfill";
import koa from "koa";
import koaProxy from "koa-proxy";
import koaStatic from "koa-static";
import React from "react";
import ReactDOM from "react-dom/server";
import { match, RouterContext } from 'react-router';

import routesContainer from "routes/route";
import { renderToString } from 'baobab-resolver';

try {
	const app      = koa();
	const hostname = process.env.HOSTNAME || "localhost";
	const port     = process.env.PORT || 8000;
	let   routes   = routesContainer;

	app.use(koaStatic("static"));

	app.use(function *(next) {
		yield ((callback) => {
			const webserver = __PRODUCTION__ ? "" : `//${this.hostname}:8080`;
			const location  = this.path;

			match({routes, location}, (error, redirectLocation, renderProps) => {
				if (redirectLocation) {
					this.redirect(redirectLocation.pathname + redirectLocation.search, "/");
					return;
				}

				if (error || !renderProps) {
					callback(error);
					return;
				}

                                renderToString(<RouterContext {...renderProps} />).then(({ reactString, initialTree }) => {
                                    this.type = "text/html";
                                    this.body = (
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

                                    callback(null);
				}).catch(e => {
				callback(e);
				});
			});
		});
	});

	app.listen(port, () => {
		console.info("==> ✅  Server is listening");
		console.info("==> 🌎  Go to http://%s:%s", hostname, port);
	});

	if (__DEV__) {
		if (module.hot) {
			console.log("[HMR] Waiting for server-side updates");

			module.hot.accept("routes/route", () => {
				routes = require("routes/route");
			});

			module.hot.addStatusHandler((status) => {
				if (status === "abort") {
					setTimeout(() => process.exit(0), 0);
				}
			});
		}
	}
}
catch (error) {
	console.error(error.stack || error);
}
