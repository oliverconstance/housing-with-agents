import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import ManifestoTracker from './ManifestoTracker';
import PolicySummaries from './PolicySummaries';

const PolicyLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>Policy Tracker</h1>
        
        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginTop: '1.5rem' }}>
          <NavLink 
            to="/policy/manifesto" 
            style={({ isActive }) => ({
              padding: '0.5rem 1rem',
              color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: isActive ? 600 : 500,
              borderBottom: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
              textDecoration: 'none',
              marginBottom: '-9px'
            })}
          >
            Manifesto Tracker
          </NavLink>
          <NavLink 
            to="/policy/summaries" 
            style={({ isActive }) => ({
              padding: '0.5rem 1rem',
              color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: isActive ? 600 : 500,
              borderBottom: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
              textDecoration: 'none',
              marginBottom: '-9px'
            })}
          >
            Policy Summaries
          </NavLink>
        </div>
      </div>

      <div>
        <Routes>
          <Route path="/" element={<Navigate to="manifesto" replace />} />
          <Route path="manifesto" element={<ManifestoTracker />} />
          <Route path="summaries" element={<PolicySummaries />} />
        </Routes>
      </div>
    </div>
  );
};

export default PolicyLayout;
