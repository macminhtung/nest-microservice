## Run RabbitMQ with Docker
```bash
$ docker pull rabbitmq
$ docker run -d --hostname localhost -p 5672:5672 -e RABBITMQ_DEFAULT_USER=<username> -e RABBITMQ_DEFAULT_PASS=<password> rabbitmq:latest
```

## Running the app

```bash
# development
$ yarn start:dev
```

## Description
Nest Microservice + RabbitMQ


