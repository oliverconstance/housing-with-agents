import React, { useState, useEffect } from 'react';
import FactCheckCard from '../components/FactCheckCard';
import type { Verdict } from '../components/FactCheckCard';
import { Search } from 'lucide-react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';

const FactCheckPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerdict, setFilterVerdict] = useState('All');
  const [factChecks, setFactChecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFactChecks = async () => {
      try {
        const q = query(collection(db, 'factChecks')); // Can add orderBy('claim.dateMade', 'desc') if we have indexes
        const querySnapshot = await getDocs(q);
        const fetchedData: any[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.claim && data.analysis) {
             fetchedData.push({
               politician: data.claim.speaker?.name || 'Unknown',
               quote: data.claim.statement || '',
               date: data.claim.dateMade || '',
               verdict: data.analysis.verdict as Verdict,
               analysis: data.analysis.justification || '',
               sourceUrl: data.claim.sourceUrl || '#'
             });
          }
        });
        setFactChecks(fetchedData);
      } catch (error) {
        console.error("Error fetching fact checks: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFactChecks();
  }, []);

  const filteredData = factChecks.filter(item => {
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
          <option value="Unverifiable">Unverifiable</option>
        </select>
      </div>

      {/* Results List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Loading live fact-checks from Firestore...
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Showing {filteredData.length} results</p>
            {filteredData.map((data, index) => (
              <FactCheckCard key={index} {...data} />
            ))}
            {filteredData.length === 0 && (
              <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No records match your search criteria.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FactCheckPage;
