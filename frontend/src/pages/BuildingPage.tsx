import React from 'react';
import TimelineChart from '../components/TimelineChart';

const historicalData = [
  { year: '1995', completions: 153000 },
  { year: '2000', completions: 139000 },
  { year: '2005', completions: 165000 },
  { year: '2010', completions: 106000 },
  { year: '2015', completions: 142000 },
  { year: '2020', completions: 148000 },
  { year: '2025', completions: 151000 },
];

const BuildingPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>House-building Timeline</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Historical data on new permanent dwellings completed in the UK.
        </p>
        <div style={{ padding: '1rem', borderLeft: '4px solid var(--accent-primary)', background: 'var(--bg-card)', borderRadius: '0 8px 8px 0' }}>
          <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-secondary)' }}>
            <strong>Official Reference:</strong> Data sourced from the Department for Levelling Up, Housing and Communities 
            (Live Table 209). 
            <a href="#" style={{ marginLeft: '0.5rem', fontWeight: 600 }}>View ONS Source Data &rarr;</a>
          </p>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <TimelineChart 
          data={historicalData}
          xKey="year"
          yKey="completions"
          title="30-Year Permanent Dwellings Completed"
          color="var(--accent-secondary)"
        />
      </div>
    </div>
  );
};

export default BuildingPage;
