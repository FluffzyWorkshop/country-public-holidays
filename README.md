



## Architectural Concerns

1. I prefer not to make complicated DB queries while summing up free days due to the limited amount of data which is constrained by the year while making the query. It usually is harder to scale the DB rather than scale the application, so I prefer to handle complex computational processes through the application rather than the DB.

2. After data normalization, I expanded the appropriate repository with the decorator design pattern without changing anything on the interface. Then I injected them into the appropriate services so that no requests would be sent to the Enrico API again.

## Database Scheme

https://drawsql.app/fluffzy/diagrams/country-public-holidays

## Assumptions


## Installation

```bash
$ yarn install

OR

# development
 docker-compose up -dev
```

## Docker postgres

```bash
 docker pull postgres

 docker-compose up -postgres
 # note
 create new database and fill env file
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod

OR

# development
 docker-compose up -dev

# production mode
 docker-compose up -prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

