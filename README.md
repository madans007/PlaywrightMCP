# Bank Project

This project is a testing suite built using Playwright, designed to automate browser interactions and validate web applications.

## Project Structure

PlaywrightMCP/
├── bank/ # Test specifications for banking domain or related features
├── pages/ # Page Object Model (POM) classes representing web pages/components
├── test-results/ # Generated test reports, screenshots, and logs
├── package.json # NPM dependencies and scripts
├── playwright.config.ts # Playwright configuration file
├── tsconfig.json # TypeScript compiler configuration
├── README.md # Project documentation
└── ... # Other supporting files and configs

## Getting Started

To set up the project, follow these steps:

1. **Clone the repository** (if applicable):
   ```
   git clone <repository-url>
   cd bank
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the tests**:
   ```
   npx playwright test
   ```

## Writing Tests

Tests are located in the `tests` directory. You can create new test files or modify existing ones. Each test file should export a test suite using Playwright's API.

## Utility Functions

Utility functions can be found in `tests/helpers/utils.ts`. These functions can be imported into your test files to help with common tasks.

## Configuration

The Playwright configuration can be found in `playwright.config.ts`. You can adjust settings such as timeouts and test directories as needed.

## License

This project is licensed under the MIT License.