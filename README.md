
## Architectural Concerns

1. I prefer not to make complicated DB queries while summing up free days due to the limited amount of data which is constrained by the year while making the query. It usually is harder to scale the DB rather than scale the application, so I prefer to handle complex computational processes through the application rather than the DB.

2. After data normalization, I expanded the appropriate repository with the decorator design pattern without changing anything on the interface. Then I injected them into the appropriate services so that no requests would be sent to the Enrico API again.

## Database Scheme

https://drawsql.app/fluffzy/diagrams/country-public-holidays

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

## Author

> Tolga Özen

> tolga@fluffzy.com

## License

MIT License

Copyright (c) 2021 Tolga Özen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
