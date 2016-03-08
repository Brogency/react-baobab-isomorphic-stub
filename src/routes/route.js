import React from 'react';
import Base from './index';
import mainRoute from './containers/main/route';
import productRoute from './containers/product/route';

export default {
	component: Base,

	childRoutes: [
		productRoute,
		mainRoute,
	],
};
