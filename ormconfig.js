// eslint-disable-next-line @typescript-eslint/no-var-requires
const getenv = require('getenv');

module.exports = {
  type: 'mysql',
  host: getenv('DATABASE_HOST'),
  port: getenv('DATABASE_PORT'),
  username: getenv('DATABASE_USERNAME'),
  password: getenv('DATABASE_PASSWORD'),
  database: getenv('DATABASE_NAME'),
  logging: true,
  migrations: ['src/infrastructure/migrations/*.ts'],
  entities: ['src/domain/**/*.entity.ts'],
  cli: {
    migrationsDir: 'src/infrastructure/migrations',
  },
};
