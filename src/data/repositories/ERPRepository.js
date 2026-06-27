// ERP Repository implementation for data access in Clean Architecture.
// Manages memory database mutations and supports JSON export of the entire system state.

export class ERPRepository {
  constructor(initialData) {
    this.db = { ...initialData };
    this.auditLogs = [];
  }

  // Retrieve list of records
  getEntities(module, subview) {
    const mod = this.resolveModuleKey(module);
    if (!this.db[mod]) return [];
    
    // Some subviews (like reports or costing) are arrays or objects. We normalize here.
    const collection = this.db[mod][this.resolveSubviewKey(subview)];
    return Array.isArray(collection) ? collection : [];
  }

  // Generic Create
  addEntity(module, subview, item, schema) {
    const mod = this.resolveModuleKey(module);
    const sub = this.resolveSubviewKey(subview);
    
    if (!this.db[mod]) {
      this.db[mod] = {};
    }
    if (!Array.isArray(this.db[mod][sub])) {
      this.db[mod][sub] = [];
    }

    // Generate unique ID if not present
    const idField = schema.idField || "id";
    if (!item[idField]) {
      const randId = Math.floor(1000 + Math.random() * 9000);
      item[idField] = `${schema.idPrefix || "ID-"}${randId}`;
    }

    this.db[mod][sub] = [item, ...this.db[mod][sub]];
    
    // Log action
    this.logAction("CREATE", module, subview, item[idField], item);
    return { success: true, item, id: item[idField] };
  }

  // Generic Update
  updateEntity(module, subview, id, updatedItem, schema) {
    const mod = this.resolveModuleKey(module);
    const sub = this.resolveSubviewKey(subview);
    const idField = schema.idField || "id";

    if (!this.db[mod] || !Array.isArray(this.db[mod][sub])) {
      return { success: false, error: "Collection not found" };
    }

    const index = this.db[mod][sub].findIndex(item => String(item[idField]) === String(id));
    if (index === -1) {
      return { success: false, error: "Record not found" };
    }

    // Preserve ID field from being modified
    const oldItem = this.db[mod][sub][index];
    const merged = { ...oldItem, ...updatedItem, [idField]: id };
    
    this.db[mod][sub][index] = merged;
    
    // Log action
    this.logAction("UPDATE", module, subview, id, merged);
    return { success: true, item: merged };
  }

  // Generic Delete
  deleteEntity(module, subview, id, schema) {
    const mod = this.resolveModuleKey(module);
    const sub = this.resolveSubviewKey(subview);
    const idField = schema.idField || "id";

    if (!this.db[mod] || !Array.isArray(this.db[mod][sub])) {
      return { success: false, error: "Collection not found" };
    }

    const index = this.db[mod][sub].findIndex(item => String(item[idField]) === String(id));
    if (index === -1) {
      return { success: false, error: "Record not found" };
    }

    const deletedItem = this.db[mod][sub][index];
    this.db[mod][sub] = this.db[mod][sub].filter(item => String(item[idField]) !== String(id));
    
    // Log action
    this.logAction("DELETE", module, subview, id, deletedItem);
    return { success: true, deletedItem };
  }

  // Generate audit trails of CRUD actions
  logAction(action, module, subview, id, payload) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      action,
      module,
      subview,
      entityId: id,
      operator: "Administrator",
      details: payload
    };
    this.auditLogs.unshift(logEntry);
  }

  // Get audit log list
  getAuditLogs() {
    return this.auditLogs;
  }

  // Export full DB states as formatted JSON string
  exportDatabaseJSON() {
    const backup = {
      exportedAt: new Date().toISOString(),
      dbVersion: "1.4.0",
      operations: {
        summary: this.db.summary,
        processTracking: this.db.production ? this.db.production.processTracking : {}
      },
      data: { ...this.db },
      auditLogs: this.auditLogs
    };
    return JSON.stringify(backup, null, 2);
  }

  // Utility mappings from URL/Sidebar string to mockData.js schema keys
  resolveModuleKey(name) {
    // lowercase the key to match mockData structure, or return matches
    if (name === "Quality Control") return "qualityControl";
    return name.toLowerCase();
  }

  resolveSubviewKey(name) {
    // Match keys in mockData lists
    if (name === "Purchase Requests") return "purchaseRequests";
    if (name === "Purchase Orders") return "purchaseOrders";
    if (name === "Goods Receipt") return "goodsReceipt";
    
    if (name === "Raw Materials") return "rawMaterials";
    if (name === "Stock Movements") return "stockMovements";
    if (name === "Finished Goods") return "finishedGoods";
    
    if (name === "Production Planning") return "productionPlanning";
    if (name === "Work Orders") return "workOrders";
    if (name === "Production Batches") return "productionBatches";
    if (name === "Process Tracking") return "processTracking";
    if (name === "Machine Scheduling") return "machineScheduling";
    
    if (name === "Incoming QC") return "incomingQC";
    if (name === "In-Process QC") return "inProcessQC";
    if (name === "Final QC") return "finalQC";
    
    if (name === "Preventive Maintenance") return "preventiveMaintenance";
    if (name === "Breakdown Logs") return "breakdownLogs";
    
    if (name === "Delivery Orders") return "deliveryOrders";
    
    // Normal defaults: lowercase first letter or exact match
    const mapping = {
      "Customers": "customers",
      "Quotations": "quotations",
      "Sales Orders": "salesOrders",
      "Suppliers": "suppliers",
      "Warehouses": "warehouses",
      "Machines": "machines",
      "Shipments": "shipments",
      "Tracking": "tracking",
      "Invoices": "invoices",
      "Payments": "payments",
      "Expenses": "expenses",
      "Costing": "costing",
      // Reports mapping
      "Production": "production",
      "Inventory": "inventory",
      "Sales": "sales",
      "Procurement": "procurement",
      "Quality": "quality",
      "Finance": "finance"
    };

    return mapping[name] || name;
  }
}
