import React, { useState } from 'react';
import FactCheckCard from '../components/FactCheckCard';
import { Search } from 'lucide-react';

const mockFactChecks = [
  {
    politician: "Housing Minister",
    quote: "We are currently building more homes than at any point in the last 30 years.",
    date: "July 12, 2026",
    verdict: "False" as const,
    analysis: "According to DLUHC Live Table 209, 151,000 homes were completed in 2025. This is lower than the 165,000 homes completed in 2005.",
    sourceUrl: "#"
  },
  {
    politician: "Shadow Chancellor",
    quote: "Homeownership has fallen by over 5% in the last decade.",
    date: "June 28, 2026",
    verdict: "Misleading" as const,
    analysis: "While absolute homeownership rates have fallen slightly, ONS data shows the decline over the specific 10-year period is approx 1.2%, not 'over 5%'.",
    sourceUrl: "#"
  },
  {
    politician: "Member of Parliament",
    quote: "The private rented sector now accounts for nearly a fifth of all households in England.",
    date: "May 15, 2026",
    verdict: "True" as const,
    analysis: "English Housing Survey (EHS) data confirms that the private rented sector represents approximately 19% of the total housing stock.",
    sourceUrl: "#"
  }
];

const FactCheckPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerdict, setFilterVerdict] = useState('All');

  const filteredData = mockFactChecks.filter(item => {
    const matchesSearch = item.politician.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.quote.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVerdict = filterVerdict === 'All' || item.verdict === filterVerdict;
    return matchesSearch && matchesVerdict;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>AI Fact-Checking Archive</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Searchable archive of automated housing claims analysis.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="glass-panel" style={{ padding: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search politicians, keywords, or claims..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.5rem',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-color)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem'
            }}
          />
        </div>
        
        <select 
          value={filterVerdict}
          onChange={(e) => setFilterVerdict(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-color)',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          <option value="All">All Verdicts</option>
          <option value="True">True</option>
          <option value="Mostly True">Mostly True</option>
          <option value="Misleading">Misleading</option>
          <option value="False">False</option>
        </select>
      </div>

      {/* Results List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Showing {filteredData.length} results</p>
        {filteredData.map((data, index) => (
          <FactCheckCard key={index} {...data} />
        ))}
        {filteredData.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No records match your search criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default FactCheckPage;
