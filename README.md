# Playwright V3 Automation Framework Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Design Patterns](#architecture--design-patterns)
3. [Project Structure](#project-structure)
4. [Environment Setup](#environment-setup)
5. [Installation Guide](#installation-guide)
6. [Configuration](#configuration)
7. [Test Execution](#test-execution)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)
10. [Contributing](#contributing)

---

## Project Overview

The **Playwright V3 Automation Framework** is a comprehensive test automation solution built with JavaScript and the Playwright framework. This project is specifically designed to facilitate automated functional testing for the ideal-sale-circular application with a focus on maintainability, scalability, and ease of use.

### Key Features
- 🎭 **Playwright Framework**: Cross-browser testing support (Chromium, Firefox, WebKit)
- 🏗️ **Page Object Model (POM)**: Improved test maintenance and reduced code duplication
- 🌍 **Multi-Environment Support**: Local, QA, and Automation environments
- 📊 **Comprehensive Reporting**: Built-in test reporting and logging
- 🔧 **Easy Configuration**: Simple setup and configuration process

### Project Goals
- Create robust automated tests for functional validation
- Implement maintainable test architecture using industry best practices
- Provide easy-to-understand file structure for team collaboration
- Enable efficient test execution across multiple environments

---

## Architecture & Design Patterns

### Page Object Model (POM) Pattern

The project follows the **Page Object Model** design pattern, which provides several advantages:

```
┌─────────────────┐    ┌─────────────────┐
│   Test Specs    │───▶│  Page Objects   │
└─────────────────┘    └─────────────────┘
         │                       │
         │              ┌────────┼────────┐
         │              │        │        │
         ▼              ▼        ▼        ▼
┌─────────────┐  ┌─────────┐ ┌─────────┐ ┌──────────────┐
│ Utilities   │  │Elements │ │ Actions │ │ Validations  │
└─────────────┘  └─────────┘ └─────────┘ └──────────────┘
         │              │        │        │
         └──────────────┼────────┼────────┘
                        │        │
                   ┌────▼────────▼────┐
                   │  Benefits:       │
                   │ • Reusability    │
                   │ • Maintenance    │
                   │ • Readability    │
                   └─────────────────┘
```

### Framework Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    PLAYWRIGHT V3 FRAMEWORK                  │
├─────────────────────────────────────────────────────────────┤
│  TEST LAYER                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Test Specs  │  │ Test Data   │  │ Test Utilities      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  PAGE LAYER                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │Page Objects │  │ Base Page   │  │ Page Components     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  CORE LAYER                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │Playwright   │  │Browser      │  │Environment          │  │
│  │Config       │  │Setup        │  │Config               │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  INFRASTRUCTURE                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ CI/CD       │  │ Reporting   │  │ Logging             │  │
│  │ Pipeline    │  │             │  │                     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
v3-project/
├── 📁 tests/                      # Test specifications
│   ├── content.spec.ts            # Content functionality tests
│   └── ...                       # Additional test files
├── 📁 pages/                      # Page Object Models
│   ├── BasePage.ts               # Base page class
│   ├── LoginPage.ts              # Login page object
│   └── ...                       # Additional page objects
├── 📁 utils/                      # Utility functions
│   ├── helpers.ts                # Helper functions
│   └── constants.ts              # Test constants
├── 📁 config/                     # Configuration files
│   └── environments.ts           # Environment configurations
├── 📁 test-results/              # Test execution results
├── 📁 playwright-report/         # HTML test reports
├── 📄 playwright.config.ts        # Playwright configuration
├── 📄 package.json               # Project dependencies
└── 📄 README.md                  # Project documentation
```

### File Structure Diagram

```
v3-project/
├── 📁 tests/                      # Test specifications
│   ├── content.spec.ts            # Content functionality tests
│   └── ...                       # Additional test files
├── 📁 pages/                      # Page Object Models
│   ├── BasePage.ts               # Base page class
│   ├── LoginPage.ts              # Login page object
│   └── ...                       # Additional page objects
├── 📁 utils/                      # Utility functions
│   ├── helpers.ts                # Helper functions
│   └── constants.ts              # Test constants
├── 📁 config/                     # Configuration files
│   └── environments.ts           # Environment configurations
├── 📁 test-results/              # Test execution results
├── 📁 playwright-report/         # HTML test reports
├── 📄 playwright.config.ts        # Playwright configuration
├── 📄 package.json               # Project dependencies
└── 📄 README.md                  # Project documentation

Directory Structure Visualization:

    ┌─ v3-project ─┐
    │              │
    ├─ tests/      ├─ pages/       ├─ utils/       ├─ config/
    │              │               │               │
    └─ *.spec.ts   └─ *Page.ts     └─ helpers.ts   └─ environments.ts
                                   └─ constants.ts
```

---

## Environment Setup

### Prerequisites

Before setting up the project, ensure you have the following installed:

#### 1. Visual Studio Code
- **Windows**: Download from [VS Code Official Site](https://code.visualstudio.com/)
- **macOS**: Download from [VS Code for macOS](https://code.visualstudio.com/docs/?dv=osx)
- **Linux (Fedora/Red Hat)**:
  ```bash
  sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
  sudo sh -c 'echo -e "[code]\nname=Visual Studio Code\nbaseurl=https://packages.microsoft.com/yumrepos/vscode\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/vscode.repo'
  sudo dnf check-update
  sudo dnf install code
  ```

#### 2. Node.js Installation

**Windows:**
- Download the installer from [Node.js Official Site](https://nodejs.org/es/download/)
- Run the executable installer

**macOS:**
```bash
# Install Homebrew if not already installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

**Linux:**
```bash
# For Fedora/Red Hat
sudo dnf install nodejs npm

# For Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm
```

**Verify Installation:**
```bash
node -v
npm -v
```

---

## Installation Guide

### Step 1: Clone the Repository

Choose one of the following methods:

**HTTPS:**
```bash
git clone https://github.com/fernandofedora/v3-project.git
```

**SSH:**
```bash
git clone git@github.com:fernandofedora/v3-project.git
```

**GitHub CLI:**
```bash
gh repo clone fernandofedora/v3-project
```

### Step 2: Navigate to Project Directory
```bash
cd v3-project
```

### Step 3: Initialize Playwright
```bash
npm init playwright@latest
```

### Step 4: Install Dependencies
```bash
npm install
```

### Installation Flow Diagram

```
INSTALLATION PROCESS

    START
      │
      ▼
┌─────────────┐       ┌─────────────────────┐
│ Node.js     │  NO   │ Install Node.js     │
│ Installed?  │──────▶│ (Windows/Mac/Linux) │
└─────────────┘       └─────────────────────┘
      │ YES                      │
      ▼                          │
┌─────────────────────┐          │
│ Clone Repository    │◀─────────┘
│ git clone <repo>    │
└─────────────────────┘
      │
      ▼
┌─────────────────────┐
│ Navigate to Project │
│ cd v3-project       │
└─────────────────────┘
      │
      ▼
┌─────────────────────┐
│ Initialize          │
│ npm init            │
│ playwright@latest   │
└─────────────────────┘
      │
      ▼
┌─────────────────────┐
│ Install             │
│ Dependencies        │
│ npm install         │
└─────────────────────┘
      │
      ▼
┌─────────────────────┐
│ Verify Installation │
│ node -v / npm -v    │
└─────────────────────┘
      │
      ▼
    READY FOR TESTING!

Status Check Commands:
• node -v    → Check Node.js version
• npm -v     → Check NPM version
• npx playwright --version → Check Playwright
```

---

## Configuration

### Environment Configuration

The project supports multiple testing environments configured through the `testEnvironment` variable:

| Environment | URL | Description |
|-------------|-----|-------------|
| **local** | `https://admin.ideal.sale.local:4300/` | Local development environment |
| **qa** | `https://admin.qadigital-circular.com/` | Quality assurance environment |
| **automation** | `https://admin.canary.sale` | Automation testing environment |

### Setting Environment Variables

**macOS/Linux:**
```bash
export testEnvironment=local
# OR
export TEST_ENVIRONMENT=automation
```

**Windows (Command Prompt):**
```cmd
set testEnvironment=qa
```

**Windows (PowerShell):**
```powershell
$env:testEnvironment="automation"
```

### Playwright Configuration

The `playwright.config.ts` file contains the main configuration settings:

```typescript
// Example configuration structure
export default {
  testDir: './tests',
  timeout: 60000,
  retries: 2,
  workers: 2,
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
};
```

---

## Test Execution

### Basic Test Execution

**Run All Tests:**
```bash
npx playwright test
```

**Run Specific Test File:**
```bash
npx playwright test tests/content.spec.ts
```

**Run Tests with Specific Browser:**
```bash
npx playwright test --project=chromium
```

**Advanced Execution with Custom Parameters:**
```bash
npx playwright test tests/content.spec.ts --project=chromium --timeout=60000 --workers=2
```

### Test Execution Flow

```
TEST EXECUTION SEQUENCE

User               CLI                Playwright           Browser              Application
  │                 │                     │                   │                     │
  │ npx playwright  │                     │                   │                     │
  │     test       ─┼──────────────────▶  │                   │                     │
  │                 │                     │                   │                     │
  │                 │  Load config       ─┼──────────────────▶│                     │
  │                 │                     │                   │                     │
  │                 │                     │ Launch browser   ─┼──────────────────▶  │
  │                 │                     │                   │                     │
  │                 │                     │                   │ Navigate to URL    ─┼──────▶
  │                 │                     │                   │                     │
  │                 │         ╭─────────── FOR EACH TEST ─────────────╮            │
  │                 │         │           │                   │        │            │
  │                 │         │           │ Execute steps    ─┼───────▶│            │
  │                 │         │           │                   │        │            │
  │                 │         │           │                   │ Perform actions   ─┼──▶
  │                 │         │           │                   │        │            │
  │                 │         │           │                   │◀───── Return response│
  │                 │         │           │                   │        │            │
  │                 │         │           │◀──── Report results │        │            │
  │                 │         ╰───────────────────────────────────────╯            │
  │                 │                     │                   │                     │
  │                 │                     │ Generate report  ─┼──────────────────▶  │
  │                 │                     │                   │                     │
  │◀─── Display ────┼─────────────────────┼──────────────────▶│                     │
  │    results      │                     │                   │                     │

EXECUTION COMMANDS:
┌─────────────────────────────────────────────────────────┐
│ npx playwright test                  → Run all tests    │
│ npx playwright test --headed         → Visual mode      │
│ npx playwright test --debug          → Debug mode       │
│ npx playwright test --project=chrome → Specific browser │
│ npx playwright show-report          → View results     │
└─────────────────────────────────────────────────────────┘
```

### Execution Options

| Command | Description |
|---------|-------------|
| `npx playwright test` | Run all tests |
| `npx playwright test --headed` | Run tests in headed mode |
| `npx playwright test --debug` | Run tests in debug mode |
| `npx playwright test --ui` | Run tests with UI mode |
| `npx playwright show-report` | Show HTML report |

---

## Best Practices

### 1. Test Structure
```javascript
// Good test structure example
test.describe('Content Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(process.env.TEST_URL);
  });

  test('should display content correctly', async ({ page }) => {
    // Arrange
    const contentPage = new ContentPage(page);
    
    // Act
    await contentPage.navigateToContent();
    
    // Assert
    await expect(contentPage.contentTitle).toBeVisible();
  });
});
```

### 2. Page Object Implementation
```javascript
// BasePage.ts
export class BasePage {
  constructor(protected page: Page) {}
  
  async navigate(url: string) {
    await this.page.goto(url);
  }
}

// ContentPage.ts
export class ContentPage extends BasePage {
  readonly contentTitle = this.page.locator('[data-testid="content-title"]');
  
  async clickCreateButton() {
    await this.page.click('[data-testid="create-btn"]');
  }
}
```

### 3. Test Data Management
```javascript
// constants.ts
export const TEST_DATA = {
  VALID_USER: {
    email: 'test@example.com',
    password: 'testPassword123'
  },
  TIMEOUT: {
    DEFAULT: 30000,
    LONG: 60000
  }
};
```

### Best Practices Checklist

```
PLAYWRIGHT V3 BEST PRACTICES

┌─ CODE ORGANIZATION ─────────────────────────────┐
│                                                 │
│  📂 Page Object Model (POM)                     │
│     • Create page classes for each page         │
│     • Inherit from BasePage                     │
│     • Separate locators from actions           │
│                                                 │
│  📂 Modular Structure                           │
│     • Group related tests                       │
│     • Use consistent naming conventions         │
│     • Organize utilities and helpers           │
│                                                 │
│  📂 Clear Naming                                │
│     • Descriptive test names                    │
│     • Meaningful variable names                 │
│     • Consistent file naming                    │
│                                                 │
└─────────────────────────────────────────────────┘

┌─ TEST DESIGN ───────────────────────────────────┐
│                                                 │
│  🧪 Independent Tests                           │
│     • No test dependencies                      │
│     • Clean state before each test             │
│     • Use beforeEach/afterEach hooks           │
│                                                 │
│  ✅ Meaningful Assertions                       │
│     • Test one thing at a time                 │
│     • Use appropriate matchers                 │
│     • Clear error messages                     │
│                                                 │
│  📊 Test Data Separation                        │
│     • External test data files                 │
│     • Environment-specific data                │
│     • Avoid hardcoded values                   │
│                                                 │
└─────────────────────────────────────────────────┘

┌─ MAINTENANCE ───────────────────────────────────┐
│                                                 │
│  🔄 Regular Updates                             │
│     • Update dependencies                       │
│     • Refactor obsolete code                   │
│     • Review and optimize tests                │
│                                                 │
│  📚 Documentation                               │
│     • Keep README updated                       │
│     • Comment complex logic                    │
│     • Document test scenarios                  │
│                                                 │
│  👥 Code Reviews                                │
│     • Peer review all changes                  │
│     • Follow coding standards                  │
│     • Share knowledge across team              │
│                                                 │
└─────────────────────────────────────────────────┘

┌─ PERFORMANCE ───────────────────────────────────┐
│                                                 │
│  ⚡ Parallel Execution                          │
│     • Configure multiple workers               │
│     • Use project-specific settings            │
│     • Optimize test execution time             │
│                                                 │
│  ⏱️ Smart Waits                                 │
│     • Use Playwright's auto-waiting            │
│     • Avoid hard-coded timeouts               │
│     • Implement custom wait conditions         │
│                                                 │
│  💾 Resource Optimization                       │
│     • Reuse browser contexts                   │
│     • Clean up after tests                     │
│     • Monitor memory usage                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Environment Variable Not Set
**Error:** `testEnvironment is not defined`
**Solution:**
```bash
# Ensure environment variable is set before running tests
export testEnvironment=local
npx playwright test
```

#### 2. Browser Launch Issues
**Error:** `Browser launch failed`
**Solution:**
```bash
# Install browser dependencies
npx playwright install
npx playwright install-deps
```

#### 3. Test Timeout Issues
**Error:** `Test timeout exceeded`
**Solution:**
```bash
# Increase timeout in command or config
npx playwright test --timeout=90000
```

#### 4. Dependency Issues
**Error:** `Module not found`
**Solution:**
```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install
```

### Troubleshooting Decision Tree

```
TROUBLESHOOTING GUIDE

Test Failure Occurred
         │
         ▼
    ┌─────────────────────┐
    │ Is testEnvironment  │  NO   ┌─────────────────────────────────┐
    │ variable set?       │──────▶│ Set environment variable:       │
    └─────────────────────┘       │ export testEnvironment=local    │
         │ YES                    │ export TEST_ENVIRONMENT=qa      │
         ▼                        └─────────────────────────────────┘
    ┌─────────────────────┐                        │
    │ Are browsers        │  NO   ┌─────────────────┼─────────────────┐
    │ installed?          │──────▶│ Install browsers:               │
    └─────────────────────┘       │ npx playwright install          │
         │ YES                    │ npx playwright install-deps     │
         ▼                        └─────────────────────────────────┘
    ┌─────────────────────┐                        │
    │ Is it a timeout     │  YES  ┌─────────────────┼─────────────────┐
    │ issue?              │──────▶│ Increase timeout:               │
    └─────────────────────┘       │ --timeout=90000                 │
         │ NO                     │ Update playwright.config.ts     │
         ▼                        └─────────────────────────────────┘
    ┌─────────────────────┐                        │
    │ Is it a network     │  YES  ┌─────────────────┼─────────────────┐
    │ connectivity issue? │──────▶│ Check URL accessibility:        │
    └─────────────────────┘       │ ping domain                     │
         │ NO                     │ check firewall settings         │
         ▼                        └─────────────────────────────────┘
    ┌─────────────────────┐                        │
    │ Check test logs     │                        │
    │ and error details   │                        │
    └─────────────────────┘                        │
         │                                         │
         ▼                                         ▼
    ┌─────────────────────────────────────────────────┐
    │              RETRY TEST                         │
    │         npx playwright test                     │
    └─────────────────────────────────────────────────┘

COMMON SOLUTIONS:

Environment Issues:
• Windows: set testEnvironment=local
• macOS/Linux: export testEnvironment=local

Browser Issues:
• npx playwright install --with-deps
• Update Playwright: npm install @playwright/test@latest

Dependency Issues:
• rm -rf node_modules package-lock.json
• npm install

Network Issues:
• Check proxy settings
• Verify URL accessibility
• Check DNS resolution
```

---

## Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/new-test-suite
   ```
3. **Make your changes**
4. **Run tests to ensure everything works:**
   ```bash
   npm test
   ```
5. **Commit your changes:**
   ```bash
   git commit -m "Add new test suite for user management"
   ```
6. **Push to your fork:**
   ```bash
   git push origin feature/new-test-suite
   ```
7. **Create a Pull Request**

### Code Standards

- Follow JavaScript/TypeScript best practices
- Use meaningful variable and function names
- Write clear commit messages
- Add tests for new features
- Update documentation when necessary

### Pull Request Guidelines

```
PULL REQUEST WORKFLOW

Developer creates PR
         │
         ▼
┌─────────────────────┐
│    Code Review      │
│   (Team Members)    │
└─────────────────────┘
         │
         ▼
    ┌─────────────┐       ┌───────────────────────────┐
    │ Do tests    │  NO   │ Fix Issues:               │
    │ pass?       │──────▶│ • Fix failing tests       │
    └─────────────┘       │ • Address code comments   │
         │ YES             │ • Update implementation   │
         ▼                 └───────────────────────────┘
    ┌─────────────┐                │
    │ Is docs     │  NO   ┌────────┼────────────────────┐
    │ updated?    │──────▶│ Update Documentation:      │
    └─────────────┘       │ • README.md changes        │
         │ YES             │ • Code comments            │
         ▼                 │ • API documentation        │
┌─────────────────┐       └────────────────────────────┘
│   MERGE PR      │                │
│   ✅ Approved   │◀───────────────┘
└─────────────────┘

PR CHECKLIST:
□ All tests pass
□ Code follows style guide
□ Documentation updated
□ No merge conflicts
□ Meaningful commit messages
□ Peer review completed

COMMIT MESSAGE FORMAT:
feat: add new test suite for user management
fix: resolve timeout issue in login tests
docs: update installation instructions
refactor: improve page object structure
```

---

## Additional Resources

### Helpful Links
- [Playwright Documentation](https://playwright.dev/)
- [JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

### Support
For questions or issues, please:
1. Check the troubleshooting section
2. Review existing GitHub issues
3. Create a new issue with detailed information

---

**Created with ❤️ for automated testing excellence**

*Last updated: July 2025*
