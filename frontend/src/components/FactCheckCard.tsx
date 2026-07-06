import React, { useState } from 'react';
import { Quote, AlertCircle, CheckCircle, ShieldAlert, ChevronDown, ChevronUp, HelpCircle, ExternalLink } from 'lucide-react';

export type Verdict = 'True' | 'Mostly True' | 'Misleading' | 'False' | 'Unverifiable';

export interface Reference {
  sourceId: string;
  dataPointUrl: string;
  description: string;
}

interface FactCheckCardProps {
  politician: string; // Used for speaker name
  speakerType?: string;
  affiliation?: string;
  quote: string;
  date: string;
  verdict: Verdict;
  analysis: string;
  sourceUrl: string;
  references?: Reference[];
}

const FactCheckCard: React.FC<FactCheckCardProps> = ({ politician, speakerType, affiliation, quote, date, verdict, analysis, sourceUrl, references = [] }) => {
  const [expanded, setExpanded] = useState(false);
  
  const getVerdictStyle = (v: Verdict) => {
    switch(v) {
      case 'True': return { color: 'var(--accent-success)', icon: <CheckCircle size={18} /> };
      case 'Mostly True': return { color: 'var(--accent-primary)', icon: <CheckCircle size={18} /> };
      case 'Misleading': return { color: 'var(--accent-warning)', icon: <AlertCircle size={18} /> };
      case 'False': return { color: 'var(--accent-danger)', icon: <ShieldAlert size={18} /> };
      case 'Unverifiable': return { color: 'var(--text-secondary)', icon: <HelpCircle size={18} /> };
      default: return { color: 'var(--text-secondary)', icon: <HelpCircle size={18} /> };
    }
  };

  const vStyle = getVerdictStyle(verdict);
  
  // Clean date formatting
  const formattedDate = date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Unknown Date';

  // Format source type nicely
  const formattedSourceType = speakerType ? speakerType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Source';
  const preciseSource = affiliation ? `${politician} (${affiliation})` : politician;

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => setExpanded(!expanded)}>
      
      {/* Header: Date and Source info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
            {formattedDate} • {formattedSourceType}
          </div>
          <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{preciseSource}</h3>
        </div>
        
        <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {!expanded && (
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
            }}>
              {vStyle.icon}
              {verdict}
            </div>
          )}
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {/* The Claim */}
      <div style={{ position: 'relative', padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.1)', borderRadius: '8px', fontStyle: 'italic', borderLeft: '3px solid var(--text-secondary)' }}>
        <Quote size={24} style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', opacity: 0.1, color: 'var(--text-primary)' }} />
        <p style={{ margin: 0, color: 'var(--text-primary)', position: 'relative', zIndex: 1, fontSize: expanded ? '1rem' : '0.9rem', display: expanded ? 'block' : '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          "{quote}"
        </p>
      </div>

      {/* Expanded Content: Fact Check Assessment */}
      {expanded && (
        <div style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Assessment Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
              backgroundColor: `${vStyle.color}15`,
            }}>
              {vStyle.icon}
              {verdict}
            </div>
            <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Fact-check reason</h4>
          </div>

          {/* Justification Text */}
          <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.6 }}>
            {analysis}
          </p>

          {/* Sources */}
          {references && references.length > 0 && (
            <div style={{ marginTop: '0.5rem', background: 'rgba(0,0,0,0.05)', padding: '1rem', borderRadius: '8px' }}>
              <h5 style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Official Sources</h5>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {references.map((ref, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--text-primary)' }}>{ref.description}</span>
                    <br/>
                    <a href={ref.dataPointUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }} onClick={(e) => e.stopPropagation()}>
                      View Data <ExternalLink size={12} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div style={{ marginTop: '0.5rem' }}>
            <a href={sourceUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }} onClick={(e) => e.stopPropagation()}>
              View Original Claim Context →
            </a>
          </div>
        </div>
      )}

    </div>
  );
};

export default FactCheckCard;
