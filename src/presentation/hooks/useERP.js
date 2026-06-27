import { useState, useMemo } from 'react';
import { mockData } from '../../data/mockData';
import { EntitySchemas } from '../../domain/entities/Schemas';
import { ERPRepository } from '../../data/repositories/ERPRepository';
import { EntityUseCases } from '../../domain/usecases/EntityUseCases';

export function useERP() {
  // Initialize repository once in component tree lifetime
  const [repo] = useState(() => new ERPRepository(mockData));
  
  // Track reactive triggers for database changes
  const [dbStateVersion, setDbStateVersion] = useState(0);
  const [userRole, setUserRole] = useState('Plant Manager');
  const [searchText, setSearchText] = useState('');
  
  // Dialog and popup forms
  const [activeSection, setActiveSection] = useState(null); // null is overview
  const [activeSub, setActiveSub] = useState(null);
  
  // Modal controllers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'create' | 'edit'
  const [modalEntityId, setModalEntityId] = useState(null);
  const [formData, setFormData] = useState({});

  // System notifications state
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Furnace #1 temperature stabilised at 1,565°C.", time: "10m ago", type: "info" },
    { id: 2, text: "QC alert: Raw Limestone batch #9008 rejected due to high moisture.", time: "1h ago", type: "error" },
    { id: 3, text: "Breakdown logged: Diamond cutting CNC vertical guide issue resolved.", time: "3h ago", type: "success" }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toast, setToast] = useState(null);

  // Trigger reactive update
  const refreshState = () => setDbStateVersion(prev => prev + 1);

  // Push notification helper
  const addNotification = (text, type = 'success') => {
    const entry = {
      id: Date.now(),
      text,
      time: "Just now",
      type
    };
    setNotifications(prev => [entry, ...prev]);
    
    // Trigger on-screen Toast
    setToast({ id: Date.now(), text, type });
  };

  // Get current active schema
  const currentSchema = useMemo(() => {
    if (!activeSection || !activeSub) return null;
    return EntitySchemas[activeSection]?.[activeSub] || null;
  }, [activeSection, activeSub]);

  // Load list of records for active section/subview
  const currentEntities = useMemo(() => {
    if (!activeSection || !activeSub) return [];
    return repo.getEntities(activeSection, activeSub);
  }, [activeSection, activeSub, repo, dbStateVersion]);

  // Filtered rows for current grid
  const filteredEntities = useMemo(() => {
    if (!currentEntities) return [];
    if (!searchText) return currentEntities;
    
    const schema = currentSchema;
    const searchKeys = schema?.searchFields || [];
    
    return currentEntities.filter(item => 
      searchKeys.some(key => {
        const val = item[key];
        return val !== undefined && val !== null && String(val).toLowerCase().includes(searchText.toLowerCase());
      })
    );
  }, [currentEntities, searchText, currentSchema]);

  // Navigate views
  const navigateTo = (section, subview) => {
    setActiveSection(section);
    setActiveSub(subview);
    setSearchText('');
  };

  // --- CRUD ACTIONS CALLED BY UI ---

  // 1. Create Action
  const createRecord = (item) => {
    const schema = currentSchema;
    if (!schema) return { success: false, error: "No schema config found for active section" };

    const result = EntityUseCases.create(repo, activeSection, activeSub, item, schema);
    
    if (result.success) {
      refreshState();
      addNotification(`CREATED: [${result.id}] successfully in ${activeSection} > ${activeSub}.`, 'success');
      if (result.warning) {
        addNotification(result.warning, 'info');
      }
    } else {
      addNotification(`CREATE FAILED: ${result.error}`, 'error');
    }
    return result;
  };

  // 2. Update Action
  const updateRecord = (id, updatedFields) => {
    const schema = currentSchema;
    if (!schema) return { success: false, error: "No schema config found for active section" };

    const result = EntityUseCases.update(repo, activeSection, activeSub, id, updatedFields, schema);
    
    if (result.success) {
      refreshState();
      addNotification(`UPDATED: [${id}] changes written in ${activeSection} > ${activeSub}.`, 'success');
    } else {
      addNotification(`UPDATE FAILED: ${result.error}`, 'error');
    }
    return result;
  };

  // 3. Delete Action
  const deleteRecord = (id) => {
    const schema = currentSchema;
    if (!schema) return { success: false, error: "No schema config found for active section" };

    const result = EntityUseCases.delete(repo, activeSection, activeSub, id, schema);
    
    if (result.success) {
      refreshState();
      addNotification(`DELETED: [${id}] removed from database successfully.`, 'success');
    } else {
      addNotification(`DELETE REJECTED: ${result.error}`, 'error');
    }
    return result;
  };

  // 4. JSON Generation
  const exportDatabaseJSON = () => {
    const jsonString = EntityUseCases.exportData(repo);
    addNotification(`EXPORTED: Database snapshot JSON generated.`, 'success');
    return jsonString;
  };

  // Simulated Live QC Scan Injection
  const injectQCScan = (scanItem) => {
    repo.db.qualityControl.inProcessQC.unshift(scanItem);
    refreshState();
    addNotification(`SCANNER EVENT: Defect captured: "${scanItem.defectsFound}"`, 'alert');
  };

  return {
    // Database State
    db: repo.db,
    auditLogs: repo.getAuditLogs(),
    dbVersion: dbStateVersion,
    userRole,
    setUserRole,
    searchText,
    setSearchText,
    
    // Notifications State
    notifications,
    setNotifications,
    showNotifications,
    setShowNotifications,
    addNotification,
    toast,
    setToast,

    // Navigation
    activeSection,
    activeSub,
    navigateTo,
    currentSchema,
    currentEntities,
    filteredEntities,

    // CRUD Core Methods
    createRecord,
    updateRecord,
    deleteRecord,
    exportDatabaseJSON,
    injectQCScan,

    // Modal Control State
    isModalOpen,
    setIsModalOpen,
    modalType,
    setModalType,
    modalEntityId,
    setModalEntityId,
    formData,
    setFormData
  };
}
