# Project Roadmap & Task List

> **Agent Note**: This document serves as the project's backlog and milestone tracking sheet.

---

## 1. Milestones Overview

- [ ] **Milestone 0: Technical Architecture & IaC Foundation** (Target: YYYY-MM-DD)
  - Detail every GCP component and network layer.
  - Setup Terraform repository structure and remote state bucket.
  - Provision GCP project, IAM roles, Secret Manager, Cloud DNS, and Firestore via IaC.
  - Set up CI/CD pipelines for Terraform (Plan/Apply).
- [x] **Milestone 1: Project Setup & Static UI** (Completed)
  - Firebase Hosting initialization via Terraform/Firebase CLI.
  - Implement the 5 core pages with mock data (Stock, House-building, Policy, Fact-Checking, Methodology).
  - Implement advanced multi-dimensional filtering, nested routing, and interactive search/archive UI.
- [ ] **Milestone 2: Data Pipeline & Cloud Functions** (Next Up)
  - Provision Cloud Functions and Cloud Scheduler via Terraform.
  - Create the daily Cloud Function scraper.
  - Integrate Vertex AI/Gemini for fact-checking news snippets.
- [ ] **Milestone 3: Integration, Testing & Launch** (Target: YYYY-MM-DD)
  - Connect UI to live Firestore data.
  - Perform OWASP security review.
  - Configure custom domain mapping and DNS cutover via IaC.
  - Run performance profiling to hit the 2s load time target.

---

## 2. Active Backlog

### In Progress
- [ ] **TSK-011**: Build daily news scraper targeting gov.uk and housing news sites.
- [ ] **TSK-012**: Provision Cloud Scheduler and Cloud Functions via Terraform.

### Todo (Planned for Current Milestone)
- [ ] **TSK-013**: Integrate Vertex AI/Gemini pipeline for fact-checking logic.
- [ ] **TSK-014**: Connect React frontend to live Firestore data.

### Backlog (Future Milestones)
- [ ] **TSK-020**: Run performance profiling to hit the 2s load time target.
- [ ] **TSK-021**: Configure custom domain mapping (`housinginsights.uk`).

---

## 3. Completed Tasks

- [x] **TSK-010**: Scaffold static UI on top of Firebase Hosting, including advanced filtering and sub-routing. *(Completed: 2026-07-05)*

- [x] **TSK-000**: Define UK Housing platform product specs (`PRD.md`). *(Completed: 2026-07-04)*
