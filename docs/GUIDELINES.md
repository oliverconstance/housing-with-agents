# Development Guidelines & Coding Standards

> **Agent Note**: This document outlines coding conventions, quality standards, and security requirements for the UK Housing Data Platform.

---

## 1. Infrastructure Guidelines (IaC)

### 1.1 Infrastructure as Code
- **No Click-Ops**: Do not create or modify resources in the Google Cloud Console UI.
- All cloud infrastructure must be defined declaratively in the `terraform/` directory.
- Use official Google Cloud providers (`hashicorp/google` and `hashicorp/google-beta`).

### 1.2 Terraform Workflow
- Run `terraform fmt` to ensure standard HCL formatting.
- Validate changes locally using `terraform plan`.
- State is managed remotely; never commit `.terraform/` or `terraform.tfstate` files to version control.

---

## 2. Quality Gates & Git Workflow

### 2.1 Branching Strategy
- **NEVER** push directly to the `main` branch.
- All development (including Terraform changes) must occur on feature branches (`feat/fact-checking-ui`, `infra/setup-firestore`).
- Pull Requests (PRs) must be raised to merge code into `main`.

### 2.2 Testing Requirements
- **Extensive Unit Tests**: All critical logic (especially data parsing, ML prompt generation, and source reliability scoring) must have comprehensive unit tests.
- UI components (graphs, data tables) should have rendering tests.
- Infrastructure PRs should trigger a `terraform plan` in the CI pipeline for review.

---

## 3. Security Standards (OWASP & IAM)

### 3.1 IAM & Principle of Least Privilege
- Service Accounts must only have the exact roles required to perform their task. (e.g., the Cloud Function service account does not need project-level Editor access, only `roles/datastore.user` and `roles/aiplatform.user`).

### 3.2 Cross-Site Scripting (XSS) Prevention
- The backend scrapes external web content and generates ML text. This data is inherently untrusted.
- When rendering this data on the frontend, strict XSS prevention must be applied (e.g., using React's native escaping, or DOMPurify if injecting HTML).

### 3.3 Content Security Policy (CSP)
- A strict CSP must be configured in `firebase.json` (or equivalent hosting config) to prevent unauthorized script execution and restrict data connections to approved domains only (e.g., Firestore APIs).

---

## 4. Performance & SEO Guidelines

### 4.1 Performance Budget
- **Target**: Page load under 2 seconds, 90% of the time, on 5G/WiFi.
- **Implementation**:
  - Lazy load heavy charting libraries (e.g., Chart.js, D3, Recharts).
  - Minimize main-thread blocking JavaScript.
  - Optimize and compress any static assets.

### 4.2 SEO
- Use semantic tags (`<article>`, `<section>`, `<h1>`).
- Ensure every page (Stock, House-building, Policy, Fact-Checking) has distinct, descriptive `<title>` and `<meta name="description">` tags to capture search traffic for "UK housing facts and figures".
