import React, { useState } from 'react';
import { Menu, Search, Bell, Download } from 'lucide-react';

export default function Header({
  activeSection,
  activeSub,
  searchText,
  setSearchText,
  userRole,
  setUserRole,
  notifications,
  setNotifications,
  addNotification,
  handleExportBackup,
  sidebarCollapsed,
  setSidebarCollapsed,
  dbVersion
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const getBreadcrumbs = () => {
    if (!activeSection) return ['Overview Dashboard'];
    return ['VitroGlass ERP', activeSection, activeSub];
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="collapse-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
          <Menu size={18} />
        </button>
        <div className="view-breadcrumbs">
          {getBreadcrumbs().map((b, i, arr) => (
            <React.Fragment key={i}>
              <span className={i === arr.length - 1 ? 'breadcrumb-active' : ''}>{b}</span>
              {i < arr.length - 1 && <span style={{ color: 'var(--text-muted)' }}>/</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="header-right">
        {/* Real-time search inside current page */}
        {activeSection && (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Filter list..." 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ paddingLeft: '32px', height: '36px', width: '200px' }}
            />
          </div>
        )}

        {/* User Scope Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Scope:</span>
          <select 
            value={userRole} 
            onChange={(e) => {
              setUserRole(e.target.value);
              addNotification(`Workspace scope changed to ${e.target.value}`, 'info');
            }}
            style={{ height: '36px', fontSize: '12px', padding: '0 8px', borderColor: 'var(--accent-secondary)' }}
          >
            <option value="Plant Manager">Plant Manager</option>
            <option value="Furnace Operator">Furnace Operator</option>
            <option value="QC Supervisor">QC Supervisor</option>
            <option value="Financial Analyst">Financial Analyst</option>
          </select>
        </div>

        {/* JSON generate/export */}
        <button className="btn-secondary" onClick={handleExportBackup} style={{ height: '36px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', padding: '0 12px' }}>
          <Download size={14} />
          <span>Export JSON</span>
        </button>

        <div className="system-status">
          <span className="status-dot" />
          <span>DB v{dbVersion} Online</span>
        </div>

        {/* Notifications center */}
        <div style={{ position: 'relative' }}>
          <button className="icon-button" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell size={18} />
            {notifications.length > 0 && <span className="badge-dot" />}
          </button>
          
          {showNotifications && (
            <div className="glass feed-list" style={{ 
              position: 'absolute', 
              top: '45px', 
              right: '0', 
              width: '340px', 
              zIndex: 200, 
              maxHeight: '400px', 
              overflowY: 'auto',
              padding: '12px',
              background: 'rgba(6, 9, 19, 0.95)',
              border: '1px solid var(--border-light)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.8)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700' }}>Active Alarms & Logs</span>
                <button style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '10px' }} onClick={() => setNotifications([])}>Clear</button>
              </div>
              {notifications.length === 0 ? (
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '16px' }}>No warnings loaded</div>
              ) : (
                notifications.map(n => (
                  <div key={n.id} style={{ display: 'flex', gap: '8px', fontSize: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.02)', marginBottom: '8px' }}>
                    <span style={{ color: n.type === 'alert' ? 'var(--accent-danger)' : n.type === 'success' ? 'var(--accent-success)' : 'var(--accent-primary)' }}>●</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: 'var(--text-primary)' }}>{n.text}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '10px', marginTop: '2px' }}>{n.time}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
