import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FactCheckPage from '../FactCheckPage';
import { getDocs } from 'firebase/firestore';

// Mock Firebase modules
vi.mock('../../firebase', () => ({
  db: {}
}));

vi.mock('firebase/firestore', () => {
  return {
    collection: vi.fn(),
    query: vi.fn(),
    getDocs: vi.fn(),
  };
});

describe('FactCheckPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // Mock getDocs to return a pending promise
    (getDocs as any).mockReturnValue(new Promise(() => {}));
    
    render(<FactCheckPage />);
    
    // We expect the text to not be there yet, or just verify the heading
    expect(screen.getByText('AI Fact-Checking Archive')).toBeInTheDocument();
  });

  it('renders fact checks on successful fetch', async () => {
    const mockData = [
      {
        data: () => ({
          claim: {
            speaker: { name: 'John Doe' },
            statement: 'We built 1 million homes.',
            dateMade: '2025-01-01',
            sourceUrl: 'http://example.com'
          },
          analysis: {
            verdict: 'False',
            justification: 'Only 500k were built.'
          }
        })
      }
    ];

    (getDocs as any).mockResolvedValue(mockData);

    render(<FactCheckPage />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('renders error state on fetch failure', async () => {
    (getDocs as any).mockRejectedValue(new Error('Missing or insufficient permissions.'));

    render(<FactCheckPage />);

    await waitFor(() => {
      expect(screen.getByText('Oops! We had trouble connecting to the database.')).toBeInTheDocument();
      expect(screen.getByText('Missing or insufficient permissions.')).toBeInTheDocument();
    });
  });

  it('filters results based on search input', async () => {
    const mockData = [
      {
        data: () => ({
          claim: {
            speaker: { name: 'Politician A' },
            statement: 'Statement 1'
          },
          analysis: { verdict: 'True' }
        })
      },
      {
        data: () => ({
          claim: {
            speaker: { name: 'Politician B' },
            statement: 'Statement 2'
          },
          analysis: { verdict: 'False' }
        })
      }
    ];

    (getDocs as any).mockResolvedValue(mockData);

    render(<FactCheckPage />);

    // Wait for load
    await waitFor(() => {
      expect(screen.getByText('Politician A')).toBeInTheDocument();
      expect(screen.getByText('Politician B')).toBeInTheDocument();
    });

    // Type in search box
    const searchInput = screen.getByPlaceholderText('Search politicians, keywords, or claims...');
    fireEvent.change(searchInput, { target: { value: 'Politician A' } });

    await waitFor(() => {
      expect(screen.getByText('Politician A')).toBeInTheDocument();
      expect(screen.queryByText('Politician B')).not.toBeInTheDocument();
    });
  });
});
