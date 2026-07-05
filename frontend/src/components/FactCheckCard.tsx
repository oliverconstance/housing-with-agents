import React, { useState } from 'react';
import { Quote, AlertCircle, CheckCircle, ShieldAlert, ChevronDown, ChevronUp } from 'lucide-react';

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
  const [expanded, setExpanded] = useState(false);
  
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
    <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setExpanded(!expanded)}>
      
      {/* Compact Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.25rem 0.6rem', 
            borderRadius: '20px', 
            border: `1px solid ${vStyle.color}`,
            color: vStyle.color,
            fontWeight: 600,
            fontSize: '0.75rem',
            backgroundColor: `${vStyle.color}15`,
            minWidth: '110px',
            justifyContent: 'center'
          }}>
            {vStyle.icon}
            {verdict}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)' }}>{politician}</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{date}</span>
          </div>
        </div>
        
        <div style={{ color: 'var(--text-secondary)' }}>
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* Always visible brief quote snippet */}
      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontStyle: 'italic' }}>
        "{quote}"
      </p>

      {/* Expanded Content */}
      {expanded && (
        <div style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ position: 'relative', padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.1)', borderRadius: '8px', fontStyle: 'italic', borderLeft: '3px solid var(--accent-primary)' }}>
            <Quote size={24} style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', opacity: 0.1, color: 'var(--text-primary)' }} />
            <p style={{ margin: 0, color: 'var(--text-primary)', position: 'relative', zIndex: 1 }}>"{quote}"</p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Vertex AI Fact-Check</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.6 }}>
              {analysis}
            </p>
          </div>

          <div style={{ marginTop: '0.5rem', paddingTop: '1rem' }}>
            <a href={sourceUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }} onClick={(e) => e.stopPropagation()}>
              View Original Source →
            </a>
          </div>
        </div>
      )}

    </div>
  );
};

export default FactCheckCard;
