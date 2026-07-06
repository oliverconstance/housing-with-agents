import React from 'react';
import FactTooltip from '../../components/FactTooltip';

const PolicySummaries: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <p style={{ color: 'var(--text-secondary)' }}>Quick reference for current rules, regulations, and financial policies.</p>
      
      <details className="glass-panel" style={{ padding: '1.5rem' }}>
        <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ color: 'var(--accent-primary)', margin: 0 }}>Renters' Rights Bill</h3>
          <span style={{ padding: '0.25rem 0.75rem', background: 'var(--accent-warning)', color: '#000', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
            Passed Commons
          </span>
        </summary>
        <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '1rem', paddingTop: '1rem' }}>
          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-primary)', lineHeight: 1.8 }}>
            <li>
              <FactTooltip sourceText="Gov.uk Renters' Rights Bill" sourceUrl="#">
                Abolishes Section 21 "no-fault" evictions, providing tenants with greater security.
              </FactTooltip>
            </li>
            <li>Extends Awaab's Law to the private rented sector.</li>
            <li>Bans blanket rules against tenants with children or those in receipt of benefits.</li>
          </ul>
        </div>
      </details>

      <details className="glass-panel" style={{ padding: '1.5rem' }}>
        <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ color: 'var(--accent-primary)', margin: 0 }}>Stamp Duty Land Tax (SDLT)</h3>
        </summary>
        <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '1rem', paddingTop: '1rem' }}>
          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-primary)', lineHeight: 1.8 }}>
            <li>
              <FactTooltip sourceText="Gov.uk SDLT Rates" sourceUrl="#">
                First-time buyers pay no Stamp Duty on properties up to £425,000.
              </FactTooltip>
            </li>
            <li>Standard rate kicks in at 5% for properties between £250,001 and £925,000.</li>
            <li>Additional 3% surcharge applies for second homes and buy-to-let properties.</li>
          </ul>
        </div>
      </details>

      <details className="glass-panel" style={{ padding: '1.5rem' }}>
        <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ color: 'var(--accent-primary)', margin: 0 }}>Private Landlord Regulations</h3>
        </summary>
        <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '1rem', paddingTop: '1rem' }}>
          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-primary)', lineHeight: 1.8 }}>
            <li>
              <FactTooltip sourceText="MEES Regulations" sourceUrl="#">
                All new tenancies require an EPC rating of 'C' or above (effective from Dec 2025).
              </FactTooltip>
            </li>
            <li>Mandatory registration in the National Landlord Portal is required prior to advertising.</li>
          </ul>
        </div>
      </details>
    </div>
  );
};

export default PolicySummaries;
