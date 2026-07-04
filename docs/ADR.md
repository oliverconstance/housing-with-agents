# Architecture Decision Records (ADR)

> **Agent Note**: This document serves as the history of key technical decisions made in this project, explaining why certain tech stacks, design patterns, or tools were selected. When proposing major architectural changes, create a new ADR entry at the bottom of this file (or as instructed by the project team).

---

## ADR Index

| ADR ID | Date | Title | Status |
| :--- | :--- | :--- | :--- |
| **ADR-001** | YYYY-MM-DD | [Sample Title: Use SQLite for Local Mocking] | Proposed / Accepted / Rejected / Deprecated |

---

## Template for New ADRs

*To create a new ADR, copy the markdown below, increment the ID, and append it to the end of this document.*

```markdown
### ADR-XXX: [Title of Decision]

- **Date**: YYYY-MM-DD
- **Status**: [Proposed | Accepted | Rejected | Deprecated]
- **Decider(s)**: [Agent | User | Developers]

#### Context & Problem Statement
*Describe the context or problem we are trying to solve. What are the constraints, requirements, and motivations?*

#### Decision Drivers
*What are the main priorities that guide our decision? (e.g., development speed, future scalability, SEO capability, browser support).*

#### Considered Options
1. **Option 1**: [Description + Pros/Cons]
2. **Option 2**: [Description + Pros/Cons]
3. **Option 3**: [Description + Pros/Cons]

#### Decision Outcome
*Which option did we choose and why? Describe how this option solves the problem.*

##### Consequences
- **Positive**: [Benefit 1, e.g., zero build config]
- **Negative / Risk**: [Trade-off 1, e.g., data is lost on page refresh]
- **Neutral**: [Expected result that is neither good nor bad]
```

---

## Architecture Decision Records

### ADR-001: Use Vanilla CSS and Custom Properties for Styling

- **Date**: 2026-07-02
- **Status**: Accepted
- **Decider(s)**: Antigravity (Agent)

#### Context & Problem Statement
The user requests a responsive, high-fidelity website interface that is easy to build, modify, and optimize. We need a CSS methodology that avoids complex dependencies, is standard across modern web design, and ensures clean custom styling without bloating the project codebase with framework classes (like Tailwind utility classes) unless requested.

#### Decision Drivers
1. Minimize build configuration complexity.
2. Maximize performance (avoid JS-in-CSS runtime cost).
3. Ensure clean separation of concerns.
4. Support native responsive design and CSS nesting.

#### Considered Options
1. **Option 1: Tailwind CSS** (Requires Node build step, adds styling directly to HTML templates, can result in cluttered markup).
2. **Option 2: CSS-in-JS (e.g. styled-components)** (Needs framework integration, adds runtime parsing overhead).
3. **Option 3: Vanilla CSS + Custom Properties** (No compilation needed for basic HTML apps, high readability, utilizes native browser capabilities).

#### Decision Outcome
**Option 3: Vanilla CSS + Custom Properties**. We will write standard CSS using modern CSS features (e.g., custom properties for design tokens, flexbox/grid layouts, media queries).

##### Consequences
- **Positive**: Excellent loading times, zero-dependency setup, highly portable code, and matches browser inspector native workflows.
- **Negative / Risk**: We must maintain style organization manually in `index.css` or component files instead of relying on a utility-first framework.
- **Neutral**: Agents must strictly follow design tokens in `index.css` to prevent styling drift.
