import React, { useState, useMemo } from 'react';
import TimelineChart from '../components/TimelineChart';
import FilterBar from '../components/FilterBar';

const baseHistoricalData = [
  { year: '2020', completions: 148000, cumulative: 24000000 },
  { year: '2021', completions: 175000, cumulative: 24175000 },
  { year: '2022', completions: 171000, cumulative: 24346000 },
  { year: '2023', completions: 168000, cumulative: 24514000 },
  { year: '2024', completions: 155000, cumulative: 24669000 },
  { year: '2025', completions: 149000, cumulative: 24818000 },
  { year: 'Jul 2026', completions: 72000, cumulative: 24890000 },
];

const buildingFilters = [
  { label: 'Region', options: ['England', 'Wales', 'Scotland', 'Northern Ireland', 'London'] },
  { label: 'Type', options: ['Detached', 'Semi-Detached', 'Terraced', 'Flat'] },
  { label: 'Developer', options: ['Private Enterprise', 'Housing Association', 'Local Authority'] }
];

const BuildingPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'yearly' | 'cumulative'>('yearly');
  const [filterState, setFilterState] = useState<Record<string, string>>({});

  const handleFilterChange = (label: string, value: string) => {
    setFilterState(prev => ({ ...prev, [label]: value }));
  };

  // Fake "data shaker" to simulate reactivity to filters
  const getMultiplierForValue = (val: string | undefined) => {
    if (!val || val === 'all') return 1;
    let hash = 0;
    for (let i = 0; i < val.length; i++) {
      hash += val.charCodeAt(i);
    }
    return 0.2 + ((hash % 70) / 100); 
  };

  const mockMultiplier = useMemo(() => {
    let mult = 1;
    mult *= getMultiplierForValue(filterState['Region']);
    mult *= getMultiplierForValue(filterState['Type']);
    mult *= getMultiplierForValue(filterState['Developer']);
    return mult;
  }, [filterState]);

  const dynamicData = baseHistoricalData.map(d => ({
    year: d.year,
    completions: Math.round(d.completions * mockMultiplier),
    cumulative: Math.round(d.cumulative * mockMultiplier)
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>House-building Tracker</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Monitoring new permanent dwellings completed across the UK (Updated Jul 2026).
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <FilterBar filters={buildingFilters} onFilterChange={handleFilterChange} />
        
        <div style={{ display: 'flex', background: 'var(--bg-card)', padding: '0.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <button 
            onClick={() => setViewMode('yearly')}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              background: viewMode === 'yearly' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'yearly' ? 'white' : 'var(--text-secondary)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            Yearly Completions
          </button>
          <button 
            onClick={() => setViewMode('cumulative')}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              background: viewMode === 'cumulative' ? 'var(--accent-primary)' : 'transparent',
              color: viewMode === 'cumulative' ? 'white' : 'var(--text-secondary)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.85rem'
            }}
          >
            Cumulative Total
          </button>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <TimelineChart 
          data={dynamicData}
          xKey="year"
          yKey={viewMode === 'yearly' ? 'completions' : 'cumulative'}
          title={viewMode === 'yearly' ? 'New Build Completions per Year' : 'Running Total of New Builds'}
          color="var(--accent-secondary)"
        />
      </div>
    </div>
  );
};

export default BuildingPage;
