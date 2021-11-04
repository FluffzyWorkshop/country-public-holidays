
## Description

https://drawsql.app/fluffzy/diagrams/country-public-holidays



## Assumptions



## Installation

```bash
$ yarn install
```

## DOCKER POSTGRES

```bash
 docker pull postgres

 docker-compose up -postgres
    -create database and fill env file

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

 docker-compose up -dev

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

