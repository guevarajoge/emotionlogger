# emotionlogger

Log emotions or expressions in data base. Query this emotions based on 4 emotion categories:

1. Happy
2. Sad
3. Angry
4. Surprised

## Relevance

Emotionlogger is a template based on 2 tables to do queries, feel free to expand the project on your own. If you wish to contribute to expand this project, you are very welcome. Please reffer to the CONTRIBUTING.md guideline

# Getting started

The application uses Node.js via Docker v. `node:15.0.1-alpine3.10`. It provides a `docker-compose.yml` file.

To get started:

- Fork or download
- Open terminal
- Navigate to package.json file `cd api`
- Install dependencies `npm install `
- Go back where the `docker-compose.yml` is located `cd ../`
- Build container `docker-compose build`
- Run Container `docker-compose run`

If the deployment process goes without problem, the tables `emotions` & `e_categories` are created. _For easy acess to the current state of the database tables is recomended to use a sql-GUI_, I used <https://tableplus.com/> for this project.

---

TESTING

- A fast way to test the available endppoints found on `api/src/server.js` is using <https://www.postman.com/>

- To run all available test using `jest npm` you must firts enable the `integration.test.js`:

  - Go to `package.json`
  - Search for `jest` configuration property and erase `"src/integrationtest"` path

  ```
  This application runs a Continuos Integration Pipeline (CI) on the `MAIN branch` via Github. To avoid problems between the CI and the local database, the `integration.test.js` is ignored during the CI processes
  ```

- Navigate to the `api/src` folder and run the all the avalable TEST via terminal `npm run test `

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

```

```
