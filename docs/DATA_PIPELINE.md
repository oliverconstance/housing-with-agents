# Data Pipeline & Fact-Checking Logic

> **Agent Note**: This document defines the rules for the daily scraping job and the ML fact-checking pipeline. The backend architecture relies on autonomous data discovery and Vertex AI evaluation.

---

## 1. Autonomous Source Discovery & Scraping

### 1.1 Discovery Rules
- Agents should independently research and discover sources of UK housing data (e.g., ONS data feeds, Gov.uk press releases, major news outlets).
- When a new source is discovered, it must be logged in the `sources` Firestore collection.

### 1.2 Reliability Scoring
- Every source requires a reliability rating.
- **gov.uk** and **ONS (Office for National Statistics)** are considered the gold standard and should have the highest reliability score.
- News outlets and social media should be scored lower and cross-referenced against the gold standard.
- The project admins have access to the `sources` collection to manually override or approve these rankings.

### 1.3 Scraping Schedule
- The scraper runs **once per day** via Cloud Scheduler.
- It fetches new articles/statements from the past 24 hours.

---

## 2. ML Fact-Checking Pipeline (Vertex AI)

### 2.1 The Fact-Check Workflow
When a new statement about UK housing is scraped (e.g., from a news article), the Cloud Function performs the following:

1. **Extract Claim**: Identify the core statistical or policy claim in the text.
2. **Retrieve Context**: Query the scraped data from reliable sources (ONS, Gov.uk) related to the claim's topic.
3. **ML Evaluation**: Send the claim and the reliable context to Vertex AI / Gemini.

### 2.2 Vertex AI Prompt Requirements
The prompt sent to the model must enforce the following outputs:
- **Verdict**: A strict categorical output (e.g., `True`, `False`, `Misleading`, `Unverifiable`).
- **Justification**: A short, qualitative paragraph explaining the verdict.
- **Source Link**: The model/code must attach the exact URL of the ONS/Gov data that proves or disproves the claim.

### 2.3 Data Storage & Audit Trail
- The evaluated claim is saved to the `factChecks` Firestore collection.
- The UI must display the original source, the Verdict, the Justification, and the highly-reliable Source Link.
- **Auditability is paramount**: A user must be able to trace exactly why a statement was deemed true or false.
