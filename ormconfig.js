module.exports = {
   type: 'mysql',
   host: 'mysql',
   port: 3306,
   username: 'root',
   password: 'password',
   database: 'banker',
   logging: true,
   migrations: [
      'src/infrastructure/migrations/*.ts'
   ],
   entities: [
      'src/domain/**/*.entity.ts'
   ],
   cli: {
      migrationsDir: 'src/infrastructure/migrations',
   }
}
