import path from 'path';
import Promise from 'bluebird';
import express from 'express';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { graphql } from 'graphql';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { getDataFromTree } from 'react-apollo';
import PrettyError from 'pretty-error';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { SnackbarProvider } from 'notistack';
import _ from 'lodash';
import ApolloServer, { getContextFromReq } from './apollo';
import createApolloClient from './core/createApolloClient';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import passport from './core/auth/passport';
import scheduler, { cleanup } from './core/scheduler';
import getSession from './core/auth/session';
import router from './router';
import models from './data/models';
import schema from './data/schema';
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import { setRuntimeVariable } from './actions/runtime';
import config from './config';

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const app = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(getSession());
app.use(passport.initialize());
app.use(passport.session());

ApolloServer.install(app);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  if (req.path === config.ws.path) return next();
  try {
    const css = new Set();

    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    const apolloClient = createApolloClient({
      schema,
      rootValue: { request: req },
      context: getContextFromReq(req, res),
    });

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
      schema,
      graphql,
    });

    const initialState = {
      user: req.user
        ? _.pick(req.user, ['id', 'email', 'fullName', 'nickName', 'balance'])
        : null,
    };

    const store = configureStore(initialState, {
      apolloClient,
      cookie: req.headers.cookie,
      fetch,
      // I should not use `history` on server.. but how I do redirection? follow universal-router
      history: null,
    });

    store.dispatch(
      setRuntimeVariable({
        name: 'initialNow',
        value: Date.now(),
      }),
    );

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      fetch,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query,
      // You can access redux through react-redux connect
      store,
      storeSubscription: null,
      // Apollo Client for use with react-apollo
      client: apolloClient,

      user: store.getState().user,
    };

    const route = await router.resolve(context);

    if (route.redirect) {
      return res.redirect(route.status || 302, route.redirect);
    }

    const data = { ...route };
    const rootComponent = (
      <StyleContext.Provider value={{ insertCss }}>
        <SnackbarProvider maxSnack={5} preventDuplicate>
          <App context={context}>{route.component}</App>
        </SnackbarProvider>
      </StyleContext.Provider>
    );
    await getDataFromTree(rootComponent);
    // this is here because of Apollo redux APOLLO_QUERY_STOP action
    await Promise.delay(0);
    data.children = await ReactDOM.renderToString(rootComponent);
    data.styles = [{ id: 'css', cssText: [...css].join('') }];

    const scripts = new Set();
    const addChunk = chunk => {
      if (chunks[chunk]) {
        chunks[chunk].forEach(asset => scripts.add(asset));
      } else if (__DEV__) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk('client');
    if (route.chunk) addChunk(route.chunk);
    if (route.chunks) route.chunks.forEach(addChunk);
    data.scripts = Array.from(scripts);

    let wsHost = req.hostname;
    if (__DEV__) wsHost = `${wsHost}:${config.port}`;

    const wsUrl = `ws${req.httpSecure ? 's' : ''}://${wsHost}${config.ws.path}`;

    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
      apolloState: context.client.extract(),
      wsUrl,
    };

    // eslint-disable-next-line react/jsx-props-no-spreading
    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    return res.send(`<!doctype html>${html}`);
  } catch (err) {
    return next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

if (__DEV__)
  // eslint-disable-next-line no-return-assign
  app.init = new Promise(res => (app.resolve = res));

//
// Launch the server
// -----------------------------------------------------------------------------
const promise = models
  .sync()
  .then(scheduler)
  .then(() => __DEV__ && app.resolve())
  .catch(err => console.error(err.stack));
if (!module.hot) {
  promise.then(() => {
    const server = createServer(app);

    app.apollo.installSubscriptionHandlers(server);

    server.listen(config.port, () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    });
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  app.cleanup = cleanup;
  module.hot.accept('./router');
}

export default app;
