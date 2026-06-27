import React from 'react';
import { X, Copy, Download } from 'lucide-react';

export default function BackupModal({
  isOpen,
  onClose,
  generatedJson,
  onCopyToClipboard,
  onDownloadBackup
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
        <div className="modal-header">
          <h3 className="modal-title">Database Export JSON Backup</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            This is a structural JSON dump of the VitroGlass database state containing audit-trail logs for CRUD operations, raw materials silo weights, and active campaigns.
          </p>
          
          <div style={{ position: 'relative' }}>
            <pre style={{ 
              background: 'rgba(0,0,0,0.5)', 
              border: '1px solid var(--border-light)', 
              borderRadius: '8px', 
              padding: '16px', 
              fontSize: '11px', 
              maxHeight: '300px', 
              overflow: 'auto', 
              fontFamily: 'monospace',
              color: '#38bdf8' 
            }}>
              {generatedJson}
            </pre>
            
            <div style={{ display: 'flex', gap: '8px', position: 'absolute', top: '10px', right: '10px' }}>
              <button className="icon-button" onClick={onCopyToClipboard} title="Copy JSON string" style={{ background: 'rgba(6,9,19,0.8)', padding: '6px' }}>
                <Copy size={13} />
              </button>
            </div>
          </div>
        </div>

        <div className="form-footer" style={{ borderTop: '1px solid var(--border-light)', marginTop: '20px', paddingTop: '14px' }}>
          <button className="btn-secondary" onClick={onClose}>Close Dialog</button>
          <button className="btn-primary" onClick={onDownloadBackup} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Download size={14} /> Download Backup (.json)
          </button>
        </div>
      </div>
    </div>
  );
}
