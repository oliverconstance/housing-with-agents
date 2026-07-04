# Development Guidelines & Coding Standards

> **Agent Note**: This document outlines coding conventions, quality standards, and security requirements for the UK Housing Data Platform.

---

## 1. Quality Gates & Git Workflow

### 1.1 Branching Strategy
- **NEVER** push directly to the `main` branch.
- All development must occur on feature branches (`feat/fact-checking-ui`, `fix/graph-rendering`).
- Pull Requests (PRs) must be raised to merge code into `main`.

### 1.2 Testing Requirements
- **Extensive Unit Tests**: All critical logic (especially data parsing, ML prompt generation, and source reliability scoring) must have comprehensive unit tests.
- UI components (graphs, data tables) should have rendering tests.
- Code cannot be merged without passing the test suite.

---

## 2. Security Standards (OWASP)

### 2.1 Cross-Site Scripting (XSS) Prevention
- The backend scrapes external web content and generates ML text. This data is inherently untrusted.
- When rendering this data on the frontend, strict XSS prevention must be applied (e.g., using React's native escaping, or DOMPurify if injecting HTML).

### 2.2 Content Security Policy (CSP)
- A strict CSP must be configured in `firebase.json` (or equivalent hosting config) to prevent unauthorized script execution and restrict data connections to approved domains only (e.g., Firestore APIs).

### 2.3 Access Control
- The application has **no login**.
- Firestore security rules must be strictly set to allow public reads and completely deny public writes. The backend service account will handle all writes.

---

## 3. Performance & SEO Guidelines

### 3.1 Performance Budget
- **Target**: Page load under 2 seconds, 90% of the time, on 5G/WiFi.
- **Implementation**:
  - Lazy load heavy charting libraries (e.g., Chart.js, D3, Recharts).
  - Minimize main-thread blocking JavaScript.
  - Optimize and compress any static assets.

### 3.2 SEO
- Use semantic tags (`<article>`, `<section>`, `<h1>`).
- Ensure every page (Stock, House-building, Policy, Fact-Checking) has distinct, descriptive `<title>` and `<meta name="description">` tags to capture search traffic for "UK housing facts and figures".
