import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  entityId,
  moduleName,
  subviewName
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px', marginTop: '6px' }}>
          <div style={{ 
            width: '54px', 
            height: '54px', 
            borderRadius: '50%', 
            background: 'rgba(248, 113, 113, 0.1)', 
            color: 'var(--accent-danger)', 
            display: 'flex', 
            alignItems: 'center', 
            justify: 'center',
            justifyContent: 'center'
          }}>
            <AlertTriangle size={28} />
          </div>

          <h3 className="modal-title" style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: '700' }}>
            Confirm Record Deletion
          </h3>

          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Are you sure you want to permanently delete record <strong style={{ color: 'var(--accent-primary)', fontFamily: 'monospace' }}>{entityId}</strong> from <strong>{moduleName} &gt; {subviewName}</strong>?<br/>
            This action cannot be undone and will be logged in the system audit trail.
          </p>
        </div>

        <div className="form-footer" style={{ justifyContent: 'center', gap: '12px', marginTop: '24px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
          <button className="btn-secondary" onClick={onClose} style={{ flex: 1 }}>
            Cancel
          </button>
          <button 
            className="btn-primary" 
            onClick={onConfirm} 
            style={{ 
              flex: 1, 
              background: 'linear-gradient(135deg, #f87171, #ef4444)', 
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)',
              color: '#ffffff'
            }}
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
}
