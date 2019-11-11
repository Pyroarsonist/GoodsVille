import { PostgresPubSub } from 'graphql-postgres-subscriptions';
import debugHandler from 'debug';
import { databaseUrl } from 'config';

const debug = debugHandler('goodsville:pubsub');

const pubsub = new PostgresPubSub({
  connectionString: databaseUrl,
});

pubsub.subscribe('error', err => {
  debug('Pubsub error occurred\n%O', err);
});

export default pubsub;
