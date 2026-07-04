# Project Roadmap & Task List

> **Agent Note**: This document serves as the project's backlog and milestone tracking sheet.

---

## 1. Milestones Overview

- [ ] **Milestone 1: Project Setup & Static UI** (Target: YYYY-MM-DD)
  - Firebase Hosting setup.
  - Implement the 5 core pages with mock data (Stock, House-building, Policy, Fact-Checking, Methodology).
- [ ] **Milestone 2: Data Pipeline & Cloud Functions** (Target: YYYY-MM-DD)
  - Create the daily Cloud Function scraper.
  - Integrate Vertex AI/Gemini for fact-checking news snippets.
  - Implement Firestore schema and writes.
- [ ] **Milestone 3: Integration, Testing & Launch** (Target: YYYY-MM-DD)
  - Connect UI to live Firestore data.
  - Perform OWASP security review.
  - Run performance profiling to hit the 2s load time target.

---

## 2. Active Backlog

### In Progress
- [ ] **TSK-001**: Set up basic Firebase project and local emulation environment.

### Todo (Planned for Current Milestone)
- [ ] **TSK-002**: Create `Current Stock` UI page with mock graphs (detached, semi-detached, etc.).
- [ ] **TSK-003**: Create `House-building` UI page with 30-year timeline graphs.
- [ ] **TSK-004**: Create `Current Policy` UI page for government snippet display.
- [ ] **TSK-005**: Create `News Fact-Checking` UI page showing source reference, reliability score, and AI justification.
- [ ] **TSK-006**: Set up automated unit test framework and CI/CD PR checks.

### Backlog (Future Milestones)
- [ ] **TSK-010**: Build autonomous source discovery agent.
- [ ] **TSK-011**: Build daily news scraper targeting gov.uk and housing news sites.
- [ ] **TSK-012**: Write Vertex AI integration for reliability scoring and qualitative accuracy judgement.
- [ ] **TSK-013**: Review open-source LLM alternatives (e.g., Llama 3) for potential cost/accuracy benefits over Gemini.

---

## 3. Completed Tasks

- [x] **TSK-000**: Define UK Housing platform architecture and product specs. *(Completed: 2026-07-04)*
