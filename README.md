# Codat - React Micro-frontend Template 

React starter kit for micro-frontend enabled Codat internal projects.

## App quick-start guide
Steps to get up and running with the app produced by this template repo.

1. Make sure you have [Node LTS](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/lang/en/) installed. Make sure you have `node`, `npm`, and `yarn` commands on your path.
2. Open this app in visual studio code.
3. Install dependencies by running `yarn`.
4. Open the file `.env` and find the HOST variable. Add an entry for this, resolving to `127.0.0.1`, to your windows hosts file, found at `C:\Windows\System32\drivers\etc\hosts`.
    - E.g. add a line `127.0.0.1 app-local.codat.io` to the bottom of the file.
5. Run `yarn run start` to start the app running locally in development mode. This should open a browser window to the correct address.
6. Tests can be run using `yarn run test` for Jest tests and `yarn run test:cypress` for Cypress tests. Opening Cypress for the first time may take a few attempts.

## Template quick-start guide
Steps to create a new app from this template repo. Please delete these steps from the readme after your app is set up.

1. [Initial setup](#initial-setup)
2. [(Optional) set up micro frontend](#mfe-setup)
3. [(Optional) set up authentication](#auth-setup)
4. [Set up build pipeline](#pipeline-setup)
5. [Set up infrastructure](#infrastructure-setup)

#### Initial setup <a name="initial-setup"></a>
1. Copy over template files to your application.
2. Install dependencies using `yarn`.
3. In `App.tsx`, add the `appId` to the `OrchardProvider`.
4. In `bootstrap.tsx`, update the `appName` in `AnalyticsProvider`.
5. In `index.html`, and `noscript.html`, update the `title`.
6. In `package.json`, update the `name` and `description` values. Remove the `prepare` script.
7. Update the [Slack bot](https://github.com/mdcg/slack-hermes]) config in `codat.json` to send PR notifications to the correct Slack channel.
   
#### (Optional) Setup micro frontend <a name="auth-setup"></a>
If you are using this template to create a micro-front end:
   1. In `.env`, update the values `HOST` and `REMOTE_APP_NAME`.
   2. In `config/index.ts`, update the `Window`'s `AppConfig` field to something else.
   
#### (Optional) Set up authentication <a name="mfe-setup"></a>
If you are using Codat auth, in `config/oidcConfig.ts`:
   1. If you are creating a new client, it will need to be added to Identity. This is done by adding to API.
   2. Update the `clientId` field.
   3. Change `autoSignIn` to `true`.

#### Set up build pipeline <a name="pipeline-setup"></a>
1. Create a build in azure pipelines which uses `azure-pipelines.yml`. This file now uses the `YamlTemplates` repo.
   1. The only required field for this template is `AppName`. This is what's used for accessing sonarcloud so ensure your `AppName` follows this pattern `Codat - SonarCloud - ${{parameters.AppName}} UI`
   2. More information on the optional fields can be found in the [frontend sample file](https://dev.azure.com/codat/Codat/_git/YAMLBuildTemplates?path=/Build/Frontend.yml)
2. Set up SonarCloud using [this confluence guide](https://codatdocs.atlassian.net/wiki/spaces/TECH/pages/1471774803/Deploy+a+new+website+to+Azure+using+the+frontend+template#SonarQube-Setup).
3. Create a build in azure pipelines for dependabot using the `check-dependencies.yml`file
   3. The only required field will be `TeamName` which you can find in [Azure teams](https://dev.azure.com/codat/Codat/_settings/teams)
   4. All of the optional fields are explained in the [dependabot sample file](https://dev.azure.com/codat/Codat/_git/YAMLBuildTemplates?path=/Samples/Extras_Dependabot.yml)

#### Set up infrastructure <a name="infrastructure-setup"></a>
1.  Update the values in `Program.fs` to be correct for your app.
2.  Rename the Codat.TemplateUi.sln file to something appropriate for your app.

### Build the application

`yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

## Imports

Absolute imports are preferred using webpack's resolve configuration.  Commonly used `src/` folders can be added to the existing configuration in `config/paths.js`.

## Testing

Tests are run with Jest, React-Testing-Library, and Cypress. Jest tests are usually placed in `__tests__` folder relative to the file you are testing. Cypress integration tests are placed in the `cypress/e2e` folder.

Testing frameworks used:
  - [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/)
  - [jest](https://jestjs.io/)
  - [cypress](https://www.cypress.io/)

- To run Jest tests in watch mode, run command `yarn test:watch`.
- To run Cypress tests, run command `yarn test:cypress`. Opening Cypress for the first time may take a few attempts.

## Linting

The application uses eslint and stylelint with the standard React configuration to lint the application.  Husky and lint-staged are included to run linting before a commit.

The first time you use the template you will need to install pre-commit hooks to run linting:

1. `yarn prepare`
2. `npx husky add .husky/pre-commit npx lint-staged`

To run linting manually:

- `yarn lint-check`
- `yarn lint-fix`

The pre-commit check will also attempt to format your changes with [Prettier](https://prettier.io/)

To run formatting manually:

- `yarn format-check`
- `yarn format-fix`

## Orchard / Fonts

The Codat Orchard library is included as a dependency, along with the stylesheet.

The Axiforma fonts are referenced in the `index.css` stylesheet.

## Host

Starting the application will run the app on the hostname defined in `.env`.  You will need to change this and add a reference to it in your hosts file, usually found at C:\Windows\System32\drivers\etc\hosts.

## Azure

For information on how to set up this application in azure, visit [Confluence](https://codatdocs.atlassian.net/wiki/spaces/TECH/pages/1471774803/Deploy+a+new+website+to+Azure+using+the+frontend+template)

## Environment Configuration

To configure environment variables for use in the application, visit the 'Environment variables' setup section in the confluence docs.

After this you will need to add the new variables to the ```/src/config/env.js``` file.

## Micro Frontend Configuration

By default, the template exposes the `App` component as a remote component that can be imported by another app. The remote host name defaults to `codat_app_template`.

To change the remote host name, edit `REMOTE_APP_NAME` variable in the `.env` file.

This is read by the webpack config to configure the Module Federation plugin, which handles the micro frontend build.  Check the `config/webpack.plugins.js` file to see the configuration.

