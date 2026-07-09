import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto', paddingTop: '2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'var(--accent-danger)', marginBottom: '1rem', fontSize: '2.5rem' }}>⚠️ Research Project Warning</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.6 }}>
          Welcome to the UK Housing Insights platform. 
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', borderLeft: '6px solid var(--accent-danger)' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Experimental Agentic AI Project</h2>
        <p style={{ marginBottom: '1rem', lineHeight: 1.8 }}>
          This website is an <strong>active research project</strong> exploring autonomous agentic software development. 
          The codebase, data pipelines, and UI features are primarily developed, maintained, and iterated upon by AI agents.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: 1.8 }}>
          We use <strong>UK Housing Policy and Data</strong> as our subject area of interest to test complex data aggregation, scraping, and LLM-based fact-checking capabilities.
        </p>
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px', marginTop: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <h3 style={{ color: 'var(--accent-danger)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Data Validity Disclaimer</h3>
          <p style={{ color: 'var(--text-primary)', margin: 0, fontWeight: 500 }}>
            None of the information, statistics, or "fact checks" presented on this platform should be considered validated, authoritative, or trusted at this time. 
            Data may be hallucinated, outdated, or incorrectly parsed by experimental models.
          </p>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', borderLeft: '4px solid var(--accent-primary)' }}>
        <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Current Status</h3>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: 1.8 }}>
          <li><strong>Current Stock</strong>: Transitioning from mocked data to live MHCLG (Ministry of Housing) data integration.</li>
          <li><strong>Policy Tracking</strong>: Active UI development with manual data tracking.</li>
          <li><del style={{ color: 'var(--text-secondary)' }}><strong>News Fact-Checking</strong></del>: Currently disabled. Models are outdated, and data extraction pipelines are undergoing complete rewrites to prevent hallucinations and QA failures.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
