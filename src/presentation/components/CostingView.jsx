import React from 'react';

export default function CostingView({ db }) {
  const cost = db.finance.costing;

  return (
    <div className="fade-in">
      <h2 className="page-title">Glass Melting Unit Costing Sheet</h2>
      <div className="page-subtitle">Granular operational costing per ton of finished annealed glass sheet ($126.00 total)</div>

      <div className="widgets-layout" style={{ marginTop: '16px' }}>
        <div className="glass widget-card">
          <div className="widget-title">Cost Per Ton Elements Breakdown</div>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Cost Driver Element</th>
                  <th>Assigned Cost per Ton</th>
                  <th>Cost Percentage Weight</th>
                  <th>Visual Weight</th>
                </tr>
              </thead>
              <tbody>
                {cost.costPerTon.map((c, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: '600' }}>{c.element}</td>
                    <td style={{ color: 'var(--accent-secondary)', fontWeight: '600' }}>{c.costPerTon}</td>
                    <td>{c.pct}</td>
                    <td style={{ width: '150px' }}>
                      <div className="silo-bar-outer">
                        <div className="silo-bar-inner" style={{ width: c.pct }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass widget-card" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Consolidated Unit Cost</div>
          <div style={{ fontSize: '64px', fontWeight: '800', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {cost.totalCostPerTon}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '200px' }}>
            Per packable ton of Float sheet output (inclusive of natural gas melting zones tariff).
          </div>
        </div>
      </div>
    </div>
  );
}
