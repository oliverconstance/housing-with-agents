import React from 'react';
import FactTooltip from '../../components/FactTooltip';

const PolicySummaries: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <p style={{ color: 'var(--text-secondary)' }}>Quick reference for current rules, regulations, and financial policies.</p>
      
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ color: 'var(--accent-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Stamp Duty Land Tax (SDLT)</h3>
        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-primary)', lineHeight: 1.8, marginTop: '1rem' }}>
          <li>
            <FactTooltip sourceText="Gov.uk SDLT Rates (Jul 2026)" sourceUrl="#">
              First-time buyers pay no Stamp Duty on properties up to £425,000.
            </FactTooltip>
          </li>
          <li>Standard rate kicks in at 5% for properties between £250,001 and £925,000.</li>
          <li>Additional 3% surcharge applies for second homes and buy-to-let properties.</li>
        </ul>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ color: 'var(--accent-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Private Landlord Regulations</h3>
        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-primary)', lineHeight: 1.8, marginTop: '1rem' }}>
          <li>
            <FactTooltip sourceText="Minimum Energy Efficiency Standards (MEES)" sourceUrl="#">
              All new tenancies require an EPC rating of 'C' or above (effective from Dec 2025).
            </FactTooltip>
          </li>
          <li>Mandatory registration in the National Landlord Portal is required prior to advertising.</li>
        </ul>
      </div>
    </div>
  );
};

export default PolicySummaries;
