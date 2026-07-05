import React from 'react';

const MethodologyPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>Methodology & Sources</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Transparency is critical to our fact-checking process. Below is the methodology used by our system.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginTop: 0, color: 'var(--accent-primary)' }}>1. Data Sources</h3>
        <ul style={{ color: 'var(--text-primary)', lineHeight: 1.8, marginBottom: '2rem' }}>
          <li><strong>Stock Data:</strong> ONS Dwelling Stock Estimates (England, Wales, Scotland, NI).</li>
          <li><strong>House-building:</strong> DLUHC Live Tables on Housing Supply (Table 209).</li>
          <li><strong>Political Statements:</strong> Hansard API and official Gov.uk press releases.</li>
        </ul>

        <h3 style={{ color: 'var(--accent-primary)' }}>2. AI Fact-Checking Pipeline</h3>
        <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
          Statements regarding housing statistics made by MPs are scraped daily. These quotes are passed to Google Vertex AI (Gemini 1.5 Pro) with a strict zero-temperature system prompt. The model is forced to evaluate the claim <em>exclusively</em> against the embedded ONS and DLUHC datasets.
        </p>
        <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, marginTop: '1rem' }}>
          The verdict is categorized strictly as <strong>True</strong>, <strong>Mostly True</strong>, <strong>Misleading</strong>, or <strong>False</strong> based on mathematical variance from the official statistics.
        </p>
      </div>
    </div>
  );
};

export default MethodologyPage;
