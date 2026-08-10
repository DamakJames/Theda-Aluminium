"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

export default function VisualizerPage() {
  const bgCanvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const containerRef = useRef(null);
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#2C3E50');
  const [brushSize, setBrushSize] = useState(30);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState('paint'); // 'paint' or 'erase'

  const pathfinderColors = [
    { name: 'Weather Shield Grey', hex: '#636e72' },
    { name: 'Luxury Silk White', hex: '#f5f6fa' },
    { name: 'Hydroseal Blue', hex: '#0984e3' },
    { name: 'Heritage Red', hex: '#d63031' },
    { name: 'Savanna Beige', hex: '#ffeaa7' },
    { name: 'Forest Green', hex: '#00b894' },
    { name: 'Midnight Navy', hex: '#2d3436' },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setupCanvases(img);
        setImageLoaded(true);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const setupCanvases = (img) => {
    const bgCanvas = bgCanvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    if (!bgCanvas || !overlayCanvas) return;

    // Calculate dimensions to fit in container (max width 800px)
    const maxWidth = 800;
    let width = img.width;
    let height = img.height;

    if (width > maxWidth) {
      height = Math.floor(height * (maxWidth / width));
      width = maxWidth;
    }

    bgCanvas.width = width;
    bgCanvas.height = height;
    overlayCanvas.width = width;
    overlayCanvas.height = height;

    const bgCtx = bgCanvas.getContext('2d');
    bgCtx.drawImage(img, 0, 0, width, height);

    // Clear overlay
    const overCtx = overlayCanvas.getContext('2d');
    overCtx.clearRect(0, 0, width, height);
  };

  const getCoordinates = (e) => {
    const canvas = overlayCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    // Check if it's a touch event
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    
    // Mouse event
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    if (!imageLoaded) return;
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = overlayCanvasRef.current.getContext('2d');
    ctx.beginPath();
  };

  const draw = (e) => {
    if (!isDrawing || !imageLoaded) return;
    e.preventDefault(); // Prevent scrolling on touch devices while drawing
    
    const ctx = overlayCanvasRef.current.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';

    if (mode === 'erase') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = selectedColor;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearOverlay = () => {
    const canvas = overlayCanvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <main>
      <div className="container" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "var(--deep-navy)", fontSize: "2.5rem", fontFamily: "var(--font-heading)" }}>Interactive Paint Visualizer</h1>
          <p style={{ color: "var(--text-color)", fontSize: "1.1rem", marginTop: "10px", maxWidth: '600px', margin: '10px auto' }}>
            Upload a photo of your house or room, select a Pathfinder colour, and paint the walls to see how it looks!
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "30px", alignItems: "center" }}>
          
          {/* Controls / Upload */}
          <div style={{ background: "#FFF", padding: "20px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", width: "100%", maxWidth: "800px" }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'inline-block', background: 'var(--deep-navy)', color: 'white', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Upload House Photo
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
              </div>
              
              {imageLoaded && (
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => setMode('paint')} 
                    style={{ padding: '8px 15px', background: mode === 'paint' ? '#25D366' : 'var(--gray-200)', color: mode === 'paint' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    🖌️ Paint
                  </button>
                  <button 
                    onClick={() => setMode('erase')} 
                    style={{ padding: '8px 15px', background: mode === 'erase' ? 'var(--primary-red)' : 'var(--gray-200)', color: mode === 'erase' ? 'white' : 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    🧽 Erase
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Brush Size:</span>
                    <input type="range" min="10" max="100" value={brushSize} onChange={(e) => setBrushSize(Number(e.target.value))} />
                  </div>
                  <button onClick={clearOverlay} style={{ padding: '8px 15px', background: 'var(--gray-200)', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Clear All</button>
                </div>
              )}
            </div>
          </div>

          {/* Canvas Area */}
          <div ref={containerRef} style={{ position: "relative", maxWidth: "800px", width: "100%", borderRadius: "12px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", background: "#eee", minHeight: imageLoaded ? 'auto' : '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            
            {!imageLoaded && (
              <p style={{ color: 'var(--gray-500)', fontWeight: 'bold' }}>Please upload an image to begin.</p>
            )}

            <canvas 
              ref={bgCanvasRef} 
              style={{ display: imageLoaded ? 'block' : 'none', width: '100%', height: 'auto' }}
            />
            
            <canvas 
              ref={overlayCanvasRef} 
              style={{ 
                display: imageLoaded ? 'block' : 'none', 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                mixBlendMode: 'multiply', // This makes it look like real paint with shadows!
                cursor: mode === 'erase' ? 'crosshair' : 'crosshair'
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>

          {/* Color Palette */}
          {imageLoaded && (
            <div style={{ background: "#FFF", padding: "20px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", width: "100%", maxWidth: "800px" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", marginBottom: "15px", color: "var(--deep-navy)" }}>Select a Pathfinder Colour</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                {pathfinderColors.map(color => (
                  <button
                    key={color.name}
                    onClick={() => { setSelectedColor(color.hex); setMode('paint'); }}
                    title={color.name}
                    style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      backgroundColor: color.hex,
                      border: selectedColor === color.hex && mode === 'paint' ? '3px solid var(--deep-navy)' : '3px solid transparent',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s ease'
                    }}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
