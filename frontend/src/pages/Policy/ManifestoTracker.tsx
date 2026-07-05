import React from 'react';

const ManifestoTracker: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <p style={{ color: 'var(--text-secondary)' }}>Tracking the progress of headline political pledges.</p>
      
      <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-primary)' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>1.5 Million Homes Target</h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Commitment to build 1.5 million homes over the course of the parliament (Target: 2029).
        </p>
        <div style={{ background: 'rgba(0,0,0,0.2)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ background: 'var(--accent-primary)', width: '15%', height: '100%' }}></div>
        </div>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', textAlign: 'right', color: 'var(--text-primary)', fontWeight: 600 }}>225,000 / 1,500,000 (15%)</p>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-warning)' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Renters' Rights Bill</h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Abolishing Section 21 "no-fault" evictions and extending Awaab's Law to the private rented sector.
        </p>
        <span style={{ padding: '0.25rem 0.75rem', background: 'var(--accent-warning)', color: '#000', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
          Passed Commons - Awaiting Royal Assent
        </span>
      </div>
    </div>
  );
};

export default ManifestoTracker;
