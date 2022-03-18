# Node Store Application (Challenge)

## Introduction
    This project was a challenge to build a CRUD from a generic store using microservice pattern. Some of the rules are to build it in nodejs (typescript without a framework like nestjs, adonis etc), to make the persistance layer using NOSQL - using pagination, authentication and following good's code practice.


# Tech Stack Chosen
-   Node v12.18.3 using typescript
-   Mongodb
-   Express
-   End-to-end tests and unit tests with jest, jest-mock-extended e supertest
-   Mongoose as an ORM to communicate with mongo database
-   Basic JWT Authentication using express's middlewares and jsonwebtoken
-   Docker e Docker-compose

# Setup
- Node v12+
- Docker

### Dependencies

```bash
$ yarn install
```

### Docker-compose infrastructure stack

```bash
$ docker-compose up
```

### Run tests and verify cover

```bash
$ yarn test
$ yarn run test:coverage
```

### Compile and run on production mode

```bash
$ yarn build
$ yarn start:prod
```

### Generate image and run on compose stack directly

`Obs: remember to rename image's name on docker-compose-prod.yml and it's version on .env`

```bash
$ USER=rpolnx
$ IMAGE=node-store
$ VERSION=1.0.0
$ docker build -t $USER/$IMAGE:$VERSION .
$ docker-compose -f docker-compose-prod.yml up
```

# Structure and project architecture

## Top level structure:

-   `src` - code from project
-   `test` - tests from project
-   `dist` - build output

## Module structure:

`common` - reusable code and common things along the project

`config` - general configuration

`products` - product's module

`routes` - routes from application

---- `app.ts` - middlewares and server handler

---- `index.ts` - application boostrap

## Good practices

```
Project layers was built applying Dependency Inversion principle, working with the interface and not the concrete interface itself.
This model follow's SOLID good practices and was very helpful to mock lower layers on tests.
```

## Application layer

-   `routes` - handle's routes to controllers
-   `controller` - handles communication between data in/out and do some basic validations
-   `service` - business layer
-   `repository` - create an abstraction to communicate with database without expose his complexity to service's layer

# Routes

## Authentication

-   `POST /authenticate`

```json
{
    "user": "user-to-access",
    "password": "pass"
}
```

```
Obs: remember to configure on application props '.env' this values: 
- JWT_SECRET
- ADMIN_APPLICATION_USERNAME
- ADMIN_APPLICATION_PASSWORD
```

## Authenticated product's route

-   `GET /products?page=0`
    -   Get products from page
    -   query_parameter: page (default page 0, 20 items limit)
-   `GET /products/{id}`
    -   Get's a product from {id}
-   `POST /products`
    -   Create's a product
-   `PUT /products/{id}`
    -   Update's a product from it's {id}
-   `DELETE /products/{id}`
    -   Deletes a product from it's id {id}

# Authentication

-   To get authenticated:

`POST /authenticate`
```json
{
    "user": "febb0daa-75a3-40a9-856c-a556feaab436",
    "password": "2b7d03c6-08e3-4553-b416-89ef8422c532"
}
```

## Collection

-   Collection from insomnia rest client routes on folder `collections`

        Observation: This part could be improved using swagger to expose this route and documentation, but when I did it, i didn't remember to do.

