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
PORT = *
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