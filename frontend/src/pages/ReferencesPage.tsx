import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { BookMarked, ExternalLink, RefreshCw } from 'lucide-react';

interface Reference {
  id: string;
  website: string;
  documentName: string;
  version: string;
  author: string;
  lastAccessed: string;
  url: string;
}

const ReferencesPage: React.FC = () => {
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'references'));
        const refs: Reference[] = [];
        querySnapshot.forEach((doc) => {
          refs.push({ id: doc.id, ...doc.data() } as Reference);
        });
        setReferences(refs);
      } catch (error) {
        console.error("Error fetching references:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferences();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <RefreshCw size={24} className="animate-spin" style={{ color: 'var(--accent-primary)' }} />
        <span style={{ marginLeft: '1rem', color: 'var(--text-secondary)' }}>Loading References...</span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookMarked size={28} color="var(--accent-primary)" />
          Data Sources & References
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          A live ledger of all data sources used to aggregate the statistics across this platform. 
          This data is dynamically updated by our backend scrapers to guarantee freshness.
        </p>
      </div>

      <div className="glass-panel" style={{ overflowX: 'auto', padding: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>ID</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Document / Dataset</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Author</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Version</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Last Scraped</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Link</th>
            </tr>
          </thead>
          <tbody>
            {references.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No references found in database. Run the backend scraper to populate.
                </td>
              </tr>
            ) : (
              references.map((ref) => (
                <tr key={ref.id} id={ref.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '1rem', fontWeight: 500, color: 'var(--accent-secondary)' }}>[{ref.id}]</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 500 }}>{ref.documentName}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{ref.website}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>{ref.author}</td>
                  <td style={{ padding: '1rem' }}>{ref.version}</td>
                  <td style={{ padding: '1rem' }}>{new Date(ref.lastAccessed).toLocaleString()}</td>
                  <td style={{ padding: '1rem' }}>
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="btn btn-icon" title="Open source">
                      <ExternalLink size={18} />
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferencesPage;
