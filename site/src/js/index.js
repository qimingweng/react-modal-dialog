import React, {PropTypes} from 'react';
import Router, {Route} from 'react-router';
import routes from './routes';

export default function(path, props, done) {
	Router.run(routes, path, Handler => {
		done(
			'<!doctype html>' +
			React.renderToString(<Handler/>)
		)
	});
}

if (typeof document != 'undefined') {
	Router.run(routes, Router.HistoryLocation, Handler => {
		React.render(<Handler/>, document);
	});
}