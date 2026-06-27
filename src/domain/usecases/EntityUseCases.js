// Application Use Cases (Clean Architecture Coordinator Layer).
// Orchestrates business validation logic and binds actions to database layers.

export class EntityUseCases {
  // Validate and execute creation
  static create(repository, module, subview, item, schema) {
    // 1. Business Validation Rules
    if (!item) {
      return { success: false, error: "Empty record data payload" };
    }

    // Check required fields
    for (const field of schema.fields) {
      if (field.required && (item[field.key] === undefined || item[field.key] === "")) {
        return { success: false, error: `Field "${field.label}" is mandatory.` };
      }
    }

    // Business rule: Limit credit checks on new customers
    if (module === "CRM" && subview === "Customers") {
      const creditNum = parseFloat((item.creditLimit || "").replace(/[^0-9.]/g, ''));
      if (creditNum > 1000000) {
        return { 
          success: false, 
          error: "Credit limit exceeds $1M corporate risk cap. Requires Director approval." 
        };
      }
    }

    // Business rule: Warn if safety stock levels are set to zero
    if (module === "Inventory" && subview === "Raw Materials") {
      const stockNum = parseFloat((item.stock || "").replace(/[^0-9.]/g, ''));
      if (stockNum <= 0) {
        return {
          success: true,
          warning: "WARNING: Material level initialized at zero. Reorder trigger will fire immediately.",
          ...repository.addEntity(module, subview, item, schema)
        };
      }
    }

    // 2. Delegate to repository
    const result = repository.addEntity(module, subview, item, schema);
    return { success: true, ...result };
  }

  // Validate and execute update
  static update(repository, module, subview, id, updatedItem, schema) {
    if (!id) {
      return { success: false, error: "Entity identifier is required for modification" };
    }

    // Verify required fields
    for (const field of schema.fields) {
      if (field.required && (updatedItem[field.key] === undefined || updatedItem[field.key] === "")) {
        return { success: false, error: `Field "${field.label}" cannot be left empty.` };
      }
    }

    // Business rule: Tempering work order cannot go backwards in progress
    if (module === "Production" && subview === "Work Orders") {
      if (updatedItem.status === "Completed" && parseFloat(updatedItem.currentProgress) < 100) {
        updatedItem.currentProgress = "100%";
      }
    }

    const result = repository.updateEntity(module, subview, id, updatedItem, schema);
    return result;
  }

  // Validate and execute deletion
  static delete(repository, module, subview, id, schema) {
    if (!id) {
      return { success: false, error: "Record identity required for deletion" };
    }

    // Business rule: Protect active campaign runs
    if (module === "Production" && subview === "Production Planning") {
      const plans = repository.getEntities(module, subview);
      const target = plans.find(p => String(p[schema.idField || "id"]) === String(id));
      if (target && target.status === "Active") {
        return { 
          success: false, 
          error: "Campaign deletion rejected: Campaign is currently drawing silica sand into Furnace #1." 
        };
      }
    }

    // Business rule: Protect active machines
    if (module === "Maintenance" && subview === "Machines") {
      const machinery = repository.getEntities(module, subview);
      const target = machinery.find(m => String(m[schema.idField || "id"]) === String(id));
      if (target && target.status === "Operational") {
        return {
          success: false,
          error: "Asset deletion rejected: Shutdown and lockout-tagout (LOTO) machine before removing from ERP."
        };
      }
    }

    const result = repository.deleteEntity(module, subview, id, schema);
    return result;
  }

  // JSON exporter usecase
  static exportData(repository) {
    return repository.exportDatabaseJSON();
  }
}
