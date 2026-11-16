# Articles API

Backend API project built with NestJS 11 and TypeScript.

## Technologies

- NestJS 11
- TypeScript
- PostgreSQL 16
- Prisma 7
- Docker and Docker Compose
- Swagger
- Cucumber

## Requirements

- Docker Desktop
- WSL 2 (Ubuntu)

## Getting Started

Clone the repository:

```bash
git clone https://github.com/aleksanderwojkowski/articles-api.git
cd articles-api
```

Start the application:

```bash
docker compose up --build -d
```

## API Documentation

Swagger documentation:

http://localhost/api

Health endpoint:

http://localhost/200

## Development Commands

Run commands inside the application container:

```bash
docker compose exec app npm run format
docker compose exec app npm run lint
docker compose exec app npm run test:functional
```

## Stopping the Application

```bash
docker compose down
```
