import { merge } from 'lodash';
import { graphqls2s } from 'graphql-s2s';
import { makeExecutableSchema } from 'graphql-tools';

function importAll(r) {
  return r
    .keys()
    .filter(x => !x.includes('__tests__'))
    .map(x => r(x));
}

const modules = importAll(
  require.context('./graphql/', true, /(\S+\.js)\b(?<!test\.js)$/),
);

let Queries = '';
let Mutations = '';
let Subscriptions = '';
let Schema = '';
let resolvers = {};

modules.forEach(module => {
  if (module.queries) Queries = [...Queries, ...module.queries];
  if (module.mutation) Mutations = [...Mutations, ...module.mutation];
  if (module.subscription)
    Subscriptions = [...Subscriptions, ...module.subscription];
  if (module.schema) Schema = [...Schema, ...module.schema];
  if (module.resolvers) resolvers = merge(resolvers, module.resolvers);
});

const RootQuery = [
  `
  # ### This GraphQL schema was built with [Apollo GraphQL-Tools](https://github.com/apollographql/graphql-tools)
  # _Build, mock, and stitch a GraphQL schema using the schema language_
  #
  # **[Schema Language Cheet Sheet](https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png)**
  #
  # 1. Use the GraphQL schema language to [generate a schema](https://www.apollographql.com/docs/graphql-tools/generate-schema.html) with full support for resolvers, interfaces, unions, and custom scalars. The schema produced is completely compatible with [GraphQL.js](https://github.com/graphql/graphql-js).
  # 2. [Mock your GraphQL API](https://www.apollographql.com/docs/graphql-tools/mocking.html) with fine-grained mocking
  # 3. Automatically [stitch multiple schemas together](https://www.apollographql.com/docs/graphql-tools/schema-stitching.html) into one larger API
  type RootQuery {
    ${Queries}
  }
`,
];

const Mutation = [
  `
  # ### This GraphQL schema was built with [Apollo GraphQL-Tools](https://github.com/apollographql/graphql-tools)
  # _Build, mock, and stitch a GraphQL schema using the schema language_
  #
  # **[Schema Language Cheet Sheet](https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png)**
  #
  # 1. Use the GraphQL schema language to [generate a schema](https://www.apollographql.com/docs/graphql-tools/generate-schema.html) with full support for resolvers, interfaces, unions, and custom scalars. The schema produced is completely compatible with [GraphQL.js](https://github.com/graphql/graphql-js).
  # 2. [Mock your GraphQL API](https://www.apollographql.com/docs/graphql-tools/mocking.html) with fine-grained mocking
  # 3. Automatically [stitch multiple schemas together](https://www.apollographql.com/docs/graphql-tools/schema-stitching.html) into one larger API
  type Mutation {
    ${Mutations}
  }
`,
];

const Subscription = [
  `
  # ### This GraphQL schema was built with [Apollo GraphQL-Tools](https://github.com/apollographql/graphql-tools)
  # _Build, mock, and stitch a GraphQL schema using the schema language_
  #
  # **[Schema Language Cheet Sheet](https://raw.githubusercontent.com/sogko/graphql-shorthand-notation-cheat-sheet/master/graphql-shorthand-notation-cheat-sheet.png)**
  #
  # 1. Use the GraphQL schema language to [generate a schema](https://www.apollographql.com/docs/graphql-tools/generate-schema.html) with full support for resolvers, interfaces, unions, and custom scalars. The schema produced is completely compatible with [GraphQL.js](https://github.com/graphql/graphql-js).
  # 2. [Mock your GraphQL API](https://www.apollographql.com/docs/graphql-tools/mocking.html) with fine-grained mocking
  # 3. Automatically [stitch multiple schemas together](https://www.apollographql.com/docs/graphql-tools/schema-stitching.html) into one larger API
  type Subscription {
    ${Subscriptions}
  }
`,
];

const SchemaDefinition = [
  `
  schema {
    query: RootQuery
    mutation: Mutation
    subscription: Subscription
  }
`,
];

const generalSchema = [...RootQuery, ...Mutation, ...Subscription, ...Schema];

const transpiledSchema = graphqls2s.transpileSchema(generalSchema.join('\n'));

const schema = [...SchemaDefinition, transpiledSchema];

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
  ...(__DEV__ ? { log: e => console.error(e.stack) } : {}),
});
