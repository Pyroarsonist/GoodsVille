import { ApolloServer } from 'apollo-server-express';
import schema from 'data/schema';

const server = new ApolloServer({
  schema,
  playground: __DEV__,
  formatError(err) {
    if (__DEV__) return err;
    // not to expose any similar endpoints
    if (err.message.includes('Did you mean')) {
      err.message = 'Access denied'; // eslint-disable-line no-param-reassign
      err.extensions.code = 'INTERNAL_SERVER_ERROR'; // eslint-disable-line no-param-reassign
    }
    return err;
  },
  introspection: __DEV__,
  debug: __DEV__,
});

/**
 * Install apollo server on express server
 * @this ApolloServer
 * @param app
 */
server.install = function install(app) {
  this.applyMiddleware({ app });
  // eslint-disable-next-line no-param-reassign
  app.apollo = this;
};

export default server;