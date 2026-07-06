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
          <div style={{ background: 'var(--accent-primary)', width: '15%', height: '100%', animation: 'pulse 2s infinite' }}></div>
        </div>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', textAlign: 'right', color: 'var(--text-primary)', fontWeight: 600 }}>225,000 / 1,500,000 (15%)</p>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-warning)' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Planning Reform</h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Commitment to hire 300 additional local planning officers across the country to speed up development.
        </p>
        <div style={{ background: 'rgba(0,0,0,0.2)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ background: 'var(--accent-warning)', width: '35%', height: '100%', animation: 'pulse 2.5s infinite' }}></div>
        </div>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', textAlign: 'right', color: 'var(--text-primary)', fontWeight: 600 }}>105 / 300 Hired (35%)</p>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-success)' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Affordable Homes & New Towns</h3>
        <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Delivery of the promised new generation of new towns and social rent homes.
        </p>
        <span style={{ padding: '0.25rem 0.75rem', background: 'var(--accent-success)', color: '#000', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
          In Progress: Taskforce Launched
        </span>
      </div>
    </div>
  );
};

export default ManifestoTracker;
