import React, { useState } from 'react';
import { Activity } from 'lucide-react';

export default function ProcessTrackingView({ db, processControls, handleFurnaceSlider }) {
  const pt = db.production.processTracking;

  return (
    <div className="fade-in">
      <h2 className="page-title">Float Line Real-Time Process Dashboard</h2>
      <div className="page-subtitle">Interactive process readings for primary melting furnace, float tin bath, and annealing lehr zones</div>

      <div className="widgets-layout" style={{ marginTop: '16px' }}>
        <div className="glass widget-card">
          <div className="widget-title">
            <span>Furnace Combustion control parameters</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="process-grid">
              <div className="process-node">
                <div className="node-title">Furnace Pressure</div>
                <div className="node-value">{pt.furnace1.pressure}</div>
                <div className="node-status"><span className="status-dot"></span> Normal draft</div>
              </div>
              <div className="node-title process-node" style={{ gridColumn: 'span 2' }}>
                <div className="node-title">Furnace Temperature Control Dial</div>
                <div className="node-value" style={{ fontSize: '24px', margin: '4px 0', color: 'var(--accent-primary)' }}>
                  {db.summary.furnaceTemp} °C
                </div>
                
                {/* Temp Slider */}
                <input 
                  type="range" 
                  min="1520" 
                  max="1600" 
                  value={db.summary.furnaceTemp} 
                  onChange={handleFurnaceSlider}
                  style={{ width: '100%', cursor: 'ew-resize' }}
                />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <span>Min: 1520°C</span>
                  <span>Ideal: 1565°C</span>
                  <span>Max: 1600°C</span>
                </div>
              </div>
            </div>

            <div className="process-grid">
              <div className="process-node">
                <div className="node-title">Glass Liquid Level</div>
                <div className="node-value">{pt.furnace1.level}</div>
              </div>
              <div className="process-node">
                <div className="node-title">Combustion Purity</div>
                <div className="node-value">{pt.furnace1.combustionEfficiency}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass widget-card">
          <div className="widget-title">Tin Bath Atmosphere controls</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
              <span className="text-secondary">Protective Gas:</span>
              <span style={{ fontWeight: '600' }}>{pt.tinBath.atmosphere}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
              <span className="text-secondary">Ribbon Entry Temp:</span>
              <span style={{ fontWeight: '600' }}>{pt.tinBath.tinTempIn}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
              <span className="text-secondary">Exit Temp:</span>
              <span style={{ fontWeight: '600' }}>{pt.tinBath.tinTempOut}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
              <span className="text-secondary">Continuous Draw Speed:</span>
              <span style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{pt.tinBath.speed}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="text-secondary">Glass Ribbon Width:</span>
              <span style={{ fontWeight: '600' }}>{pt.tinBath.ribbonWidth}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="glass widget-card" style={{ marginTop: '20px' }}>
        <div className="widget-title">Annealing Lehr cooling Temperature Curves</div>
        <div className="process-grid" style={{ marginTop: '10px' }}>
          <div className="process-node">
            <div className="node-title">Lehr Zone 1 (Baking Zone)</div>
            <div className="node-value">{pt.lehr.zone1Temp}</div>
          </div>
          <div className="process-node">
            <div className="node-title">Lehr Zone 2 (Reheat zone)</div>
            <div className="node-value">{pt.lehr.zone2Temp}</div>
          </div>
          <div className="process-node">
            <div className="node-title">Lehr Zone 3 (Cooling rate)</div>
            <div className="node-value">{pt.lehr.zone3Temp}</div>
          </div>
          <div className="process-node">
            <div className="node-title">Lehr Zone 4 (Outlet gate)</div>
            <div className="node-value">{pt.lehr.zone4Temp}</div>
          </div>
          <div className="process-node" style={{ borderColor: 'var(--accent-primary)' }}>
            <div className="node-title">Ribbon Exit Temperature</div>
            <div className="node-value" style={{ color: 'var(--accent-secondary)' }}>{pt.lehr.exitTemp}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
