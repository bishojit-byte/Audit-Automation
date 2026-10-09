export const VENDORS = [
  { id: 'v1', name: 'Alpha Edit Studio', location: 'Dhaka Hub', score: 98.4, totalOrders: 1420 },
  { id: 'v2', name: 'Precision Retouch Ltd', location: 'Chittagong Lab', score: 92.1, totalOrders: 980 },
  { id: 'v3', name: 'Apex Graphic Works', location: 'Sylhet Ops', score: 87.5, totalOrders: 1150 },
  { id: 'v4', name: 'Vivid Image Solutions', location: 'Dhaka Hub', score: 94.8, totalOrders: 860 },
  { id: 'v5', name: 'Pixel Craft Asia', location: 'Rajshahi Unit', score: 96.2, totalOrders: 1300 },
];

export const AUDITORS = [
  { id: 'a1', name: 'Tanvir Hossain', role: 'Senior Auditor', checkedCount: 450, totalAssigned: 460, faultFound: 12 },
  { id: 'a2', name: 'Nusrat Jahan', role: 'Quality Specialist', checkedCount: 380, totalAssigned: 390, faultFound: 18 },
  { id: 'a3', name: 'Mahmudul Hasan', role: 'Audit Lead', checkedCount: 510, totalAssigned: 510, faultFound: 9 },
  { id: 'a4', name: 'Sabrina Rahman', role: 'QC Inspector', checkedCount: 290, totalAssigned: 300, faultFound: 15 },
];

export const PATH_AUDIT_INSIGHTS = [
  { location: 'Dhaka Hub / Alpha Edit', checkedOrderQty: 600, faultOrderQty: 8, faultOrderPct: 1.33, checkedServiceQty: 1800, faultServiceQty: 14, faultServicePct: 0.78 },
  { location: 'Chittagong Lab / Precision', checkedOrderQty: 420, faultOrderQty: 24, faultOrderPct: 5.71, checkedServiceQty: 1260, faultServiceQty: 38, faultServicePct: 3.02 },
  { location: 'Sylhet Ops / Apex Graphic', checkedOrderQty: 500, faultOrderQty: 35, faultOrderPct: 7.00, checkedServiceQty: 1500, faultServiceQty: 52, faultServicePct: 3.47 },
  { location: 'Dhaka Hub / Vivid Image', checkedOrderQty: 350, faultOrderQty: 11, faultOrderPct: 3.14, checkedServiceQty: 1050, faultServiceQty: 19, faultServicePct: 1.81 },
  { location: 'Rajshahi Unit / Pixel Craft', checkedOrderQty: 480, faultOrderQty: 10, faultOrderPct: 2.08, checkedServiceQty: 1440, faultServiceQty: 15, faultServicePct: 1.04 },
];

export const WEEKLY_QUALITY_COMPARISON = [
  { week: 'Week 38', faultOrderPct: 4.8, faultServicePct: 2.9 },
  { week: 'Week 39', faultOrderPct: 3.9, faultServicePct: 2.4 },
  { week: 'Week 40', faultOrderPct: 3.1, faultServicePct: 1.8 },
  { week: 'Week 41', faultOrderPct: 2.2, faultServicePct: 1.2 },
];

export const SERVICE_CATEGORY_SUMMARY = {
  totalOrderCollect: 4710,
  correctOrder: 4425,
  wrongEntry: 285,
  serviceMismatch: {
    wrongService: 112,
    serviceMissing: 64,
  },
  categoryDifference: {
    high: 48,
    low: 36,
  },
  noteIssue: 25,
};

export const INDIVIDUAL_SM_ASM_PERFORMANCE = [
  { name: 'Rahim Uddin (SM)', totalOrder: 1250, correct: 1210, wrongService: 12, serviceMissing: 8, catHigh: 9, catLow: 6, noteIssue: 5 },
  { name: 'Kazi Farhana (ASM)', totalOrder: 980, correct: 925, wrongService: 22, serviceMissing: 11, catHigh: 12, catLow: 7, noteIssue: 3 },
  { name: 'Shafiqul Islam (SM)', totalOrder: 1400, correct: 1340, wrongService: 24, serviceMissing: 14, catHigh: 11, catLow: 8, noteIssue: 3 },
  { name: 'Mehedi Hasan (ASM)', totalOrder: 1080, correct: 950, wrongService: 54, serviceMissing: 31, catHigh: 16, catLow: 15, noteIssue: 14 },
];

export const WEEKLY_CATEGORY_COMPARISON = [
  { week: 'Week 38', orderCheck: 1100, serviceCheck: 3300, serviceMissing: 28, categoryMismatch: 35, noteIssue: 12 },
  { week: 'Week 39', orderCheck: 1150, serviceCheck: 3450, serviceMissing: 20, categoryMismatch: 28, noteIssue: 8 },
  { week: 'Week 40', orderCheck: 1200, serviceCheck: 3600, serviceMissing: 11, categoryMismatch: 14, noteIssue: 3 },
  { week: 'Week 41', orderCheck: 1260, serviceCheck: 3780, serviceMissing: 5, categoryMismatch: 7, noteIssue: 2 },
];

export const SAMPLE_ORDERS_FOR_QC = [
  {
    orderId: 'ORD-9824',
    customer: 'Nordic Fashion Co.',
    vendor: 'Alpha Edit Studio',
    category: 'Category 2 (Medium Complexity)',
    service: 'Ghost Mannequin & Drop Shadow',
    originalPath: '/Alpha Edit Studio/ORD-9824/Original/mannequin_01.raw',
    completePath: '/Alpha Edit Studio/ORD-9824/Complete/mannequin_01.jpg',
    specs: {
      dpi: 300,
      colorMode: 'RGB',
      dimensions: '2000 x 2000 px',
      aspectRatio: '1:1 Square',
      clippingPath: 'Path 1',
      backgroundColor: '#FFFFFF',
      layerStructure: 'Transparent Object + Separate Shadow Layer'
    },
    instructions: [
      { id: 'i1', text: 'Neck joint insertion with seamless blending', autoVerifiable: false },
      { id: 'i2', text: 'Soft drop shadow opacity at 35%, blur 12px', autoVerifiable: false },
      { id: 'i3', text: 'Clean background to pure RGB #FFFFFF (255,255,255)', autoVerifiable: true, type: 'bg_white' },
      { id: 'i4', text: 'Ensure resolution is exactly 300 DPI in RGB mode', autoVerifiable: true, type: 'dpi_rgb' },
      { id: 'i5', text: 'Verify Smooth Clipping Path named "Path 1"', autoVerifiable: true, type: 'clipping_path' }
    ]
  },
  {
    orderId: 'ORD-9825',
    customer: 'Luxe Jewelry Lab',
    vendor: 'Precision Retouch Ltd',
    category: 'Category 3 (High Complexity)',
    service: 'Jewelry Retouch & Metal Reflection Polish',
    originalPath: '/Precision Retouch Ltd/ORD-9825/Original/ring_macro.psd',
    completePath: '/Precision Retouch Ltd/ORD-9825/Complete/ring_macro.jpg',
    specs: {
      dpi: 300,
      colorMode: 'RGB',
      dimensions: '3000 x 3000 px',
      aspectRatio: '1:1 Square',
      clippingPath: 'Path 1',
      backgroundColor: '#FFFFFF',
      layerStructure: 'High-pass Sharpness + Dust Removal Mask'
    },
    instructions: [
      { id: 'i1', text: 'Diamond glare enhancement and stone dust removal', autoVerifiable: false },
      { id: 'i2', text: 'Gold band mirror shine reflection alignment', autoVerifiable: false },
      { id: 'i3', text: 'Background pure white #FFFFFF with margin 100px', autoVerifiable: true, type: 'bg_white' },
      { id: 'i4', text: 'Exact 300 DPI Resolution check', autoVerifiable: true, type: 'dpi_rgb' }
    ]
  }
];
