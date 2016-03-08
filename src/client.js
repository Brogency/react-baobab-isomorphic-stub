import React from "react";
import ReactDOM from "react-dom";
import * as ReactRouter from "react-router";
import Transmit from "react-transmit";
import createElementFactory from './create-element-factory';
import tree from './tree';

import routesContainer from "routes/route";

/**
 * Fire-up React Router.
 */
const reactRoot = window.document.getElementById("react-root");
Transmit.render(ReactRouter.Router, {routes: routesContainer, history: ReactRouter.browserHistory, createElement: createElementFactory(tree)}, reactRoot);

/**
 * Detect whether the server-side render has been discarded due to an invalid checksum.
 */
if (process.env.NODE_ENV !== "production") {
	if (!reactRoot.firstChild || !reactRoot.firstChild.attributes ||
	    !reactRoot.firstChild.attributes["data-react-checksum"]) {
		console.error("Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.");
	}
}

