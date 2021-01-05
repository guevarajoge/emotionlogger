# Contributing

If you are working on your first pull request, you can reffer to [How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

You always want to look at this file before contributing. In here you should find steps that you need to take to set up your development environment as well as instructions for coding standards and contributing guidelines.

## Acceptable Contributions

I only accept pull requests that:

- fix bugs for existing functions
- enhance the API or implementation of an existing function
- adding more test

In the case of adding a new function:

- document where the original source came from
- document the path where the function is exported

**Also, please discuss any changes in the issues before working on a PR to make sure that I'll accept it**

## Setup Instructions

1.  Fork the repo
1.  Clone your fork
1.  Create a branch
1.  Navigate to package.json file `cd api`
1.  Install dependencies `npm install `
1.  Go back where the `docker-compose.yml` is located `cd ../`
1.  Build container `docker-compose build`
1.  Run Container `docker-compose run`
1.  Run Test `reffer under to GUIDANCE FOR TEST`
1.  Make your changes and try to make the test past
1.  If things are working for you, add your changes with `git add .`
1.  Commint your changes with `git commit -m "<your message>" `
1.  Push your changes to your fork with `git push`
1.  Create a pull request.
1.  Iterate on the solution.
1.  Get merged!

## Guidance for test

One way you can contribure to the project is by adding more test

- A fast way to test the available endppoints found on `api/src/server.js` is using <https://www.postman.com/>

- To run all available test using `jest npm` you must firts enable the `integration.test.js`:

  - Go to `package.json`
  - Search for `jest` configuration property and erase `"src/integrationtest"` path

  ```
  This application runs a Continuos Integration Pipeline (CI) on the `MAIN branch` via Github. To avoid problems between the CI and the local database, the `integration.test.js` is ignored during the CI processes
  ```

- Navigate to the `api/src` folder and run the all the avalable TEST via terminal `npm run test `

## Roadmap and vision

I invision that this porject could expand. That the entries could be made via phone or remotely with easy access. That the entries could be made via heat sensors and that the community will be active in defining what can be consider as emotions.

## Get in touch

jorgeguevara@designingart.eu
