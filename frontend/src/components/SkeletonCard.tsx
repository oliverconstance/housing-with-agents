import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="glass-panel" style={{ padding: '1.5rem', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ height: '24px', width: '70%', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
          <div style={{ height: '16px', width: '40%', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px' }}></div>
        </div>
        <div style={{ height: '32px', width: '100px', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '16px' }}></div>
      </div>
      
      <div style={{ 
        padding: '1rem', 
        borderRadius: '8px', 
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        marginBottom: '1rem',
        borderLeft: '4px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ height: '16px', width: '90%', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', marginBottom: '0.5rem' }}></div>
        <div style={{ height: '16px', width: '85%', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px' }}></div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div style={{ height: '16px', width: '150px', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px' }}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
