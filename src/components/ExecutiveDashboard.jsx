import React from 'react';
import { VENDORS, SERVICE_CATEGORY_SUMMARY } from '../data/mockData';
import { ShieldCheck, Layers, FileSpreadsheet, AlertTriangle, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ExecutiveDashboard({ onNavigate }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Welcome Hero Banner */}
      <div className="glass-panel" style={{
        padding: '32px 28px',
        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(129, 140, 248, 0.1) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '750px' }}>
          <span className="badge badge-info" style={{ marginBottom: '12px' }}>
            ✨ Enterprise Photo Editing Automation Suite
          </span>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '8px', color: '#fff' }}>
            Automated Quality Control, Data Sync & Audit Control Hub
          </h1>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            Real-time synchronization between <strong>Tista App</strong>, <strong>Photoshop UXP Smart QC</strong>, and <strong>Google Sheets</strong>. Dual-layer quality audit tracking for zero vendor errors and 100% category accuracy.
          </p>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Orders Audited</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#38bdf8', marginTop: '4px' }}>4,710</div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '4px' }}>▲ 95.9% Audit Coverage</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Avg Vendor Quality Score</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#34d399', marginTop: '4px' }}>95.8%</div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '4px' }}>Top Vendor: Alpha Edit (98.4%)</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Category Mismatch Errors</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f87171', marginTop: '4px' }}>84</div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '4px' }}>▼ -42% reduction this week</div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Auto-Sync Status</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#818cf8', marginTop: '4px' }}>Active</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Synced with Google Sheets API</div>
        </div>
      </div>

      {/* Quick Access Modules Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Module 1 Card */}
        <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer' }} onClick={() => onNavigate('quality-audit')}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck color="#38bdf8" size={22} />
            </div>
            <ArrowRight color="var(--text-muted)" size={18} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '6px' }}>Quality Audit Report</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            All Vendor performance, auditor check quantities, path quality insights, and weekly comparison trends.
          </p>
        </div>

        {/* Module 2 Card */}
        <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer' }} onClick={() => onNavigate('category-accuracy')}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(129, 140, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers color="#818cf8" size={22} />
            </div>
            <ArrowRight color="var(--text-muted)" size={18} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '6px' }}>Service & Category Accuracy</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Validate Image Complexity (Cat 1, Cat 2, Cat 3...) to protect production cost and margin efficiency.
          </p>
        </div>

        {/* Module 3 Card */}
        <div className="glass-panel" style={{ padding: '24px', cursor: 'pointer' }} onClick={() => onNavigate('photoshop-qc')}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(52, 211, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 color="#34d399" size={22} />
            </div>
            <ArrowRight color="var(--text-muted)" size={18} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '6px' }}>Photoshop UXP Smart QC Panel</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Interactive Photoshop plugin simulator featuring auto technical check & file lock enforcement.
          </p>
        </div>

      </div>
    </div>
  );
}
