import React, { useState, useMemo } from 'react';
import DataCard from '../components/DataCard';
import { Home, Map, Building2, TrendingUp } from 'lucide-react';
import TimelineChart from '../components/TimelineChart';
import FilterBar from '../components/FilterBar';
import FactTooltip from '../components/FactTooltip';

const baseChartData = [
  { year: '2022', stock: 25000000 },
  { year: '2023', stock: 25200000 },
  { year: '2024', stock: 25420000 },
  { year: '2025', stock: 25580000 },
  { year: 'Jul 2026', stock: 25710000 },
];

const stockFilters = [
  { label: 'Region', options: ['England', 'Wales', 'Scotland', 'Northern Ireland', 'London'] },
  { label: 'Type', options: ['Detached', 'Semi-Detached', 'Terraced', 'Flat/Maisonette'] },
  { label: 'Ownership', options: ['Owner Occupied', 'Private Rented', 'Social Rented'] },
  { label: 'EPC Band', options: ['A/B', 'C', 'D', 'E', 'F/G'] }
];

const StockPage: React.FC = () => {
  const [filterState, setFilterState] = useState<Record<string, string>>({});

  const handleFilterChange = (label: string, value: string) => {
    setFilterState(prev => ({ ...prev, [label]: value }));
  };

  // Fake "data shaker" to simulate reactivity to filters
  const getMultiplierForValue = (val: string | undefined) => {
    if (!val || val === 'all') return 1;
    let hash = 0;
    for (let i = 0; i < val.length; i++) {
      hash += val.charCodeAt(i);
    }
    return 0.2 + ((hash % 70) / 100); 
  };

  const mockMultiplier = useMemo(() => {
    let mult = 1;
    mult *= getMultiplierForValue(filterState['Region']);
    mult *= getMultiplierForValue(filterState['Type']);
    mult *= getMultiplierForValue(filterState['Ownership']);
    mult *= getMultiplierForValue(filterState['EPC Band']);
    return mult;
  }, [filterState]);

  const dynamicChartData = baseChartData.map(d => ({
    year: d.year,
    stock: Math.round(d.stock * mockMultiplier)
  }));

  const dynamicTotal = (25.71 * mockMultiplier).toFixed(2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>Current UK Housing Stock</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Live tracker of total dwellings across the United Kingdom.</p>
      </div>

      <FilterBar filters={stockFilters} onFilterChange={handleFilterChange} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <FactTooltip sourceText="ONS Dwelling Stock Estimates (Table 104)" sourceUrl="#">
          <DataCard 
            title="Filtered Dwellings" 
            value={`${dynamicTotal}M`} 
            subtitle="As of Jul 2026 release"
            trend={mockMultiplier === 1 ? 'up' : 'neutral'}
            trendValue="Filtered View"
            icon={<Home size={24} />}
          />
        </FactTooltip>
        
        <FactTooltip sourceText="English Housing Survey 2025/26" sourceUrl="#">
          <DataCard 
            title="Owner Occupied" 
            value="64.2%" 
            subtitle="Proportion of total stock"
            trend="down"
            trendValue="0.1% YoY"
            icon={<Map size={24} />}
          />
        </FactTooltip>

        <FactTooltip sourceText="Regulator of Social Housing" sourceUrl="#">
          <DataCard 
            title="Social Rented" 
            value="16.8%" 
            subtitle="Proportion of total stock"
            trend="neutral"
            trendValue="0.0% YoY"
            icon={<Building2 size={24} />}
          />
        </FactTooltip>

        <FactTooltip sourceText="English Housing Survey 2025/26" sourceUrl="#">
          <DataCard 
            title="Private Rented" 
            value="19.0%" 
            subtitle="Proportion of total stock"
            trend="up"
            trendValue="0.8% YoY"
            icon={<TrendingUp size={24} />}
          />
        </FactTooltip>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <TimelineChart 
          data={dynamicChartData}
          xKey="year"
          yKey="stock"
          title="Total Housing Stock Growth (Filtered View)"
          color="var(--accent-primary)"
        />
      </div>
    </div>
  );
};

export default StockPage;
