import React, { useState } from 'react';
import { 
  Users, ShoppingCart, Package, Cpu, Award, Wrench, Truck, DollarSign, BarChart3, X
} from 'lucide-react';
import { useERP } from './presentation/hooks/useERP';
import Sidebar from './presentation/components/Sidebar';
import Header from './presentation/components/Header';
import Login from './presentation/components/Login';
import DashboardOverview from './presentation/components/DashboardOverview';
import DynamicTableView from './presentation/components/DynamicTableView';
import CRUDModal from './presentation/components/CRUDModal';
import ProcessTrackingView from './presentation/components/ProcessTrackingView';
import CostingView from './presentation/components/CostingView';
import BackupModal from './presentation/components/BackupModal';
import DeleteConfirmModal from './presentation/components/DeleteConfirmModal';
import './App.css';

// Menu mapping matching the outline structure
const menuConfig = [
  {
    name: "CRM",
    icon: Users,
    items: ["Customers", "Quotations", "Sales Orders"]
  },
  {
    name: "Procurement",
    icon: ShoppingCart,
    items: ["Suppliers", "Purchase Requests", "Purchase Orders", "Goods Receipt"]
  },
  {
    name: "Inventory",
    icon: Package,
    items: ["Raw Materials", "Warehouses", "Stock Movements", "Finished Goods"]
  },
  {
    name: "Production",
    icon: Cpu,
    items: ["Production Planning", "Work Orders", "Production Batches", "Process Tracking", "Machine Scheduling"]
  },
  {
    name: "Quality Control",
    icon: Award,
    items: ["Incoming QC", "In-Process QC", "Final QC"]
  },
  {
    name: "Maintenance",
    icon: Wrench,
    items: ["Machines", "Preventive Maintenance", "Breakdown Logs"]
  },
  {
    name: "Logistics",
    icon: Truck,
    items: ["Delivery Orders", "Shipments", "Tracking"]
  },
  {
    name: "Finance",
    icon: DollarSign,
    items: ["Invoices", "Payments", "Expenses", "Costing"]
  },
  {
    name: "Reports",
    icon: BarChart3,
    items: ["Production", "Inventory", "Sales", "Procurement", "Quality", "Finance"]
  }
];

export default function App() {
  const erp = useERP();
  
  // Local UI states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [jsonBackupContent, setJsonBackupContent] = useState('');

  // Delete Confirmation states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState(null);

  // Intercept delete trigger
  const handleOpenDelete = (id) => {
    setDeleteModalId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    erp.deleteRecord(deleteModalId);
    setDeleteModalOpen(false);
    setDeleteModalId(null);
  };

  // Handle local user login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    erp.addNotification("Operator authenticated on terminal.", "success");
  };

  // Handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    erp.navigateTo(null, null);
  };

  // Trigger DB backup creation
  const handleExportBackup = () => {
    const backupStr = erp.exportDatabaseJSON();
    setJsonBackupContent(backupStr);
    setIsBackupOpen(true);
  };

  // Download backup utility
  const handleDownloadBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonBackupContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `vitroglass_db_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    erp.addNotification("JSON backup file downloaded to disk.", "success");
  };

  // Copy to clipboard utility
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(jsonBackupContent);
    erp.addNotification("JSON string copied to clipboard.", "info");
  };

  // Handle furnace slider change (combustion)
  const handleFurnaceSlider = (e) => {
    const temp = parseInt(e.target.value);
    erp.db.summary.furnaceTemp = temp;
    if (temp > 1585) {
      erp.addNotification(`FURNACE TEMPERATURE DANGEROUSLY HIGH: ${temp}°C`, 'alert');
    } else if (temp < 1540) {
      erp.addNotification(`FURNACE COOLING DETECTED: ${temp}°C`, 'alert');
    }
    // Force simple re-render
    erp.setNotifications(prev => [...prev]);
  };

  // Open creation modal
  const handleOpenCreate = () => {
    if (!erp.currentSchema) return;
    erp.setModalType('create');
    erp.setModalEntityId(null);
    
    // Form default structure mapping
    const initialData = {};
    erp.currentSchema.fields.forEach(f => {
      if (f.type === 'date') {
        initialData[f.key] = new Date().toISOString().split('T')[0];
      } else if (f.key === 'delayMinutes') {
        initialData[f.key] = 0;
      } else {
        initialData[f.key] = f.defaultValue !== undefined ? f.defaultValue : '';
      }
    });
    
    erp.setFormData(initialData);
    erp.setIsModalOpen(true);
  };

  // Open edit modal
  const handleOpenEdit = (item) => {
    const idField = erp.currentSchema.idField || "id";
    erp.setModalType('edit');
    erp.setModalEntityId(item[idField]);
    erp.setFormData({ ...item });
    erp.setIsModalOpen(true);
  };

  // Handle modal submit (create / edit)
  const handleModalSubmit = (submittedData) => {
    if (erp.modalType === 'create') {
      const res = erp.createRecord(submittedData);
      if (res.success) erp.setIsModalOpen(false);
    } else {
      const res = erp.updateRecord(erp.modalEntityId, submittedData);
      if (res.success) erp.setIsModalOpen(false);
    }
  };

  // Dynamic Routing View Dispatcher
  const renderViewContent = () => {
    if (!erp.activeSection) {
      return (
        <DashboardOverview 
          db={erp.db} 
          navigateTo={erp.navigateTo} 
          handleSimulateQC={erp.showNotifications} 
        />
      );
    }

    if (erp.activeSub === 'Process Tracking') {
      return (
        <ProcessTrackingView 
          db={erp.db} 
          handleFurnaceSlider={handleFurnaceSlider} 
        />
      );
    }

    if (erp.activeSub === 'Costing') {
      return <CostingView db={erp.db} />;
    }

    // Dynamic grid schema view
    return (
      <DynamicTableView 
        activeSection={erp.activeSection}
        activeSub={erp.activeSub}
        schema={erp.currentSchema}
        list={erp.filteredEntities}
        handleOpenCreate={handleOpenCreate}
        handleOpenEdit={handleOpenEdit}
        deleteRecord={handleOpenDelete}
      />
    );
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-container">
      {/* 1. Sidebar Nav */}
      <Sidebar 
        menuConfig={menuConfig}
        activeSection={erp.activeSection}
        activeSub={erp.activeSub}
        navigateTo={erp.navigateTo}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        userRole={erp.userRole}
        handleLogout={handleLogout}
      />

      {/* 2. Main Console content */}
      <main className="main-content">
        <Header 
          activeSection={erp.activeSection}
          activeSub={erp.activeSub}
          searchText={erp.searchText}
          setSearchText={erp.setSearchText}
          userRole={erp.userRole}
          setUserRole={erp.setUserRole}
          notifications={erp.notifications}
          setNotifications={erp.setNotifications}
          addNotification={erp.addNotification}
          handleExportBackup={handleExportBackup}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          dbVersion={erp.dbVersion}
        />

        <div className="dashboard-body">
          {renderViewContent()}
        </div>
      </main>

      {/* 3. Self-contained Form Modal */}
      <CRUDModal 
        isOpen={erp.isModalOpen}
        onClose={() => erp.setIsModalOpen(false)}
        modalType={erp.modalType}
        modalEntityId={erp.modalEntityId}
        schema={erp.currentSchema}
        initialData={erp.formData}
        onSubmit={handleModalSubmit}
      />

      {/* 4. JSON Exporter Backup Modal */}
      <BackupModal 
        isOpen={isBackupOpen}
        onClose={() => setIsBackupOpen(false)}
        generatedJson={jsonBackupContent}
        onCopyToClipboard={handleCopyToClipboard}
        onDownloadBackup={handleDownloadBackup}
      />

      {/* 5. Delete Confirmation Modal */}
      <DeleteConfirmModal 
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        entityId={deleteModalId}
        moduleName={erp.activeSection}
        subviewName={erp.activeSub}
      />

      {/* 6. On-screen Toast system */}
      {erp.toast && (
        <div className="toast-container">
          <div className={`toast toast-${erp.toast.type}`}>
            <div className="toast-content">{erp.toast.text}</div>
            <button className="toast-close" onClick={() => erp.setToast(null)}>
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
