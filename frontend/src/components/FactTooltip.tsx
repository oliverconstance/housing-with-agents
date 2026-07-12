import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';

interface FactTooltipProps {
  children: React.ReactNode;
  referenceIds: string[];
}

const FactTooltip: React.FC<FactTooltipProps> = ({ children, referenceIds }) => {
  const [show, setShow] = useState(false);

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block', width: '100%' }}
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
          paddingBottom: '8px', // Invisible bridge to prevent mouseleave
          zIndex: 1000,
          minWidth: '220px'
        }}>
          <div style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--bg-sidebar)',
            border: 'var(--glass-border)',
            borderRadius: '8px',
            boxShadow: 'var(--glass-shadow)',
            textAlign: 'center',
            position: 'relative'
          }}>
            <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Sources
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {referenceIds.map(refId => (
                <a 
                  key={refId}
                  href={`/references#${refId}`} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.25rem',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.5rem',
                    background: 'rgba(14, 165, 233, 0.1)',
                    borderRadius: '4px'
                  }}
                >
                  [{refId}] <ExternalLink size={12} />
                </a>
              ))}
            </div>
            
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
        </div>
      )}
    </div>
  );
};

export default FactTooltip;
