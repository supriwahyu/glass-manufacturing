import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function CRUDModal({
  isOpen,
  onClose,
  modalType,
  modalEntityId,
  schema,
  initialData,
  onSubmit
}) {
  const [localForm, setLocalForm] = useState({});

  // Synchronize local form state with initialData when opened
  useEffect(() => {
    if (isOpen) {
      setLocalForm({ ...initialData });
    }
  }, [isOpen, initialData]);

  if (!isOpen || !schema) return null;

  const idField = schema.idField || "id";

  const handleChange = (key, value) => {
    setLocalForm(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(localForm);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="glass modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">
            {modalType === 'create' ? `Create New Record` : `Edit Record (${modalEntityId})`}
          </h3>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {schema.fields.map(f => {
              // Hide ID during creation, disable it during edits
              if (f.key === idField) {
                if (modalType === 'create') return null;
                return (
                  <div className="form-group full-width" key={f.key}>
                    <label className="form-label">{f.label} (Protected)</label>
                    <input type="text" value={localForm[f.key] || ''} disabled style={{ opacity: 0.6 }} />
                  </div>
                );
              }

              return (
                <div className={`form-group ${f.type === 'textarea' || f.type === 'full' ? 'full-width' : ''}`} key={f.key}>
                  <label className="form-label">
                    {f.label} {f.required && <span style={{ color: 'var(--accent-danger)' }}>*</span>}
                  </label>
                  
                  {f.type === 'select' ? (
                    <select 
                      value={localForm[f.key] || ''}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      required={f.required}
                    >
                      <option value="">Select option...</option>
                      {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : f.type === 'textarea' ? (
                    <textarea 
                      rows="3"
                      value={localForm[f.key] || ''}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      required={f.required}
                    />
                  ) : (
                    <input 
                      type={f.type || 'text'}
                      value={localForm[f.key] || ''}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      required={f.required}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="form-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">
              {modalType === 'create' ? 'Register Record' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
