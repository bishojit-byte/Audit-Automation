import React, { useState } from 'react';
import SyncControlBar from './components/SyncControlBar';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import QualityAuditReport from './components/QualityAuditReport';
import CategoryAccuracyReport from './components/CategoryAccuracyReport';
import PhotoshopQCSimulator from './components/PhotoshopQCSimulator';
import VendorEmailGenerator from './components/VendorEmailGenerator';
import UXPPluginAssetViewer from './components/UXPPluginAssetViewer';
import { LayoutDashboard, ShieldCheck, Tag, Sliders, Presentation, Code, FileSpreadsheet } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSyncActive, setIsSyncActive] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState('10:42 AM Today');
  const [pendingCount, setPendingCount] = useState(0);

  const handleToggleSync = (status) => {
    setIsSyncActive(status);
    if (!status) {
      setPendingCount(3);
    } else {
      setPendingCount(0);
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const handleForceSync = () => {
    setIsSyncActive(true);
    setPendingCount(0);
    setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Sync & Status Header */}
      <SyncControlBar 
        isSyncActive={isSyncActive}
        onToggleSync={handleToggleSync}
        lastSyncTime={lastSyncTime}
        pendingCount={pendingCount}
        onForceSync={handleForceSync}
      />

      {/* Primary Navigation Tab Bar */}
      <nav style={{
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '0 28px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto'
      }}>
        <button
          onClick={() => setActiveTab('dashboard')}
          style={{
            padding: '14px 18px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'dashboard' ? '3px solid #38bdf8' : '3px solid transparent',
            color: activeTab === 'dashboard' ? '#38bdf8' : 'var(--text-muted)',
            fontWeight: '600',
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <LayoutDashboard size={17} /> Overview
        </button>

        <button
          onClick={() => setActiveTab('quality-audit')}
          style={{
            padding: '14px 18px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'quality-audit' ? '3px solid #38bdf8' : '3px solid transparent',
            color: activeTab === 'quality-audit' ? '#38bdf8' : 'var(--text-muted)',
            fontWeight: '600',
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <ShieldCheck size={17} /> Quality Audit Report
        </button>

        <button
          onClick={() => setActiveTab('category-accuracy')}
          style={{
            padding: '14px 18px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'category-accuracy' ? '3px solid #818cf8' : '3px solid transparent',
            color: activeTab === 'category-accuracy' ? '#818cf8' : 'var(--text-muted)',
            fontWeight: '600',
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <Tag size={17} /> Service & Category Report
        </button>

        <button
          onClick={() => setActiveTab('photoshop-qc')}
          style={{
            padding: '14px 18px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'photoshop-qc' ? '3px solid #34d399' : '3px solid transparent',
            color: activeTab === 'photoshop-qc' ? '#34d399' : 'var(--text-muted)',
            fontWeight: '600',
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <Sliders size={17} /> Photoshop UXP Smart QC
        </button>

        <button
          onClick={() => setActiveTab('vendor-email')}
          style={{
            padding: '14px 18px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'vendor-email' ? '3px solid #fbbf24' : '3px solid transparent',
            color: activeTab === 'vendor-email' ? '#fbbf24' : 'var(--text-muted)',
            fontWeight: '600',
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <Presentation size={17} /> Vendor Email & Slides
        </button>

        <button
          onClick={() => setActiveTab('uxp-code')}
          style={{
            padding: '14px 18px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'uxp-code' ? '3px solid #94a3b8' : '3px solid transparent',
            color: activeTab === 'uxp-code' ? '#f1f5f9' : 'var(--text-muted)',
            fontWeight: '600',
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <Code size={17} /> UXP Plugin Assets
        </button>
      </nav>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '28px', maxWidth: '1440px', margin: '0 auto', width: '100%' }}>
        {activeTab === 'dashboard' && <ExecutiveDashboard onNavigate={setActiveTab} />}
        {activeTab === 'quality-audit' && <QualityAuditReport />}
        {activeTab === 'category-accuracy' && <CategoryAccuracyReport />}
        {activeTab === 'photoshop-qc' && <PhotoshopQCSimulator />}
        {activeTab === 'vendor-email' && <VendorEmailGenerator />}
        {activeTab === 'uxp-code' && <UXPPluginAssetViewer />}
      </main>

      {/* Footer */}
      <footer style={{
        padding: '16px 28px',
        background: '#090d16',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        fontSize: '0.78rem',
        color: 'var(--text-dim)',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center'
      }}>
        <span>PixelFlow Enterprise Automation Suite v1.0.0</span>
        <span>Connected to Tista App REST API & Google Sheets API</span>
      </footer>

    </div>
  );
}
