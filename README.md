# todo-web

![checks status](https://github.com/delvify-assessment/todo-web/actions/workflows/pr.yml/badge.svg)

## Description

Web client for accessing to do list project based on JS React and TypeScript.
Mantine library used for UI components.

## Requirements

-   [ ] Docker
-   [ ] Yarn

## Development

### Lifecycle commands

Check linting

```bash
$ yarn lint
```

Fix linting

```bash
$ yarn lint-fix
```

Build app

```bash
$ yarn build
```

Run app

```bash
$ yarn dev
```

### Dependency Management

We use [Yarn](https://yarnpkg.com/getting-started/install).

Install dependencies

```bash
$ yarn install
```

Add dependency

```bash
$ yarn add <package-name>
```

Remove dependency

```bash
$ yarn remove <package-name>
```

### Code Style

-   Code Style Authority - [Prettier](https://prettier.io/docs/en/install.html)

### CI/CD

The service is configured to run CI/CD on GitHub Actions.
The pipeline runs the following steps:

-   Linting (every [push](.github/workflows/pr.yml))
-   Testing (every [push](.github/workflows/pr.yml))
-   Building and Pushing a Docker image to DockerHub (every [push to main](.github/workflows/deploy.yml))

## Project structure

```
├── .github - GitHub Actions configuration (linting, testing, building and pushing Docker image)
├── src - Service code
│   ├── components - React components
│   ├── lib - Service libraries
│   ├── models - Service models
│   ├── pages - React pages
│   ├── providers - React providers
│   ├── api.ts - API client
│   ├── App.tsx - React application
│   ├── endpoints.ts - API endpoints
│   ├── main.tsx - React entry point
│   ├── Routes.tsx - React routes
│   ├── themes.ts - Mantine UI theme
```
