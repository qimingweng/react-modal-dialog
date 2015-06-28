import React, {PropTypes} from 'react';
import Router, {Route, DefaultRoute} from 'react-router';
import RootPage from './pages/RootPage';
import HomePage from './pages/HomePage';

const routes = (
	<Route name="root" path="/" handler={RootPage}>
		<DefaultRoute handler={HomePage}/>
	</Route>
)

export default routes;