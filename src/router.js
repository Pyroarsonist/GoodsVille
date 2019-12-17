import UniversalRouter from 'universal-router';
import { isFunction } from 'lodash';
import routes from './routes';

export default new UniversalRouter(routes, {
  async resolveRoute(context, params) {
    if (isFunction(context.route.load)) {
      const route = await context.route.load(context, params);
      if (isFunction(route.default)) return route.default(context, params);
      // eslint-disable-next-line no-param-reassign
      if (route?.default) context.route.children = [route.default];
      return undefined;
    }
    if (isFunction(context.route.action)) {
      return context.route.action(context, params);
    }
    return undefined;
  },
});
