import React from 'react';

export default function TrackOrderPage() {
  return (
    <div style={{ padding: '100px 20px', minHeight: '60vh', textAlign: 'center', background: 'var(--gray-50)' }}>
      <h1 style={{ color: 'var(--deep-navy)', marginBottom: '20px' }}>Track Order</h1>
      <p style={{ color: 'var(--gray-600)', maxWidth: '600px', margin: '0 auto' }}>Enter your order ID below to check the shipping status.</p>
      <input type="text" placeholder="Enter Order ID" style={{ padding: '10px', marginTop: '20px', borderRadius: '4px', border: '1px solid var(--gray-300)' }} />
      <button className="btn-primary" style={{ marginLeft: '10px', padding: '10px 20px' }}>Track</button>
    </div>
  );
}
