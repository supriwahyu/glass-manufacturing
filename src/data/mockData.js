// Mock database representing a premium Glass Manufacturing ERP Platform (VitroGlass ERP)

export const mockData = {
  // --- DASHBOARD SUMMARY ---
  summary: {
    furnaceTemp: 1565, // °C
    drawSpeed: 4.2, // m/min
    dailyOutput: 310, // Tons of float glass
    yieldRate: 98.4, // %
    activeIncidents: 0,
    energyConsumption: "4,120 MWh/day",
    safetyDays: 482
  },

  // --- 1. CRM ---
  crm: {
    customers: [
      { id: "CUST-001", name: "GlazeTech Facades Ltd", contact: "Sarah Jenkins", email: "s.jenkins@glazetech.com", phone: "+1 555-0198", status: "Active", creditLimit: "$150,000", totalOrders: 42, region: "North America" },
      { id: "CUST-002", name: "SolarPane Industries", contact: "Marcus Chen", email: "m.chen@solarpane.io", phone: "+1 555-0210", status: "Active", creditLimit: "$300,000", totalOrders: 78, region: "East Asia" },
      { id: "CUST-003", name: "Apex Automotive Glass", contact: "Elena Rostova", email: "e.rostova@apexautoglass.eu", phone: "+49 89 231456", status: "Active", creditLimit: "$200,000", totalOrders: 35, region: "Europe" },
      { id: "CUST-004", name: "Bespoke Glass Design Inc", contact: "David Miller", email: "dmiller@bespokeglass.com", phone: "+1 555-0144", status: "Suspended", creditLimit: "$50,000", totalOrders: 14, region: "North America" },
      { id: "CUST-005", name: "Metro Structural Glazing", contact: "Amir Al-Sayed", email: "amir@metroglazing.ae", phone: "+971 4 800 900", status: "Active", creditLimit: "$500,000", totalOrders: 112, region: "Middle East" }
    ],
    quotations: [
      { id: "QT-2026-089", customer: "SolarPane Industries", date: "2026-06-20", validity: "2026-07-20", items: "12,000 sqm Ultra-Clear Float Glass (3.2mm)", total: "$98,400", status: "Sent" },
      { id: "QT-2026-090", customer: "GlazeTech Facades Ltd", date: "2026-06-22", validity: "2026-07-22", items: "2,500 sqm Low-E Double Glazed Units (6mm-12-6mm)", total: "$124,000", status: "Accepted" },
      { id: "QT-2026-091", customer: "AeroGlass Aerospace", date: "2026-06-24", validity: "2026-07-24", items: "500 pcs Chemically Strengthened Glass Panes", total: "$42,500", status: "Draft" },
      { id: "QT-2026-092", customer: "Metro Structural Glazing", date: "2026-06-26", validity: "2026-07-26", items: "8,000 sqm Tempered Glass (12mm) for Curtain Wall", total: "$288,000", status: "Pending Approval" }
    ],
    salesOrders: [
      { id: "SO-8921", customer: "GlazeTech Facades Ltd", date: "2026-06-23", deliveryDate: "2026-07-15", amount: "$124,000", status: "In Production", priority: "High" },
      { id: "SO-8922", customer: "SolarPane Industries", date: "2026-06-18", deliveryDate: "2026-07-08", amount: "$76,200", status: "Awaiting QC", priority: "Medium" },
      { id: "SO-8923", customer: "Apex Automotive Glass", date: "2026-06-10", deliveryDate: "2026-07-01", amount: "$195,500", status: "Shipped", priority: "Critical" },
      { id: "SO-8924", customer: "Metro Structural Glazing", date: "2026-06-26", deliveryDate: "2026-08-05", amount: "$288,000", status: "Approved", priority: "Medium" }
    ]
  },

  // --- 2. PROCUREMENT ---
  procurement: {
    suppliers: [
      { id: "SUP-001", name: "Belgian Silica Corp", material: "Silica Sand (SiO2 > 99.5%)", contact: "Luc De Smet", email: "desmet@belgiansilica.be", phone: "+32 2 456 7890", rating: "98%", status: "Approved" },
      { id: "SUP-002", name: "Apex Chemicals Inc", material: "Soda Ash (Light/Dense Na2CO3)", contact: "Jane Brody", email: "jbrody@apexchem.com", phone: "+1 555-0912", rating: "94%", status: "Approved" },
      { id: "SUP-003", name: "Doloclay Quarries", material: "Dolomite & Limestone (Ca/Mg Carbonates)", contact: "Gary Vance", email: "vance@doloclay.co.uk", phone: "+44 114 987654", rating: "91%", status: "Approved" },
      { id: "SUP-004", name: "EcoCullet Recyclers", material: "Crushed Glass Cullet (Amber/Green/Clear)", contact: "Silvia Rossi", email: "rossi@ecocullet.it", phone: "+39 02 876543", rating: "88%", status: "Under Review" }
    ],
    purchaseRequests: [
      { id: "PR-3041", requestedBy: "Batch Plant Manager", item: "Silica Sand Grade A (Premium)", qty: "800 Tons", estCost: "$56,000", date: "2026-06-25", urgency: "High", status: "Approved" },
      { id: "PR-3042", requestedBy: "Furnace Engineer", item: "Zirconia Refractory Bricks (Spares)", qty: "120 Pcs", estCost: "$32,400", date: "2026-06-26", urgency: "Medium", status: "Pending" },
      { id: "PR-3043", requestedBy: "Maintenance Lead", item: "Natural Gas Burner Nozzle Type-V", qty: "8 Pcs", estCost: "$16,000", date: "2026-06-27", urgency: "Critical", status: "Approved" }
    ],
    purchaseOrders: [
      { id: "PO-7701", supplier: "Belgian Silica Corp", date: "2026-06-15", expectedDate: "2026-06-29", total: "$74,200", status: "In Transit", paymentTerms: "Net 30" },
      { id: "PO-7702", supplier: "Apex Chemicals Inc", date: "2026-06-18", expectedDate: "2026-07-02", total: "$41,000", status: "Confirmed", paymentTerms: "Net 45" },
      { id: "PO-7703", supplier: "Doloclay Quarries", date: "2026-06-22", expectedDate: "2026-07-05", total: "$22,500", status: "Draft", paymentTerms: "Net 30" }
    ],
    goodsReceipt: [
      { id: "GR-9011", poNumber: "PO-7689", supplier: "EcoCullet Recyclers", date: "2026-06-24", material: "Clear Cullet (Sorted)", receivedQty: "250 Tons", inspectionStatus: "Passed QC", warehouseBin: "Silo-Cullet-1" },
      { id: "GR-9012", poNumber: "PO-7695", supplier: "Belgian Silica Corp", date: "2026-06-26", material: "Silica Sand Grade A", receivedQty: "400 Tons", inspectionStatus: "Passed QC", warehouseBin: "Silo-Sand-A" }
    ]
  },

  // --- 3. INVENTORY ---
  inventory: {
    rawMaterials: [
      { id: "RM-001", name: "Silica Sand (Grade A)", silo: "Silo A1", stock: "6,200 Tons", capacity: "8,000 Tons", status: "Optimal", temperature: "24°C" },
      { id: "RM-002", name: "Soda Ash (Na2CO3)", silo: "Silo B1", stock: "1,450 Tons", capacity: "3,000 Tons", status: "Medium", temperature: "21°C" },
      { id: "RM-003", name: "Limestone (CaCO3)", silo: "Silo C1", stock: "800 Tons", capacity: "2,000 Tons", status: "Reorder Triggered", temperature: "22°C" },
      { id: "RM-004", name: "Dolomite (CaMg(CO3)2)", silo: "Silo C2", stock: "1,100 Tons", capacity: "2,500 Tons", status: "Optimal", temperature: "22°C" },
      { id: "RM-005", name: "Clear Recycled Cullet", silo: "Cullet Pit 1", stock: "2,400 Tons", capacity: "4,000 Tons", status: "Optimal", temperature: "25°C" }
    ],
    warehouses: [
      { id: "WH-A", name: "Float Line Output Storage", location: "Zone Alpha", capacity: "85%", primaryUse: "Annealed Glass Jumbo Sheets" },
      { id: "WH-B", name: "Coated & Value-Added Zone", location: "Zone Beta", capacity: "62%", primaryUse: "Low-E / Mirrors / Laminated" },
      { id: "WH-C", name: "Automotive Tempering Warehouse", location: "Zone Gamma", capacity: "40%", primaryUse: "Tempered Curved Windshields" }
    ],
    stockMovements: [
      { id: "MV-5501", material: "Silica Sand Grade A", fromZone: "Silo A1", toZone: "Furnace Batch Mixer #1", qty: "140 Tons", time: "2026-06-27 10:15", handler: "Automated Conveyor A" },
      { id: "MV-5502", material: "Float Glass Jumbo Pack F4", fromZone: "Lehr Unloading Area", toZone: "Warehouse WH-A", qty: "24 Pallets", time: "2026-06-27 11:30", handler: "Forklift Team Beta" },
      { id: "MV-5503", material: "Soda Ash Dense", fromZone: "Silo B1", toZone: "Furnace Batch Mixer #1", qty: "45 Tons", time: "2026-06-27 12:00", handler: "Automated Conveyor B" }
    ],
    finishedGoods: [
      { id: "FG-1001", description: "Float Glass Clear 4mm Jumbo (3.21m x 6.00m)", qty: "140 Packs", weight: "280 Tons", location: "WH-A-Row3", value: "$168,000" },
      { id: "FG-1002", description: "Low-E Double Glazed Unit 6-12-6", qty: "450 sqm", weight: "13 Tons", location: "WH-B-Row12", value: "$45,000" },
      { id: "FG-1003", description: "Automotive Curved Tempered Windshield Type-X", qty: "1,200 Pcs", weight: "12 Tons", location: "WH-C-Row5", value: "$96,000" }
    ]
  },

  // --- 4. PRODUCTION ---
  production: {
    productionPlanning: [
      { id: "PLAN-26A", description: "Run #18 - Clear Float Glass 6mm", furnace: "Furnace #1", pullRateTarget: "320 Tons/day", start: "2026-06-25", end: "2026-07-02", status: "Active" },
      { id: "PLAN-26B", description: "Run #19 - Tinted Automotive Green 3.15mm", furnace: "Furnace #2", pullRateTarget: "180 Tons/day", start: "2026-07-03", end: "2026-07-08", status: "Scheduled" }
    ],
    workOrders: [
      { id: "WO-6651", runCode: "PLAN-26A", desc: "Cut Float 6mm to Custom size 2.4mx3.2m", qty: "2,000 sqm", requestedBy: "SO-8921", currentProgress: "65%", status: "In Progress" },
      { id: "WO-6652", runCode: "PLAN-26A", desc: "Tempering Batch for structural wall GlazeTech", qty: "850 Pcs", requestedBy: "SO-8924", currentProgress: "0%", status: "Released" },
      { id: "WO-6653", runCode: "PLAN-25Z", desc: "Lamination run - SolarPane 3.2mm tempered backing", qty: "4,000 sqm", requestedBy: "SO-8922", currentProgress: "100%", status: "Completed" }
    ],
    productionBatches: [
      { id: "BTCH-801", mixer: "Mixer A", silica: "15,000 kg", sodaAsh: "5,100 kg", dolomite: "4,200 kg", limestone: "1,500 kg", culletRatio: "25%", mixTime: "8.5 mins", status: "Discharged to Silo" },
      { id: "BTCH-802", mixer: "Mixer A", silica: "15,050 kg", sodaAsh: "5,090 kg", dolomite: "4,180 kg", limestone: "1,510 kg", culletRatio: "25%", mixTime: "8.8 mins", status: "Mixing" }
    ],
    processTracking: {
      furnace1: { temp: "1,565 °C", pressure: "8.2 Pa", level: "98.2%", combustionEfficiency: "94.2%" },
      tinBath: { atmosphere: "N2/H2 Mix", tinTempIn: "1,050 °C", tinTempOut: "605 °C", ribbonWidth: "3.45m", speed: "4.25 m/min" },
      lehr: { zone1Temp: "585 °C", zone2Temp: "540 °C", zone3Temp: "450 °C", zone4Temp: "280 °C", exitTemp: "52 °C", coolingFanSpeed: "85%" }
    },
    machineScheduling: [
      { machine: "Furnace #1 (Float)", task: "Continuous Melting (Run 18)", start: "June 25", end: "July 2", status: "Running", utilization: "98%" },
      { machine: "Cutting Line Alpha", task: "SO-8921 Float Cutting 6mm", start: "June 27 08:00", end: "June 27 18:00", status: "Running", utilization: "88%" },
      { machine: "Tempering Furnace T2", task: "Soak test & calibration before GlazeTech job", start: "June 27 13:00", end: "June 27 15:30", status: "Setup", utilization: "45%" },
      { machine: "Laminating Autoclave #1", task: "Automotive PVB Sandwich baking", start: "June 27 14:00", end: "June 27 22:00", status: "Idle", utilization: "0%" }
    ]
  },

  // --- 5. QUALITY CONTROL ---
  qualityControl: {
    incomingQC: [
      { id: "IQC-5091", shipment: "GR-9012 (Sand)", paramSiO2: "99.64% (Target > 99.5%)", Fe2O3: "0.012% (Target < 0.015%)", moisture: "4.1% (Optimal)", inspector: "Dr. K. Schmidt", result: "Passed" },
      { id: "IQC-5092", shipment: "GR-9008 (Limestone)", paramSiO2: "0.45%", Fe2O3: "0.021%", moisture: "8.2% (Too Wet)", inspector: "Dr. K. Schmidt", result: "Rejected" }
    ],
    inProcessQC: [
      { time: "12:15:30", scanner: "Float Camera System C1", defectsFound: "Bubble (0.4mm) - Marker Left", action: "Defect logged - Ribbon marker fired", status: "Resolved (Recycled during cutting)" },
      { time: "12:30:10", scanner: "Lehr Exit Laser Scanner", defectsFound: "Thickness variation +0.08mm", action: "Automatic roller pressure adjust", status: "Monitoring" },
      { time: "12:44:00", scanner: "Tin Bath Wave Sensor", defectsFound: "None - Optical distortion optimal", action: "None", status: "Optimal" }
    ],
    finalQC: [
      { id: "FQC-2201", woRef: "WO-6651", batch: "Batch-801", opticalPurity: "99.98%", impactStrength: "Passed (120J)", thicknessCheck: "6.02mm (within +/- 0.05)", inspector: "L. Vance", result: "Approved" },
      { id: "FQC-2202", woRef: "WO-6649", batch: "Batch-798", opticalPurity: "99.85%", impactStrength: "Passed (118J)", thicknessCheck: "4.18mm (Failed Limit: 4.00+/-0.10)", inspector: "L. Vance", result: "Scrapped & Recycled" }
    ]
  },

  // --- 6. MAINTENANCE ---
  maintenance: {
    machines: [
      { id: "MC-F1", name: "Primary Melting Furnace #1", health: "94%", runtime: "4,320 hrs", lastService: "2026-03-01", nextService: "2026-09-01", status: "Operational" },
      { id: "MC-TIN1", name: "Forming Liquid Tin Bath", health: "92%", runtime: "4,320 hrs", lastService: "2026-03-01", nextService: "2026-09-01", status: "Operational" },
      { id: "MC-CUT1", name: "Alpha Diamond Scoring & Cutting CNC", health: "82%", runtime: "620 hrs", lastService: "2026-06-10", nextService: "2026-07-10", status: "Needs Calibration" },
      { id: "MC-TEMP2", name: "Convection Tempering Lehr T2", health: "89%", runtime: "1,140 hrs", lastService: "2026-05-15", nextService: "2026-07-15", status: "Setup" }
    ],
    preventiveMaintenance: [
      { id: "PM-1120", machine: "Cutting CNC", action: "Replace Diamond Wheel & Lubricate Rails", frequency: "Monthly", lastPerformed: "2026-06-10", scheduledDate: "2026-07-10", status: "Scheduled" },
      { id: "PM-1121", machine: "Melting Furnace #1", action: "Thermocouple inspection & burner cleaning", frequency: "Bi-Weekly", lastPerformed: "2026-06-14", scheduledDate: "2026-06-28", status: "Due Tomorrow" },
      { id: "PM-1122", machine: "Laminating Autoclave", action: "Sealing gasket replacement & pressure check", frequency: "Quarterly", lastPerformed: "2026-04-10", scheduledDate: "2026-07-10", status: "Scheduled" }
    ],
    breakdownLogs: [
      { id: "BD-0091", machine: "Alpha Diamond Scoring & Cutting CNC", date: "2026-06-22", downtime: "2h 15m", issue: "Glass dust jam in vertical linear rail guide", resolution: "Rail cleaned, vacuum shroud adjusted, limit switch recalibrated", status: "Closed" },
      { id: "BD-0090", machine: "Tin Bath Conveyor Drive Motor #3", date: "2026-06-12", downtime: "45m", issue: "Overheating sensor trigger on frequency drive", resolution: "Fan replaced on the electrical cabinet. Drive system restarted.", status: "Closed" }
    ]
  },

  // --- 7. LOGISTICS ---
  logistics: {
    deliveryOrders: [
      { id: "DO-4501", soRef: "SO-8923", customer: "Apex Automotive Glass", transportCompany: "Titan Logistics", dispatchDate: "2026-06-25", items: "12 Crates Windshields Type-X", status: "Dispatched" },
      { id: "DO-4502", soRef: "SO-8921", customer: "GlazeTech Facades Ltd", transportCompany: "HeavyHaul Glass Specialists", dispatchDate: "2026-07-15", items: "24 Jumbo Packs 6mm Float", status: "Awaiting Production" },
      { id: "DO-4503", soRef: "SO-8918", customer: "Metro Structural Glazing", transportCompany: "Titan Logistics", dispatchDate: "2026-06-27", items: "8 Glass A-Frame Racks 12mm Tempered", status: "Loading" }
    ],
    shipments: [
      { id: "SHP-7811", carrier: "Titan Logistics", trackingNo: "TRK-984210", vehicleNo: "TX-99-A-1282", loadWeight: "22 Tons", targetEta: "2026-06-28", route: "Factory -> Hamburg Port -> Apex Depot", status: "In Transit" },
      { id: "SHP-7812", carrier: "HeavyHaul Glass", trackingNo: "TRK-984555", vehicleNo: "NY-02-B-9911", loadWeight: "28 Tons", targetEta: "2026-06-27 16:30", route: "Factory -> GlazeTech Site Hub", status: "En Route" }
    ],
    tracking: [
      { shipmentId: "SHP-7811", lastCoordinates: "53.5511° N, 9.9937° E (Hamburg)", speed: "65 km/h", status: "On Schedule", delayMinutes: 0 },
      { shipmentId: "SHP-7812", lastCoordinates: "52.3702° N, 4.8952° E (Amsterdam)", speed: "0 km/h (At Depot)", status: "Delivered", delayMinutes: 15 }
    ]
  },

  // --- 8. FINANCE ---
  finance: {
    invoices: [
      { id: "INV-2026-551", soRef: "SO-8923", customer: "Apex Automotive Glass", invoiceDate: "2026-06-25", dueDate: "2026-07-25", amount: "$195,500", tax: "$39,100", status: "Sent" },
      { id: "INV-2026-550", soRef: "SO-8920", customer: "Bespoke Glass Design Inc", invoiceDate: "2026-06-15", dueDate: "2026-07-15", amount: "$18,200", tax: "$3,640", status: "Paid" },
      { id: "INV-2026-549", soRef: "SO-8914", customer: "SolarPane Industries", invoiceDate: "2026-06-05", dueDate: "2026-07-05", amount: "$114,000", tax: "$22,800", status: "Paid" },
      { id: "INV-2026-552", soRef: "SO-8922", customer: "SolarPane Industries", invoiceDate: "2026-06-27", dueDate: "2026-07-27", amount: "$76,200", tax: "$15,240", status: "Draft" }
    ],
    payments: [
      { id: "PAY-3081", invoiceRef: "INV-2026-550", customer: "Bespoke Glass Design Inc", date: "2026-06-20", amount: "$21,840", method: "ACH Transfer", status: "Cleared" },
      { id: "PAY-3080", invoiceRef: "INV-2026-549", customer: "SolarPane Industries", date: "2026-06-18", amount: "$136,800", method: "Wire Transfer", status: "Cleared" }
    ],
    expenses: [
      { id: "EXP-8891", category: "Energy (Natural Gas)", vendor: "Global Gas Grid", date: "2026-06-20", amount: "$380,000", description: "Furnace #1 and #2 gas consumption for May 2026", status: "Approved" },
      { id: "EXP-8892", category: "Raw Materials", vendor: "Belgian Silica Corp", date: "2026-06-22", amount: "$56,000", description: "PO-7701 Silica Sand supply", status: "Paid" },
      { id: "EXP-8893", category: "Consumables", vendor: "DiamondTech Spares", date: "2026-06-25", amount: "$4,200", description: "Replacement CNC cutting heads", status: "Approved" }
    ],
    costing: {
      costPerTon: [
        { element: "Natural Gas (Melting)", costPerTon: "$48.50", pct: "38.5%" },
        { element: "Silica Sand & Chemicals", costPerTon: "$32.10", pct: "25.5%" },
        { element: "Electricity (Annealing & Fab)", costPerTon: "$18.20", pct: "14.4%" },
        { element: "Direct Labor", costPerTon: "$15.40", pct: "12.2%" },
        { element: "Maintenance & Spares", costPerTon: "$7.80", pct: "6.2%" },
        { element: "Depreciation & Admin", costPerTon: "$4.00", pct: "3.2%" }
      ],
      totalCostPerTon: "$126.00"
    }
  },

  // --- 9. REPORTS DATA ---
  reports: {
    production: {
      headers: ["Month", "Furnace Input (Tons)", "Packable Output (Tons)", "Yield Rate (%)", "Defective Scrap (Tons)"],
      rows: [
        ["January", "10,200", "9,850", "96.5%", "350"],
        ["February", "9,800", "9,510", "97.0%", "290"],
        ["March", "10,800", "10,530", "97.5%", "270"],
        ["April", "10,500", "10,260", "97.7%", "240"],
        ["May", "11,100", "10,910", "98.2%", "190"],
        ["June (YTD)", "10,850", "10,680", "98.4%", "170"]
      ]
    },
    inventory: {
      headers: ["Warehouse Area", "Total Capacity", "Stock Utilized", "Valuation", "Inventory Turn Ratio"],
      rows: [
        ["Zone Alpha (Jumbo Sheets)", "12,000 Tons", "10,200 Tons", "$6.12M", "14.2"],
        ["Zone Beta (Coated Glass)", "6,500 sqm", "4,030 sqm", "$0.85M", "8.9"],
        ["Zone Gamma (Auto Tempered)", "15,000 Pcs", "6,000 Pcs", "$0.48M", "18.5"],
        ["Raw Materials Silos", "20,000 Tons", "12,000 Tons", "$1.24M", "6.2"]
      ]
    },
    sales: {
      headers: ["Product Class", "Sqm Shipped", "Revenue Generated", "Avg Selling Price / Sqm", "YoY Growth"],
      rows: [
        ["Clear Float Glass (3mm-12mm)", "420,000", "$3,360,000", "$8.00", "+8.2%"],
        ["Low-E Energy Saver Double Pane", "85,000", "$6,800,000", "$80.00", "+22.4%"],
        ["Laminated Safety Glass", "62,000", "$3,100,000", "$50.00", "+14.8%"],
        ["Automotive Heat-Strengthened", "34,000", "$2,380,000", "$70.00", "+5.1%"]
      ]
    },
    procurement: {
      headers: ["Material Type", "Supplier Origin", "Tonnage Purchased", "Total Purchase Spend", "Average Quality Score"],
      rows: [
        ["Silica Sand Grade A", "Belgium / domestic", "4,800 Tons", "$336,000", "97.8%"],
        ["Soda Ash Dense", "Apex / US import", "1,850 Tons", "$518,000", "94.2%"],
        ["Dolomite / Limestone", "Doloclay / UK", "2,100 Tons", "$73,500", "91.5%"],
        ["Cullet (Sorted Recycle)", "EcoCullet / Italy", "3,400 Tons", "$170,000", "88.6%"]
      ]
    },
    quality: {
      headers: ["Defect Category", "Scrapped Tons", "Occurrence %", "Root Cause Analysis", "Preventative Actions"],
      rows: [
        ["Glass Bubbles (Inclusions)", "82 Tons", "48.2%", "Furnace batch charger air entrapment", "Clean burner nozzles, recalibrate pull rate"],
        ["Scratches (Cutting line)", "35 Tons", "20.6%", "Worn CNC transport rollers", "Re-coat rollers with neoprene sleeves"],
        ["Edge chips (Tempering)", "28 Tons", "16.5%", "Incorrect edge grinding chamfer angle", "Recalibrate double-edging machine guides"],
        ["Optical distortion (Tin bath)", "25 Tons", "14.7%", "Tin bath atmosphere gas fluctuation", "Upgrade hydrogen feed regulator valves"]
      ]
    },
    finance: {
      headers: ["Financial Quarter", "Gross Revenue", "Operating Expenses", "Net Energy Cost", "EBITDA Margin"],
      rows: [
        ["2025 Q3", "$4.12M", "$3.24M", "$0.84M", "21.3%"],
        ["2025 Q4", "$4.45M", "$3.42M", "$0.92M", "23.1%"],
        ["2026 Q1", "$4.89M", "$3.62M", "$0.99M", "25.9%"],
        ["2026 Q2 (Est)", "$5.12M", "$3.75M", "$1.02M", "26.7%"]
      ]
    }
  }
};
