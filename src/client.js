import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { render } from 'js/baobab-resolver';
import routes from 'js/routes/route';

/**
 * Fire-up React Router.
 */
const reactRoot = window.document.getElementById('react-root');

render(
    <Router routes={routes} history={browserHistory} />,
    reactRoot,
    null,
    { immutable: false }
);

/**
 * Detect whether the server-side render has been discarded due to an invalid checksum.
 */
if (process.env.NODE_ENV !== 'production') {
    if (!reactRoot.firstChild || !reactRoot.firstChild.attributes || !reactRoot.firstChild.attributes['data-react-checksum']) {
        console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
    }
}

