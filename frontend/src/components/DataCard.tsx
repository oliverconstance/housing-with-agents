import React from 'react';

interface DataCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
}

const DataCard: React.FC<DataCardProps> = ({ title, value, subtitle, trend, trendValue, icon }) => {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </h3>
        {icon && <div style={{ color: 'var(--accent-primary)' }}>{icon}</div>}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
        <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          {value}
        </span>
        {trend && trendValue && (
          <span style={{ 
            fontSize: '0.875rem', 
            fontWeight: 600,
            color: trend === 'up' ? 'var(--accent-success)' : trend === 'down' ? 'var(--accent-danger)' : 'var(--text-secondary)'
          }}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </span>
        )}
      </div>
      
      {subtitle && (
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default DataCard;
