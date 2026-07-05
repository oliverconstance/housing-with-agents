# UK Housing Data Platform

A robust, AI-powered web platform designed to aggregate, visualize, and fact-check information regarding the UK housing market, government policy, and housing stock. Built using React, Google Cloud Platform (GCP), and Vertex AI.

## 🚀 Project Overview

Information about UK housing is often scattered across multiple sources (ONS, Gov.uk, news sites). This platform serves as a definitive quick-reference dashboard for housing researchers, journalists, and policy writers.

### Core Features
- **Housing Stock Dashboard**: Interactive visualizer for UK dwelling statistics, filterable by region, property type, ownership model, and EPC band.
- **House-Building Tracker**: Time-series analysis of new permanent dwellings completed across the UK (Yearly vs. Cumulative).
- **Policy & Manifesto Tracker**: Visual progress bars mapping government pledges against actual delivery, plus summaries of key regulatory frameworks.
- **AI Fact-Checking Archive**: A searchable archive of political statements evaluated by Google Vertex AI (Gemini) against definitive datasets.

## 🏗️ Technical Architecture

This project strictly adheres to Infrastructure-as-Code (IaC) principles.

- **Frontend**: React (Vite), TypeScript, Recharts. Hosted on Firebase Hosting (Global CDN).
- **Backend (Data Pipeline)**: Python scrapers deployed to Google Cloud Functions (2nd Gen), orchestrated by Cloud Scheduler.
- **Database**: Google Cloud Firestore (NoSQL).
- **AI Integration**: Google Vertex AI (Gemini 1.5 Pro) for natural language fact-checking.
- **Infrastructure**: Fully defined in Terraform (`/terraform`).

> **For a deep dive into the system components, network layers, and security architecture, please see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).**

## 📂 Repository Structure

```text
root/
├── docs/                 # Documentation (PRD, Architecture, ADRs, Roadmap, Testing)
├── terraform/            # Infrastructure as Code (GCP Resources)
├── frontend/             # React SPA Application (UI, graphs, routing)
├── backend/              # Python Data Pipeline and ML Scrapers
└── .github/workflows/    # CI/CD pipelines
```

## 🛠️ Development

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Run the local development server: `npm run dev`

### Project Documentation
Please refer to the `docs/` directory for comprehensive project context:
- `PRD.md`: Product Requirements Document
- `ROADMAP.md`: Backlog and milestone tracking
- `TEST_CASES.md`: Frontend QA scenarios
- `ADR.md`: Architecture Decision Records