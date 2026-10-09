import React from 'react';
import { RefreshCw, Database, FileSpreadsheet, CheckCircle2, PauseCircle, ShieldCheck } from 'lucide-react';

export default function SyncControlBar({ isSyncActive, onToggleSync, lastSyncTime, pendingCount, onForceSync }) {
  return (
    <header style={{
      padding: '16px 28px',
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '16px'
    }}>
      {/* Brand & System Identifier */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(56, 189, 248, 0.3)'
        }}>
          <ShieldCheck size={24} color="#0f172a" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: '700', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            PixelFlow Audit & Automation Engine
          </h1>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Central Job Management • Auto QC • Dual-Layer Audit & Chargebacks
          </p>
        </div>
      </div>

      {/* Sync Control & Live Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {/* Status Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(30, 41, 59, 0.6)', padding: '8px 16px', borderRadius: '30px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
            <Database size={15} color="#38bdf8" />
            <span style={{ color: 'var(--text-muted)' }}>Cloud DB:</span>
            <span style={{ color: '#34d399', fontWeight: '600' }}>Connected</span>
          </div>
          <div style={{ width: '1px', height: '14px', background: 'rgba(255, 255, 255, 0.1)' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}>
            <FileSpreadsheet size={15} color="#34d399" />
            <span style={{ color: 'var(--text-muted)' }}>Google Sheets API:</span>
            {isSyncActive ? (
              <span className="badge badge-success">Auto-Sync ON</span>
            ) : (
              <span className="badge badge-warning">Sync Paused</span>
            )}
          </div>
        </div>

        {/* Toggle Switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(15, 23, 42, 0.9)', padding: '6px 14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={isSyncActive} 
              onChange={(e) => onToggleSync(e.target.checked)} 
              id="sync-toggle-switch"
            />
            <span className="slider"></span>
          </label>
          <div style={{ fontSize: '0.82rem' }}>
            <div style={{ fontWeight: '600', color: isSyncActive ? '#34d399' : '#fbbf24' }}>
              {isSyncActive ? 'Auto Sync Active' : 'Auto Sync Off'}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              {isSyncActive ? `Last synced: ${lastSyncTime}` : `Queued items: ${pendingCount}`}
            </div>
          </div>
        </div>

        {/* Force Sync Button */}
        <button
          onClick={onForceSync}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(129, 140, 248, 0.15) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            color: '#38bdf8',
            fontSize: '0.82rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          title="Force Sync Google Sheets Now"
        >
          <RefreshCw size={14} className={isSyncActive ? 'spinning' : ''} />
          <span>Sync Now</span>
        </button>
      </div>
    </header>
  );
}
