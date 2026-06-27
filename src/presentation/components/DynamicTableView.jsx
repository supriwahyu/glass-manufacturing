import React from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function DynamicTableView({
  activeSection,
  activeSub,
  schema,
  list,
  handleOpenCreate,
  handleOpenEdit,
  deleteRecord
}) {
  const idField = schema.idField || "id";

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <h2 className="page-title">{activeSub} Management</h2>
          <div className="page-subtitle">Module: {activeSection} | Records: {list.length}</div>
        </div>
        <div className="page-actions">
          <button className="btn-primary" onClick={handleOpenCreate}>
            <Plus size={16} style={{ marginRight: '6px' }} /> Add Record
          </button>
        </div>
      </div>

      <div className="glass table-container" style={{ marginTop: '16px' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>{idField.toUpperCase()}</th>
              {schema.fields.filter(f => f.key !== idField).map(f => (
                <th key={f.key}>{f.label}</th>
              ))}
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td colSpan={schema.fields.length + 1} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '24px' }}>
                  No database records found matching filter.
                </td>
              </tr>
            ) : (
              list.map((item, idx) => (
                <tr key={item[idField] || idx}>
                  <td style={{ fontWeight: '600', color: 'var(--accent-primary)', fontFamily: 'monospace' }}>
                    {item[idField]}
                  </td>
                  {schema.fields.filter(f => f.key !== idField).map(f => {
                    const val = item[f.key];
                    
                    // Highlight statuses beautifully
                    if (f.key === 'status' || f.key === 'result' || f.key === 'inspectionStatus') {
                      const statusClass = 
                        (val === 'Active' || val === 'Approved' || val === 'Passed' || val === 'Cleared' || val === 'Optimal' || val === 'Passed QC' || val === 'Operational' || val === 'Running' || val === 'Delivered' || val === 'Paid') ? 'badge-success' :
                        (val === 'Suspended' || val === 'Rejected' || val === 'Failed QC' || val === 'Alarm' || val === 'Overdue') ? 'badge-danger' : 
                        'badge-warning';
                      return (
                        <td key={f.key}>
                          <span className={`badge ${statusClass}`}>{val}</span>
                        </td>
                      );
                    }
                    
                    if (f.key === 'priority' || f.key === 'urgency') {
                      const priorityClass = val === 'Critical' ? 'badge-danger' : val === 'High' ? 'badge-warning' : 'badge-info';
                      return (
                        <td key={f.key}>
                          <span className={`badge ${priorityClass}`}>{val}</span>
                        </td>
                      );
                    }

                    return (
                      <td key={f.key} style={{ fontWeight: f.key === 'value' || f.key === 'amount' || f.key === 'total' ? '600' : '400' }}>
                        {val !== undefined ? String(val) : ''}
                      </td>
                    );
                  })}
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button 
                        className="icon-button" 
                        onClick={() => handleOpenEdit(item)}
                        style={{ padding: '6px' }}
                        title="Edit entity fields"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button 
                        className="icon-button" 
                        onClick={() => deleteRecord(item[idField])}
                        style={{ padding: '6px' }}
                        title="Remove entity"
                      >
                        <Trash2 size={13} style={{ color: 'var(--accent-danger)' }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
