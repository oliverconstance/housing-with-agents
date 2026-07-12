import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  Home, 
  TrendingUp, 
  BookOpen, 
  Database,
  Moon,
  Sun,
  Info
} from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className={`sidebar glass-panel ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>UK Housing Data</h2>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/about" onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Info size={20} color="var(--accent-danger)" />
          <span style={{ color: 'var(--accent-danger)', fontWeight: 600 }}>About (Warning)</span>
        </NavLink>

        <NavLink to="/" onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Home size={20} />
          <span>Current Stock</span>
        </NavLink>
        
        <NavLink to="/building" onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <TrendingUp size={20} />
          <span>House-building</span>
        </NavLink>
        
        <NavLink to="/policy" onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <BookOpen size={20} />
          <span>Policy Tracker</span>
        </NavLink>
        
        {/* Fact-Checking link temporarily hidden due to bugs
        <NavLink to="/fact-check" onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <CheckCircle size={20} />
          <span>Fact-Checking</span>
        </NavLink> */}

        <NavLink to="/methodology" onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Database size={20} />
          <span>Methodology</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button onClick={toggleTheme} className="btn btn-primary theme-toggle" style={{ width: '100%', justifyContent: 'center' }}>
          {theme === 'light' ? (
            <>
              <Moon size={18} />
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <Sun size={18} />
              <span>Light Mode</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
