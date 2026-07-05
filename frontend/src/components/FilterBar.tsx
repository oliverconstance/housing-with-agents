import React from 'react';
import { Filter } from 'lucide-react';

export interface FilterOption {
  label: string;
  options: string[];
}

interface FilterBarProps {
  filters: FilterOption[];
  onFilterChange: (label: string, value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
        <Filter size={18} />
        <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Filters:</span>
      </div>
      
      {filters.map((filter, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {filter.label}
          </label>
          <select 
            onChange={(e) => onFilterChange(filter.label, e.target.value)}
            style={{
              background: 'var(--bg-color)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              padding: '0.4rem 2rem 0.4rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontFamily: 'Inter, sans-serif',
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 0.5rem center',
              backgroundSize: '1em'
            }}
          >
            <option value="all">All {filter.label}s</option>
            {filter.options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
