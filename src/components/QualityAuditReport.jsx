import React, { useState } from 'react';
import { VENDORS, AUDITORS, PATH_AUDIT_INSIGHTS, WEEKLY_QUALITY_COMPARISON } from '../data/mockData';
import { Calendar, Filter, Download, AlertTriangle, CheckCircle, ShieldAlert, TrendingDown } from 'lucide-react';

export default function QualityAuditReport() {
  const [selectedWeek, setSelectedWeek] = useState('Week 41 (Current)');
  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [selectedVendor, setSelectedVendor] = useState('All Vendors');
  const [dateRange, setDateRange] = useState('2026-10-01 to 2026-10-09');

  // Summary Metrics Calculation
  const totalAuditOrders = PATH_AUDIT_INSIGHTS.reduce((acc, item) => acc + item.checkedOrderQty, 0);
  const totalFaultOrders = PATH_AUDIT_INSIGHTS.reduce((acc, item) => acc + item.faultOrderQty, 0);
  const overallFaultPct = ((totalFaultOrders / totalAuditOrders) * 100).toFixed(2);
  const totalServiceChecked = PATH_AUDIT_INSIGHTS.reduce((acc, item) => acc + item.checkedServiceQty, 0);
  const totalServiceFaults = PATH_AUDIT_INSIGHTS.reduce((acc, item) => acc + item.faultServiceQty, 0);
  const overallServiceFaultPct = ((totalServiceFaults / totalServiceChecked) * 100).toFixed(2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & Filter Controls */}
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '700', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert color="#38bdf8" size={22} />
              Quality Audit Report (2nd Layer Audit)
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Comprehensive Vendor Guideline Compliance & Auditor Performance Analytics
            </p>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)', border: 'none', color: '#0f172a',
            fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem'
          }}>
            <Download size={16} /> Export Excel / PDF Report
          </button>
        </div>

        {/* Filter Toolbar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', background: 'rgba(15, 23, 42, 0.5)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
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

          <div>
            <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vendor / Location</label>
            <select 
              value={selectedVendor} 
              onChange={(e) => setSelectedVendor(e.target.value)}
              style={{ width: '100%', background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem' }}
            >
              <option>All Vendors</option>
              <option>Alpha Edit Studio</option>
              <option>Precision Retouch Ltd</option>
              <option>Apex Graphic Works</option>
              <option>Vivid Image Solutions</option>
              <option>Pixel Craft Asia</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Total Audit Orders</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#38bdf8' }}>
            {totalAuditOrders.toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '400' }}>orders</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={12} /> 100% Audit Sample Met
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Fault Order Rate</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: overallFaultPct > 4 ? '#f87171' : '#34d399' }}>
            {overallFaultPct}% <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '400' }}>({totalFaultOrders} faults)</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingDown size={12} /> -0.9% drop from last week
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Services Audited</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#818cf8' }}>
            {totalServiceChecked.toLocaleString()} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '400' }}>services</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Avg 3 services per order
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>Service Fault Rate</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: '#fbbf24' }}>
            {overallServiceFaultPct}% <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '400' }}>({totalServiceFaults} faults)</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '6px' }}>
            Chargeback impact calculated
          </div>
        </div>
      </div>

      {/* SECTION 1: All Vendor Summary */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '16px', color: '#f1f5f9' }}>
          1. All Vendor Audit Summary
        </h3>
        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Total Order Collect</th>
                <th>Audit Quantity</th>
                <th>Audit %</th>
                <th>Passed Orders</th>
                <th>Fault Orders</th>
                <th>Status / Efficiency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: '700' }}>2,450 Orders</td>
                <td>2,350 Orders</td>
                <td style={{ color: '#38bdf8', fontWeight: '700' }}>95.9%</td>
                <td style={{ color: '#34d399' }}>2,262</td>
                <td style={{ color: '#f87171', fontWeight: '700' }}>88</td>
                <td><span className="badge badge-success">High Efficiency (96.2%)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Individual Auditor Performance */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '16px', color: '#f1f5f9' }}>
          2. Individual Auditor Performance Breakdown
        </h3>
        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Auditor Name & Role</th>
                <th>Assigned Orders</th>
                <th>Checked Order Quantity</th>
                <th>Check %</th>
                <th>Found Fault Order Qty</th>
                <th>Fault Detection Rate</th>
              </tr>
            </thead>
            <tbody>
              {AUDITORS.map((auditor) => {
                const checkPct = ((auditor.checkedCount / auditor.totalAssigned) * 100).toFixed(1);
                const faultPct = ((auditor.faultFound / auditor.checkedCount) * 100).toFixed(2);
                return (
                  <tr key={auditor.id}>
                    <td>
                      <div style={{ fontWeight: '600' }}>{auditor.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{auditor.role}</div>
                    </td>
                    <td>{auditor.totalAssigned}</td>
                    <td style={{ fontWeight: '600' }}>{auditor.checkedCount}</td>
                    <td><span className="badge badge-info">{checkPct}%</span></td>
                    <td style={{ color: '#f87171', fontWeight: '700' }}>{auditor.faultFound}</td>
                    <td><span className="badge badge-warning">{faultPct}%</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: Path Quality Audit Insight */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '16px', color: '#f1f5f9' }}>
          3. Path Quality Audit Insight (Locations & Vendors Breakdown)
        </h3>
        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Location / Vendor Path</th>
                <th>Order Checked Qty</th>
                <th>Order Fault Qty</th>
                <th>Order Fault %</th>
                <th>Service Checked Qty</th>
                <th>Service Fault Qty</th>
                <th>Service Fault %</th>
              </tr>
            </thead>
            <tbody>
              {PATH_AUDIT_INSIGHTS.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: '600', color: '#38bdf8' }}>{item.location}</td>
                  <td>{item.checkedOrderQty}</td>
                  <td style={{ color: item.faultOrderQty > 20 ? '#f87171' : '#f1f5f9', fontWeight: '600' }}>{item.faultOrderQty}</td>
                  <td>
                    <span className={`badge ${item.faultOrderPct > 5 ? 'badge-danger' : item.faultOrderPct > 3 ? 'badge-warning' : 'badge-success'}`}>
                      {item.faultOrderPct}%
                    </span>
                  </td>
                  <td>{item.checkedServiceQty}</td>
                  <td style={{ color: item.faultServiceQty > 30 ? '#f87171' : '#f1f5f9' }}>{item.faultServiceQty}</td>
                  <td>
                    <span className={`badge ${item.faultServicePct > 3 ? 'badge-danger' : 'badge-success'}`}>
                      {item.faultServicePct}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 4: Weekly Quality Audit Comparison */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '16px', color: '#f1f5f9' }}>
          4. Weekly Quality Audit Comparison Trend
        </h3>
        <div className="custom-table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Audit Period</th>
                <th>Fault of Order %</th>
                <th>Fault of Service %</th>
                <th>Trend Improvement</th>
              </tr>
            </thead>
            <tbody>
              {WEEKLY_QUALITY_COMPARISON.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: '700' }}>{row.week}</td>
                  <td style={{ color: row.faultOrderPct > 4 ? '#f87171' : '#34d399', fontWeight: '600' }}>{row.faultOrderPct}%</td>
                  <td style={{ color: row.faultServicePct > 2.5 ? '#fbbf24' : '#34d399', fontWeight: '600' }}>{row.faultServicePct}%</td>
                  <td>
                    <span className="badge badge-success">
                      ▼ Improved by {idx === 0 ? 'Base' : (WEEKLY_QUALITY_COMPARISON[idx-1].faultOrderPct - row.faultOrderPct).toFixed(1) + '%'}
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
