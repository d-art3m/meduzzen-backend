# Quizzes Backend App

This is a backend API for managing quizzes.

## Tech Stack

- NestJS
- PostgreSQL

## Requirements

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/d-art3m/meduzzen-backend
```

2. Install dependencies:
```bash
npm install
```
3. Copy the `.env.sample` file to create your `.env` file

4. Open the `.env` file and configure the following environment variables:
```bash
# The port on which the app will run (default: 3000)
PORT = 
# The URL of the client application (CORS origin) that is allowed to access the API
CLIENT_URL = 
# Database connection parameters
DB_HOST = 
DB_PORT = 
DB_USERNAME = 
DB_PASSWORD = 
DB_NAME = 
```
## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Running the Application with Docker

### 1. Production Mode
To run the application in production mode

Build the Docker image:
```bash
docker build -t meduzzen-backend .
```

Run the container:
```bash
docker run -p 3000:3000 meduzzen-backend
```

### 2. Development Mode

To start the application in development mode with Docker Compose

Use the provided `docker-compose.yml` file.

Start the services:

```bash
docker-compose up --build
```

To stop the application:

```bash
docker-compose down
```

### 3. Testing
To run tests within the Docker container:

```bash
docker-compose run test
```
