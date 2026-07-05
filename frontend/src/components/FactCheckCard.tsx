import React from 'react';
import { Quote, AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';

export type Verdict = 'True' | 'Mostly True' | 'Misleading' | 'False';

interface FactCheckCardProps {
  politician: string;
  quote: string;
  date: string;
  verdict: Verdict;
  analysis: string;
  sourceUrl: string;
}

const FactCheckCard: React.FC<FactCheckCardProps> = ({ politician, quote, date, verdict, analysis, sourceUrl }) => {
  
  const getVerdictStyle = (v: Verdict) => {
    switch(v) {
      case 'True': return { color: 'var(--accent-success)', icon: <CheckCircle size={18} /> };
      case 'Mostly True': return { color: 'var(--accent-primary)', icon: <CheckCircle size={18} /> };
      case 'Misleading': return { color: 'var(--accent-warning)', icon: <AlertCircle size={18} /> };
      case 'False': return { color: 'var(--accent-danger)', icon: <ShieldAlert size={18} /> };
    }
  };

  const vStyle = getVerdictStyle(verdict);

  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>{politician}</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{date}</span>
        </div>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          padding: '0.35rem 0.75rem', 
          borderRadius: '20px', 
          border: `1px solid ${vStyle.color}`,
          color: vStyle.color,
          fontWeight: 600,
          fontSize: '0.85rem',
          backgroundColor: `${vStyle.color}15` // 15 is hex for ~8% opacity
        }}>
          {vStyle.icon}
          {verdict}
        </div>
      </div>

      {/* Quote */}
      <div style={{ position: 'relative', padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.1)', borderRadius: '8px', fontStyle: 'italic', borderLeft: '3px solid var(--accent-primary)' }}>
        <Quote size={24} style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', opacity: 0.1, color: 'var(--text-primary)' }} />
        <p style={{ margin: 0, color: 'var(--text-primary)', position: 'relative', zIndex: 1 }}>"{quote}"</p>
      </div>

      {/* AI Analysis */}
      <div>
        <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Vertex AI Fact-Check</h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.6 }}>
          {analysis}
        </p>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '0.5rem', borderTop: 'var(--glass-border)', paddingTop: '1rem' }}>
        <a href={sourceUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          View Original Source →
        </a>
      </div>

    </div>
  );
};

export default FactCheckCard;
