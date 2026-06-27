import React, { useState, useMemo } from 'react';
import { 
  Users, FileText, ShoppingCart, ShieldCheck, 
  Truck, FilePlus, ShoppingBag, ClipboardCheck,
  Layers, Home, ArrowLeftRight, Package,
  Cpu, FileCode, Boxes, Sliders, Calendar,
  CheckCircle, Search, Award, Wrench, Settings, AlertTriangle,
  Compass, MapPin, Navigation, DollarSign, CreditCard, TrendingUp,
  BarChart3, PieChart, Activity, LogOut, Menu, Bell, User, Clock,
  X, Plus, RefreshCw, Thermometer, ShieldAlert, ChevronDown, ChevronRight
} from 'lucide-react';
import { mockData } from './data/mockData';
import './App.css';

// Menu configuration based on user's structural folder outline
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
  // --- AUTHENTICATION STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('admin@vitroglass.com');
  const [loginPassword, setLoginPassword] = useState('password');
  const [loginError, setLoginError] = useState('');
  
  // --- SESSION STATE ---
  const [userRole, setUserRole] = useState('Plant Manager');
  const [db, setDb] = useState(mockData);
  const [searchText, setSearchText] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Furnace #1 temperature stabilised at 1,565°C.", time: "10m ago", type: "info" },
    { id: 2, text: "QC alert: Raw Limestone batch #9008 rejected due to high moisture.", time: "1h ago", type: "alert" },
    { id: 3, text: "Breakdown logged: Diamond cutting CNC vertical guide issue resolved.", time: "3h ago", type: "success" }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // --- SIDEBAR STATE ---
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    CRM: true,
    Production: true,
    Inventory: false,
    Procurement: false,
    "Quality Control": false,
    Maintenance: false,
    Logistics: false,
    Finance: false,
    Reports: false
  });

  // --- NAVIGATION STATE ---
  const [activeSection, setActiveSection] = useState(null); // null means "Overview dashboard"
  const [activeSub, setActiveSub] = useState(null);

  // --- MODAL / FORM STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // e.g. 'customer', 'workOrder', etc.
  const [formData, setFormData] = useState({});

  // Dynamic alert simulations
  const [processControls, setProcessControls] = useState({
    furnaceTemp: 1565,
    drawSpeed: 4.2,
    hydrogenRatio: 8.5
  });

  // --- LOGIN ACTION ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail === 'admin@vitroglass.com' && loginPassword === 'password') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Use demo: admin@vitroglass.com / password');
    }
  };

  // --- LOGOUT ACTION ---
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveSection(null);
    setActiveSub(null);
  };

  // --- BREADCRUMBS PATH ---
  const getBreadcrumbs = () => {
    if (!activeSection) return ['Overview Dashboard'];
    return ['VitroGlass ERP', activeSection, activeSub];
  };

  // Toggle Sidebar Sections
  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Navigate helper
  const navigateTo = (section, sub) => {
    setActiveSection(section);
    setActiveSub(sub);
    setSearchText('');
  };

  // Open creation modals
  const openCreateModal = (type) => {
    setModalType(type);
    setFormData({});
    setIsModalOpen(true);
  };

  // Add dummy notification helper
  const triggerNotification = (text, type = "success") => {
    const newNotif = {
      id: Date.now(),
      text,
      time: "Just now",
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // --- MODAL SUBMIT HANDLERS ---
  const handleModalSubmit = (e) => {
    e.preventDefault();
    
    // Dynamically insert into local db state
    if (modalType === 'customer') {
      const newCust = {
        id: `CUST-${Math.floor(100 + Math.random() * 900)}`,
        name: formData.name || 'Unnamed Client',
        contact: formData.contact || 'No Contact',
        email: formData.email || 'N/A',
        phone: formData.phone || 'N/A',
        status: 'Active',
        creditLimit: formData.creditLimit || '$100,000',
        totalOrders: 0,
        region: formData.region || 'North America'
      };
      setDb(prev => ({
        ...prev,
        crm: { ...prev.crm, customers: [newCust, ...prev.crm.customers] }
      }));
      triggerNotification(`Customer "${newCust.name}" registered successfully.`);
    } 
    else if (modalType === 'quotation') {
      const newQt = {
        id: `QT-2026-${Math.floor(100 + Math.random() * 900)}`,
        customer: formData.customer || 'SolarPane Industries',
        date: new Date().toISOString().split('T')[0],
        validity: formData.validity || '2026-07-30',
        items: formData.items || 'Standard annealed sheets',
        total: formData.total || '$15,000',
        status: 'Draft'
      };
      setDb(prev => ({
        ...prev,
        crm: { ...prev.crm, quotations: [newQt, ...prev.crm.quotations] }
      }));
      triggerNotification(`Quotation ${newQt.id} saved in Draft mode.`);
    }
    else if (modalType === 'salesOrder') {
      const newSO = {
        id: `SO-${Math.floor(8000 + Math.random() * 2000)}`,
        customer: formData.customer || 'GlazeTech Facades Ltd',
        date: new Date().toISOString().split('T')[0],
        deliveryDate: formData.deliveryDate || '2026-08-01',
        amount: formData.amount || '$10,000',
        status: 'Approved',
        priority: formData.priority || 'Medium'
      };
      setDb(prev => ({
        ...prev,
        crm: { ...prev.crm, salesOrders: [newSO, ...prev.crm.salesOrders] }
      }));
      triggerNotification(`Sales Order ${newSO.id} issued to production scheduling.`);
    }
    else if (modalType === 'supplier') {
      const newSup = {
        id: `SUP-${Math.floor(100 + Math.random() * 900)}`,
        name: formData.name || 'New Quarry Corp',
        material: formData.material || 'Silica Sand',
        contact: formData.contact || 'John Doe',
        email: formData.email || 'info@newquarry.com',
        phone: formData.phone || 'N/A',
        rating: '100%',
        status: 'Approved'
      };
      setDb(prev => ({
        ...prev,
        procurement: { ...prev.procurement, suppliers: [newSup, ...prev.procurement.suppliers] }
      }));
      triggerNotification(`Supplier "${newSup.name}" approved and catalogued.`);
    }
    else if (modalType === 'purchaseRequest') {
      const newPR = {
        id: `PR-${Math.floor(3000 + Math.random() * 999)}`,
        requestedBy: userRole,
        item: formData.item || 'Dense Soda Ash',
        qty: formData.qty || '100 Tons',
        estCost: formData.estCost || '$8,500',
        date: new Date().toISOString().split('T')[0],
        urgency: formData.urgency || 'Medium',
        status: 'Pending'
      };
      setDb(prev => ({
        ...prev,
        procurement: { ...prev.procurement, purchaseRequests: [newPR, ...prev.procurement.purchaseRequests] }
      }));
      triggerNotification(`Purchase Request ${newPR.id} submitted for approval.`);
    }
    else if (modalType === 'purchaseOrder') {
      const newPO = {
        id: `PO-${Math.floor(7700 + Math.random() * 100)}`,
        supplier: formData.supplier || 'Belgian Silica Corp',
        date: new Date().toISOString().split('T')[0],
        expectedDate: formData.expectedDate || '2026-07-15',
        total: formData.total || '$25,000',
        status: 'Confirmed',
        paymentTerms: 'Net 30'
      };
      setDb(prev => ({
        ...prev,
        procurement: { ...prev.procurement, purchaseOrders: [newPO, ...prev.procurement.purchaseOrders] }
      }));
      triggerNotification(`Purchase Order ${newPO.id} dispatched to supplier.`);
    }
    else if (modalType === 'goodsReceipt') {
      const newGR = {
        id: `GR-${Math.floor(9000 + Math.random() * 999)}`,
        poNumber: formData.poNumber || 'PO-7701',
        supplier: formData.supplier || 'Apex Chemicals Inc',
        date: new Date().toISOString().split('T')[0],
        material: formData.material || 'Dense Soda Ash',
        receivedQty: formData.receivedQty || '50 Tons',
        inspectionStatus: 'Pending QC Scan',
        warehouseBin: formData.warehouseBin || 'Silo-B1'
      };
      setDb(prev => ({
        ...prev,
        procurement: { ...prev.procurement, goodsReceipt: [newGR, ...prev.procurement.goodsReceipt] }
      }));
      triggerNotification(`Goods receipt document ${newGR.id} logged. QC team notified.`);
    }
    else if (modalType === 'workOrder') {
      const newWO = {
        id: `WO-${Math.floor(6600 + Math.random() * 100)}`,
        runCode: formData.runCode || 'PLAN-26A',
        desc: formData.desc || 'Float cutting job',
        qty: formData.qty || '1,000 sqm',
        requestedBy: formData.requestedBy || 'Sales Orders',
        currentProgress: '0%',
        status: 'Released'
      };
      setDb(prev => ({
        ...prev,
        production: { ...prev.production, workOrders: [newWO, ...prev.production.workOrders] }
      }));
      triggerNotification(`Work Order ${newWO.id} released to shop floor.`);
    }
    else if (modalType === 'breakdownLog') {
      const newBD = {
        id: `BD-${Math.floor(100 + Math.random() * 900)}`,
        machine: formData.machine || 'Alpha Diamond Scoring CNC',
        date: new Date().toISOString().split('T')[0],
        downtime: formData.downtime || '30m',
        issue: formData.issue || 'Calibration offset',
        resolution: formData.resolution || 'Pending repair',
        status: formData.resolution ? 'Closed' : 'Open'
      };
      setDb(prev => ({
        ...prev,
        maintenance: { ...prev.maintenance, breakdownLogs: [newBD, ...prev.maintenance.breakdownLogs] }
      }));
      triggerNotification(`Incident ${newBD.id} filed in Maintenance log.`, 'alert');
    }
    else if (modalType === 'incomingQC') {
      const newIQC = {
        id: `IQC-${Math.floor(5000 + Math.random() * 999)}`,
        shipment: formData.shipment || 'GR-9013',
        paramSiO2: formData.paramSiO2 || '99.5%',
        Fe2O3: formData.Fe2O3 || '0.012%',
        moisture: formData.moisture || '2.5%',
        inspector: formData.inspector || 'Dr. K. Schmidt',
        result: formData.result || 'Passed'
      };
      setDb(prev => ({
        ...prev,
        qualityControl: { ...prev.qualityControl, incomingQC: [newIQC, ...prev.qualityControl.incomingQC] }
      }));
      triggerNotification(`Incoming chemical QC analysis recorded.`);
    }

    setIsModalOpen(false);
  };

  // Simulation of scanner event
  const simulateLiveQCScan = () => {
    const defects = [
      "Micro-scratch caught on Zone 4 ribbon",
      "Gas Bubble bubble inclusion 0.2mm on Center Left",
      "Optical thickness spike +0.06mm on Edge Right",
      "Minor tin droplet splash on bottom surface"
    ];
    const actions = [
      "Ribbon marker fired - cut scrap scheduled",
      "Defect logged - local mixer heat adjusted",
      "Automatic roller pressure offset calibrating",
      "Visual alarm logged for forming operator"
    ];
    const index = Math.floor(Math.random() * defects.length);
    
    const newScan = {
      time: new Date().toLocaleTimeString(),
      scanner: "Automated Laser Cam C2",
      defectsFound: defects[index],
      action: actions[index],
      status: "Monitoring"
    };

    setDb(prev => ({
      ...prev,
      qualityControl: {
        ...prev.qualityControl,
        inProcessQC: [newScan, ...prev.qualityControl.inProcessQC]
      }
    }));

    triggerNotification(`Realtime Laser Scanner: ${defects[index]}`, "alert");
  };

  // --- SEARCH FILTER FUNCTION ---
  const filterTable = (list, fields) => {
    if (!searchText) return list;
    return list.filter(item => 
      fields.some(field => {
        const val = item[field];
        if (val === undefined || val === null) return false;
        return String(val).toLowerCase().includes(searchText.toLowerCase());
      })
    );
  };

  // Customize header greeting text by role
  const getRoleBadgeColor = () => {
    switch (userRole) {
      case 'Plant Manager': return 'badge-success';
      case 'Furnace Operator': return 'badge-warning';
      case 'QC Supervisor': return 'badge-info';
      case 'Financial Analyst': return 'badge-secondary';
      default: return 'badge-info';
    }
  };

  const getRoleNotification = () => {
    switch (userRole) {
      case 'Plant Manager': 
        return "Plant operations normal. Target daily yield: 310 tons. Safety rate: 100%.";
      case 'Furnace Operator': 
        return "CRITICAL: Maintain Melt Zone 1 temperatures between 1,550°C and 1,580°C.";
      case 'QC Supervisor': 
        return "Alert: automated defect scanner line 2 logging 0.4mm bubble alerts.";
      case 'Financial Analyst': 
        return "Raw materials natural gas tariff rate forecast updated for next quarter.";
      default:
        return "Welcome to VitroGlass operational cockpit.";
    }
  };

  // Handle furnace temp slider change
  const handleFurnaceSlider = (e) => {
    const temp = parseInt(e.target.value);
    setProcessControls(prev => ({ ...prev, furnaceTemp: temp }));
    if (temp > 1585) {
      triggerNotification(`FURNACE TEMPERATURE DANGEROUSLY HIGH: ${temp}°C`, 'alert');
    } else if (temp < 1540) {
      triggerNotification(`FURNACE COOLING DETECTED: ${temp}°C`, 'alert');
    }
  };

  // Render the Dynamic Page Subviews
  const renderSubView = () => {
    const s = activeSection;
    const sub = activeSub;

    // --- CRM MODULE ---
    if (s === 'CRM') {
      if (sub === 'Customers') {
        const list = filterTable(db.crm.customers, ['name', 'id', 'contact', 'email', 'region']);
        return (
          <div className="fade-in">
            <div className="page-header">
              <div>
                <h2 className="page-title">B2B Customers Directory</h2>
                <div className="page-subtitle">Commercial buyers of architectural, solar, and automotive glass sheets</div>
              </div>
              <button className="btn-primary" onClick={() => openCreateModal('customer')}>
                <Plus size={16} style={{ marginRight: '6px' }} /> Add Customer
              </button>
            </div>
            
            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Region</th>
                    <th>Main Contact</th>
                    <th>Email Address</th>
                    <th>Credit Limit</th>
                    <th>Orders</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(cust => (
                    <tr key={cust.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{cust.id}</td>
                      <td>{cust.name}</td>
                      <td>{cust.region}</td>
                      <td>{cust.contact}</td>
                      <td>{cust.email}</td>
                      <td>{cust.creditLimit}</td>
                      <td>{cust.totalOrders}</td>
                      <td>
                        <span className={`badge ${cust.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                          {cust.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
      
      if (sub === 'Quotations') {
        const list = filterTable(db.crm.quotations, ['id', 'customer', 'items', 'status']);
        return (
          <div className="fade-in">
            <div className="page-header">
              <div>
                <h2 className="page-title">Commercial Quotations</h2>
                <div className="page-subtitle">Bulk price offers issued to structural glazing bids and manufacturers</div>
              </div>
              <button className="btn-primary" onClick={() => openCreateModal('quotation')}>
                <Plus size={16} style={{ marginRight: '6px' }} /> Create Quotation
              </button>
            </div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Quote Ref</th>
                    <th>Client Name</th>
                    <th>Items Quote</th>
                    <th>Date Issued</th>
                    <th>Validity Date</th>
                    <th>Est Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(q => (
                    <tr key={q.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{q.id}</td>
                      <td>{q.customer}</td>
                      <td style={{ maxWidth: '300px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {q.items}
                      </td>
                      <td>{q.date}</td>
                      <td>{q.validity}</td>
                      <td style={{ fontWeight: '600', color: 'var(--accent-secondary)' }}>{q.total}</td>
                      <td>
                        <span className={`badge ${
                          q.status === 'Accepted' ? 'badge-success' : 
                          q.status === 'Sent' ? 'badge-info' : 'badge-warning'
                        }`}>
                          {q.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Sales Orders') {
        const list = filterTable(db.crm.salesOrders, ['id', 'customer', 'status', 'priority']);
        return (
          <div className="fade-in">
            <div className="page-header">
              <div>
                <h2 className="page-title">Production Sales Orders</h2>
                <div className="page-subtitle">Approved sales orders currently feeding the work order sequence</div>
              </div>
              <button className="btn-primary" onClick={() => openCreateModal('salesOrder')}>
                <Plus size={16} style={{ marginRight: '6px' }} /> New Sales Order
              </button>
            </div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Sales Order ID</th>
                    <th>Client Name</th>
                    <th>Order Date</th>
                    <th>Target Delivery</th>
                    <th>Amount</th>
                    <th>Priority</th>
                    <th>Melt Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(so => (
                    <tr key={so.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{so.id}</td>
                      <td>{so.customer}</td>
                      <td>{so.date}</td>
                      <td>{so.deliveryDate}</td>
                      <td style={{ fontWeight: '600' }}>{so.amount}</td>
                      <td>
                        <span className={`badge ${
                          so.priority === 'Critical' ? 'badge-danger' :
                          so.priority === 'High' ? 'badge-warning' : 'badge-info'
                        }`}>
                          {so.priority}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${
                          so.status === 'Shipped' ? 'badge-success' : 
                          so.status === 'In Production' ? 'badge-warning' : 'badge-info'
                        }`}>
                          {so.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    }

    // --- PROCUREMENT MODULE ---
    if (s === 'Procurement') {
      if (sub === 'Suppliers') {
        const list = filterTable(db.procurement.suppliers, ['name', 'material', 'status']);
        return (
          <div className="fade-in">
            <div className="page-header">
              <div>
                <h2 className="page-title">Approved Suppliers Registry</h2>
                <div className="page-subtitle">Certified suppliers for high-grade quartz sand, soda ash, and dolomites</div>
              </div>
              <button className="btn-primary" onClick={() => openCreateModal('supplier')}>
                <Plus size={16} style={{ marginRight: '6px' }} /> Add Supplier
              </button>
            </div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Supplier ID</th>
                    <th>Vendor Name</th>
                    <th>Primary Material</th>
                    <th>Representative</th>
                    <th>Email Address</th>
                    <th>Quality Score</th>
                    <th>Compliance Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(sup => (
                    <tr key={sup.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{sup.id}</td>
                      <td>{sup.name}</td>
                      <td>{sup.material}</td>
                      <td>{sup.contact}</td>
                      <td>{sup.email}</td>
                      <td style={{ fontWeight: '600', color: 'var(--accent-success)' }}>{sup.rating}</td>
                      <td>
                        <span className={`badge ${sup.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
                          {sup.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Purchase Requests') {
        const list = filterTable(db.procurement.purchaseRequests, ['item', 'requestedBy', 'status']);
        return (
          <div className="fade-in">
            <div className="page-header">
              <div>
                <h2 className="page-title">Internal Purchase Requests</h2>
                <div className="page-subtitle">Batch plant and engineering material procurement workflows</div>
              </div>
              <button className="btn-primary" onClick={() => openCreateModal('purchaseRequest')}>
                <Plus size={16} style={{ marginRight: '6px' }} /> File Request
              </button>
            </div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Item Description</th>
                    <th>Quantity</th>
                    <th>Est Cost</th>
                    <th>Requested By</th>
                    <th>Request Date</th>
                    <th>Urgency</th>
                    <th>Approval Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(pr => (
                    <tr key={pr.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{pr.id}</td>
                      <td>{pr.item}</td>
                      <td>{pr.qty}</td>
                      <td>{pr.estCost}</td>
                      <td>{pr.requestedBy}</td>
                      <td>{pr.date}</td>
                      <td>
                        <span className={`badge ${
                          pr.urgency === 'Critical' ? 'badge-danger' : 
                          pr.urgency === 'High' ? 'badge-warning' : 'badge-info'
                        }`}>
                          {pr.urgency}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${pr.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
                          {pr.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Purchase Orders') {
        const list = filterTable(db.procurement.purchaseOrders, ['id', 'supplier', 'status']);
        return (
          <div className="fade-in">
            <div className="page-header">
              <div>
                <h2 className="page-title">Purchase Orders (PO)</h2>
                <div className="page-subtitle">Active supplier purchase cycles matching approved requests</div>
              </div>
              <button className="btn-primary" onClick={() => openCreateModal('purchaseOrder')}>
                <Plus size={16} style={{ marginRight: '6px' }} /> Issue PO
              </button>
            </div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>PO Number</th>
                    <th>Supplier Vendor</th>
                    <th>Date Issued</th>
                    <th>Expected ETA</th>
                    <th>PO Total</th>
                    <th>Payment Terms</th>
                    <th>Logistics Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(po => (
                    <tr key={po.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{po.id}</td>
                      <td>{po.supplier}</td>
                      <td>{po.date}</td>
                      <td>{po.expectedDate}</td>
                      <td style={{ fontWeight: '600' }}>{po.total}</td>
                      <td>{po.paymentTerms}</td>
                      <td>
                        <span className={`badge ${
                          po.status === 'Delivered' ? 'badge-success' :
                          po.status === 'In Transit' ? 'badge-info' : 'badge-warning'
                        }`}>
                          {po.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Goods Receipt') {
        const list = filterTable(db.procurement.goodsReceipt, ['id', 'supplier', 'material', 'inspectionStatus']);
        return (
          <div className="fade-in">
            <div className="page-header">
              <div>
                <h2 className="page-title">Goods Receipt Vouchers</h2>
                <div className="page-subtitle">Incoming logistics gate arrivals and weight bridges logging</div>
              </div>
              <button className="btn-primary" onClick={() => openCreateModal('goodsReceipt')}>
                <Plus size={16} style={{ marginRight: '6px' }} /> Log Goods Receipt
              </button>
            </div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>GRN Receipt</th>
                    <th>PO Reference</th>
                    <th>Supplier Vendor</th>
                    <th>Material Type</th>
                    <th>Weight/Qty</th>
                    <th>Date Unloaded</th>
                    <th>QC Inspection</th>
                    <th>Silo/Bin Location</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(gr => (
                    <tr key={gr.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{gr.id}</td>
                      <td>{gr.poNumber}</td>
                      <td>{gr.supplier}</td>
                      <td>{gr.material}</td>
                      <td>{gr.receivedQty}</td>
                      <td>{gr.date}</td>
                      <td>
                        <span className={`badge ${gr.inspectionStatus.includes('Passed') ? 'badge-success' : 'badge-warning'}`}>
                          {gr.inspectionStatus}
                        </span>
                      </td>
                      <td style={{ fontFamily: 'monospace' }}>{gr.warehouseBin}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    }

    // --- INVENTORY MODULE ---
    if (s === 'Inventory') {
      if (sub === 'Raw Materials') {
        const list = filterTable(db.inventory.rawMaterials, ['name', 'silo', 'status']);
        return (
          <div className="fade-in">
            <div className="page-header">
              <div>
                <h2 className="page-title">Raw Materials Silo Live Levels</h2>
                <div className="page-subtitle">Real-time silo feed weight and temperature metrics (Melt Batching feed)</div>
              </div>
            </div>

            <div className="metrics-grid" style={{ marginTop: '16px', marginBottom: '24px' }}>
              {list.map(rm => {
                const stockInt = parseInt(rm.stock.replace(/[^0-9]/g, ''));
                const capInt = parseInt(rm.capacity.replace(/[^0-9]/g, ''));
                const pct = Math.round((stockInt / capInt) * 100);
                
                return (
                  <div className="glass metric-card" key={rm.id}>
                    <div className="metric-header">
                      <span>{rm.silo}</span>
                      <span className={`badge ${
                        rm.status === 'Optimal' ? 'badge-success' : 
                        rm.status === 'Medium' ? 'badge-warning' : 'badge-danger'
                      }`}>{rm.status}</span>
                    </div>
                    <div style={{ marginTop: '4px' }}>
                      <div className="metric-value" style={{ fontSize: '20px' }}>{rm.name}</div>
                      <div className="page-subtitle" style={{ marginTop: '2px' }}>{rm.stock} of {rm.capacity} ({pct}%)</div>
                    </div>
                    
                    <div className="silo-bar-outer" style={{ marginTop: '6px' }}>
                      <div 
                        className={`silo-bar-inner ${pct < 30 ? 'danger' : pct < 60 ? 'warning' : ''}`} 
                        style={{ width: `${pct}%` }} 
                      />
                    </div>
                    <div className="metric-footer" style={{ justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                      <span>Silo Temp:</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{rm.temperature}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="glass table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Material Code</th>
                    <th>Description Name</th>
                    <th>Storage Silo</th>
                    <th>Current Level (Tons)</th>
                    <th>Maximum Capacity</th>
                    <th>Silo Temp</th>
                    <th>Safety Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(rm => (
                    <tr key={rm.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{rm.id}</td>
                      <td style={{ fontWeight: '600' }}>{rm.name}</td>
                      <td>{rm.silo}</td>
                      <td>{rm.stock}</td>
                      <td>{rm.capacity}</td>
                      <td>{rm.temperature}</td>
                      <td>
                        <span className={`badge ${
                          rm.status === 'Optimal' ? 'badge-success' : 
                          rm.status === 'Medium' ? 'badge-warning' : 'badge-danger'
                        }`}>
                          {rm.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Warehouses') {
        const list = filterTable(db.inventory.warehouses, ['name', 'location', 'primaryUse']);
        return (
          <div className="fade-in">
            <h2 className="page-title">Warehouse Laydowns & Zones</h2>
            <div className="page-subtitle">Operational status of logistics storage zones and specialized packing zones</div>

            <div className="metrics-grid" style={{ marginTop: '16px' }}>
              {list.map(wh => (
                <div className="glass widget-card" key={wh.id} style={{ gap: '10px' }}>
                  <div className="widget-title">
                    <span>{wh.name}</span>
                    <span style={{ color: 'var(--accent-primary)', fontSize: '14px', fontWeight: '700' }}>{wh.id}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Primary Storage Use</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: '600', marginTop: '2px', fontSize: '14px' }}>{wh.primaryUse}</div>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <div className="silo-info">
                      <span>Utilisation Capacity</span>
                      <span>{wh.capacity}</span>
                    </div>
                    <div className="silo-bar-outer" style={{ marginTop: '4px' }}>
                      <div className="silo-bar-inner" style={{ width: wh.capacity }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      if (sub === 'Stock Movements') {
        const list = filterTable(db.inventory.stockMovements, ['material', 'fromZone', 'toZone']);
        return (
          <div className="fade-in">
            <h2 className="page-title">Internal Stock Movements Ledger</h2>
            <div className="page-subtitle">Track materials flowing from storage silos into batch mixers and warehouse grids</div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Movement ID</th>
                    <th>Material Type</th>
                    <th>Dispatched From</th>
                    <th>Routed To</th>
                    <th>Quantity</th>
                    <th>Timestamp</th>
                    <th>Operator/Conveyor</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(mv => (
                    <tr key={mv.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{mv.id}</td>
                      <td>{mv.material}</td>
                      <td>{mv.fromZone}</td>
                      <td>{mv.toZone}</td>
                      <td style={{ fontWeight: '600' }}>{mv.qty}</td>
                      <td>{mv.time}</td>
                      <td>{mv.handler}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Finished Goods') {
        const list = filterTable(db.inventory.finishedGoods, ['description', 'location']);
        return (
          <div className="fade-in">
            <h2 className="page-title">Finished Goods Stock</h2>
            <div className="page-subtitle">Inventory of packed float crates, value-added Low-E, and automotive glass sheets</div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Stock Keeping Unit</th>
                    <th>Product Description</th>
                    <th>Total Packs Stored</th>
                    <th>Total Weight</th>
                    <th>Warehouse Grid Location</th>
                    <th>Valuation Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(fg => (
                    <tr key={fg.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{fg.id}</td>
                      <td style={{ fontWeight: '600' }}>{fg.description}</td>
                      <td>{fg.qty}</td>
                      <td>{fg.weight}</td>
                      <td style={{ fontFamily: 'monospace' }}>{fg.location}</td>
                      <td style={{ color: 'var(--accent-success)', fontWeight: '600' }}>{fg.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    }

    // --- PRODUCTION MODULE ---
    if (s === 'Production') {
      if (sub === 'Production Planning') {
        const list = filterTable(db.production.productionPlanning, ['description', 'furnace', 'status']);
        return (
          <div className="fade-in">
            <div className="page-header">
              <div>
                <h2 className="page-title">Production Campaigns & Pull Plans</h2>
                <div className="page-subtitle">Scheduled campaigns determining raw feed compositions and float roll gaps</div>
              </div>
            </div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Plan Campaign ID</th>
                    <th>Run Details</th>
                    <th>Assigned Furnace</th>
                    <th>Target Pull Rate</th>
                    <th>Start Date</th>
                    <th>Completion Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{p.id}</td>
                      <td style={{ fontWeight: '600' }}>{p.description}</td>
                      <td>{p.furnace}</td>
                      <td>{p.pullRateTarget}</td>
                      <td>{p.start}</td>
                      <td>{p.end}</td>
                      <td>
                        <span className={`badge ${p.status === 'Active' ? 'badge-success' : 'badge-info'}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Work Orders') {
        const list = filterTable(db.production.workOrders, ['id', 'runCode', 'desc', 'status']);
        return (
          <div className="fade-in">
            <div className="page-header">
              <div>
                <h2 className="page-title">Shop Floor Work Orders</h2>
                <div className="page-subtitle">Specific glass cutting, edging, lamination, or tempering process commands</div>
              </div>
              <button className="btn-primary" onClick={() => openCreateModal('workOrder')}>
                <Plus size={16} style={{ marginRight: '6px' }} /> Issue Work Order
              </button>
            </div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Work Order ID</th>
                    <th>Campaign Run</th>
                    <th>Task Description</th>
                    <th>Target Volume</th>
                    <th>Origin Sales Ref</th>
                    <th>Operational Progress</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(wo => (
                    <tr key={wo.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{wo.id}</td>
                      <td style={{ fontFamily: 'monospace' }}>{wo.runCode}</td>
                      <td>{wo.desc}</td>
                      <td>{wo.qty}</td>
                      <td>{wo.requestedBy}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', minWidth: '30px' }}>{wo.currentProgress}</span>
                          <div className="silo-bar-outer" style={{ width: '80px' }}>
                            <div className="silo-bar-inner" style={{ width: wo.currentProgress }} />
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${
                          wo.status === 'Completed' ? 'badge-success' : 
                          wo.status === 'In Progress' ? 'badge-warning' : 'badge-info'
                        }`}>
                          {wo.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Production Batches') {
        const list = filterTable(db.production.productionBatches, ['id', 'mixer', 'status']);
        return (
          <div className="fade-in">
            <h2 className="page-title">Mix Plant Batch Discharges</h2>
            <div className="page-subtitle">Formulated powder weights scales measurements before feeding furnace chargers</div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Batch ID</th>
                    <th>Weight Scales</th>
                    <th>Quartz Sand Weight</th>
                    <th>Soda Ash Weight</th>
                    <th>Dolomite Weight</th>
                    <th>Limestone Weight</th>
                    <th>Internal Cullet Ratio</th>
                    <th>Mix Duration</th>
                    <th>Charge Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(b => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{b.id}</td>
                      <td>{b.mixer}</td>
                      <td>{b.silica}</td>
                      <td>{b.sodaAsh}</td>
                      <td>{b.dolomite}</td>
                      <td>{b.limestone}</td>
                      <td style={{ fontWeight: '600' }}>{b.culletRatio}</td>
                      <td>{b.mixTime}</td>
                      <td>
                        <span className={`badge ${b.status === 'Discharged to Silo' ? 'badge-success' : 'badge-warning'}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Process Tracking') {
        const pt = db.production.processTracking;
        return (
          <div className="fade-in">
            <h2 className="page-title">Float Line Real-Time Process Dashboard</h2>
            <div className="page-subtitle">Interactive process readings for primary melting furnace, float tin bath, and annealing lehr zones</div>

            <div className="widgets-layout" style={{ marginTop: '16px' }}>
              <div className="glass widget-card">
                <div className="widget-title">
                  <span>Melting & Combustion Parameters</span>
                  <Activity size={16} className="trend-up" />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Furnace #1 Temperature Control</span>
                      <span style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>{processControls.furnaceTemp} °C</span>
                    </label>
                    <input 
                      type="range" 
                      min="1520" 
                      max="1600" 
                      value={processControls.furnaceTemp} 
                      onChange={handleFurnaceSlider}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
                      <span>Min Safe: 1540°C</span>
                      <span>Target Ideal: 1565°C</span>
                      <span>Max Safe: 1585°C</span>
                    </div>
                  </div>

                  <div className="process-grid">
                    <div className="process-node">
                      <div className="node-title">Furnace Pressure</div>
                      <div className="node-value">{pt.furnace1.pressure}</div>
                      <div className="node-status"><span className="status-dot"></span> Normal draft</div>
                    </div>
                    <div className="process-node">
                      <div className="node-title">Glass Liquid Level</div>
                      <div className="node-value">{pt.furnace1.level}</div>
                      <div className="node-status"><span className="status-dot"></span> Laser calibrated</div>
                    </div>
                    <div className="process-node">
                      <div className="node-title">Combustion Purity</div>
                      <div className="node-value">{pt.furnace1.combustionEfficiency}</div>
                      <div className="node-status"><span className="status-dot"></span> Oxygen enriched</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass widget-card">
                <div className="widget-title">Tin Bath Atmosphere controls</div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                    <span className="text-secondary">Protective Gas:</span>
                    <span style={{ fontWeight: '600' }}>{pt.tinBath.atmosphere}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                    <span className="text-secondary">Ribbon Entry Temp:</span>
                    <span style={{ fontWeight: '600' }}>{pt.tinBath.tinTempIn}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                    <span className="text-secondary">Exit Temp:</span>
                    <span style={{ fontWeight: '600' }}>{pt.tinBath.tinTempOut}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
                    <span className="text-secondary">Continuous Draw Speed:</span>
                    <span style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{pt.tinBath.speed}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-secondary">Glass Ribbon Width:</span>
                    <span style={{ fontWeight: '600' }}>{pt.tinBath.ribbonWidth}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass widget-card" style={{ marginTop: '20px' }}>
              <div className="widget-title">Annealing Lehr cooling Temperature Curves</div>
              <div className="process-grid" style={{ marginTop: '10px' }}>
                <div className="process-node">
                  <div className="node-title">Lehr Zone 1 (Baking Zone)</div>
                  <div className="node-value">{pt.lehr.zone1Temp}</div>
                </div>
                <div className="process-node">
                  <div className="node-title">Lehr Zone 2 (Reheat zone)</div>
                  <div className="node-value">{pt.lehr.zone2Temp}</div>
                </div>
                <div className="process-node">
                  <div className="node-title">Lehr Zone 3 (Cooling rate)</div>
                  <div className="node-value">{pt.lehr.zone3Temp}</div>
                </div>
                <div className="process-node">
                  <div className="node-title">Lehr Zone 4 (Outlet gate)</div>
                  <div className="node-value">{pt.lehr.zone4Temp}</div>
                </div>
                <div className="process-node" style={{ borderColor: 'var(--accent-primary)' }}>
                  <div className="node-title">Ribbon Exit Temperature</div>
                  <div className="node-value" style={{ color: 'var(--accent-secondary)' }}>{pt.lehr.exitTemp}</div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      if (sub === 'Machine Scheduling') {
        const list = filterTable(db.production.machineScheduling, ['machine', 'task', 'status']);
        return (
          <div className="fade-in">
            <h2 className="page-title">Float Line & Fab Machine Timelines</h2>
            <div className="page-subtitle">Real-time scheduling allocations for continuous run lines and tempering ovens</div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Assigned Machine</th>
                    <th>Current Setup Task</th>
                    <th>Assigned Start</th>
                    <th>Estimated End</th>
                    <th>Utilization Rating</th>
                    <th>Operational Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((m, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: '600' }}>{m.machine}</td>
                      <td>{m.task}</td>
                      <td>{m.start}</td>
                      <td>{m.end}</td>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{m.utilization}</td>
                      <td>
                        <span className={`badge ${
                          m.status === 'Running' ? 'badge-success' :
                          m.status === 'Setup' ? 'badge-warning' : 'badge-info'
                        }`}>
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    }

    // --- QUALITY CONTROL MODULE ---
    if (s === 'Quality Control') {
      if (sub === 'Incoming QC') {
        const list = filterTable(db.qualityControl.incomingQC, ['shipment', 'inspector', 'result']);
        return (
          <div className="fade-in">
            <div className="page-header">
              <div>
                <h2 className="page-title">Incoming Raw Materials Chemical Assays</h2>
                <div className="page-subtitle">Laboratory spectroscopy results for Silica sand shipments and fluxes</div>
              </div>
              <button className="btn-primary" onClick={() => openCreateModal('incomingQC')}>
                <Plus size={16} style={{ marginRight: '6px' }} /> Record Assay
              </button>
            </div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Assay Voucher</th>
                    <th>Shipment GRN</th>
                    <th>SiO2 Purity Target</th>
                    <th>Fe2O3 Content Target</th>
                    <th>Moisture % Target</th>
                    <th>Lab Analyst</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(iqc => (
                    <tr key={iqc.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{iqc.id}</td>
                      <td style={{ fontFamily: 'monospace' }}>{iqc.shipment}</td>
                      <td>{iqc.paramSiO2}</td>
                      <td>{iqc.Fe2O3}</td>
                      <td>{iqc.moisture}</td>
                      <td>{iqc.inspector}</td>
                      <td>
                        <span className={`badge ${iqc.result === 'Passed' ? 'badge-success' : 'badge-danger'}`}>
                          {iqc.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'In-Process QC') {
        const list = filterTable(db.qualityControl.inProcessQC, ['scanner', 'defectsFound']);
        return (
          <div className="fade-in">
            <div className="page-header">
              <div>
                <h2 className="page-title">Automated Laser Defects Scanner Stream</h2>
                <div className="page-subtitle">Live camera feed scans for ribbon inclusions, tin drops, and glass bubble markers</div>
              </div>
              <button className="btn-secondary" onClick={simulateLiveQCScan}>
                <RefreshCw size={14} style={{ marginRight: '6px' }} /> Simulate Scanner Defect
              </button>
            </div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Scan Timestamp</th>
                    <th>Laser Station</th>
                    <th>Defect Description</th>
                    <th>Automated Trigger Action</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((q, idx) => (
                    <tr key={idx}>
                      <td style={{ fontFamily: 'monospace' }}>{q.time}</td>
                      <td style={{ fontWeight: '600' }}>{q.scanner}</td>
                      <td style={{ color: q.defectsFound !== 'None' ? 'var(--accent-danger)' : 'var(--text-primary)' }}>
                        {q.defectsFound}
                      </td>
                      <td>{q.action}</td>
                      <td>
                        <span className={`badge ${
                          q.defectsFound === 'None' ? 'badge-success' : 'badge-warning'
                        }`}>
                          {q.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Final QC') {
        const list = filterTable(db.qualityControl.finalQC, ['woRef', 'inspector', 'result']);
        return (
          <div className="fade-in">
            <h2 className="page-title">Final Packing Yield Quality Checks</h2>
            <div className="page-subtitle">Impact pressure tests and optical thickness validations before boxing and crating</div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>QC Voucher ID</th>
                    <th>Work Order Ref</th>
                    <th>Batch Source</th>
                    <th>Optical Distortion Level</th>
                    <th>Impact Deflection Limit</th>
                    <th>Thickness tolerance</th>
                    <th>QC Officer</th>
                    <th>Disposition</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(fq => (
                    <tr key={fq.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{fq.id}</td>
                      <td style={{ fontFamily: 'monospace' }}>{fq.woRef}</td>
                      <td style={{ fontFamily: 'monospace' }}>{fq.batch}</td>
                      <td>{fq.opticalPurity}</td>
                      <td>{fq.impactStrength}</td>
                      <td>{fq.thicknessCheck}</td>
                      <td>{fq.inspector}</td>
                      <td>
                        <span className={`badge ${fq.result === 'Approved' ? 'badge-success' : 'badge-danger'}`}>
                          {fq.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    }

    // --- MAINTENANCE MODULE ---
    if (s === 'Maintenance') {
      if (sub === 'Machines') {
        const list = filterTable(db.maintenance.machines, ['name', 'status']);
        return (
          <div className="fade-in">
            <h2 className="page-title">Fabrication & Furnace Asset Registry</h2>
            <div className="page-subtitle">Thermal indices and mechanical wear levels for continuous production machinery</div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Asset ID</th>
                    <th>Machine Name</th>
                    <th>System Health Index</th>
                    <th>Cumulative Runtime</th>
                    <th>Last Maintenance</th>
                    <th>Next Scheduled Service</th>
                    <th>Asset Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(m => (
                    <tr key={m.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{m.id}</td>
                      <td style={{ fontWeight: '600' }}>{m.name}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: '700', color: parseInt(m.health) > 85 ? 'var(--accent-success)' : 'var(--accent-warning)' }}>
                            {m.health}
                          </span>
                          <div className="silo-bar-outer" style={{ width: '60px' }}>
                            <div className="silo-bar-inner" style={{ 
                              width: m.health,
                              background: parseInt(m.health) > 85 ? 'var(--accent-success)' : 'var(--accent-warning)'
                            }} />
                          </div>
                        </div>
                      </td>
                      <td>{m.runtime}</td>
                      <td>{m.lastService}</td>
                      <td>{m.nextService}</td>
                      <td>
                        <span className={`badge ${
                          m.status === 'Operational' ? 'badge-success' : 'badge-warning'
                        }`}>
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Preventive Maintenance') {
        const list = filterTable(db.maintenance.preventiveMaintenance, ['machine', 'action', 'status']);
        return (
          <div className="fade-in">
            <h2 className="page-title">Preventive Maintenance (PM) Schedules</h2>
            <div className="page-subtitle">Burner cleanings, diamond wheels replacements, and refractory core thickness safety schedules</div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>PM Ref</th>
                    <th>Assigned Machine</th>
                    <th>Required Operation Action</th>
                    <th>Service Frequency</th>
                    <th>Last Performed</th>
                    <th>Target Schedule Date</th>
                    <th>PM Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(pm => (
                    <tr key={pm.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{pm.id}</td>
                      <td style={{ fontWeight: '600' }}>{pm.machine}</td>
                      <td>{pm.action}</td>
                      <td>{pm.frequency}</td>
                      <td>{pm.lastPerformed}</td>
                      <td>{pm.scheduledDate}</td>
                      <td>
                        <span className={`badge ${
                          pm.status === 'Due Tomorrow' ? 'badge-danger' : 'badge-info'
                        }`}>
                          {pm.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Breakdown Logs') {
        const list = filterTable(db.maintenance.breakdownLogs, ['machine', 'issue', 'status']);
        return (
          <div className="fade-in">
            <div className="page-header">
              <div>
                <h2 className="page-title">Breakdown & Repair Logs</h2>
                <div className="page-subtitle">Mechanical/electrical breakdown downtime tracking and root actions logged</div>
              </div>
              <button className="btn-primary" onClick={() => openCreateModal('breakdownLog')}>
                <Plus size={16} style={{ marginRight: '6px' }} /> Log Breakdown
              </button>
            </div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Log ID</th>
                    <th>Machine Name</th>
                    <th>Incident Date</th>
                    <th>Production Downtime</th>
                    <th>Root Issue Description</th>
                    <th>Resolution Taken</th>
                    <th>Log Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(b => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{b.id}</td>
                      <td style={{ fontWeight: '600' }}>{b.machine}</td>
                      <td>{b.date}</td>
                      <td style={{ fontWeight: '700', color: 'var(--accent-danger)' }}>{b.downtime}</td>
                      <td>{b.issue}</td>
                      <td>{b.resolution}</td>
                      <td>
                        <span className={`badge ${b.status === 'Closed' ? 'badge-success' : 'badge-danger'}`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    }

    // --- LOGISTICS MODULE ---
    if (s === 'Logistics') {
      if (sub === 'Delivery Orders') {
        const list = filterTable(db.logistics.deliveryOrders, ['id', 'customer', 'status']);
        return (
          <div className="fade-in">
            <h2 className="page-title">Glass Crates Delivery Orders</h2>
            <div className="page-subtitle">Dispatch bills of lading for structural glass panels loaded onto A-frames</div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>DO Reference</th>
                    <th>Sales Ref</th>
                    <th>Client consignee</th>
                    <th>Carrier Partner</th>
                    <th>Scheduled Dispatch</th>
                    <th>Crated Items List</th>
                    <th>Dispatch Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(doOrder => (
                    <tr key={doOrder.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{doOrder.id}</td>
                      <td style={{ fontFamily: 'monospace' }}>{doOrder.soRef}</td>
                      <td>{doOrder.customer}</td>
                      <td>{doOrder.transportCompany}</td>
                      <td>{doOrder.dispatchDate}</td>
                      <td>{doOrder.items}</td>
                      <td>
                        <span className={`badge ${
                          doOrder.status === 'Dispatched' ? 'badge-success' :
                          doOrder.status === 'Loading' ? 'badge-warning' : 'badge-info'
                        }`}>
                          {doOrder.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Shipments') {
        const list = filterTable(db.logistics.shipments, ['id', 'carrier', 'status']);
        return (
          <div className="fade-in">
            <h2 className="page-title">Active Freight & Containers</h2>
            <div className="page-subtitle">Crate weights and route tracking for flat glass logistics carriers</div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Shipment Code</th>
                    <th>Hauler Carrier</th>
                    <th>Tracking Bill No</th>
                    <th>Truck Registration</th>
                    <th>Net Load Weight</th>
                    <th>Target ETA</th>
                    <th>Destination Route</th>
                    <th>Freight Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(shp => (
                    <tr key={shp.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{shp.id}</td>
                      <td>{shp.carrier}</td>
                      <td style={{ fontFamily: 'monospace' }}>{shp.trackingNo}</td>
                      <td style={{ fontFamily: 'monospace' }}>{shp.vehicleNo}</td>
                      <td>{shp.loadWeight}</td>
                      <td>{shp.targetEta}</td>
                      <td style={{ maxWidth: '250px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {shp.route}
                      </td>
                      <td>
                        <span className={`badge ${
                          shp.status === 'Delivered' ? 'badge-success' : 'badge-info'
                        }`}>
                          {shp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Tracking') {
        const list = filterTable(db.logistics.tracking, ['shipmentId', 'status']);
        return (
          <div className="fade-in">
            <h2 className="page-title">Real-Time Truck GPS Tracker</h2>
            <div className="page-subtitle">Live logistics geofences coordinates and freight delay warnings</div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Shipment Code</th>
                    <th>Last GPS Coordinates</th>
                    <th>Current Speed</th>
                    <th>Routing Status</th>
                    <th>Delay (Min)</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((t, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{t.shipmentId}</td>
                      <td style={{ fontFamily: 'monospace' }}>{t.lastCoordinates}</td>
                      <td>{t.speed}</td>
                      <td>
                        <span className={`badge ${
                          t.status === 'Delivered' ? 'badge-success' : 'badge-info'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td style={{ color: t.delayMinutes > 0 ? 'var(--accent-danger)' : 'var(--accent-success)', fontWeight: '700' }}>
                        {t.delayMinutes > 0 ? `+${t.delayMinutes}m` : '0m'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    }

    // --- FINANCE MODULE ---
    if (s === 'Finance') {
      if (sub === 'Invoices') {
        const list = filterTable(db.finance.invoices, ['id', 'customer', 'status']);
        return (
          <div className="fade-in">
            <h2 className="page-title">Accounts Receivable Invoices</h2>
            <div className="page-subtitle">B2B commercial invoices for completed flat glass campaigns and shipments</div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Invoice No</th>
                    <th>Sales Ref</th>
                    <th>Client Customer</th>
                    <th>Bill Date</th>
                    <th>Payment Due</th>
                    <th>Gross Amount</th>
                    <th>VAT Tax (20%)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(inv => (
                    <tr key={inv.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{inv.id}</td>
                      <td style={{ fontFamily: 'monospace' }}>{inv.soRef}</td>
                      <td>{inv.customer}</td>
                      <td>{inv.invoiceDate}</td>
                      <td>{inv.dueDate}</td>
                      <td style={{ fontWeight: '600' }}>{inv.amount}</td>
                      <td>{inv.tax}</td>
                      <td>
                        <span className={`badge ${
                          inv.status === 'Paid' ? 'badge-success' :
                          inv.status === 'Sent' ? 'badge-info' : 'badge-warning'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Payments') {
        const list = filterTable(db.finance.payments, ['id', 'customer', 'method']);
        return (
          <div className="fade-in">
            <h2 className="page-title">Inbound Wire Receipts</h2>
            <div className="page-subtitle">Cash collections ledger matching accounts receivable invoices</div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Receipt Voucher</th>
                    <th>Invoice Ref</th>
                    <th>Customer Payer</th>
                    <th>Receipt Date</th>
                    <th>Transferred Amount</th>
                    <th>Payment Channel</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{p.id}</td>
                      <td style={{ fontFamily: 'monospace' }}>{p.invoiceRef}</td>
                      <td>{p.customer}</td>
                      <td>{p.date}</td>
                      <td style={{ fontWeight: '700', color: 'var(--accent-success)' }}>{p.amount}</td>
                      <td>{p.method}</td>
                      <td>
                        <span className="badge badge-success">{p.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Expenses') {
        const list = filterTable(db.finance.expenses, ['category', 'vendor', 'status']);
        return (
          <div className="fade-in">
            <h2 className="page-title">Accounts Payable Expenses</h2>
            <div className="page-subtitle">Natural gas utility bills, diamond spare parts purchases, and logistics costs</div>

            <div className="glass table-container" style={{ marginTop: '16px' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Voucher Ref</th>
                    <th>Operational Category</th>
                    <th>Vendor Creditor</th>
                    <th>Filing Date</th>
                    <th>Bill Amount</th>
                    <th>Description Comment</th>
                    <th>Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map(exp => (
                    <tr key={exp.id}>
                      <td style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{exp.id}</td>
                      <td style={{ fontWeight: '600' }}>{exp.category}</td>
                      <td>{exp.vendor}</td>
                      <td>{exp.date}</td>
                      <td style={{ fontWeight: '700', color: 'var(--accent-danger)' }}>{exp.amount}</td>
                      <td style={{ maxWidth: '280px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                        {exp.description}
                      </td>
                      <td>
                        <span className={`badge ${exp.status === 'Paid' ? 'badge-success' : 'badge-warning'}`}>
                          {exp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      if (sub === 'Costing') {
        const cost = db.finance.costing;
        return (
          <div className="fade-in">
            <h2 className="page-title">Glass Melting Unit Costing Sheet</h2>
            <div className="page-subtitle">Granular operational costing per ton of finished annealed glass sheet ($126.00 total)</div>

            <div className="widgets-layout" style={{ marginTop: '16px' }}>
              <div className="glass widget-card">
                <div className="widget-title">Cost Per Ton Elements Breakdown</div>
                <div className="table-container">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Cost Driver Element</th>
                        <th>Assigned Cost per Ton</th>
                        <th>Cost Percentage Weight</th>
                        <th>Visual Weight</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cost.costPerTon.map((c, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: '600' }}>{c.element}</td>
                          <td style={{ color: 'var(--accent-secondary)', fontWeight: '600' }}>{c.costPerTon}</td>
                          <td>{c.pct}</td>
                          <td style={{ width: '150px' }}>
                            <div className="silo-bar-outer">
                              <div className="silo-bar-inner" style={{ width: c.pct }} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="glass widget-card" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Consolidated Unit Cost</div>
                <div style={{ fontSize: '64px', fontWeight: '800', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {cost.totalCostPerTon}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '200px' }}>
                  Per packable ton of Float sheet output (inclusive of natural gas melting zones tariff).
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    // --- REPORTS MODULE ---
    if (s === 'Reports') {
      const reportMap = {
        Production: db.reports.production,
        Inventory: db.reports.inventory,
        Sales: db.reports.sales,
        Procurement: db.reports.procurement,
        Quality: db.reports.quality,
        Finance: db.reports.finance
      };

      const rep = reportMap[sub];
      if (!rep) return <div>Select report subcategory</div>;

      return (
        <div className="fade-in">
          <div className="page-header">
            <div>
              <h2 className="page-title">{sub} Departmental Report</h2>
              <div className="page-subtitle">Aggregated manufacturing statistics & audit logs for fiscal audits</div>
            </div>
            <button className="btn-secondary" onClick={() => triggerNotification(`${sub} Report exported as CSV.`)}>
              Export Report
            </button>
          </div>

          <div className="glass table-container" style={{ marginTop: '16px' }}>
            <table className="custom-table">
              <thead>
                <tr>
                  {rep.headers.map((h, i) => <th key={i}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {rep.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ fontWeight: j === 0 ? '600' : '400' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return <div>Select a subfolder from the sidebar to view detailed database parameters.</div>;
  };

  // --- HTML / RENDER OVERVIEW COCKPIT ---
  if (!isLoggedIn) {
    return (
      <div className="login-screen">
        <div className="login-bg-glow1" />
        <div className="login-bg-glow2" />
        
        <div className="glass login-card">
          <div className="login-brand">
            <div className="login-logo">V</div>
            <h1 className="login-title">VitroGlass ERP</h1>
            <p className="login-subtitle">Smart Glass Manufacturing Platform</p>
          </div>
          
          <form className="login-form" onSubmit={handleLogin}>
            {loginError && <div className="login-error">{loginError}</div>}
            
            <div className="form-group">
              <label className="form-label" htmlFor="email">Security E-mail</label>
              <input 
                id="email"
                type="email" 
                value={loginEmail} 
                onChange={(e) => setLoginEmail(e.target.value)} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="password">Authentication Password</label>
              <input 
                id="password"
                type="password" 
                value={loginPassword} 
                onChange={(e) => setLoginPassword(e.target.value)} 
                required 
              />
            </div>
            
            <div className="login-remember">
              <label className="checkbox-label">
                <input type="checkbox" defaultChecked />
                <span>Keep workspace active</span>
              </label>
              <a href="#" className="forgot-password" onClick={(e) => { e.preventDefault(); alert("Use the credentials in the footnote below."); }}>Reset pin</a>
            </div>
            
            <button type="submit" className="btn-primary login-submit">Authenticate Terminal</button>
          </form>
          
          <div className="login-demo-creds">
            Demo E-mail: <span>admin@vitroglass.com</span><br/>
            Demo Pin: <span>password</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* 1. SIDEBAR */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header" onClick={() => navigateTo(null, null)} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">V</div>
          <span className="logo-text">VitroGlass ERP</span>
        </div>
        
        <div className="sidebar-menu">
          {/* Dashboard Overview Link */}
          <div 
            className={`menu-item ${!activeSection ? 'active' : ''}`} 
            onClick={() => navigateTo(null, null)}
            style={{ marginBottom: '10px' }}
          >
            <Home size={16} />
            <span>Overview Cockpit</span>
          </div>
          
          {/* ERP Department Modules */}
          {menuConfig.map((sec) => {
            const Icon = sec.icon;
            const isExpanded = expandedSections[sec.name];
            
            return (
              <div className="menu-section" key={sec.name}>
                <div 
                  className="menu-section-header" 
                  onClick={() => toggleSection(sec.name)}
                >
                  <div className="menu-section-title">
                    <span className="menu-icon"><Icon size={14} /></span>
                    <span>{sec.name}</span>
                  </div>
                  {!sidebarCollapsed && (
                    <span className="menu-arrow">
                      {isExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    </span>
                  )}
                </div>
                
                {isExpanded && !sidebarCollapsed && (
                  <div className="menu-items-container">
                    {sec.items.map(item => (
                      <div 
                        key={item}
                        className={`menu-item ${activeSection === sec.name && activeSub === item ? 'active' : ''}`}
                        onClick={() => navigateTo(sec.name, item)}
                      >
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">A</div>
            <div className="user-details">
              <span className="username">Administrator</span>
              <span className="user-role">{userRole}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Log out">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTAINER */}
      <main className="main-content">
        {/* HEADER */}
        <header className="header">
          <div className="header-left">
            <button className="collapse-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              <Menu size={18} />
            </button>
            <div className="view-breadcrumbs">
              {getBreadcrumbs().map((b, i, arr) => (
                <React.Fragment key={i}>
                  <span className={i === arr.length - 1 ? 'breadcrumb-active' : ''}>{b}</span>
                  {i < arr.length - 1 && <span style={{ color: 'var(--text-muted)' }}>/</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="header-right">
            {/* Real-time search inside current page */}
            {activeSection && (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder={`Search ${activeSub}...`} 
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ paddingLeft: '32px', height: '36px', width: '220px' }}
                />
              </div>
            )}

            {/* Custom Interactive Role Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Workspace Scope:</span>
              <select 
                value={userRole} 
                onChange={(e) => {
                  setUserRole(e.target.value);
                  triggerNotification(`Workspace role updated to ${e.target.value}`, 'info');
                }}
                style={{ height: '36px', fontSize: '12px', padding: '0 8px', borderColor: 'var(--accent-secondary)' }}
              >
                <option value="Plant Manager">Plant Manager</option>
                <option value="Furnace Operator">Furnace Operator</option>
                <option value="QC Supervisor">QC Supervisor</option>
                <option value="Financial Analyst">Financial Analyst</option>
              </select>
            </div>

            {/* System Status Banner */}
            <div className="system-status">
              <span className="status-dot" />
              <span>Silos Online</span>
            </div>

            {/* Notification Droplist */}
            <div style={{ position: 'relative' }}>
              <button className="icon-button" onClick={() => setShowNotifications(!showNotifications)}>
                <Bell size={18} />
                {notifications.length > 0 && <span className="badge-dot" />}
              </button>
              
              {showNotifications && (
                <div className="glass feed-list" style={{ 
                  position: 'absolute', 
                  top: '45px', 
                  right: '0', 
                  width: '320px', 
                  zIndex: 200, 
                  maxHeight: '400px', 
                  overflowY: 'auto',
                  padding: '12px',
                  background: 'rgba(6, 9, 19, 0.95)',
                  border: '1px solid var(--border-light)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.8)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', fontWeight: '700' }}>Active Alarms & Logs</span>
                    <button style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '10px' }} onClick={() => setNotifications([])}>Clear</button>
                  </div>
                  {notifications.length === 0 ? (
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', padding: '16px' }}>No warnings loaded</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} style={{ display: 'flex', gap: '8px', fontSize: '12px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.02)', marginBottom: '8px' }}>
                        <span style={{ color: n.type === 'alert' ? 'var(--accent-danger)' : n.type === 'success' ? 'var(--accent-success)' : 'var(--accent-primary)' }}>●</span>
                        <div>
                          <div style={{ color: 'var(--text-primary)' }}>{n.text}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '10px', marginTop: '2px' }}>{n.time}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* WORKSPACE OPERATIONS PORTAL */}
        <div className="dashboard-body">
          {/* Custom Greeting Header based on active Role */}
          <div className="glass" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '3px solid var(--accent-primary)', background: 'rgba(56, 189, 248, 0.02)' }}>
            <span className={`badge ${getRoleBadgeColor()}`}>{userRole}</span>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{getRoleNotification()}</span>
          </div>

          {!activeSection ? (
            /* OVERVIEW DASHBOARD INDEX PAGE */
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="page-header">
                <div>
                  <h1 className="page-title" style={{ margin: 0, fontSize: '28px' }}>VitroFlow Operations Cockpit</h1>
                  <div className="page-subtitle">Real-time status of float lines and raw compound mix ratio feeds</div>
                </div>
              </div>

              {/* 4 Core KPIs */}
              <div className="metrics-grid">
                <div className="glass metric-card">
                  <div className="metric-header">
                    <span>Melt Furnace #1 Temp</span>
                    <Thermometer size={16} className="trend-up" />
                  </div>
                  <div className="metric-value">{processControls.furnaceTemp}°C</div>
                  <div className="metric-footer trend-up">
                    <span>Target range: 1550°C - 1580°C</span>
                  </div>
                </div>

                <div className="glass metric-card">
                  <div className="metric-header">
                    <span>Lehr Conveyor Speed</span>
                    <Activity size={16} className="trend-stable" />
                  </div>
                  <div className="metric-value">{processControls.drawSpeed} m/min</div>
                  <div className="metric-footer trend-stable">
                    <span>Tin Bath ribbon width: 3.45m</span>
                  </div>
                </div>

                <div className="glass metric-card">
                  <div className="metric-header">
                    <span>Net Packed Output</span>
                    <Package size={16} className="trend-up" />
                  </div>
                  <div className="metric-value">310 Tons/day</div>
                  <div className="metric-footer trend-up">
                    <span>Daily yield rate: {db.summary.yieldRate}%</span>
                  </div>
                </div>

                <div className="glass metric-card">
                  <div className="metric-header">
                    <span>Accident-Free Days</span>
                    <ShieldCheck size={16} className="trend-up" />
                  </div>
                  <div className="metric-value">{db.summary.safetyDays} days</div>
                  <div className="metric-footer trend-up">
                    <span>Active safety score: 100%</span>
                  </div>
                </div>
              </div>

              {/* Chart & Silos grid */}
              <div className="widgets-layout">
                {/* 1. Production output chart */}
                <div className="glass widget-card">
                  <div className="widget-title">
                    <span>Year-To-Date Melt Output vs Defect Scrap (Tons/month)</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '400' }}>Jan - Jun 2026</span>
                  </div>
                  
                  {/* Mock Chart Visualizer */}
                  <div className="chart-container">
                    <div className="chart-axis-y">
                      <span>12k T</span>
                      <span>9k T</span>
                      <span>6k T</span>
                      <span>3k T</span>
                      <span>0 T</span>
                    </div>

                    <div className="chart-plots-wrapper">
                      {/* Grid Lines */}
                      <div className="chart-grid-line" style={{ bottom: '25%' }} />
                      <div className="chart-grid-line" style={{ bottom: '50%' }} />
                      <div className="chart-grid-line" style={{ bottom: '75%' }} />

                      {/* Jan */}
                      <div className="chart-bar-group">
                        <div className="chart-bar-glow" style={{ height: '82%' }}>
                          <span className="chart-bar-tooltip">9,850 Tons Packable</span>
                        </div>
                        <div className="chart-bar-glow" style={{ height: '8%', background: 'var(--accent-secondary)' }}>
                          <span className="chart-bar-tooltip" style={{ borderColor: 'var(--accent-secondary)' }}>350 Tons Recycled</span>
                        </div>
                      </div>

                      {/* Feb */}
                      <div className="chart-bar-group">
                        <div className="chart-bar-glow" style={{ height: '78%' }}>
                          <span className="chart-bar-tooltip">9,510 Tons Packable</span>
                        </div>
                        <div className="chart-bar-glow" style={{ height: '7%', background: 'var(--accent-secondary)' }}>
                          <span className="chart-bar-tooltip" style={{ borderColor: 'var(--accent-secondary)' }}>290 Tons Recycled</span>
                        </div>
                      </div>

                      {/* Mar */}
                      <div className="chart-bar-group">
                        <div className="chart-bar-glow" style={{ height: '88%' }}>
                          <span className="chart-bar-tooltip">10,530 Tons Packable</span>
                        </div>
                        <div className="chart-bar-glow" style={{ height: '6%', background: 'var(--accent-secondary)' }}>
                          <span className="chart-bar-tooltip" style={{ borderColor: 'var(--accent-secondary)' }}>270 Tons Recycled</span>
                        </div>
                      </div>

                      {/* Apr */}
                      <div className="chart-bar-group">
                        <div className="chart-bar-glow" style={{ height: '85%' }}>
                          <span className="chart-bar-tooltip">10,260 Tons Packable</span>
                        </div>
                        <div className="chart-bar-glow" style={{ height: '5%', background: 'var(--accent-secondary)' }}>
                          <span className="chart-bar-tooltip" style={{ borderColor: 'var(--accent-secondary)' }}>240 Tons Recycled</span>
                        </div>
                      </div>

                      {/* May */}
                      <div className="chart-bar-group">
                        <div className="chart-bar-glow" style={{ height: '92%' }}>
                          <span className="chart-bar-tooltip">10,910 Tons Packable</span>
                        </div>
                        <div className="chart-bar-glow" style={{ height: '4%', background: 'var(--accent-secondary)' }}>
                          <span className="chart-bar-tooltip" style={{ borderColor: 'var(--accent-secondary)' }}>190 Tons Recycled</span>
                        </div>
                      </div>

                      {/* Jun */}
                      <div className="chart-bar-group">
                        <div className="chart-bar-glow" style={{ height: '90%' }}>
                          <span className="chart-bar-tooltip">10,680 Tons Packable</span>
                        </div>
                        <div className="chart-bar-glow" style={{ height: '3%', background: 'var(--accent-secondary)' }}>
                          <span className="chart-bar-tooltip" style={{ borderColor: 'var(--accent-secondary)' }}>170 Tons Recycled</span>
                        </div>
                      </div>
                    </div>

                    <div className="chart-axis-x">
                      <span className="chart-label-x">Jan</span>
                      <span className="chart-label-x">Feb</span>
                      <span className="chart-label-x">Mar</span>
                      <span className="chart-label-x">Apr</span>
                      <span className="chart-label-x">May</span>
                      <span className="chart-label-x">Jun</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: 'var(--text-muted)', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-primary)' }} />
                      <span>Packable float glass</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-secondary)' }} />
                      <span>Recycled scrap (cullet re-charger feed)</span>
                    </div>
                  </div>
                </div>

                {/* 2. Raw material Silo levels */}
                <div className="glass widget-card">
                  <div className="widget-title">Raw Mix Silo Levels</div>
                  <div className="silos-widget">
                    {db.inventory.rawMaterials.slice(0, 4).map(rm => {
                      const stockVal = parseInt(rm.stock.replace(/[^0-9]/g, ''));
                      const capVal = parseInt(rm.capacity.replace(/[^0-9]/g, ''));
                      const pct = Math.round((stockVal / capVal) * 100);
                      
                      return (
                        <div className="silo-row" key={rm.id}>
                          <div className="silo-info">
                            <span className="silo-name">{rm.name}</span>
                            <span className="silo-value">{rm.stock} ({pct}%)</span>
                          </div>
                          <div className="silo-bar-outer">
                            <div 
                              className={`silo-bar-inner ${pct < 30 ? 'danger' : pct < 60 ? 'warning' : ''}`}
                              style={{ width: `${pct}%` }} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button className="btn-secondary" style={{ marginTop: 'auto', fontSize: '12px', padding: '8px' }} onClick={() => navigateTo('Inventory', 'Raw Materials')}>
                    Manage Silos
                  </button>
                </div>
              </div>

              {/* Feed logs & system active warnings */}
              <div className="widgets-layout" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="glass widget-card">
                  <div className="widget-title">Active Shop floor Schedules</div>
                  <div className="feed-list">
                    {db.production.machineScheduling.map((m, idx) => (
                      <div className="feed-item" key={idx}>
                        <div className="feed-icon"><Cpu size={14} /></div>
                        <div className="feed-info">
                          <div className="feed-title">{m.machine}</div>
                          <div className="feed-desc">{m.task} ({m.start} - {m.end})</div>
                        </div>
                        <span className={`badge ${m.status === 'Running' ? 'badge-success' : 'badge-warning'}`}>{m.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass widget-card">
                  <div className="widget-title">Live defect scanner stream</div>
                  <div className="feed-list">
                    {db.qualityControl.inProcessQC.map((q, idx) => (
                      <div className="feed-item" key={idx}>
                        <div className="feed-icon" style={{ background: q.defectsFound !== 'None' ? 'rgba(248,113,113,0.1)' : 'rgba(52,211,153,0.1)', color: q.defectsFound !== 'None' ? 'var(--accent-danger)' : 'var(--accent-success)' }}>
                          <AlertTriangle size={14} />
                        </div>
                        <div className="feed-info">
                          <div className="feed-title">{q.defectsFound !== 'None' ? q.defectsFound : 'Optical distortion optimal'}</div>
                          <div className="feed-desc">{q.scanner} | Action: {q.action}</div>
                        </div>
                        <span className="feed-time">{q.time}</span>
                      </div>
                    ))}
                  </div>
                  <button className="btn-secondary" style={{ fontSize: '12px', padding: '8px' }} onClick={simulateLiveQCScan}>
                    Simulate Live Scan
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* DEPARTMENT VIEW RENDERER */
            renderSubView()
          )}
        </div>
      </main>

      {/* --- FLOATING CREATION FORM MODAL --- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="glass modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {modalType === 'customer' && 'Register B2B Customer'}
                {modalType === 'quotation' && 'Create Commercial Quotation'}
                {modalType === 'salesOrder' && 'New Production Sales Order'}
                {modalType === 'supplier' && 'Approve Supply Vendor'}
                {modalType === 'purchaseRequest' && 'File Purchase Request'}
                {modalType === 'purchaseOrder' && 'Issue Supplier Purchase Order'}
                {modalType === 'goodsReceipt' && 'Log Goods Receipt Voucher'}
                {modalType === 'workOrder' && 'Issue Work Order'}
                {modalType === 'breakdownLog' && 'Log Mechanical Breakdown'}
                {modalType === 'incomingQC' && 'Record Raw Chemical Assay'}
              </h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleModalSubmit}>
              {/* CUSTOMER FORM */}
              {modalType === 'customer' && (
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Customer Company Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. GlazeTech Facades Ltd" 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Commercial Region</label>
                    <select onChange={(e) => setFormData({ ...formData, region: e.target.value })}>
                      <option value="North America">North America</option>
                      <option value="Europe">Europe</option>
                      <option value="East Asia">East Asia</option>
                      <option value="Middle East">Middle East</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Credit Limit</label>
                    <input 
                      type="text" 
                      placeholder="e.g. $150,000" 
                      onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })} 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Client Contact Name</label>
                    <input 
                      type="text" 
                      placeholder="Sarah Jenkins" 
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })} 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business E-mail</label>
                    <input 
                      type="email" 
                      placeholder="s.jenkins@glazetech.com" 
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    />
                  </div>
                </div>
              )}

              {/* QUOTATION FORM */}
              {modalType === 'quotation' && (
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Target Customer</label>
                    <select onChange={(e) => setFormData({ ...formData, customer: e.target.value })}>
                      {db.crm.customers.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Glass Specification & Items</label>
                    <textarea 
                      rows="2"
                      placeholder="e.g. 5,000 sqm Ultra-Clear Float Glass (3.2mm)" 
                      onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Est Net Offer Total</label>
                    <input 
                      type="text" 
                      placeholder="$45,000" 
                      onChange={(e) => setFormData({ ...formData, total: e.target.value })} 
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Offer Validity Date</label>
                    <input 
                      type="date" 
                      onChange={(e) => setFormData({ ...formData, validity: e.target.value })} 
                    />
                  </div>
                </div>
              )}

              {/* SALES ORDER FORM */}
              {modalType === 'salesOrder' && (
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Customer Client</label>
                    <select onChange={(e) => setFormData({ ...formData, customer: e.target.value })}>
                      {db.crm.customers.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Order Total Value</label>
                    <input 
                      type="text" 
                      placeholder="$124,000" 
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })} 
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Required Delivery ETA</label>
                    <input 
                      type="date" 
                      onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })} 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Production Priority</label>
                    <select onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical Priority</option>
                    </select>
                  </div>
                </div>
              )}

              {/* SUPPLIER FORM */}
              {modalType === 'supplier' && (
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Vendor Supplier Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Belgian Silica Corp" 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Core Supply Material</label>
                    <input 
                      type="text" 
                      placeholder="Silica Sand / Soda Ash" 
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })} 
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Primary Representative</label>
                    <input 
                      type="text" 
                      placeholder="Luc De Smet" 
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })} 
                    />
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Contact Email</label>
                    <input 
                      type="email" 
                      placeholder="desmet@belgiansilica.be" 
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                    />
                  </div>
                </div>
              )}

              {/* PURCHASE REQUEST FORM */}
              {modalType === 'purchaseRequest' && (
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Item Description</label>
                    <input 
                      type="text" 
                      placeholder="Silica Sand Grade A (Premium)" 
                      onChange={(e) => setFormData({ ...formData, item: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Required Quantity</label>
                    <input 
                      type="text" 
                      placeholder="800 Tons" 
                      onChange={(e) => setFormData({ ...formData, qty: e.target.value })} 
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Estimated Purchase Cost</label>
                    <input 
                      type="text" 
                      placeholder="$56,000" 
                      onChange={(e) => setFormData({ ...formData, estCost: e.target.value })} 
                    />
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Urgency Priority</label>
                    <select onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}>
                      <option value="Medium">Medium</option>
                      <option value="High">High Priority</option>
                      <option value="Critical">Critical Breakdown Spare</option>
                    </select>
                  </div>
                </div>
              )}

              {/* PURCHASE ORDER FORM */}
              {modalType === 'purchaseOrder' && (
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Select Approved Supplier</label>
                    <select onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}>
                      {db.procurement.suppliers.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">PO Total Cost</label>
                    <input 
                      type="text" 
                      placeholder="$74,200" 
                      onChange={(e) => setFormData({ ...formData, total: e.target.value })} 
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Expected Delivery ETA</label>
                    <input 
                      type="date" 
                      onChange={(e) => setFormData({ ...formData, expectedDate: e.target.value })} 
                    />
                  </div>
                </div>
              )}

              {/* GOODS RECEIPT FORM */}
              {modalType === 'goodsReceipt' && (
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">PO Reference Number</label>
                    <input 
                      type="text" 
                      placeholder="PO-7701" 
                      onChange={(e) => setFormData({ ...formData, poNumber: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Carrier / Supplier</label>
                    <input 
                      type="text" 
                      placeholder="Belgian Silica Corp" 
                      onChange={(e) => setFormData({ ...formData, supplier: e.target.value })} 
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Material Description</label>
                    <input 
                      type="text" 
                      placeholder="Silica Sand Grade A" 
                      onChange={(e) => setFormData({ ...formData, material: e.target.value })} 
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Weighed Net Weight / Qty</label>
                    <input 
                      type="text" 
                      placeholder="400 Tons" 
                      onChange={(e) => setFormData({ ...formData, receivedQty: e.target.value })} 
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Silo Storage Location</label>
                    <input 
                      type="text" 
                      placeholder="Silo-Sand-A" 
                      onChange={(e) => setFormData({ ...formData, warehouseBin: e.target.value })} 
                    />
                  </div>
                </div>
              )}

              {/* WORK ORDER FORM */}
              {modalType === 'workOrder' && (
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Active Campaign Reference</label>
                    <select onChange={(e) => setFormData({ ...formData, runCode: e.target.value })}>
                      {db.production.productionPlanning.map(p => <option key={p.id} value={p.id}>{p.id} ({p.description})</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Origin Sales Order Ref</label>
                    <input 
                      type="text" 
                      placeholder="SO-8921" 
                      onChange={(e) => setFormData({ ...formData, requestedBy: e.target.value })} 
                    />
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Cutting / Tempering Task Instruction</label>
                    <input 
                      type="text" 
                      placeholder="Cut Float 6mm to Custom size 2.4mx3.2m" 
                      onChange={(e) => setFormData({ ...formData, desc: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Target Area (Sqm) / Pieces</label>
                    <input 
                      type="text" 
                      placeholder="2,000 sqm" 
                      onChange={(e) => setFormData({ ...formData, qty: e.target.value })} 
                      required
                    />
                  </div>
                </div>
              )}

              {/* BREAKDOWN FORM */}
              {modalType === 'breakdownLog' && (
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label className="form-label">Assigned Asset Machine</label>
                    <select onChange={(e) => setFormData({ ...formData, machine: e.target.value })}>
                      {db.maintenance.machines.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Downtime Duration</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 2h 15m" 
                      onChange={(e) => setFormData({ ...formData, downtime: e.target.value })} 
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Incident Failure Description</label>
                    <textarea 
                      rows="2"
                      placeholder="e.g. Glass dust jam in vertical linear rail guide" 
                      onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group full-width">
                    <label className="form-label">Repair Resolution Actions Taken (Leave blank if pending)</label>
                    <input 
                      type="text" 
                      placeholder="Rail cleaned, guide limit switch recalibrated" 
                      onChange={(e) => setFormData({ ...formData, resolution: e.target.value })} 
                    />
                  </div>
                </div>
              )}

              {/* INCOMING QC FORM */}
              {modalType === 'incomingQC' && (
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Incoming Shipment GRN</label>
                    <input 
                      type="text" 
                      placeholder="GR-9012" 
                      onChange={(e) => setFormData({ ...formData, shipment: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Silica Content (%)</label>
                    <input 
                      type="text" 
                      placeholder="99.64%" 
                      onChange={(e) => setFormData({ ...formData, paramSiO2: e.target.value })} 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Iron Content (%)</label>
                    <input 
                      type="text" 
                      placeholder="0.012%" 
                      onChange={(e) => setFormData({ ...formData, Fe2O3: e.target.value })} 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Moisture Content (%)</label>
                    <input 
                      type="text" 
                      placeholder="4.1%" 
                      onChange={(e) => setFormData({ ...formData, moisture: e.target.value })} 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Analyst Inspector</label>
                    <input 
                      type="text" 
                      placeholder="Dr. K. Schmidt" 
                      onChange={(e) => setFormData({ ...formData, inspector: e.target.value })} 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Pass / Fail Disposition</label>
                    <select onChange={(e) => setFormData({ ...formData, result: e.target.value })}>
                      <option value="Passed">Passed (Accept into Silos)</option>
                      <option value="Rejected">Rejected (Refuse shipment)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="form-footer">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Register Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
