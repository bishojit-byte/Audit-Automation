import React, { useState } from 'react';
import { VENDORS } from '../data/mockData';
import { Mail, Send, FileText, Presentation, CheckCircle, AlertTriangle, DollarSign } from 'lucide-react';

export default function VendorEmailGenerator() {
  const [selectedVendorId, setSelectedVendorId] = useState('v2');
  const [reportPeriod, setReportPeriod] = useState('Week 41 (Oct 2026)');
  const [emailSent, setEmailSent] = useState(false);

  const vendor = VENDORS.find(v => v.id === selectedVendorId) || VENDORS[0];

  // Calculated Chargeback & Fault metrics
  const totalOrders = vendor.totalOrders;
  const faultOrders = Math.round(totalOrders * ((100 - vendor.score) / 100));
  const chargebackAmount = faultOrders * 4.5; // $4.50 per chargeback fault

  const handleSendEmail = () => {
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Presentation color="#fbbf24" size={24} />
              Automated Vendor Email & Slide Deck Generator
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Generates individual vendor performance slides, chargeback calculations, and sends automated email audits.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <select
              value={selectedVendorId}
              onChange={(e) => setSelectedVendorId(e.target.value)}
              style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem' }}
            >
              {VENDORS.map(v => (
                <option key={v.id} value={v.id}>{v.name} ({v.location})</option>
              ))}
            </select>

            <select
              value={reportPeriod}
              onChange={(e) => setReportPeriod(e.target.value)}
              style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem' }}
            >
              <option>Week 41 (Oct 2026)</option>
              <option>Week 40 (Oct 2026)</option>
              <option>Monthly Report - Sept 2026</option>
            </select>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Slide Preview + Email Dispatcher */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Left Side: Presentation Slide Deck Preview */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <span style={{ fontWeight: '700', color: '#fbbf24', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Presentation size={18} /> Generated Slide Presentation Preview
            </span>
            <span className="badge badge-info">16:9 HD Slide Format</span>
          </div>

          {/* Slide Deck Canvas */}
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
            borderRadius: '14px',
            border: '1px solid rgba(129, 140, 248, 0.3)',
            padding: '24px',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#818cf8', fontWeight: '800', letterSpacing: '0.1em' }}>WEEKLY VENDOR AUDIT REPORT</span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#ffffff', marginTop: '2px' }}>{vendor.name}</h3>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Period: {reportPeriod} • Location: {vendor.location}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: '800', color: vendor.score > 95 ? '#34d399' : '#fbbf24' }}>
                  {vendor.score}%
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Quality Rating</div>
              </div>
            </div>

            {/* Slide Body Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: '10px' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Total Delivered</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{totalOrders}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Fault Count</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f87171' }}>{faultOrders}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Chargeback Deduction</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fbbf24' }}>${chargebackAmount.toFixed(2)}</div>
              </div>
            </div>

            <div style={{ fontSize: '0.7rem', color: '#64748b', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Confidential • PixelFlow Quality Control System</span>
              <span>Slide 1 of 4</span>
            </div>
          </div>
        </div>

        {/* Right Side: Automated Email Dispatcher */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <span style={{ fontWeight: '700', color: '#38bdf8', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={18} /> Email Notification & Chargeback Statement
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Recipient Email:</label>
              <input 
                type="text" 
                readOnly 
                value={`quality-manager@${vendor.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`}
                style={{ width: '100%', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#38bdf8', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Subject:</label>
              <input 
                type="text" 
                readOnly 
                value={`[Quality Audit & Chargeback Statement] ${vendor.name} - ${reportPeriod}`}
                style={{ width: '100%', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Email Body Preview:</label>
              <textarea 
                readOnly 
                rows={6}
                value={`Dear ${vendor.name} Team,

Please find attached your Quality Audit & Chargeback Statement for ${reportPeriod}.

Summary Metrics:
- Total Orders Audited: ${totalOrders}
- Quality Guideline Compliance: ${vendor.score}%
- Total Quality Faults Flagged: ${faultOrders}
- Net Chargeback Adjustment: $${chargebackAmount.toFixed(2)} USD

Please review the attached presentation slides for specific order IDs and category mismatch feedback.

Best regards,
PixelFlow Quality Assurance Team`}
                style={{ width: '100%', background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '10px 12px', borderRadius: '8px', fontSize: '0.8rem', fontFamily: 'monospace', resize: 'none' }}
              />
            </div>

            <button
              onClick={handleSendEmail}
              disabled={emailSent}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: emailSent ? '#059669' : 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)',
                border: 'none',
                color: emailSent ? '#fff' : '#0f172a',
                fontWeight: '700',
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              {emailSent ? (
                <>
                  <CheckCircle size={18} /> Email & Slides Dispatched to Vendor!
                </>
              ) : (
                <>
                  <Send size={18} /> Dispatch Vendor Audit Email & Slides
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
