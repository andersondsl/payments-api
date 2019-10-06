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

# Features

## Create a transaction, and body and

user: terminal and password 123456

```
  curl -X POST \
    http://localhost:3000/transaction \
    -H 'Authorization: Basic dGVybWluYWw6MTIzNDU2' \
    -H 'Content-Type: application/json' \
    -H 'cache-control: no-cache' \
    -d '{
      "nsu": "0459356",
      "valor": 1000.00,
      "bandeira": "VISA",
      "modalidade": "CREDITO",
      "horario": "2019-10-07T02:00:00.000Z"
    }'
```

## Get all transactions

user: portal and password 123456

```
  curl -X GET \
    http://localhost:3000/transaction \
    -H 'Authorization: Basic cG9ydGFsOjEyMzQ1Ng==' \
    -H 'Postman-Token: eb0f3aed-1c9a-429e-b9a9-50e40aa7c200' \
    -H 'cache-control: no-cache'
```

## Get the balance of transactions available based on _dataconsulta_ parameter
user: terminal and password 123456

```
  curl -X GET \
    http://localhost:3000/balance \
    -H 'Authorization: Basic cG9ydGFsOjEyMzQ1Ng==' \
    -H 'cache-control: no-cache' \
    -H 'dataconsulta: 2019-10-07'
```

## Folder strcuture

    Based on domain drive design, we have that folders.
        - app - Here we have all the controllers and configurations of the koa server.
        - domain - Here we have all the services and repositories, with the business rules of the application.
        - infra - Connections with database, and general configs.

## Feedback

Please feel free to create issues in case of doubts or send a email at andersons.code@gmail.com
