import React from 'react';
import { ExternalLink } from 'lucide-react';

const indexedSources = [
  { name: 'ONS Dwelling Stock Estimates (England)', url: '#', frequency: 'Annual', date: 'Jul 2026' },
  { name: 'DLUHC Live Table 209 (House building)', url: '#', frequency: 'Quarterly', date: 'Jul 2026' },
  { name: 'English Housing Survey (EHS)', url: '#', frequency: 'Annual', date: 'Jul 2026' },
  { name: 'Gov.uk Stamp Duty Land Tax Rates', url: '#', frequency: 'Real-time', date: 'Jul 2026' },
  { name: 'Hansard Parliamentary Records API', url: '#', frequency: 'Daily', date: 'Jul 2026' },
  { name: 'Regulator of Social Housing Statistics', url: '#', frequency: 'Annual', date: 'Jul 2026' },
];

const MethodologyPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>Methodology & Source Index</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Transparency is critical to our fact-checking process. Below is the methodology and a live index of all tracked data sources.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ marginTop: 0, color: 'var(--accent-primary)' }}>1. AI Fact-Checking Pipeline</h3>
        <p style={{ color: 'var(--text-primary)', lineHeight: 1.6 }}>
          Statements regarding housing statistics made by MPs are scraped daily. These quotes are passed to Google Vertex AI (Gemini 1.5 Pro) with a strict zero-temperature system prompt. The model is forced to evaluate the claim <em>exclusively</em> against the embedded datasets listed below.
        </p>
        <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, marginTop: '1rem' }}>
          The verdict is categorized strictly as <strong>True</strong>, <strong>Mostly True</strong>, <strong>Misleading</strong>, or <strong>False</strong> based on mathematical variance from the official statistics.
        </p>
      </div>

      <div>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Indexed Data Sources</h2>
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.05)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Source Name</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Update Frequency</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Date Last Scraped</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Link</th>
              </tr>
            </thead>
            <tbody>
              {indexedSources.map((source, index) => (
                <tr key={index} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: 500 }}>{source.name}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                    <span style={{ background: 'var(--bg-color)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>{source.frequency}</span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{source.date}</td>
                  <td style={{ padding: '1rem' }}>
                    <a href={source.url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem' }}>
                      View <ExternalLink size={14} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MethodologyPage;
