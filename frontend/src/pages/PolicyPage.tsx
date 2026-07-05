import React from 'react';

const PolicyPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>Policy Tracker</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Tracking the progress of key housing legislation and government targets.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-primary)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>1.5 Million Homes Target</h3>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            The headline manifesto commitment to build 1.5 million homes over the course of the parliament.
          </p>
          <div style={{ background: 'rgba(0,0,0,0.2)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ background: 'var(--accent-primary)', width: '12%', height: '100%' }}></div>
          </div>
          <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', textAlign: 'right', color: 'var(--text-secondary)' }}>12% Complete</p>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-warning)' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Renters' Rights Bill</h3>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Abolishing Section 21 "no-fault" evictions and extending Awaab's Law to the private rented sector.
          </p>
          <span style={{ padding: '0.25rem 0.75rem', background: 'var(--accent-warning)', color: '#000', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
            In Committee Stage
          </span>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
