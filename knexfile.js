module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './database/auth.db3',
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    migrations: {
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },
  testing: {//knex migrate:latest --env testing
    client: 'sqlite3',
    connection: {
      filename: './database/tester.db3'
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn,done)=>{//make sure this is in production object too later
        conn.run('PRAGMA foreign_keys = ON', done)
      }
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
  },
};
