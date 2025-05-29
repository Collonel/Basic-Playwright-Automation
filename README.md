
# 📁 WYNN_QA_TEST_V1.0 — Automated UI & API Test Suite

This project demonstrates the implementation of a basic automated test suite using **Playwright** (JavaScript), validating both **web UI functionality** and **API endpoints**.

---

## 🧱 Project Folder Structure

```
WYNN_QA_TEST_V1.0/
│
├── .github/                # GitHub workflow or issue templates (if any)
├── fixtures/                # Test data and sample files for uploads
├── node_modules/            # Installed dependencies
├── pages/
│   └── UploadPage.js        # Page Object Model for the Upload UI
├── reports/                 # Generated test reports (e.g., HTML)
├── test-results/            # Default test artifacts from Playwright
│   └── .last-run.json
├── tests/
│   ├── api/
│   │   └── posts.js         # Tests for JSONPlaceholder API endpoints
│   ├── config/              # Config utilities or constants
│   └── ui/
│       └── uploadPage.spec.js # UI test specs for file upload page
│
├── playwright.config.js     # Playwright configuration file
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Exact dependency versions
└── README.md                # Project documentation
```

---

## 🧪 Test Architecture

This project follows the **Page Object Model (POM)** design pattern for the UI layer and organizes tests modularly for clarity and scalability.

### 🔸 UI Tests (Playwright)
- Based on `@playwright/test`
- Leverages `baseURL` configuration for maintainable navigation
- POM structure separates page logic (`UploadPage.js`) from test logic (`uploadPage.spec.js`)
- Test case: File Upload on https://the-internet.herokuapp.com/upload

### 🔸 API Tests (Playwright + REST APIs)
- Tests JSONPlaceholder API endpoints: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`
- Follows  REST testing practices: asserts status codes, response bodies, and CRUD behavior

---

## ⚙️ Setup Instructions

### 1. 📥 Clone the Repository

```bash
git clone https://github.com/your-username/WYNN_QA_TEST_V1.0.git
cd WYNN_QA_TEST_V1.0
```

### 2. 📦 Install Dependencies

Install using `npm` (requires Node.js):

```bash
npm install
```

#### Required Dependencies:

| Package             | Description                           |
|---------------------|---------------------------------------|
| `@playwright/test`  | Playwright test runner                |
| `playwright`        | Playwright automation library         |

If not installed globally, install with:

```bash
npm install --save-dev @playwright/test
npx playwright install
```

---

## 🚀 Running Tests

### 🔹 Run All Tests:

```bash
npx playwright test
```

### 🔹 Run Only UI Tests:

```bash
npx playwright test tests/ui
```

### 🔹 Run Only API Tests:

```bash
npx playwright test tests/api
```

### 🔹 View HTML Report:

```bash
npx playwright show-report
```

---

## ✅ Test Coverage

### UI

- [x] File upload page: `https://the-internet.herokuapp.com/upload`
- [x] Verifies file selection and submission success

### API

| Endpoint         | Method   | Status |
|------------------|----------|--------|
| `/posts`         | GET      | ✅     |
| `/posts/:id`     | GET      | ✅     |
| `/posts`         | POST     | ✅     |
| `/posts/:id`     | PUT      | ✅     |
| `/posts/:id`     | PATCH    | ✅     |
| `/posts/:id`     | DELETE   | ✅     |

---

## ⚠️ Challenges Encountered

1. **Test File Conflicts**: 
   - Initially, importing page object models from within the `tests/` directory caused Playwright to treat them as test files.
   - ✅ Solution: Moved POMs to a top-level `pages/` directory outside of `tests/`.

2. **`@playwright/test` Not Found**: 
   - Occurred when dependencies were not properly installed.
   - ✅ Solution: Ensured correct installation with `npm install --save-dev @playwright/test`.

3. **`baseURL` Usage**:
   - Best practice applied by using `page.goto('/relative-path')` to utilize the `baseURL` config.

---

