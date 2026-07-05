import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import StockPage from './pages/StockPage';
import BuildingPage from './pages/BuildingPage';
import FactCheckPage from './pages/FactCheckPage';
import PolicyPage from './pages/PolicyPage';
import MethodologyPage from './pages/MethodologyPage';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<StockPage />} />
          <Route path="/building" element={<BuildingPage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/fact-check" element={<FactCheckPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
