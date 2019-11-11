if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

require('dotenv').config();

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,

  // https://expressjs.com/en/guide/behind-proxies.html
  trustProxy: process.env.TRUST_PROXY || 'loopback',

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl:
      process.env.API_SERVER_URL ||
      `http://localhost:${process.env.PORT || 3000}`,
  },

  // Database
  databaseUrl: process.env.DATABASE_URL,

  // Authentication
  auth: {
    jwt: { secret: process.env.JWT_SECRET || 'fict-is-73-na-meste' },
    tokenName: process.env.AUTH_TOKEN_NAME || '_tn_',
    session: {
      name: '_ss',
      secret: 'SECreT_sEcssdon',
    },
  },
  keepAlive: process.env.KEEP_ALIVE_WS || 60000,
  ws: {
    url: process.env.WS_URL || 'ws://localhost:3000',
    path: process.env.WS_PATH || '/subscriptions',
  },
};
