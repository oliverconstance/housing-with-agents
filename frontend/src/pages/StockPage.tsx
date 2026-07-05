import React from 'react';
import DataCard from '../components/DataCard';
import { Home, Map, Building2, TrendingUp } from 'lucide-react';
import TimelineChart from '../components/TimelineChart';

const mockChartData = [
  { year: '2019', stock: 24400000 },
  { year: '2020', stock: 24600000 },
  { year: '2021', stock: 24800000 },
  { year: '2022', stock: 25000000 },
  { year: '2023', stock: 25200000 },
];

const StockPage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>Current UK Housing Stock</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Live tracker of total dwellings across the United Kingdom.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <DataCard 
          title="Total Dwellings" 
          value="25.2M" 
          subtitle="As of latest ONS release"
          trend="up"
          trendValue="0.8% YoY"
          icon={<Home size={24} />}
        />
        <DataCard 
          title="Owner Occupied" 
          value="64%" 
          subtitle="Proportion of total stock"
          trend="down"
          trendValue="0.2% YoY"
          icon={<Map size={24} />}
        />
        <DataCard 
          title="Social Rented" 
          value="17%" 
          subtitle="Proportion of total stock"
          trend="neutral"
          trendValue="0.0% YoY"
          icon={<Building2 size={24} />}
        />
        <DataCard 
          title="Private Rented" 
          value="19%" 
          subtitle="Proportion of total stock"
          trend="up"
          trendValue="1.1% YoY"
          icon={<TrendingUp size={24} />}
        />
      </div>

      <div style={{ marginTop: '1rem' }}>
        <TimelineChart 
          data={mockChartData}
          xKey="year"
          yKey="stock"
          title="Total Housing Stock Growth (5 Years)"
          color="var(--accent-primary)"
        />
      </div>
    </div>
  );
};

export default StockPage;
