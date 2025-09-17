# PlaywrightMCP

**PlaywrightMCP** is a TypeScript-based UI automation framework built with [Playwright](https://playwright.dev/), following the **Page Object Model (POM)** design pattern.  
It includes structured test flows, reusable page components, and support for data-driven testing — all generated or enhanced using **Playwright MCP** and **LLMs** for rapid test creation.

---

##  Features

- End-to-end UI testing with Playwright
- Page Object Model (POM) for maintainability
- Structured folders for data, context, and tests
- Data-driven test execution
- Cross-browser support (Chromium, Firefox, WebKit)
- Rich HTML test reports with screenshots on failure
- Easily configurable and extendable

---

## 🗂️ Project Structure

```bash
PlaywrightMCP/
├── bank/
│   ├── TestContext/     # Shared setup, fixtures, utilities
│   ├── TestData/        # Test data (JSON, CSV, etc.)
│   └── Tests/           # Actual test files/specs
├── node_modules/        # Project dependencies
├── pages/               # Page Object Model (POM) classes
├── playwright-report/   # HTML report generated after test run
├── test-results/        # Raw results, screenshots, logs
├── package.json         # NPM scripts and dependencies
├── package-lock.json    # Exact versions of installed packages
├── playwright.config.ts # Playwright configuration
└── README.md            # This documentation file


📦 Installation
Prerequisites:
Node.js (v14 or higher)
Git

Setup:
Clone my repository.
Install dependencies: npm install

Running Tests:
npx playwright test

Configuration:
All test config is in playwright.config.ts.

License:
This project is licensed under the MIT License


