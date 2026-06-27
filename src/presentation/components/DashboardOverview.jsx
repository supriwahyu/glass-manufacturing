import React from 'react';
import { Thermometer, Activity, Package, ShieldCheck, Cpu, AlertTriangle } from 'lucide-react';

export default function DashboardOverview({ db, navigateTo, handleSimulateQC }) {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title" style={{ margin: 0, fontSize: '28px' }}>VitroFlow Operations Cockpit</h1>
          <div className="page-subtitle">Real-time status of float lines and raw compound mix ratio feeds</div>
        </div>
      </div>

      {/* 4 Core KPIs */}
      <div className="metrics-grid">
        <div className="glass metric-card">
          <div className="metric-header">
            <span>Melt Furnace Temp</span>
            <Thermometer size={16} className="trend-up" />
          </div>
          <div className="metric-value">{db.summary.furnaceTemp}°C</div>
          <div className="metric-footer trend-up">
            <span>Target range: 1550°C - 1580°C</span>
          </div>
        </div>

        <div className="glass metric-card">
          <div className="metric-header">
            <span>Lehr Conveyor Speed</span>
            <Activity size={16} className="trend-stable" />
          </div>
          <div className="metric-value">{db.summary.drawSpeed} m/min</div>
          <div className="metric-footer trend-stable">
            <span>Tin Bath ribbon width: 3.45m</span>
          </div>
        </div>

        <div className="glass metric-card">
          <div className="metric-header">
            <span>Net Packed Output</span>
            <Package size={16} className="trend-up" />
          </div>
          <div className="metric-value">310 Tons/day</div>
          <div className="metric-footer trend-up">
            <span>Daily yield rate: {db.summary.yieldRate}%</span>
          </div>
        </div>

        <div className="glass metric-card">
          <div className="metric-header">
            <span>Accident-Free Days</span>
            <ShieldCheck size={16} className="trend-up" />
          </div>
          <div className="metric-value">{db.summary.safetyDays} days</div>
          <div className="metric-footer trend-up">
            <span>Active safety score: 100%</span>
          </div>
        </div>
      </div>

      {/* Chart & Silos grid */}
      <div className="widgets-layout">
        {/* 1. Production output chart */}
        <div className="glass widget-card">
          <div className="widget-title">
            <span>Year-To-Date Melt Output vs Defect Scrap (Tons/month)</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '400' }}>Jan - Jun 2026</span>
          </div>
          
          {/* Mock Chart Visualizer */}
          <div className="chart-container">
            <div className="chart-axis-y">
              <span>12k T</span>
              <span>9k T</span>
              <span>6k T</span>
              <span>3k T</span>
              <span>0 T</span>
            </div>

            <div className="chart-plots-wrapper">
              <div className="chart-grid-line" style={{ bottom: '25%' }} />
              <div className="chart-grid-line" style={{ bottom: '50%' }} />
              <div className="chart-grid-line" style={{ bottom: '75%' }} />

              <div className="chart-bar-group">
                <div className="chart-bar-glow" style={{ height: '82%' }}><span className="chart-bar-tooltip">9,850 Tons Packable</span></div>
                <div className="chart-bar-glow" style={{ height: '8%', background: 'var(--accent-secondary)' }}><span className="chart-bar-tooltip" style={{ borderColor: 'var(--accent-secondary)' }}>350 Tons Recycled</span></div>
              </div>
              <div className="chart-bar-group">
                <div className="chart-bar-glow" style={{ height: '78%' }}><span className="chart-bar-tooltip">9,510 Tons Packable</span></div>
                <div className="chart-bar-glow" style={{ height: '7%', background: 'var(--accent-secondary)' }}><span className="chart-bar-tooltip" style={{ borderColor: 'var(--accent-secondary)' }}>290 Tons Recycled</span></div>
              </div>
              <div className="chart-bar-group">
                <div className="chart-bar-glow" style={{ height: '88%' }}><span className="chart-bar-tooltip">10,530 Tons Packable</span></div>
                <div className="chart-bar-glow" style={{ height: '6%', background: 'var(--accent-secondary)' }}><span className="chart-bar-tooltip" style={{ borderColor: 'var(--accent-secondary)' }}>270 Tons Recycled</span></div>
              </div>
              <div className="chart-bar-group">
                <div className="chart-bar-glow" style={{ height: '85%' }}><span className="chart-bar-tooltip">10,260 Tons Packable</span></div>
                <div className="chart-bar-glow" style={{ height: '5%', background: 'var(--accent-secondary)' }}><span className="chart-bar-tooltip" style={{ borderColor: 'var(--accent-secondary)' }}>240 Tons Recycled</span></div>
              </div>
              <div className="chart-bar-group">
                <div className="chart-bar-glow" style={{ height: '92%' }}><span className="chart-bar-tooltip">10,910 Tons Packable</span></div>
                <div className="chart-bar-glow" style={{ height: '4%', background: 'var(--accent-secondary)' }}><span className="chart-bar-tooltip" style={{ borderColor: 'var(--accent-secondary)' }}>190 Tons Recycled</span></div>
              </div>
              <div className="chart-bar-group">
                <div className="chart-bar-glow" style={{ height: '90%' }}><span className="chart-bar-tooltip">10,680 Tons Packable</span></div>
                <div className="chart-bar-glow" style={{ height: '3%', background: 'var(--accent-secondary)' }}><span className="chart-bar-tooltip" style={{ borderColor: 'var(--accent-secondary)' }}>170 Tons Recycled</span></div>
              </div>
            </div>

            <div className="chart-axis-x">
              <span className="chart-label-x">Jan</span>
              <span className="chart-label-x">Feb</span>
              <span className="chart-label-x">Mar</span>
              <span className="chart-label-x">Apr</span>
              <span className="chart-label-x">May</span>
              <span className="chart-label-x">Jun</span>
            </div>
          </div>
        </div>

        {/* 2. Raw material Silo levels */}
        <div className="glass widget-card">
          <div className="widget-title">Raw Mix Silo Levels</div>
          <div className="silos-widget">
            {db.inventory.rawMaterials.slice(0, 4).map(rm => {
              const stockVal = parseInt(rm.stock.replace(/[^0-9]/g, ''));
              const capVal = parseInt(rm.capacity.replace(/[^0-9]/g, ''));
              const pct = Math.round((stockVal / capVal) * 100);
              
              return (
                <div className="silo-row" key={rm.id}>
                  <div className="silo-info">
                    <span className="silo-name">{rm.name}</span>
                    <span className="silo-value">{rm.stock} ({pct}%)</span>
                  </div>
                  <div className="silo-bar-outer">
                    <div 
                      className={`silo-bar-inner ${pct < 30 ? 'danger' : pct < 60 ? 'warning' : ''}`}
                      style={{ width: `${pct}%` }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <button className="btn-secondary" style={{ marginTop: 'auto', fontSize: '12px', padding: '8px' }} onClick={() => navigateTo('Inventory', 'Raw Materials')}>
            Manage Silos
          </button>
        </div>
      </div>

      {/* Schedules and defect logs */}
      <div className="widgets-layout" style={{ gridTemplateColumns: '1fr 1fr' }}>
        <div className="glass widget-card">
          <div className="widget-title">Active Shop floor Schedules</div>
          <div className="feed-list">
            {db.production.machineScheduling.map((m, idx) => (
              <div className="feed-item" key={idx}>
                <div className="feed-icon"><Cpu size={14} /></div>
                <div className="feed-info">
                  <div className="feed-title">{m.machine}</div>
                  <div className="feed-desc">{m.task} ({m.start} - {m.end})</div>
                </div>
                <span className={`badge ${m.status === 'Running' ? 'badge-success' : 'badge-warning'}`}>{m.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass widget-card">
          <div className="widget-title">Live defect scanner stream</div>
          <div className="feed-list">
            {db.qualityControl.inProcessQC.slice(0, 4).map((q, idx) => (
              <div className="feed-item" key={idx}>
                <div className="feed-icon" style={{ background: q.defectsFound !== 'None' ? 'rgba(248,113,113,0.1)' : 'rgba(52,211,153,0.1)', color: q.defectsFound !== 'None' ? 'var(--accent-danger)' : 'var(--accent-success)' }}>
                  <AlertTriangle size={14} />
                </div>
                <div className="feed-info">
                  <div className="feed-title">{q.defectsFound !== 'None' ? q.defectsFound : 'Optical distortion optimal'}</div>
                  <div className="feed-desc">{q.scanner} | Action: {q.action}</div>
                </div>
                <span className="feed-time">{q.time}</span>
              </div>
            ))}
          </div>
          <button className="btn-secondary" style={{ fontSize: '12px', padding: '8px' }} onClick={handleSimulateQC}>
            Simulate Live Scan
          </button>
        </div>
      </div>
    </div>
  );
}
