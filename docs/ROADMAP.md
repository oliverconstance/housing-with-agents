# Project Roadmap & Task List

> **Agent Note**: This document serves as the project's backlog and milestone tracking sheet.

---

## 1. Milestones Overview

- [ ] **Milestone 0: Technical Architecture & IaC Foundation** (Target: YYYY-MM-DD)
  - Detail every GCP component and network layer.
  - Setup Terraform repository structure and remote state bucket.
  - Provision GCP project, IAM roles, Secret Manager, Cloud DNS, and Firestore via IaC.
  - Set up CI/CD pipelines for Terraform (Plan/Apply).
- [ ] **Milestone 1: Project Setup & Static UI** (Target: YYYY-MM-DD)
  - Firebase Hosting initialization via Terraform/Firebase CLI.
  - Implement the 5 core pages with mock data (Stock, House-building, Policy, Fact-Checking, Methodology).
- [ ] **Milestone 2: Data Pipeline & Cloud Functions** (Target: YYYY-MM-DD)
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
- [ ] **TSK-001**: Define comprehensive IaC strategy and expand `ARCHITECTURE.md` with explicit GCP component layers.

### Todo (Planned for Current Milestone)
- [ ] **TSK-002**: Create foundational GCP project, link billing, and enable required APIs (Click-ops/Manual step documented in `ARCHITECTURE.md`).
- [ ] **TSK-003**: Set up Terraform backend (GCS bucket) and directory structure.
- [ ] **TSK-004**: Write Terraform definitions for Cloud DNS, Firestore, and IAM Service Accounts.
- [ ] **TSK-005**: Deploy foundational infrastructure and configure GitHub Actions for Terraform CI/CD.

### Backlog (Future Milestones)
- [ ] **TSK-010**: Scaffold static UI on top of Firebase Hosting.
- [ ] **TSK-011**: Build daily news scraper targeting gov.uk and housing news sites.
- [ ] **TSK-012**: Provision Cloud Scheduler and Cloud Functions via Terraform.

---

## 3. Completed Tasks

- [x] **TSK-000**: Define UK Housing platform product specs (`PRD.md`). *(Completed: 2026-07-04)*
