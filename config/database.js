'use strict';

const Env = use('Env');

module.exports = {
  connection: Env.get('DB_CONNECTION', 'pg'),
  pg: {
    client: 'pg',
    connection: {
      host: Env.get('DB_HOST', 'localhost'),
      port: Env.get('DB_PORT', ''),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis'),
    },
    pool: {
      min: 0,
      max: Number(Env.get('DB_POOL', 5)),
      propagateCreateError: false,
      idleTimeoutMillis: 3000,
      createTimeoutMillis: 3000,
      acquireTimeoutMillis: 3000,
      afterCreate: (conn, done) => {
        const { connection } = conn;
        const { stream } = connection;
        stream.setTimeout(60000);
        stream.on('timeout', () => {
          stream.end();
          connection.emit('end');
        });
        done(null, conn);
      },
    },
    healthCheck: false,
  },
  db_check: Env.get('DB_HEALTH_CHECK', true) === 'true',
};
