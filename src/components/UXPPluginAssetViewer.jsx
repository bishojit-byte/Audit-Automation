import React, { useState } from 'react';
import { Code, Copy, Check, Download, FileCode, Layers } from 'lucide-react';

export default function UXPPluginAssetViewer() {
  const [activeTab, setActiveTab] = useState('manifest.json');
  const [copied, setCopied] = useState(false);

  const pluginFiles = {
    'manifest.json': `{
  "id": "com.pixelflow.smartqc",
  "name": "PixelFlow Smart Order QC & File Locker",
  "version": "1.0.0",
  "main": "index.html",
  "manifestVersion": 4,
  "entrypoints": [
    {
      "type": "panel",
      "id": "smartqcPanel",
      "label": { "default": "Smart QC Locker" },
      "minimumSize": { "width": 300, "height": 450 },
      "preferredDockedSize": { "width": 350, "height": 600 }
    }
  ],
  "host": [
    { "app": "PS", "minVersion": "23.0.0" }
  ],
  "requiredPermissions": {
    "network": { "domains": ["all"] },
    "localFileSystem": "fullAccess"
  }
}`,
    'main.js': `// Adobe Photoshop UXP Plugin - Smart QC & File Lock Logic
const { app, core } = require("photoshop");

document.getElementById("btn-fetch-order").addEventListener("click", async () => {
  const orderId = document.getElementById("order-id-input").value;
  if (!orderId) {
    app.showAlert("Please enter a valid Order ID");
    return;
  }

  // 1. Fetch Order Instructions & Specs from Central API
  const response = await fetch(\`https://api.tistaapp.com/v1/orders/\${orderId}\`);
  const data = await response.json();
  
  // 2. Perform Auto Technical Inspection on active Photoshop Document
  const activeDoc = app.activeDocument;
  const isDPIValid = activeDoc.resolution === 300;
  const isRGBValid = activeDoc.mode === "RGBColorMode";
  const hasClippingPath = activeDoc.pathItems && activeDoc.pathItems.length > 0;

  console.log("Auto Inspection Results:", { isDPIValid, isRGBValid, hasClippingPath });

  // 3. Render Instruction Checklist
  renderChecklist(data.instructions);
});

// Enforce File Completion Lock
function updateCompletionLockStatus(allPassed) {
  const btnComplete = document.getElementById("btn-complete-order");
  if (allPassed) {
    btnComplete.removeAttribute("disabled");
    btnComplete.innerText = "Pass QC & Upload to Dropbox";
  } else {
    btnComplete.setAttribute("disabled", "true");
    btnComplete.innerText = "QC Locked (Complete Checklist First)";
  }
}`,
    'index.html': `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div className="panel-container">
    <h2>PixelFlow QC Locker</h2>
    <div className="input-group">
      <input id="order-id-input" placeholder="Enter Order ID (e.g. ORD-9824)" />
      <button id="btn-fetch-order">Fetch Specs</button>
    </div>

    <div id="tech-inspection-results">
      <h3>Auto Technical Checks</h3>
      <ul id="tech-list"></ul>
    </div>

    <div id="instruction-checklist">
      <h3>Instruction Checklist</h3>
      <div id="checklist-items"></div>
    </div>

    <button id="btn-complete-order" disabled>QC Locked</button>
  </div>
  <script src="main.js"></script>
</body>
</html>`,
    'styles.css': `body {
  font-family: system-ui, sans-serif;
  background-color: #1e1e1e;
  color: #f0f0f0;
  padding: 12px;
}
.panel-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
button {
  background: #007acc;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background: #444;
  cursor: not-allowed;
}`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pluginFiles[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCode color="#34d399" size={24} />
              Adobe Photoshop UXP Plugin Source Code Assets
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Deployable Photoshop Extension package files ready to install on Photoshop Desktop (Windows/Mac).
            </p>
          </div>

          <button 
            onClick={handleCopy}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '10px',
              background: copied ? '#059669' : 'linear-gradient(135deg, #34d399 0%, #059669 100%)', border: 'none', color: '#fff',
              fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem'
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied Code!' : `Copy ${activeTab}`}
          </button>
        </div>
      </div>

      {/* Code Viewer Layout */}
      <div className="glass-panel" style={{ overflow: 'hidden' }}>
        {/* File Tabs */}
        <div style={{ display: 'flex', background: 'rgba(15, 23, 42, 0.9)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {Object.keys(pluginFiles).map((file) => (
            <button
              key={file}
              onClick={() => setActiveTab(file)}
              style={{
                padding: '12px 20px',
                background: activeTab === file ? '#0b0f19' : 'transparent',
                border: 'none',
                borderBottom: activeTab === file ? '2px solid #34d399' : '2px solid transparent',
                color: activeTab === file ? '#34d399' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Code size={15} /> {file}
            </button>
          ))}
        </div>

        {/* Code Content View */}
        <pre style={{
          padding: '20px',
          background: '#090d16',
          color: '#e2e8f0',
          fontSize: '0.85rem',
          fontFamily: 'monospace',
          overflowX: 'auto',
          lineHeight: '1.6',
          maxHeight: '450px'
        }}>
          <code>{pluginFiles[activeTab]}</code>
        </pre>
      </div>
    </div>
  );
}
