# Contributing to Cadence.js

Thank you for your interest in contributing to Cadence.js! We welcome contributions from the community to help improve
and grow this project. Please take a moment to read through the guidelines below.

## Getting Started

### Prerequisites

Before you start contributing, ensure you have the following installed:

- Node.js (at least 18) (i recommend using [nvm](https://github.com/nvm-sh/nvm)
- [pnpm](https://pnpm.io/)
- [git](https://git-scm.com/)
- A modern IDE

### Setting up the Development Environment

1. Clone the repository:

   ```bash
   git clone https://github.com/timothee-durand/cadence.git
   cd v1
   ```

2. Install dependencies:
   
   ```bash
   pnpm install
   ```

3. Generate the cadence build for playground (you'll have to do this each time you change the cadence code):

   ```bash
    cd ../v1/ && pnpm generate:playground
    ```

### Structure

This project has 2 packages:

- cadence-js: the library itself, [here](./src/cadence/README.md)
- playground: a playground to test the library, [here](./src/playground/README.md)

### Making Changes

1. Create a new branch for your changes:

   ```bash
   git checkout -b feat/name-of-feature
   ```

2. Make your changes and ensure the tests pass.

3. Commit your changes with a descriptive commit message:

   ```bash
   git commit -m "feat: add new feature"
   ```

4. Push your branch to the remote repository:

   ```bash
   git push origin feat/name-of-feature
   ```

5. Open a pull request on GitHub.

## Coding Guidelines

- Follow the existing coding style and conventions in the project.
- Write clear and concise code with comments where necessary.
- Ensure your code is well-tested
- Ensure the documentation is up-to-date, don't hesitate to add an example to the playground if needed !
- Ensure your code passes the linter and tests.
- Ensure your commit messages are descriptive and follow
  the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format.
- Ensure your pull request description is descriptive and includes a summary of the changes, as well as any relevant
  motivation and context.
- Ensure your pull request title follows the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
  format.
- Ensure your pull request is linked to an issue.
- Ensure your pull request has been reviewed by at least one other contributor.
- Ensure your pull request has been approved by at least one other contributor.

## Feature Requests and Bug Reports

If you find a bug or have a feature request, please open an issue on
the [GitHub repository](https://github.com/timothee-durand/cadence/issues).

## Licensing

By contributing to Cadence.js, you agree that your contributions will be licensed under the
project's [MIT License](LICENSE).

Thank you for contributing to Cadence.js! 🎶🚀
