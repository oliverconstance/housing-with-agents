import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface FactTooltipProps {
  children: React.ReactNode;
  sourceText: string;
  sourceUrl: string;
}

const FactTooltip: React.FC<FactTooltipProps> = ({ children, sourceText, sourceUrl }) => {
  const [show, setShow] = useState(false);

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* Target Element */}
      <div style={{ cursor: 'help', borderBottom: '1px dotted var(--text-secondary)' }}>
        {children}
      </div>

      {/* Tooltip Content */}
      {show && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--bg-sidebar)',
          border: 'var(--glass-border)',
          borderRadius: '8px',
          boxShadow: 'var(--glass-shadow)',
          zIndex: 1000,
          minWidth: '220px',
          textAlign: 'center'
        }}>
          <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Source Reference
          </p>
          <a 
            href={sourceUrl} 
            target="_blank" 
            rel="noreferrer"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: '0.25rem',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            {sourceText} <ExternalLink size={14} />
          </a>
          
          {/* Tooltip arrow */}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            borderWidth: '6px',
            borderStyle: 'solid',
            borderColor: 'var(--bg-sidebar) transparent transparent transparent'
          }}></div>
        </div>
      )}
    </div>
  );
};

export default FactTooltip;
