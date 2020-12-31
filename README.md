# emotionlogger

Log emotions in data base Do queries based on variables

## Relevance

Emotionlogger is a template based on 2 tables to do queries, feel free to expand the project on your own. If you wish to contribute to expand this project, you are very welcome. Please reffer to the CONTRIBUTING.md guideline

## Getting started

The application uses Node.js via Docker v. `node:15.0.1-alpine3.10`. It provides a `docker-compose.yml` file.

To get started:

- Fork or download
- Open terminal
- Navigate to package.json file `cd api`
- Install dependencies `npm install `
- Build container `docker-compose build`
- Run Container `docker-compose run`

If the deployment process goes without problem, the tables `emotions` & `e_categories` are created. _For easy acess to the current state of the database tables is recomended to use a sql-GUI_, I use <https://tableplus.com/> for this project

Use <https://www.postman.com/> to test fast the endpoints

## Resources

- <https://docs.docker.com/>
- <https://jestjs.io/en/>
- <http://knexjs.org/>
- <https://tableplus.com/>
- <https://www.postman.com/>

## Status van the project

beta 1.0.0

## Autor

Jorge Guevara - 2020

jorgeguevara@designingart.eu
