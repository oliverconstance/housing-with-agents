import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StockPage from '../StockPage';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import * as firestore from 'firebase/firestore';

// Mock Firebase
vi.mock('firebase/firestore', async () => {
  const actual = await vi.importActual('firebase/firestore');
  return {
    ...actual as any,
    getDocs: vi.fn(),
    collection: vi.fn(),
  };
});

describe('StockPage Data Realism Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders realistic UK Total housing stock data (> 29M dwellings)', async () => {
    const mockData = [
      {
        id: "UK-TOTAL-2025",
        region: "UK Total",
        total_stock: 30500000,
        breakdown_type: { Houses: { Detached: 6800000 }, Flats: { 'Purpose-built': 5200000 }, Bungalows: 900000 },
        breakdown_ownership: { 'owner-occupied': 19500000, 'private-rented': 5800000, 'social-rented': 5200000 },
        reference_ids: ["REF-MHCLG-104", "REF-ONS-UK"]
      }
    ];

    (firestore.getDocs as any).mockResolvedValue({
      forEach: (callback: any) => {
        mockData.forEach(data => callback({ data: () => data }));
      }
    });

    render(
      <BrowserRouter>
        <StockPage />
      </BrowserRouter>
    );

    // Should finish loading
    await waitFor(() => {
      expect(screen.queryByText(/Loading Stock Data.../i)).not.toBeInTheDocument();
    });

    // Check UK Total is correctly parsed and > 29M visually (30.5M)
    expect(screen.getByText('30.50M')).toBeInTheDocument();
    
    // Check multiple references are displayed in the Tooltip source links
    // Hover over the DataCard to trigger the tooltip
    const totalDwellingsCard = screen.getByText('Total Dwellings');
    // The hover is on the FactTooltip wrapper. We can fire it on the card
    fireEvent.mouseEnter(totalDwellingsCard);

    await waitFor(() => {
      const ref1 = screen.getAllByText(/\[REF-MHCLG-104\]/i);
      expect(ref1.length).toBeGreaterThan(0);
      const ref2 = screen.getAllByText(/\[REF-ONS-UK\]/i);
      expect(ref2.length).toBeGreaterThan(0);
    });
  });
});
