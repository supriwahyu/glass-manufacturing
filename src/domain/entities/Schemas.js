// Domain Schemas defining data entities for all 9 modules and 36 subviews.
// This forms the core Domain Rules of our Clean Architecture.

export const EntitySchemas = {
  CRM: {
    Customers: {
      idPrefix: "CUST-",
      idField: "id",
      searchFields: ["name", "contact", "email", "region"],
      fields: [
        { key: "name", label: "Customer Name", type: "text", required: true, placeholder: "e.g. GlazeTech Facades Ltd" },
        { key: "region", label: "Commercial Region", type: "select", options: ["North America", "Europe", "East Asia", "Middle East", "South America"], required: true },
        { key: "contact", label: "Main Contact", type: "text", required: true, placeholder: "e.g. Sarah Jenkins" },
        { key: "email", label: "Email Address", type: "email", required: true, placeholder: "s.jenkins@glazetech.com" },
        { key: "phone", label: "Phone Number", type: "text", placeholder: "+1 555-0198" },
        { key: "creditLimit", label: "Credit Limit", type: "text", placeholder: "$150,000" },
        { key: "status", label: "Account Status", type: "select", options: ["Active", "Suspended"], required: true }
      ]
    },
    Quotations: {
      idPrefix: "QT-2026-",
      idField: "id",
      searchFields: ["id", "customer", "items", "status"],
      fields: [
        { key: "customer", label: "Customer Name", type: "text", required: true, placeholder: "e.g. SolarPane Industries" },
        { key: "items", label: "Glass items Description", type: "textarea", required: true, placeholder: "12,000 sqm Ultra-Clear Float Glass (3.2mm)" },
        { key: "date", label: "Issue Date", type: "date", required: true },
        { key: "validity", label: "Validity Expiry", type: "date", required: true },
        { key: "total", label: "Estimated Net Total", type: "text", required: true, placeholder: "$98,400" },
        { key: "status", label: "Validity Status", type: "select", options: ["Draft", "Sent", "Accepted"], required: true }
      ]
    },
    "Sales Orders": {
      idPrefix: "SO-",
      idField: "id",
      searchFields: ["id", "customer", "status", "priority"],
      fields: [
        { key: "customer", label: "Customer Purchaser", type: "text", required: true, placeholder: "e.g. GlazeTech Facades Ltd" },
        { key: "date", label: "Order Date", type: "date", required: true },
        { key: "deliveryDate", label: "Target Delivery", type: "date", required: true },
        { key: "amount", label: "Net Value", type: "text", required: true, placeholder: "$124,000" },
        { key: "priority", label: "Melt Priority", type: "select", options: ["Medium", "High", "Critical"], required: true },
        { key: "status", label: "Production Status", type: "select", options: ["Approved", "In Production", "Awaiting QC", "Shipped"], required: true }
      ]
    }
  },

  Procurement: {
    Suppliers: {
      idPrefix: "SUP-",
      idField: "id",
      searchFields: ["name", "material", "status"],
      fields: [
        { key: "name", label: "Supplier Name", type: "text", required: true, placeholder: "e.g. Belgian Silica Corp" },
        { key: "material", label: "Supply Materials", type: "text", required: true, placeholder: "e.g. Silica Sand (SiO2 > 99.5%)" },
        { key: "contact", label: "Representative Contact", type: "text", required: true, placeholder: "e.g. Luc De Smet" },
        { key: "email", label: "Business Email", type: "email", required: true, placeholder: "desmet@belgiansilica.be" },
        { key: "phone", label: "Contact Phone", type: "text", placeholder: "+32 2 456 7890" },
        { key: "rating", label: "Supplier Score", type: "text", required: true, placeholder: "98%" },
        { key: "status", label: "Audit Status", type: "select", options: ["Approved", "Under Review", "Suspended"], required: true }
      ]
    },
    "Purchase Requests": {
      idPrefix: "PR-",
      idField: "id",
      searchFields: ["item", "requestedBy", "status"],
      fields: [
        { key: "item", label: "Item Description", type: "text", required: true, placeholder: "e.g. Silica Sand Grade A" },
        { key: "qty", label: "Requested Tonnage / Qty", type: "text", required: true, placeholder: "e.g. 800 Tons" },
        { key: "estCost", label: "Estimated Cost", type: "text", required: true, placeholder: "$56,000" },
        { key: "requestedBy", label: "Requested By Department", type: "text", required: true, placeholder: "Batch Plant Manager" },
        { key: "date", label: "Request Date", type: "date", required: true },
        { key: "urgency", label: "Urgency", type: "select", options: ["Medium", "High", "Critical"], required: true },
        { key: "status", label: "Approval Status", type: "select", options: ["Pending", "Approved", "Rejected"], required: true }
      ]
    },
    "Purchase Orders": {
      idPrefix: "PO-",
      idField: "id",
      searchFields: ["id", "supplier", "status"],
      fields: [
        { key: "supplier", label: "Supplier Vendor", type: "text", required: true, placeholder: "e.g. Belgian Silica Corp" },
        { key: "date", label: "Issue Date", type: "date", required: true },
        { key: "expectedDate", label: "Expected ETA", type: "date", required: true },
        { key: "total", label: "PO Total Value", type: "text", required: true, placeholder: "$74,200" },
        { key: "paymentTerms", label: "Payment Terms", type: "select", options: ["Net 30", "Net 45", "Net 60"], required: true },
        { key: "status", label: "Logistics Status", type: "select", options: ["Draft", "Confirmed", "In Transit", "Delivered"], required: true }
      ]
    },
    "Goods Receipt": {
      idPrefix: "GR-",
      idField: "id",
      searchFields: ["id", "poNumber", "supplier", "material"],
      fields: [
        { key: "poNumber", label: "PO Reference", type: "text", required: true, placeholder: "PO-7701" },
        { key: "supplier", label: "Supplier Vendor", type: "text", required: true, placeholder: "Belgian Silica Corp" },
        { key: "material", label: "Material Type Received", type: "text", required: true, placeholder: "Silica Sand Grade A" },
        { key: "receivedQty", label: "Received Weight/Qty", type: "text", required: true, placeholder: "400 Tons" },
        { key: "date", label: "Receipt Date", type: "date", required: true },
        { key: "inspectionStatus", label: "QC Inspection Status", type: "select", options: ["Pending QC Scan", "Passed QC", "Failed QC"], required: true },
        { key: "warehouseBin", label: "Warehouse Bin / Silo", type: "text", required: true, placeholder: "Silo-Sand-A" }
      ]
    }
  },

  Inventory: {
    "Raw Materials": {
      idPrefix: "RM-",
      idField: "id",
      searchFields: ["name", "silo", "status"],
      fields: [
        { key: "name", label: "Raw Material Name", type: "text", required: true, placeholder: "Silica Sand Grade A" },
        { key: "silo", label: "Silo / Bin Code", type: "text", required: true, placeholder: "Silo A1" },
        { key: "stock", label: "Current Stock Level", type: "text", required: true, placeholder: "6,200 Tons" },
        { key: "capacity", label: "Max Capacity Limit", type: "text", required: true, placeholder: "8,000 Tons" },
        { key: "temperature", label: "Internal Temp (°C)", type: "text", placeholder: "24°C" },
        { key: "status", label: "Silo Status", type: "select", options: ["Optimal", "Medium", "Reorder Triggered"], required: true }
      ]
    },
    Warehouses: {
      idPrefix: "WH-",
      idField: "id",
      searchFields: ["name", "location", "primaryUse"],
      fields: [
        { key: "name", label: "Warehouse Zone Name", type: "text", required: true, placeholder: "Float Line Output Storage" },
        { key: "location", label: "Zone Location", type: "text", required: true, placeholder: "Zone Alpha" },
        { key: "capacity", label: "Utilisation Percentage", type: "text", required: true, placeholder: "85%" },
        { key: "primaryUse", label: "Primary Storage Use", type: "text", required: true, placeholder: "Annealed Glass Jumbo Sheets" }
      ]
    },
    "Stock Movements": {
      idPrefix: "MV-",
      idField: "id",
      searchFields: ["material", "fromZone", "toZone"],
      fields: [
        { key: "material", label: "Material Dispatched", type: "text", required: true, placeholder: "Silica Sand Grade A" },
        { key: "fromZone", label: "Dispatched From", type: "text", required: true, placeholder: "Silo A1" },
        { key: "toZone", label: "Routed To", type: "text", required: true, placeholder: "Furnace Batch Mixer #1" },
        { key: "qty", label: "Movement Quantity", type: "text", required: true, placeholder: "140 Tons" },
        { key: "time", label: "Movement Time", type: "text", required: true, placeholder: "2026-06-27 10:15" },
        { key: "handler", label: "Operator/Conveyor", type: "text", required: true, placeholder: "Automated Conveyor A" }
      ]
    },
    "Finished Goods": {
      idPrefix: "FG-",
      idField: "id",
      searchFields: ["description", "location"],
      fields: [
        { key: "description", label: "Product Description", type: "text", required: true, placeholder: "Float Glass Clear 4mm Jumbo" },
        { key: "qty", label: "Total Packs stored", type: "text", required: true, placeholder: "140 Packs" },
        { key: "weight", label: "Total Net Weight", type: "text", required: true, placeholder: "280 Tons" },
        { key: "location", label: "Warehouse Grid Location", type: "text", required: true, placeholder: "WH-A-Row3" },
        { key: "value", label: "Valuation Value", type: "text", required: true, placeholder: "$168,000" }
      ]
    }
  },

  Production: {
    "Production Planning": {
      idPrefix: "PLAN-",
      idField: "id",
      searchFields: ["description", "furnace", "status"],
      fields: [
        { key: "description", label: "Run Campaign details", type: "text", required: true, placeholder: "Run #18 - Clear Float Glass 6mm" },
        { key: "furnace", label: "Melting Furnace Unit", type: "select", options: ["Furnace #1", "Furnace #2"], required: true },
        { key: "pullRateTarget", label: "Target Pull Rate", type: "text", required: true, placeholder: "320 Tons/day" },
        { key: "start", label: "Campaign Start", type: "date", required: true },
        { key: "end", label: "Campaign Completion", type: "date", required: true },
        { key: "status", label: "Planning Status", type: "select", options: ["Active", "Scheduled", "Completed"], required: true }
      ]
    },
    "Work Orders": {
      idPrefix: "WO-",
      idField: "id",
      searchFields: ["id", "runCode", "desc", "status"],
      fields: [
        { key: "runCode", label: "Campaign Code Reference", type: "text", required: true, placeholder: "PLAN-26A" },
        { key: "desc", label: "Task Work Description", type: "text", required: true, placeholder: "Cut Float 6mm to Custom size 2.4mx3.2m" },
        { key: "qty", label: "Target Volume / Pcs", type: "text", required: true, placeholder: "2,000 sqm" },
        { key: "requestedBy", label: "Origin Sales Order Ref", type: "text", required: true, placeholder: "SO-8921" },
        { key: "currentProgress", label: "Current Progress %", type: "text", required: true, placeholder: "65%" },
        { key: "status", label: "Operations Status", type: "select", options: ["Released", "In Progress", "Completed"], required: true }
      ]
    },
    "Production Batches": {
      idPrefix: "BTCH-",
      idField: "id",
      searchFields: ["id", "mixer", "status"],
      fields: [
        { key: "mixer", label: "Assigned Mixer Scale", type: "text", required: true, placeholder: "Mixer A" },
        { key: "silica", label: "Quartz Sand Weight (kg)", type: "text", required: true, placeholder: "15,000 kg" },
        { key: "sodaAsh", label: "Soda Ash Weight (kg)", type: "text", required: true, placeholder: "5,100 kg" },
        { key: "dolomite", label: "Dolomite Weight (kg)", type: "text", required: true, placeholder: "4,200 kg" },
        { key: "limestone", label: "Limestone Weight (kg)", type: "text", required: true, placeholder: "1,500 kg" },
        { key: "culletRatio", label: "Mix Recycled Cullet Ratio", type: "text", required: true, placeholder: "25%" },
        { key: "mixTime", label: "Mixing Duration", type: "text", required: true, placeholder: "8.5 mins" },
        { key: "status", label: "Discharge Status", type: "select", options: ["Mixing", "Discharged to Silo"], required: true }
      ]
    },
    "Process Tracking": {
      idPrefix: "PT-",
      idField: "id",
      searchFields: ["id"],
      fields: [
        { key: "parameter", label: "Operating Parameter Name", type: "text", required: true },
        { key: "value", label: "Current Value", type: "text", required: true },
        { key: "status", label: "System Status", type: "select", options: ["Optimal", "Warning", "Alarm"] }
      ]
    },
    "Machine Scheduling": {
      idPrefix: "SCHED-",
      idField: "machine",
      searchFields: ["machine", "task", "status"],
      fields: [
        { key: "machine", label: "Machinery Asset", type: "text", required: true, placeholder: "Furnace #1 (Float)" },
        { key: "task", label: "Assigned Work Task", type: "text", required: true, placeholder: "Continuous Melting (Run 18)" },
        { key: "start", label: "Start Date/Time", type: "text", required: true, placeholder: "June 25" },
        { key: "end", label: "End Date/Time", type: "text", required: true, placeholder: "July 2" },
        { key: "utilization", label: "Expected Utilisation %", type: "text", required: true, placeholder: "98%" },
        { key: "status", label: "Timeline Status", type: "select", options: ["Running", "Setup", "Idle"], required: true }
      ]
    }
  },

  "Quality Control": {
    "Incoming QC": {
      idPrefix: "IQC-",
      idField: "id",
      searchFields: ["shipment", "inspector", "result"],
      fields: [
        { key: "shipment", label: "Shipment GRN Ref", type: "text", required: true, placeholder: "GR-9012 (Sand)" },
        { key: "paramSiO2", label: "SiO2 Assay %", type: "text", required: true, placeholder: "99.64% (Target > 99.5%)" },
        { key: "Fe2O3", label: "Fe2O3 Content %", type: "text", required: true, placeholder: "0.012% (Target < 0.015%)" },
        { key: "moisture", label: "Moisture Content %", type: "text", required: true, placeholder: "4.1% (Optimal)" },
        { key: "inspector", label: "Assay Lab Officer", type: "text", required: true, placeholder: "Dr. K. Schmidt" },
        { key: "result", label: "QC Disposition", type: "select", options: ["Passed", "Rejected"], required: true }
      ]
    },
    "In-Process QC": {
      idPrefix: "IPQC-",
      idField: "time",
      searchFields: ["scanner", "defectsFound"],
      fields: [
        { key: "time", label: "Scan Timestamp", type: "text", required: true, placeholder: "12:15:30" },
        { key: "scanner", label: "Laser Sensor Station", type: "text", required: true, placeholder: "Float Camera System C1" },
        { key: "defectsFound", label: "Defects Registered", type: "text", required: true, placeholder: "Bubble (0.4mm) - Marker Left" },
        { key: "action", label: "Automated Feedback Action", type: "text", required: true, placeholder: "Defect logged - Ribbon marker fired" },
        { key: "status", label: "Scan Status", type: "select", options: ["Optimal", "Monitoring", "Resolved"], required: true }
      ]
    },
    "Final QC": {
      idPrefix: "FQC-",
      idField: "id",
      searchFields: ["woRef", "inspector", "result"],
      fields: [
        { key: "woRef", label: "Work Order reference", type: "text", required: true, placeholder: "WO-6651" },
        { key: "batch", label: "Mixer Batch source", type: "text", required: true, placeholder: "Batch-801" },
        { key: "opticalPurity", label: "Spectroscopy Purity %", type: "text", required: true, placeholder: "99.98%" },
        { key: "impactStrength", label: "Crate Impact deflection", type: "text", required: true, placeholder: "Passed (120J)" },
        { key: "thicknessCheck", label: "Cutter Thickness Check", type: "text", required: true, placeholder: "6.02mm (within +/- 0.05)" },
        { key: "inspector", label: "Inspecting QC Officer", type: "text", required: true, placeholder: "L. Vance" },
        { key: "result", label: "QC Status", type: "select", options: ["Approved", "Scrapped & Recycled"], required: true }
      ]
    }
  },

  Maintenance: {
    Machines: {
      idPrefix: "MC-",
      idField: "id",
      searchFields: ["name", "status"],
      fields: [
        { key: "name", label: "Machine Asset Name", type: "text", required: true, placeholder: "Primary Melting Furnace #1" },
        { key: "health", label: "Operational Health Index", type: "text", required: true, placeholder: "94%" },
        { key: "runtime", label: "Cumulative Run Hours", type: "text", required: true, placeholder: "4,320 hrs" },
        { key: "lastService", label: "Last Serviced Date", type: "date", required: true },
        { key: "nextService", label: "Next Scheduled Service", type: "date", required: true },
        { key: "status", label: "Machinery Status", type: "select", options: ["Operational", "Needs Calibration", "Setup"], required: true }
      ]
    },
    "Preventive Maintenance": {
      idPrefix: "PM-",
      idField: "id",
      searchFields: ["machine", "action", "status"],
      fields: [
        { key: "machine", label: "Assigned Asset Machine", type: "text", required: true, placeholder: "Cutting CNC" },
        { key: "action", label: "Maintenance Work Detail", type: "text", required: true, placeholder: "Replace Diamond Wheel & Lubricate Rails" },
        { key: "frequency", label: "Frequency Interval", type: "select", options: ["Bi-Weekly", "Monthly", "Quarterly", "Annual"], required: true },
        { key: "lastPerformed", label: "Last Completed Date", type: "date", required: true },
        { key: "scheduledDate", label: "Next Due Date", type: "date", required: true },
        { key: "status", label: "Schedule Status", type: "select", options: ["Scheduled", "Due Tomorrow", "Overdue"], required: true }
      ]
    },
    "Breakdown Logs": {
      idPrefix: "BD-",
      idField: "id",
      searchFields: ["machine", "issue", "status"],
      fields: [
        { key: "machine", label: "Asset Machine", type: "text", required: true, placeholder: "Alpha Diamond Scoring CNC" },
        { key: "date", label: "Failure Occurrence Date", type: "date", required: true },
        { key: "downtime", label: "Net Production Downtime", type: "text", required: true, placeholder: "2h 15m" },
        { key: "issue", label: "Failure Root Cause", type: "textarea", required: true, placeholder: "Glass dust jam in vertical linear rail guide" },
        { key: "resolution", label: "Correction Resolution Taken", type: "text", placeholder: "Rail cleaned, vacuum shroud adjusted" },
        { key: "status", label: "Log Status", type: "select", options: ["Open", "Closed"], required: true }
      ]
    }
  },

  Logistics: {
    "Delivery Orders": {
      idPrefix: "DO-",
      idField: "id",
      searchFields: ["id", "customer", "status"],
      fields: [
        { key: "soRef", label: "Origin Sales Order Ref", type: "text", required: true, placeholder: "SO-8923" },
        { key: "customer", label: "Client Consignee", type: "text", required: true, placeholder: "Apex Automotive Glass" },
        { key: "transportCompany", label: "Hauler Carrier Partner", type: "text", required: true, placeholder: "Titan Logistics" },
        { key: "dispatchDate", label: "Scheduled Dispatch", type: "date", required: true },
        { key: "items", label: "Crated Items List", type: "text", required: true, placeholder: "12 Crates Windshields Type-X" },
        { key: "status", label: "Dispatch Status", type: "select", options: ["Awaiting Production", "Loading", "Dispatched"], required: true }
      ]
    },
    Shipments: {
      idPrefix: "SHP-",
      idField: "id",
      searchFields: ["id", "carrier", "status"],
      fields: [
        { key: "carrier", label: "Hauler Carrier Partner", type: "text", required: true, placeholder: "Titan Logistics" },
        { key: "trackingNo", label: "Logistics Waybill No", type: "text", required: true, placeholder: "TRK-984210" },
        { key: "vehicleNo", label: "Truck Registration", type: "text", required: true, placeholder: "TX-99-A-1282" },
        { key: "loadWeight", label: "Net Cargo Weight", type: "text", required: true, placeholder: "22 Tons" },
        { key: "targetEta", label: "Target Route ETA", type: "text", required: true, placeholder: "2026-06-28" },
        { key: "route", label: "Dispatch Route", type: "text", required: true, placeholder: "Factory -> Hamburg Port" },
        { key: "status", label: "Freight Status", type: "select", options: ["En Route", "In Transit", "Delivered"], required: true }
      ]
    },
    Tracking: {
      idPrefix: "TRK-",
      idField: "shipmentId",
      searchFields: ["shipmentId", "status"],
      fields: [
        { key: "shipmentId", label: "Shipment Ref Code", type: "text", required: true, placeholder: "SHP-7811" },
        { key: "lastCoordinates", label: "GPS Coordinates", type: "text", required: true, placeholder: "53.5511° N, 9.9937° E (Hamburg)" },
        { key: "speed", label: "Current Speed (km/h)", type: "text", required: true, placeholder: "65 km/h" },
        { key: "status", label: "Transit Status", type: "select", options: ["On Schedule", "Delivered", "Delayed"], required: true },
        { key: "delayMinutes", label: "Delay (Minutes)", type: "number", defaultValue: 0, required: true }
      ]
    }
  },

  Finance: {
    Invoices: {
      idPrefix: "INV-2026-",
      idField: "id",
      searchFields: ["id", "customer", "status"],
      fields: [
        { key: "soRef", label: "Sales Order reference", type: "text", required: true, placeholder: "SO-8923" },
        { key: "customer", label: "Customer Client", type: "text", required: true, placeholder: "Apex Automotive Glass" },
        { key: "invoiceDate", label: "Invoice Date", type: "date", required: true },
        { key: "dueDate", label: "Payment Due Date", type: "date", required: true },
        { key: "amount", label: "Net Bill amount", type: "text", required: true, placeholder: "$195,500" },
        { key: "tax", label: "VAT Tax (20%)", type: "text", required: true, placeholder: "$39,100" },
        { key: "status", label: "Invoice Status", type: "select", options: ["Draft", "Sent", "Paid"], required: true }
      ]
    },
    Payments: {
      idPrefix: "PAY-",
      idField: "id",
      searchFields: ["id", "customer", "method"],
      fields: [
        { key: "invoiceRef", label: "Invoice Ref No", type: "text", required: true, placeholder: "INV-2026-550" },
        { key: "customer", label: "Customer Client", type: "text", required: true, placeholder: "Bespoke Glass Design Inc" },
        { key: "date", label: "Wire Receipt Date", type: "date", required: true },
        { key: "amount", label: "Cash Amount Received", type: "text", required: true, placeholder: "$21,840" },
        { key: "method", label: "Transfer Channel", type: "select", options: ["Wire Transfer", "ACH Transfer", "Letter of Credit"], required: true },
        { key: "status", label: "Bank Clearance", type: "select", options: ["Cleared", "Awaiting Clearance"], required: true }
      ]
    },
    Expenses: {
      idPrefix: "EXP-",
      idField: "id",
      searchFields: ["category", "vendor", "status"],
      fields: [
        { key: "category", label: "Operational Category", type: "text", required: true, placeholder: "Energy (Natural Gas)" },
        { key: "vendor", label: "Creditor Vendor", type: "text", required: true, placeholder: "Global Gas Grid" },
        { key: "date", label: "Expense Date", type: "date", required: true },
        { key: "amount", label: "Expense Amount", type: "text", required: true, placeholder: "$380,000" },
        { key: "description", label: "Expense Description", type: "textarea", required: true, placeholder: "Furnace #1 and #2 gas consumption" },
        { key: "status", label: "Approval Status", type: "select", options: ["Approved", "Paid"], required: true }
      ]
    },
    Costing: {
      idPrefix: "CST-",
      idField: "element",
      searchFields: ["element"],
      fields: [
        { key: "element", label: "Cost Driver Element", type: "text", required: true, placeholder: "Natural Gas (Melting)" },
        { key: "costPerTon", label: "Unit Cost Per Ton", type: "text", required: true, placeholder: "$48.50" },
        { key: "pct", label: "Visual Weight %", type: "text", required: true, placeholder: "38.5%" }
      ]
    }
  },

  Reports: {
    Production: {
      idPrefix: "REP-PROD-",
      idField: "month",
      searchFields: ["month"],
      fields: [
        { key: "month", label: "Reporting Month", type: "text", required: true, placeholder: "July" },
        { key: "furnaceInput", label: "Furnace Input (Tons)", type: "text", required: true, placeholder: "10,800" },
        { key: "packableOutput", label: "Packable Output (Tons)", type: "text", required: true, placeholder: "10,680" },
        { key: "yieldRate", label: "Yield Rate (%)", type: "text", required: true, placeholder: "98.4%" },
        { key: "defectiveScrap", label: "Defective Scrap (Tons)", type: "text", required: true, placeholder: "170" }
      ]
    },
    Inventory: {
      idPrefix: "REP-INV-",
      idField: "warehouseArea",
      searchFields: ["warehouseArea"],
      fields: [
        { key: "warehouseArea", label: "Warehouse Area", type: "text", required: true, placeholder: "Zone Alpha (Jumbo)" },
        { key: "totalCapacity", label: "Total Capacity Limit", type: "text", required: true, placeholder: "12,000 Tons" },
        { key: "stockUtilized", label: "Utilized Weight", type: "text", required: true, placeholder: "10,200 Tons" },
        { key: "valuation", label: "Total Valuation", type: "text", required: true, placeholder: "$6.12M" },
        { key: "inventoryTurnRatio", label: "Turn Ratio", type: "text", required: true, placeholder: "14.2" }
      ]
    },
    Sales: {
      idPrefix: "REP-SLS-",
      idField: "productClass",
      searchFields: ["productClass"],
      fields: [
        { key: "productClass", label: "Product Class", type: "text", required: true, placeholder: "Clear Float Glass" },
        { key: "sqmShipped", label: "Shipped Area (Sqm)", type: "text", required: true, placeholder: "420,000" },
        { key: "revenueGenerated", label: "Net Revenue", type: "text", required: true, placeholder: "$3,360,000" },
        { key: "avgSellingPrice", label: "Average Price / Sqm", type: "text", required: true, placeholder: "$8.00" },
        { key: "yoyGrowth", label: "YoY Growth Percentage", type: "text", required: true, placeholder: "+8.2%" }
      ]
    },
    Procurement: {
      idPrefix: "REP-PROC-",
      idField: "materialType",
      searchFields: ["materialType"],
      fields: [
        { key: "materialType", label: "Material Purchased", type: "text", required: true, placeholder: "Silica Sand Grade A" },
        { key: "supplierOrigin", label: "Supplier Origin Location", type: "text", required: true, placeholder: "Belgium / domestic" },
        { key: "tonnagePurchased", label: "Tonnage Purchased", type: "text", required: true, placeholder: "4,800 Tons" },
        { key: "totalPurchaseSpend", label: "Purchase Spend", type: "text", required: true, placeholder: "$336,000" },
        { key: "averageQualityScore", label: "Quality Score %", type: "text", required: true, placeholder: "97.8%" }
      ]
    },
    Quality: {
      idPrefix: "REP-QUAL-",
      idField: "defectCategory",
      searchFields: ["defectCategory"],
      fields: [
        { key: "defectCategory", label: "Defect Category", type: "text", required: true, placeholder: "Glass Bubbles (Inclusions)" },
        { key: "scrappedTons", label: "Defective Scrap Tons", type: "text", required: true, placeholder: "82 Tons" },
        { key: "occurrencePct", label: "Occurrence Weight %", type: "text", required: true, placeholder: "48.2%" },
        { key: "rootCause", label: "Root Failure Cause", type: "textarea", required: true, placeholder: "Furnace charger air entrapment" },
        { key: "preventativeActions", label: "Operator Prevention Action", type: "text", required: true, placeholder: "Recalibrate pull rate" }
      ]
    },
    Finance: {
      idPrefix: "REP-FIN-",
      idField: "financialQuarter",
      searchFields: ["financialQuarter"],
      fields: [
        { key: "financialQuarter", label: "Financial Fiscal Quarter", type: "text", required: true, placeholder: "2026 Q1" },
        { key: "grossRevenue", label: "Gross Revenue", type: "text", required: true, placeholder: "$4.89M" },
        { key: "operatingExpenses", label: "OpEx Cost", type: "text", required: true, placeholder: "$3.62M" },
        { key: "netEnergyCost", label: "Utility Gas Cost", type: "text", required: true, placeholder: "$0.99M" },
        { key: "ebitdaMargin", label: "EBITDA Margin %", type: "text", required: true, placeholder: "25.9%" }
      ]
    }
  }
};
