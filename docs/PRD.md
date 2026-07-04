# Product Requirements Document (PRD)

> **Agent Note**: This document defines the "Why" and the "What" of the UK Housing Data Platform. Before starting work, review the requirements, goals, and scope outlined below. Ensure any functional changes align with this PRD.

---

## 1. Document Control
- **Project Name**: UK Housing Data Platform
- **Status**: Approved
- **Last Updated**: 2026-07-04
- **Authors / Stakeholders**: User, Antigravity

---

## 2. Product Overview & Goals

### 2.1 Problem Statement
Information about UK housing, house-building, and government policy is scattered across multiple sources (ONS, Gov.uk, news sites). It is difficult for researchers, journalists, and policy writers to quickly find reliable, fact-checked statistics and statements about the UK housing market in an easy-to-digest format.

### 2.2 Product Vision
To build a highly accessible, fast, and secure web platform that automatically collates, visualizes, and fact-checks information about UK housing using daily scraping and ML models. The platform acts as a definitive quick-reference source for housing experts.

### 2.3 Key Objectives & Success Metrics
- **Objective 1**: Aggregate and visualize current stock and house-building data. -> **Metric**: Daily automated data pipeline success rate > 99%.
- **Objective 2**: Automate fact-checking of news statements. -> **Metric**: High reliability scoring with clear audit trails for 100% of claims.
- **Objective 3**: Deliver exceptional performance. -> **Metric**: Page load < 2 seconds for 90% of customers on 5G/WiFi.

---

## 3. Target Audience & User Personas

### 3.1 User Personas
1. **Housing Researchers & Policy Writers**: Need accurate, historical, and segmented data (by location, type) to write reports and influence policy.
2. **Journalists**: Need quick fact-checking of recent housing statements with verifiable source links to write accurate articles.
3. **General Public**: Citizens interested in the state of UK housing and current government policies.

---

## 4. Functional Requirements

### 4.1 Core Pages (In-Scope)

1. **Current Stock Page**: 
   - Key statistics and visuals (graphs) on total UK housing.
   - Breakdown capabilities by type (detached, semi-detached, terraced, etc.).
   - Breakdown capabilities by location (regional area, nation, council).
   - Other metrics like average occupancy and average house price.
2. **House-Building Page**:
   - Timeline graphs and visuals explaining housebuilding levels over the past 30 years.
   - Breakdowns by location and property type.
3. **Current Policy Page**:
   - Key statements and policy snippets summarizing current UK government policy on housing.
4. **News Fact-Checking Page**:
   - List of key statements made in news/social media/press releases over the past 12 months.
   - Clear referencing and source linking.
   - Qualitative judgement on accuracy (generated via ML).
   - Clear justification linking to source data confirming or denying the claim.
5. **Methodology & Data Sources Page**:
   - Explanation of the daily scrape process, source reliability scoring (e.g., Gov.uk considered highly reliable), and ML fact-checking weighting logic to ensure transparency and build trust.

### 4.2 Out of Scope
- User authentication and login (the site is purely public read-only).
- Real-time live data querying from external sites driven by user traffic (all data must be pre-scraped daily).

---

## 5. Non-Functional Requirements (NFRs)

### 5.1 Performance
- **Load Time**: Page load must be under 2 seconds, 90% of the time, for customers on a 5G connection or WiFi.

### 5.2 Security
- Strict adherence to industry standards.
- At least all relevant OWASP Top 10 vulnerabilities mitigated or blocked.
- No direct user inputs other than safe client-side UI filters.

### 5.3 Accessibility (a11y)
- Must comply with industry benchmarks for accessibility (e.g., WCAG 2.1 AA).
- All graphs must have accessible data table alternatives or high-quality descriptive aria labels.

### 5.4 SEO
- Optimized structure so users searching for "facts and figures on UK housing" are directed here.
- Semantic HTML, unique meta descriptions, and fast server response times.

### 5.5 Transparency & Data Auditability
- **Crucial Requirement**: Any data stored or presented must maintain a clear referencing and audit trail. Users must see exactly where it came from.
