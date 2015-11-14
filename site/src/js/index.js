import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import Router from 'react-router';
import routes from './routes';

const main = (path, props, done) => {
  Router.run(routes, path, Handler => {
    done(
      '<!doctype html>' + ReactDOMServer.renderToString(<Handler/>)
    );
  });
};

if (typeof document != 'undefined') {
  Router.run(routes, Router.HistoryLocation, Handler => {
    ReactDOM.render(<Handler/>, document);
  });
}

export default main;
