import React, { useState } from 'react';
import { SAMPLE_ORDERS_FOR_QC } from '../data/mockData';
import { ShieldCheck, Lock, Unlock, CheckCircle, XCircle, FileImage, Image as ImageIcon, Sliders, ArrowRight, UploadCloud } from 'lucide-react';

export default function PhotoshopQCSimulator() {
  const [selectedOrderId, setSelectedOrderId] = useState('ORD-9824');
  const order = SAMPLE_ORDERS_FOR_QC.find(o => o.orderId === selectedOrderId) || SAMPLE_ORDERS_FOR_QC[0];

  // Technical Check States
  const [techChecks, setTechChecks] = useState({
    dpi: true,
    colorMode: true,
    dimensions: true,
    clippingPath: true,
    bgWhite: true,
    layers: true
  });

  // Instruction Checklist States
  const [checkedInstructions, setCheckedInstructions] = useState({
    i1: false,
    i2: false,
    i3: true,
    i4: true,
    i5: true
  });

  const [isCompleted, setIsCompleted] = useState(false);

  // Lock status calculation
  const allTechPassed = Object.values(techChecks).every(val => val === true);
  const allInstructionsPassed = order.instructions.every(ins => checkedInstructions[ins.id] === true);
  const isQCPassed = allTechPassed && allInstructionsPassed;

  const handleInstructionToggle = (id) => {
    setCheckedInstructions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCompleteOrder = () => {
    if (!isQCPassed) return;
    setIsCompleted(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Overview Banner */}
      <div className="glass-panel" style={{ padding: '20px 24px', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: '8px' }}>Adobe Photoshop UXP Extension Panel</span>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileImage color="#38bdf8" size={24} />
              Photoshop Order-ID Auto QC & File Locker Engine
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Enforces strict automated technical verification & instruction checklists before allowing Dropbox file delivery.
            </p>
          </div>

          {/* Order ID Picker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#0f172a', padding: '8px 14px', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Select Order ID:</span>
            <select 
              value={selectedOrderId} 
              onChange={(e) => {
                setSelectedOrderId(e.target.value);
                setIsCompleted(false);
              }}
              style={{ background: '#1e293b', border: 'none', color: '#38bdf8', padding: '6px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer' }}
            >
              {SAMPLE_ORDERS_FOR_QC.map(o => (
                <option key={o.orderId} value={o.orderId}>{o.orderId} ({o.vendor})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout (Photoshop Mockup + UXP Panel) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
        
        {/* Left Side: Simulated Photoshop Canvas */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ImageIcon size={18} color="#818cf8" />
              <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Active Document: {order.orderId}_final_edit.psd</span>
            </div>
            <span className="badge badge-success">{order.specs.dimensions} • {order.specs.dpi} DPI • {order.specs.colorMode}</span>
          </div>

          {/* Image Canvas Preview Area */}
          <div style={{
            background: '#090d16',
            borderRadius: '12px',
            border: '1px dashed rgba(255,255,255,0.15)',
            minHeight: '380px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            padding: '20px'
          }}>
            {/* Visual Pure White Canvas Simulation */}
            <div style={{
              width: '240px',
              height: '240px',
              background: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              {/* Dummy Product Silhouette */}
              <div style={{
                width: '120px',
                height: '160px',
                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                borderRadius: '20px 20px 8px 8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#94a3b8',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                [ {order.service.split(' ')[0]} ]
              </div>

              {/* Clipping Path Outline Simulation */}
              <div style={{
                position: 'absolute',
                inset: '20px',
                border: '1.5px dashed #38bdf8',
                borderRadius: '16px',
                pointerEvents: 'none'
              }}>
                <span style={{ position: 'absolute', top: '-10px', left: '10px', background: '#38bdf8', color: '#0f172a', fontSize: '0.6rem', padding: '1px 4px', borderRadius: '3px', fontWeight: '800' }}>
                  {order.specs.clippingPath} ACTIVE
                </span>
              </div>
            </div>

            {/* Path Locations */}
            <div style={{ marginTop: '20px', fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              <div>Original Path: <code style={{ color: '#cbd5e1' }}>{order.originalPath}</code></div>
              <div>Complete Path: <code style={{ color: '#38bdf8' }}>{order.completePath}</code></div>
            </div>
          </div>
        </div>

        {/* Right Side: The Photoshop UXP Smart QC Extension Panel */}
        <div className="glass-panel-glow" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#0d1322' }}>
          
          {/* UXP Panel Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={18} color="#38bdf8" />
              <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#fff' }}>PixelFlow UXP Panel</span>
            </div>
            {isQCPassed ? (
              <span className="badge badge-success"><Unlock size={12} /> QC PASSED</span>
            ) : (
              <span className="badge badge-danger"><Lock size={12} /> LOCKED</span>
            )}
          </div>

          {/* Section 1: Automated Technical Detector */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              1. Auto Technical Inspection (System Verified)
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '6px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                <span>Resolution & Color: 300 DPI / RGB</span>
                {techChecks.dpi ? <CheckCircle size={15} color="#34d399" /> : <XCircle size={15} color="#f87171" />}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '6px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                <span>Pure White #FFFFFF BG Check</span>
                {techChecks.bgWhite ? <CheckCircle size={15} color="#34d399" /> : <XCircle size={15} color="#f87171" />}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', padding: '6px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                <span>Clipping Path ({order.specs.clippingPath})</span>
                {techChecks.clippingPath ? <CheckCircle size={15} color="#34d399" /> : <XCircle size={15} color="#f87171" />}
              </div>
            </div>
          </div>

          {/* Section 2: Dynamic Instruction Checklist */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
              2. Order Instruction Checklist
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {order.instructions.map((ins) => (
                <label 
                  key={ins.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: checkedInstructions[ins.id] ? 'rgba(52, 211, 153, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: checkedInstructions[ins.id] ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={checkedInstructions[ins.id] || false} 
                    onChange={() => handleInstructionToggle(ins.id)}
                    style={{ marginTop: '2px', accentColor: '#38bdf8' }}
                  />
                  <span style={{ color: checkedInstructions[ins.id] ? '#f1f5f9' : 'var(--text-muted)' }}>
                    {ins.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 3: File Completion & Enforced Lock Button */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '14px' }}>
            {!isQCPassed ? (
              <div style={{ marginBottom: '10px', fontSize: '0.75rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={13} /> Check off all instruction items to unlock completion.
              </div>
            ) : (
              <div style={{ marginBottom: '10px', fontSize: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={13} /> Ready for automated Dropbox upload!
              </div>
            )}

            <button
              onClick={handleCompleteOrder}
              disabled={!isQCPassed || isCompleted}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '10px',
                background: isQCPassed 
                  ? (isCompleted ? '#059669' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)')
                  : 'rgba(51, 65, 85, 0.5)',
                border: 'none',
                color: isQCPassed ? '#ffffff' : 'var(--text-muted)',
                fontWeight: '700',
                fontSize: '0.88rem',
                cursor: isQCPassed ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: isQCPassed ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              {isCompleted ? (
                <>
                  <CheckCircle size={18} /> Complete & Uploaded to Dropbox!
                </>
              ) : isQCPassed ? (
                <>
                  <UploadCloud size={18} /> Pass QC & Upload to Dropbox
                </>
              ) : (
                <>
                  <Lock size={18} /> QC Locked (Complete Checklist First)
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
