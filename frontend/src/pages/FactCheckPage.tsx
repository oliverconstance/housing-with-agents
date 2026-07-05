import React from 'react';
import FactCheckCard from '../components/FactCheckCard';

const FactCheckPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>AI Fact-Checking Log</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Automated analysis of housing claims made by public figures, powered by Google Vertex AI.
        </p>
        <div style={{ padding: '1rem', borderLeft: '4px solid var(--accent-primary)', background: 'var(--bg-card)', borderRadius: '0 8px 8px 0' }}>
          <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-secondary)' }}>
            <strong>Methodology Note:</strong> Quotes are sourced daily from Hansard (Parliamentary records) and official press releases. Our AI compares these statements strictly against the ONS and DLUHC datasets available on this platform.
            <a href="/methodology" style={{ marginLeft: '0.5rem', fontWeight: 600 }}>Read Full Methodology &rarr;</a>
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <FactCheckCard 
          politician="Housing Minister"
          quote="We are currently building more homes than at any point in the last 30 years."
          date="October 12, 2025"
          verdict="False"
          analysis="According to DLUHC Live Table 209, 151,000 homes were completed in 2025. This is lower than the 165,000 homes completed in 2005, making the claim mathematically incorrect."
          sourceUrl="#"
        />
        
        <FactCheckCard 
          politician="Shadow Chancellor"
          quote="Homeownership has fallen by over 5% in the last decade, locking millions out of the market."
          date="September 28, 2025"
          verdict="Misleading"
          analysis="While absolute homeownership rates have fallen slightly, ONS data shows the decline over the specific 10-year period (2015-2025) is approximately 1.2%, not 'over 5%'."
          sourceUrl="#"
        />

        <FactCheckCard 
          politician="Member of Parliament"
          quote="The private rented sector now accounts for nearly a fifth of all households in England."
          date="August 15, 2025"
          verdict="True"
          analysis="English Housing Survey (EHS) data confirms that the private rented sector represents approximately 19% of the total housing stock, which is nearly one-fifth."
          sourceUrl="#"
        />
      </div>
    </div>
  );
};

export default FactCheckPage;
