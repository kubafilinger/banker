module.exports = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: true,
  migrations: ['src/infrastructure/migrations/*.ts'],
  entities: ['src/domain/**/*.entity.ts'],
  cli: {
    migrationsDir: 'src/infrastructure/migrations',
  },
};
