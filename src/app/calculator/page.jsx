"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function CalculatorPage() {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [doors, setDoors] = useState('');
  const [windows, setWindows] = useState('');
  
  const [result, setResult] = useState(null);

  const calculatePaint = (e) => {
    e.preventDefault();
    
    // Default standard measurements (in meters)
    const doorArea = 1.6; // average door is 1.6 sq meters
    const windowArea = 1.2; // average window is 1.2 sq meters
    const paintCoveragePerLitre = 10; // average paint covers 10 sq meters per litre per coat
    const coats = 2; // standard is 2 coats

    const L = parseFloat(length) || 0;
    const W = parseFloat(width) || 0;
    const H = parseFloat(height) || 0;
    const D = parseInt(doors) || 0;
    const Win = parseInt(windows) || 0;

    // Calculate total wall area (perimeter * height)
    const totalWallArea = (2 * (L + W)) * H;
    
    // Subtract exclusions
    const exclusions = (D * doorArea) + (Win * windowArea);
    let netArea = totalWallArea - exclusions;
    
    if (netArea < 0) netArea = 0;

    // Litres needed
    const totalCoverageNeeded = netArea * coats;
    const litresNeeded = totalCoverageNeeded / paintCoveragePerLitre;
    
    // Standard sizes
    const buckets20L = Math.floor(litresNeeded / 20);
    const remainder = litresNeeded % 20;
    const gallons4L = Math.ceil(remainder / 4);

    setResult({
      area: netArea.toFixed(1),
      litres: Math.ceil(litresNeeded),
      buckets20L,
      gallons4L
    });
  };

  return (
    <main className="calc-page">
      <div className="container" style={{ padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: 'var(--deep-navy)', fontSize: '2.5rem', marginBottom: '15px' }}>Paint Calculator</h1>
          <p style={{ color: 'var(--gray-600)' }}>Calculate exactly how much Pathfinder Paint you need for your project.</p>
        </div>

        <div style={{ background: 'var(--white)', padding: '40px', borderRadius: 'var(--radius-lg)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <form onSubmit={calculatePaint}>
            <h3 style={{ color: 'var(--deep-navy)', marginBottom: '20px' }}>Room Dimensions (Meters)</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--gray-700)', fontWeight: 'bold' }}>Room Length (m)</label>
                <input type="number" step="0.1" value={length} onChange={e => setLength(e.target.value)} required placeholder="e.g. 5" style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-sm)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--gray-700)', fontWeight: 'bold' }}>Room Width (m)</label>
                <input type="number" step="0.1" value={width} onChange={e => setWidth(e.target.value)} required placeholder="e.g. 4" style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-sm)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--gray-700)', fontWeight: 'bold' }}>Ceiling Height (m)</label>
                <input type="number" step="0.1" value={height} onChange={e => setHeight(e.target.value)} required placeholder="e.g. 3" style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-sm)' }} />
              </div>
            </div>

            <h3 style={{ color: 'var(--deep-navy)', marginBottom: '20px' }}>Exclusions</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--gray-700)', fontWeight: 'bold' }}>Number of Doors</label>
                <input type="number" value={doors} onChange={e => setDoors(e.target.value)} placeholder="0" style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-sm)' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--gray-700)', fontWeight: 'bold' }}>Number of Windows</label>
                <input type="number" value={windows} onChange={e => setWindows(e.target.value)} placeholder="0" style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-sm)' }} />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}>
              CALCULATE PAINT NEEDED
            </button>
          </form>

          {result && (
            <div style={{ marginTop: '40px', padding: '30px', background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', border: '2px dashed var(--primary-red)' }}>
              <h3 style={{ color: 'var(--deep-navy)', textAlign: 'center', marginBottom: '20px' }}>Estimation Results</h3>
              <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', flexWrap: 'wrap', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>{result.area}</div>
                  <div style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>Sq. Meters (Net)</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>{result.litres}</div>
                  <div style={{ color: 'var(--gray-600)', fontSize: '0.9rem' }}>Total Litres (2 Coats)</div>
                </div>
              </div>
              
              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>Recommended Purchase:</p>
                <div style={{ display: 'inline-block', textAlign: 'left' }}>
                  {result.buckets20L > 0 && <p>✓ <strong>{result.buckets20L}</strong> x 20L Bucket(s)</p>}
                  {result.gallons4L > 0 && <p>✓ <strong>{result.gallons4L}</strong> x 4L Gallon(s)</p>}
                </div>
                
                <div style={{ marginTop: '30px' }}>
                  <Link href="/shop" className="btn-primary" style={{ padding: '12px 24px', display: 'inline-block' }}>
                    Shop Recommended Paint
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
