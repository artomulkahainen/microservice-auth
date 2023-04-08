<h1>Microservice-auth</h1>

## Table of Contents

-   [About the Project](#about-the-project)
-   [Built With](#built-with)
-   [How to run dev environment](#how-to-run-dev-environment)
-   [How to run tests](#how-to-run-tests)

## About The Project

This is a microservice for user authentication and authorization. Project's purpose is to learn techniques and technologies
used in building microservices.

## Built with

    - NodeJS
    - Express
    - Docker

## How to run dev environment

This project is meant to be run with other microservices. Local microservice setup will be included in microservice-deployment repo in the future. Guide to run the whole setup will be included also in that repo.

To run only this microservice on local:

-   install node lts
-   rename ".env.EXAMPLE" to ".env"
-   add port number to .env file
-   `npm install`
-   `npm run dev` (linux) / `npm run devWindows` (windows)

## How to run tests

-   install node lts
-   `npm install`
-   `npm run test` (linux) / `npm run testWindows` (windows)
