# Development Guidelines & Coding Standards

> **Agent Note**: This document outlines coding conventions, quality standards, workflow expectations, and setup procedures for this codebase. You are required to follow these guidelines for all code edits and file creation.

---

## 1. Local Development Setup

### 1.1 Package Management
- Use **`npm`** for package management (avoid mixing with yarn or pnpm).
- Run `npm install` inside the workspace to install dependencies.
- Script commands:
  - `npm run dev` - Start local development server.
  - `npm run build` - Compile production bundle.
  - `npm run test` - Run automated test suite (if configured).
  - `npm run lint` - Check syntax and style issues.

### 1.2 Environment Variables
Ensure all API keys and config values are mapped to a `.env` file. Do **not** commit actual API keys to repository files.
Example `.env.example`:
```env
VITE_API_URL=https://api.example.com
VITE_FIREBASE_API_KEY=your_key_here
```

---

## 2. Coding Standards

### 2.1 CSS & Styling Guidelines
- **Use Design Tokens**: All key dimensions, colors, fonts, and spacing must use variables defined in the central stylesheet (e.g., `src/assets/variables.css` or root `:root` styles).
- **Responsive-First Design**: Use mobile-first layouts using `min-width` media queries (e.g., `@media (min-width: 768px)`).
- **Modern Layouts**: Prioritize CSS Grid and Flexbox for page structure.
- **Nesting**: Utilize modern native CSS nesting where appropriate for cleaner hierarchy.

### 2.2 JavaScript Guidelines
- **Modern ES6+ Syntax**: Use constants (`const`) and block-scoped variables (`let`). Avoid `var`. Use arrow functions, destructuring, and template literals.
- **Strict Linting**: Code should pass standard ESLint rules with no console.logs left in production code.
- **Async/Await**: Prefer `async/await` over promise chaining `.then()` for handling asynchronous actions.
- **Explicit Types**: Use comments or JSDoc headers for complex interfaces to aid agent understanding.

### 2.3 Semantic HTML & Accessibility (a11y)
- Use standard semantic tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<aside>`.
- Always provide descriptive `alt` tags for `<img>` tags.
- Provide proper ARIA roles (`aria-label`, `aria-expanded`, `aria-hidden`) for interactive elements that are not native buttons/links.
- Focus management: Interactive components must be navigable using standard tab order.

---

## 3. Agent-Specific Workflows

### 3.1 Code Preservation
- Preserve existing code, comments, and docstrings that are unrelated to your task.
- Avoid deleting comments unless they are obsolete or directly contradicted by your changes.

### 3.2 Testing & Quality Gate
- Before concluding a task, run `npm run build` or the local build script to ensure there are no compiler, syntax, or bundler errors.
- Run test suites using `npm run test` and ensure all tests pass.
- Write unit tests for all new utilities, helpers, or complex state hooks in corresponding `.test.js` files.

### 3.3 Commit & PR Guidelines
- Commit early and often with descriptive messages.
- Commit message format should follow Conventional Commits:
  - `feat: add housing filter dropdown`
  - `fix: correct layout alignment on mobile`
  - `docs: update coding guidelines for CSS`
