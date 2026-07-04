# Architecture Decision Records (ADR)

> **Agent Note**: This document serves as the history of key technical decisions made in this project.

---

## ADR Index

| ADR ID | Date | Title | Status |
| :--- | :--- | :--- | :--- |
| **ADR-001** | 2026-07-04 | Use Firebase Hosting for Frontend Server | Accepted |
| **ADR-002** | 2026-07-04 | Use Google Cloud Functions & Scheduler for Daily Scrape | Accepted |
| **ADR-003** | 2026-07-04 | Use Firestore as the Data Layer | Accepted |
| **ADR-004** | 2026-07-04 | Use Vertex AI / Gemini (Free Tier) for ML Fact-Checking | Accepted |

---

## Architecture Decision Records

### ADR-001: Use Firebase Hosting for Frontend Server
- **Date**: 2026-07-04
- **Status**: Accepted
- **Context**: We need a free, fast, and SEO-optimized hosting provider for the frontend. While GitHub Pages was considered, we are heavily leveraging GCP for the backend.
- **Decision Outcome**: Use Firebase Hosting. It is GCP-native, integrates seamlessly with our deployment pipelines, offers excellent free-tier CDN performance (critical for the < 2s load time requirement), and supports custom headers (CSP for OWASP mitigation).

### ADR-002: Use Google Cloud Functions & Scheduler for Daily Scrape
- **Date**: 2026-07-04
- **Status**: Accepted
- **Context**: The site requires server-side components to autonomously research and scrape sources, without triggering external queries on every user visit.
- **Decision Outcome**: We will use Cloud Scheduler to trigger a Cloud Function (or Cloud Run job) once a day. This ensures strict cost control and isolates the scraping/ML workload from the frontend traffic.

### ADR-003: Use Firestore as the Data Layer
- **Date**: 2026-07-04
- **Status**: Accepted
- **Context**: The frontend needs a fast way to retrieve the scraped and fact-checked data.
- **Decision Outcome**: Use Google Cloud Firestore. It has a generous free tier, natively integrates with the frontend via the Firebase SDK, and allows us to easily store the hierarchical/NoSQL data resulting from our scrapes. Security rules will lock down write access entirely.

### ADR-004: Use Vertex AI / Gemini (Free Tier) for ML Fact-Checking
- **Date**: 2026-07-04
- **Status**: Accepted
- **Context**: We need an ML model to interpret scraped text and provide qualitative judgements for fact-checking.
- **Decision Outcome**: We will start with Google Cloud Vertex AI / Gemini via the free tier. This avoids the heavy operational overhead and memory requirements of hosting a large open-source LLM (like Llama 3) on Cloud Run, keeping costs at $0. A roadmap item will be added to review and compare open-source alternatives in the future.
