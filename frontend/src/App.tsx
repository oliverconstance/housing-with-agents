import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import StockPage from './pages/StockPage';
import AboutPage from './pages/AboutPage';
import BuildingPage from './pages/BuildingPage';
// import FactCheckPage from './pages/FactCheckPage';
import PolicyLayout from './pages/Policy/PolicyLayout';
import MethodologyPage from './pages/MethodologyPage';
import ReferencesPage from './pages/ReferencesPage';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      {/* Mobile Topbar */}
      <header className="mobile-topbar">
        <h2 style={{ fontSize: '1.25rem', color: 'var(--accent-primary)', margin: 0 }}>UK Housing Data</h2>
        <button 
          onClick={() => setIsSidebarOpen(true)} 
          className="btn-icon"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Mobile Overlay */}
      <div 
        className={`mobile-overlay ${isSidebarOpen ? 'open' : ''}`} 
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<StockPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/building" element={<BuildingPage />} />
          <Route path="/policy/*" element={<PolicyLayout />} />
          {/* <Route path="/fact-check" element={<FactCheckPage />} /> HIDDEN DUE TO SEVERE BUGS */}
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/references" element={<ReferencesPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
