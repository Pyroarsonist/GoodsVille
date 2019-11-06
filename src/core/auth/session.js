import session from 'express-session';
import PGSession from 'connect-pg-simple';
import { auth, databaseUrl } from 'config';

export default function() {
  const SessionInstance = PGSession(session);
  const store = new SessionInstance({
    tableName: 'Session',
    conString: databaseUrl,
  });

  return session({
    store,
    name: auth.session.name,
    resave: false,
    saveUninitialized: false,
    secret: auth.session.secret,
    unset: 'destroy',
  });
}
