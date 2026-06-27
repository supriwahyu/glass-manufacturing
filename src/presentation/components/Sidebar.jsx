import React, { useState } from 'react';
import { Home, ChevronDown, ChevronRight, LogOut } from 'lucide-react';

export default function Sidebar({ 
  menuConfig, 
  activeSection, 
  activeSub, 
  navigateTo, 
  sidebarCollapsed, 
  setSidebarCollapsed, 
  userRole, 
  handleLogout 
}) {
  const [expandedSections, setExpandedSections] = useState({
    CRM: true,
    Production: true,
    Inventory: false,
    Procurement: false,
    "Quality Control": false,
    Maintenance: false,
    Logistics: false,
    Finance: false,
    Reports: false
  });

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header" onClick={() => navigateTo(null, null)} style={{ cursor: 'pointer' }}>
        <div className="logo-icon">V</div>
        <span className="logo-text">VitroGlass ERP</span>
      </div>
      
      <div className="sidebar-menu">
        <div 
          className={`menu-item ${!activeSection ? 'active' : ''}`} 
          onClick={() => navigateTo(null, null)}
          style={{ marginBottom: '10px' }}
        >
          <Home size={16} />
          <span>Overview Cockpit</span>
        </div>
        
        {menuConfig.map((sec) => {
          const Icon = sec.icon;
          const isExpanded = expandedSections[sec.name];
          
          return (
            <div className="menu-section" key={sec.name}>
              <div 
                className="menu-section-header" 
                onClick={() => toggleSection(sec.name)}
              >
                <div className="menu-section-title">
                  <span className="menu-icon"><Icon size={14} /></span>
                  <span>{sec.name}</span>
                </div>
                {!sidebarCollapsed && (
                  <span className="menu-arrow">
                    {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </span>
                )}
              </div>
              
              {isExpanded && !sidebarCollapsed && (
                <div className="menu-items-container">
                  {sec.items.map(item => (
                    <div 
                      key={item}
                      className={`menu-item ${activeSection === sec.name && activeSub === item ? 'active' : ''}`}
                      onClick={() => navigateTo(sec.name, item)}
                    >
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="avatar">A</div>
          <div className="user-details">
            <span className="username">Administrator</span>
            <span className="user-role">{userRole}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout} title="Log out">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
