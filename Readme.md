# Payments Api

This is a nodejs application, build up with koajs, mongo.

## Features

<dl>
  <dt>Basic Authentication</dt>
  <dt>Create Credit Card transactions</dt>
  <dt>Show all transactions</dt>
  <dt>Get a balance of all transactions available at this time.</dt>
  <dt>Database integration</dt>
</dl>

## Quick start

1. Clone the repository with `git clone --depth=1 https://github.com/andersondsl/payments-api`
2. Run `make build`, to spin up the containers, and `make down` to stop them.
3. The server will be available at `http://localhost:3000/` and swagger docs at `http://localhost:8082/`

## Routes
 All routes pass by the Authenctication Middlware, you always need to pass a basic authentication token
 described below

 `GET http://localhost:3000/transaction` access with portal:123456, `Basic cG9ydGFsOjEyMzQ1Ng==`
 
 `POST http://localhost:3000/transaction` access with portal:123456, `Basic dGVybWluYWw6MTIzNDU2`
 
 `GET http://localhost:3000/balance` access with portal:123456 `Basic cG9ydGFsOjEyMzQ1Ng==`

## Folder strcuture
    Based on domain drive design, we have that folders.
        - app - Here we have all the controllers and configurations of the koa server.
        - domain - Here we have all the services and repositories, with the business rules of the application.
        - infra - Connections with database, and general configs.

## Feedback
  Please feel free to create issues in case of doubts or send a email at andersons.code@gmail.com

