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

You should see a log like this: 
````bash
  ❯ make build                                                                                                   
  docker-compose -f ./swagger/docker-compose.yaml up -d && docker-compose up -d && docker-compose ps
  Creating network "swagger_default" with the default driver
  Creating swagger-ui ... done
  Creating network "payments-api_custom_network" with the default driver
  Creating payments-api_mongo_1 ... done
  Creating payments-api_app_1   ... done
          Name                      Command               State            Ports
  ----------------------------------------------------------------------------------------
  payments-api_app_1     bash -c npm install && npm ...   Up      0.0.0.0:3000->3000/tcp
  payments-api_mongo_1   docker-entrypoint.sh mongod      Up      0.0.0.0:27017->27017/tcp

````

# Features

## Create a transaction, and body

user: terminal and password 123456

```bash
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

```bash
  curl -X GET \
    http://localhost:3000/transaction \
    -H 'Authorization: Basic cG9ydGFsOjEyMzQ1Ng==' \
    -H 'Postman-Token: eb0f3aed-1c9a-429e-b9a9-50e40aa7c200' \
    -H 'cache-control: no-cache'
```

## Get the balance of transactions available based on _dataconsulta_ parameter
user: terminal and password 123456

```bash
  curl -X GET \
    http://localhost:3000/balance \
    -H 'Authorization: Basic cG9ydGFsOjEyMzQ1Ng==' \
    -H 'cache-control: no-cache' \
    -H 'dataconsulta: 2019-10-07'
```

## Architecture
  This archteture aims to be easily manteined and developed.\
  Each folder and each file has his responsability declouped oud from each other.

  ````bash
    .
    ├── api - Here we have all related to koajs server.
    │   ├── controllers
    │   └── middlewares
    ├── domain - Here we have all business rules of transactions
    │   └── transaction
    ├── infra - Here we have all config files and database stuff
    │   └── database
    │       └── models
    └── swagger - Here we have all related to swagger docs
  ````

## Feedback

Please feel free to create issues in case of doubts or send a email at andersons.code@gmail.com
