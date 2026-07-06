# Project Roadmap & Task List

> **Agent Note**: This document serves as the project's backlog and milestone tracking sheet.

---

## 1. Milestones Overview

- [x] **Milestone 0: Technical Architecture & IaC Foundation** (Completed)
  - Detail every GCP component and network layer.
  - Setup Terraform repository structure and remote state bucket.
  - Provision GCP project, IAM roles, Secret Manager, Cloud DNS, and Firestore via IaC.
  - Set up CI/CD pipelines for Terraform (Plan/Apply).
- [x] **Milestone 1: Project Setup & Static UI** (Completed)
  - Firebase Hosting initialization via Terraform/Firebase CLI.
  - Implement the 5 core pages with mock data (Stock, House-building, Policy, Fact-Checking, Methodology).
  - Implement advanced multi-dimensional filtering, nested routing, and interactive search/archive UI.
- [x] **Milestone 2: Data Pipeline & Cloud Functions** (Completed)
  - Provision Cloud Functions and Cloud Scheduler via Terraform.
  - Create the daily Cloud Function scraper.
  - Integrate Vertex AI/Gemini for fact-checking news snippets.
- [ ] **Milestone 3: Integration, Testing & Launch** (Next Up)
  - Connect UI to live Firestore data.
  - Perform OWASP security review.
  - Configure custom domain mapping and DNS cutover via IaC.
  - Run performance profiling to hit the 2s load time target.

---

## 2. Active Backlog

### In Progress
- [x] **TSK-030**: Set up automated frontend testing (Vitest/React Testing Library) and integrate into CI/CD. *(Completed: 2026-07-06)*
- [ ] **TSK-034**: Provision a staging environment (`envs/staging`) in Terraform to isolate development testing.

### Todo (Planned for Current Milestone)
- [ ] **TSK-020**: Run performance profiling to hit the 2s load time target.
- [x] **TSK-021**: Configure custom domain mapping (`housinginsights.uk`). *(Completed: 2026-07-06)*

### Backlog (Future Milestones & Audit Recommendations)
- [x] **TSK-036**: Initialize Firebase Analytics (GA4) & Performance Monitoring SDKs in the React frontend (`main.tsx` / `firebase.ts`). *(Completed: 2026-07-06)*
- [x] **TSK-037**: Fix missing Firebase Security Rules causing "0 Results" bug on Fact Checking page. *(Completed: 2026-07-06)*
- [x] **TSK-038**: Implement standard UK Government Policy Pledge Tracking (e.g. 1.5M homes, planning reform) on the Policy page. *(Completed: 2026-07-06)*

---

## 3. Completed Tasks

- [x] **TSK-001**: Define comprehensive IaC strategy and expand `ARCHITECTURE.md` with explicit GCP component layers. *(Completed: 2026-07-04)*
- [x] **TSK-002**: Create foundational GCP project, link billing, and enable required APIs. *(Completed: 2026-07-05)*
- [x] **TSK-003**: Set up Terraform backend (GCS bucket) and directory structure. *(Completed: 2026-07-05)*
- [x] **TSK-004**: Write Terraform definitions for Cloud DNS, Firestore, and IAM Service Accounts. *(Completed: 2026-07-05)*
- [x] **TSK-005**: Deploy foundational infrastructure and configure GitHub Actions for Terraform CI/CD. *(Completed: 2026-07-05)*
- [x] **TSK-010**: Scaffold static UI on top of Firebase Hosting, including advanced filtering and sub-routing. *(Completed: 2026-07-05)*
- [x] **TSK-000**: Define UK Housing platform product specs (`PRD.md`). *(Completed: 2026-07-04)*
- [x] **TSK-011**: Build daily news scraper targeting gov.uk and housing news sites. *(Completed: 2026-07-05)*
- [x] **TSK-012**: Provision Cloud Scheduler and Cloud Functions via Terraform. *(Completed: 2026-07-05)*
- [x] **TSK-013**: Integrate Vertex AI/Gemini pipeline for fact-checking logic. *(Completed: 2026-07-05)*
- [x] **TSK-014**: Connect React frontend to live Firestore data. *(Completed: 2026-07-05)*
- [x] **TSK-031**: Enforce Branch Protection on `main` and migrate to a Pull Request workflow. *(Completed: 2026-07-05)*
- [x] **TSK-032**: Define strict data contracts (JSON schemas) between Frontend and Python Backend. *(Completed: 2026-07-05)*
- [x] **TSK-033**: Implement UI Resilience (Loading spinners, empty states, error boundaries). *(Completed: 2026-07-05)*
- [x] **TSK-035**: Register a Firebase Web App via Console/Terraform to generate Analytics API keys. *(Completed: 2026-07-05)*
