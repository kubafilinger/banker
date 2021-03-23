## Installation

```bash
$ npm install
$ npm run migration
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## TypeORM

### Generate migration
```
npm run typeorm migration:generate -- -n MigrationName
```
### Run migrations

```
npm run typeorm migration:run
```

## Deploy
```
npm i
npm run build
cp .env dist/.env
mv dist/main.js dist/app.js
devil www restart banker.kubafilinger.pl
```
