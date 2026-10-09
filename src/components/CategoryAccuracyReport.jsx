import React, { useState } from 'react';
import { SERVICE_CATEGORY_SUMMARY, INDIVIDUAL_SM_ASM_PERFORMANCE, WEEKLY_CATEGORY_COMPARISON } from '../data/mockData';
import { Tag, AlertCircle, CheckCircle2, TrendingUp, Layers, FileText, Download } from 'lucide-react';

export default function CategoryAccuracyReport() {
  const [selectedWeek, setSelectedWeek] = useState('Week 41 (Current)');
  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [dateRange, setDateRange] = useState('2026-10-01 to 2026-10-09');

  const s = SERVICE_CATEGORY_SUMMARY;
  const accuracyPct = ((s.correctOrder / s.totalOrderCollect) * 100).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Filter Bar */}
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Tag color="#818cf8" size={22} />
              Service & Category Accuracy Report
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Image Complexity (Category 1, 2, 3...) Validation & Production Cost Impact Analysis
            </p>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)', border: 'none', color: '#0f172a',
            fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem'
          }}>
            <Download size={16} /> Export Category Audit PDF
          </button>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', background: 'rgba(15, 23, 42, 0.5)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Week / Month</label>
            <select 
              value={selectedWeek} 
              onChange={(e) => setSelectedWeek(e.target.value)}
              style={{ width: '100%', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem' }}
            >
              <option>Week 41 (Current)</option>
              <option>Week 40</option>
              <option>Week 39</option>
              <option>Week 38</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date Range</label>
            <input 
              type="text" 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              style={{ width: '100%', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem' }}
            />
          </div>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total Order Collected</div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#fff' }}>
            {s.totalOrderCollect.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#34d399', marginTop: '4px' }}>Accuracy: {accuracyPct}%</div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Correct Entries</div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#34d399' }}>
            {s.correctOrder.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#34d399', marginTop: '4px' }}>Production Verified</div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Service Mismatches</div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#fbbf24' }}>
            {s.serviceMismatch.wrongService + s.serviceMismatch.serviceMissing}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {s.serviceMismatch.wrongService} Wrong / {s.serviceMismatch.serviceMissing} Missing
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Category Differences</div>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#f87171' }}>
            {s.categoryDifference.high + s.categoryDifference.low}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#f87171', marginTop: '4px' }}>
            {s.categoryDifference.high} High / {s.categoryDifference.low} Low
          </div>
        </div>
      </div>

      {/* SECTION 1: Summary Table */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '16px', color: '#f1f5f9' }}>
          1. Service & Category Master Summary
        </h3>
        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Total Order Collect</th>
                <th>Correct Order</th>
                <th>Wrong Entry</th>
                <th>Service Mismatch (Wrong / Missing)</th>
                <th>Category Diff (High / Low)</th>
                <th>Note Issue</th>
                <th>Overall Accuracy</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: '700' }}>{s.totalOrderCollect}</td>
                <td style={{ color: '#34d399', fontWeight: '700' }}>{s.correctOrder}</td>
                <td style={{ color: '#f87171' }}>{s.wrongEntry}</td>
                <td>
                  <span className="badge badge-warning">
                    {s.serviceMismatch.wrongService} Wrong | {s.serviceMismatch.serviceMissing} Missing
                  </span>
                </td>
                <td>
                  <span className="badge badge-danger">
                    {s.categoryDifference.high} High | {s.categoryDifference.low} Low
                  </span>
                </td>
                <td>{s.noteIssue}</td>
                <td>
                  <span className="badge badge-success" style={{ fontSize: '0.85rem' }}>{accuracyPct}%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Individual Summary (SM / ASM) */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '16px', color: '#f1f5f9' }}>
          2. Individual Production Lead Summary (SM / ASM Performance)
        </h3>
        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>SM / ASM Lead Name</th>
                <th>Total Orders</th>
                <th>Correct</th>
                <th>Wrong Service</th>
                <th>Service Missing</th>
                <th>High Category Diff</th>
                <th>Low Category Diff</th>
                <th>Note Issue</th>
                <th>Accuracy Score</th>
              </tr>
            </thead>
            <tbody>
              {INDIVIDUAL_SM_ASM_PERFORMANCE.map((lead, idx) => {
                const leadAccuracy = ((lead.correct / lead.totalOrder) * 100).toFixed(1);
                return (
                  <tr key={idx}>
                    <td style={{ fontWeight: '600', color: '#818cf8' }}>{lead.name}</td>
                    <td>{lead.totalOrder}</td>
                    <td style={{ color: '#34d399', fontWeight: '600' }}>{lead.correct}</td>
                    <td style={{ color: lead.wrongService > 30 ? '#f87171' : '#f1f5f9' }}>{lead.wrongService}</td>
                    <td style={{ color: lead.serviceMissing > 20 ? '#f87171' : '#f1f5f9' }}>{lead.serviceMissing}</td>
                    <td style={{ color: '#f87171' }}>{lead.catHigh}</td>
                    <td style={{ color: '#fbbf24' }}>{lead.catLow}</td>
                    <td>{lead.noteIssue}</td>
                    <td>
                      <span className={`badge ${leadAccuracy > 95 ? 'badge-success' : leadAccuracy > 90 ? 'badge-warning' : 'badge-danger'}`}>
                        {leadAccuracy}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: Weekly Comparison */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '16px', color: '#f1f5f9' }}>
          3. Weekly Comparison of Category Accuracy & Service Mismatch
        </h3>
        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Week</th>
                <th>Order Check</th>
                <th>Service Check</th>
                <th>Service Missing</th>
                <th>Category Mismatch</th>
                <th>Note Issue</th>
                <th>Error Reduction Trend</th>
              </tr>
            </thead>
            <tbody>
              {WEEKLY_CATEGORY_COMPARISON.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: '700' }}>{row.week}</td>
                  <td>{row.orderCheck}</td>
                  <td>{row.serviceCheck}</td>
                  <td style={{ color: row.serviceMissing > 15 ? '#f87171' : '#34d399' }}>{row.serviceMissing}</td>
                  <td style={{ color: row.categoryMismatch > 20 ? '#f87171' : '#34d399' }}>{row.categoryMismatch}</td>
                  <td>{row.noteIssue}</td>
                  <td>
                    <span className="badge badge-success">
                      ▼ Reduced to {row.categoryMismatch} errors
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
