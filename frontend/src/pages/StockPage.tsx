import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import DataCard from '../components/DataCard';
import { Home, Map, Building2, TrendingUp, RefreshCw } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import FactTooltip from '../components/FactTooltip';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

interface StockData {
  id: string;
  region: string;
  total_stock: number;
  breakdown_type: {
    Houses: { Detached: number; 'Semi-Detached': number; Terraced: number; [key: string]: number };
    Flats: { 'Purpose-built': number; Converted: number; Maisonette: number; [key: string]: number };
    Bungalows: number;
    [key: string]: any;
  };
  breakdown_ownership: {
    'owner-occupied': number;
    'private-rented': number;
    'social-rented': number;
    [key: string]: number;
  };
  reference_ids: string[];
}

const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#64748b'];

const StockPage: React.FC = () => {
  const [data, setData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterState, setFilterState] = useState<Record<string, string>>({ Region: 'UK Total' });

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'stock_data'));
        const stockData: StockData[] = [];
        querySnapshot.forEach((doc) => {
          stockData.push(doc.data() as StockData);
        });
        setData(stockData);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStockData();
  }, []);

  const handleFilterChange = (label: string, value: string) => {
    setFilterState(prev => ({ ...prev, [label]: value }));
  };

  const selectedData = data.find(d => d.region === filterState['Region']) || data.find(d => d.region === 'UK Total');

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <RefreshCw size={24} className="animate-spin" style={{ color: 'var(--accent-primary)' }} />
        <span style={{ marginLeft: '1rem', color: 'var(--text-secondary)' }}>Loading Stock Data...</span>
      </div>
    );
  }

  if (!selectedData) {
    return <div>No stock data found. Run backend scraper.</div>;
  }

  const ownershipData = [
    { name: 'Owner Occupied', value: selectedData.breakdown_ownership['owner-occupied'] },
    { name: 'Private Rented', value: selectedData.breakdown_ownership['private-rented'] },
    { name: 'Social Rented', value: selectedData.breakdown_ownership['social-rented'] }
  ];

  const typeData = [
    { name: 'Detached', value: selectedData.breakdown_type.Houses.Detached },
    { name: 'Semi-Detached', value: selectedData.breakdown_type.Houses['Semi-Detached'] },
    { name: 'Terraced', value: selectedData.breakdown_type.Houses.Terraced },
    { name: 'Purpose Flats', value: selectedData.breakdown_type.Flats['Purpose-built'] },
    { name: 'Converted/Maisonette', value: selectedData.breakdown_type.Flats.Converted + selectedData.breakdown_type.Flats.Maisonette },
    { name: 'Bungalows', value: selectedData.breakdown_type.Bungalows }
  ].sort((a, b) => b.value - a.value);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ marginBottom: '0.5rem' }}>Current UK Housing Stock</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Live tracker of total dwellings and structural breakdowns.</p>
      </div>

      <FilterBar 
        filters={[
          { label: 'Region', options: ['UK Total', 'England'] }
        ]} 
        onFilterChange={handleFilterChange} 
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <FactTooltip referenceIds={selectedData.reference_ids}>
          <DataCard 
            title="Total Dwellings" 
            value={`${(selectedData.total_stock / 1000000).toFixed(2)}M`} 
            subtitle={selectedData.region}
            trend="neutral"
            trendValue="Verified"
            icon={<Home size={24} />}
          />
        </FactTooltip>
        
        <FactTooltip referenceIds={selectedData.reference_ids}>
          <DataCard 
            title="Owner Occupied" 
            value={`${((selectedData.breakdown_ownership['owner-occupied'] / selectedData.total_stock) * 100).toFixed(1)}%`} 
            subtitle="Proportion of total stock"
            trend="down"
            trendValue="0.1% YoY"
            icon={<Map size={24} />}
          />
        </FactTooltip>

        <FactTooltip referenceIds={selectedData.reference_ids}>
          <DataCard 
            title="Social Rented" 
            value={`${((selectedData.breakdown_ownership['social-rented'] / selectedData.total_stock) * 100).toFixed(1)}%`} 
            subtitle="Proportion of total stock"
            trend="neutral"
            trendValue="0.0% YoY"
            icon={<Building2 size={24} />}
          />
        </FactTooltip>

        <FactTooltip referenceIds={selectedData.reference_ids}>
          <DataCard 
            title="Private Rented" 
            value={`${((selectedData.breakdown_ownership['private-rented'] / selectedData.total_stock) * 100).toFixed(1)}%`} 
            subtitle="Proportion of total stock"
            trend="up"
            trendValue="0.8% YoY"
            icon={<TrendingUp size={24} />}
          />
        </FactTooltip>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginTop: '1rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Ownership Breakdown</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ownershipData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {ownershipData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value: any) => `${(Number(value) / 1000000).toFixed(2)}M`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Property Types</h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={typeData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`} />
                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                <RechartsTooltip formatter={(value: any) => `${(Number(value) / 1000000).toFixed(2)}M`} />
                <Bar dataKey="value" fill="var(--accent-primary)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPage;
