# automation-project

A **Playwright + TypeScript** end-to-end test automation suite for [AutomationExercise.com](https://www.automationexercise.com), built using the **Page Object Model (POM)** design pattern.

---

## 📁 Project Structure

```
automation-project/
├── pages/
│   ├── authPage.ts          # Login & logout page actions
│   └── productPage.ts       # Product listing & cart actions
├── tests/
│   ├── login.spec.ts        # Test: user login
│   ├── logout.spec.ts       # Test: user logout
│   ├── addToCart.spec.ts    # Test: add product to cart
│   └── checkout.spec.ts     # Test: checkout flow
├── utils/
│   └── test-data.ts         # Centralised test credentials
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json            # TypeScript compiler options
├── package.json             # Dependencies and metadata
└── .gitignore
```

---

## 🧰 Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Playwright](https://playwright.dev/) | ^1.60.0 | Browser automation & test runner |
| TypeScript | via `@types/node ^25.9.1` | Type-safe test authoring |
| dotenv | ^17.4.2 | Environment variable management |
| Node.js | Any LTS | Runtime |

---

## ⚙️ Configuration (`playwright.config.ts`)

| Setting | Value |
|---------|-------|
| **Test directory** | `./tests` |
| **Base URL** | `https://www.automationexercise.com` |
| **Browser** | Chromium |
| **Timeout** | 60 seconds per test |
| **Headless** | `true` in CI, `false` locally |
| **Slow motion** | 800 ms locally, 0 in CI |
| **Screenshots** | On failure only |
| **Video** | Retained on failure |
| **Reporter** | HTML (auto-open disabled) |

Headless and slowMo are toggled automatically via the `CI` environment variable, so local runs show the browser and CI runs are fully headless.

---

##  Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

```bash
git clone <your-repo-url>
cd automation-project
npm install
npx playwright install chromium
```

### Run all tests

```bash
npx playwright test
```

### Run a specific test file

```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/checkout.spec.ts
```

### Run in headed (visible browser) mode

```bash
npx playwright test --headed
```

### View the HTML report

```bash
npx playwright show-report
```

---

##  Page Object Model

### `pages/authPage.ts` — `AuthPage`

Handles all authentication-related browser interactions.

| Method | Description |
|--------|-------------|
| `gotoLogin()` | Navigates to `/login` |
| `login(email, password)` | Fills credentials and clicks the login button; asserts "Logged in as" is visible |
| `logout()` | Clicks the logout link; asserts it is visible first |

**Selectors used:**
- `input[data-qa="login-email"]`
- `input[data-qa="login-password"]`
- `button[data-qa="login-button"]`
- `a[href="/logout"]`
- `text=Logged in as`

---

### `pages/productPage.ts` — `ProductPage`

Handles product listing and cart interactions.

| Method | Description |
|--------|-------------|
| `gotoProducts()` | Navigates to `/products` |
| `addFirstProductToCart()` | Hovers over the first product, clicks its "Add to Cart" link, waits for the modal, then closes it |
| `openCart()` | Clicks the cart link `a[href="/view_cart"]` |

**Selectors used:**
- `.product-image-wrapper` (first item)
- `a.add-to-cart` (inside wrapper)
- `.modal-content`
- `button.close-modal`

---

##  Test Suite

### `tests/login.spec.ts` — Login Test

1. Navigates to `/login`
2. Enters valid credentials from `test-data.ts`
3. **Asserts** the logout link (`a[href="/logout"]`) is visible, confirming a successful login

---

### `tests/logout.spec.ts` — Logout Test

1. Logs in with valid credentials
2. Calls `AuthPage.logout()`
3. **Asserts** the current URL ends with `/login`, confirming redirection after logout

---

### `tests/addToCart.spec.ts` — Add to Cart Test

1. Logs in
2. Navigates to `/products`
3. Adds the first product to the cart and dismisses the modal
4. Opens the cart page
5. **Asserts** `.cart_description` is visible, confirming the item appears in the cart

---

### `tests/checkout.spec.ts` — Checkout Flow Test

1. Logs in and asserts "Logged in as" is visible
2. Navigates to `/products` and re-asserts login state
3. Adds the first product to the cart
4. Clicks `a[href="/view_cart"]` to open the cart
5. Clicks **"Proceed To Checkout"**
6. **Asserts** `text=Address Details` is visible on the checkout page

---

##  Test Data (`utils/test-data.ts`)

Credentials are stored in a single exported object:

```ts
export const users = {
  validUser: {
    email: 'mohahe9157@dardr.com',
    password: '3@eTScmPqe9AC@4'
  }
};
```

> **Security note:** For production use, move credentials to a `.env` file (the `dotenv` package is already installed). Reference them via `process.env.EMAIL` / `process.env.PASSWORD` and add `.env` to `.gitignore`.

---

##  CI / Environment Variables

| Variable | Effect |
|----------|--------|
| `CI=true` | Enables headless mode and disables slow motion |

Set `CI=true` in your pipeline (GitHub Actions, GitLab CI, Jenkins, etc.) before running `npx playwright test`.

---

## Reports & Artifacts

After a test run:

| Artifact | Location | When created |
|----------|----------|-------------|
| HTML report | `playwright-report/` | Always |
| Screenshots | `test-results/` | On failure |
| Videos | `test-results/` | On failure |
| Last run status | `test-results/.last-run.json` | Always |

Both `playwright-report/` and `test-results/` are in `.gitignore` and should not be committed.

---

##  Possible Improvements

- Add negative test cases (invalid login, empty fields)
- Extend `ProductPage` to add multiple products or select by name
- Add API-level authentication to speed up tests that don't specifically test login
- Set up GitHub Actions workflow for automated CI runs

