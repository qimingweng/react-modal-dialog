import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import RootPage from './pages/RootPage';
import HomePage from './pages/HomePage';

const routes = <Route name="root" path="*" handler={RootPage}>
  <DefaultRoute handler={HomePage}/>
</Route>;

export default routes;
