import React from 'react';

export default function LoadingScreen({ text = "Loading..." }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '40px'
    }}>
      <div style={{
        width: '60px',
        height: '60px',
        marginBottom: '20px',
        animation: 'pulse 1.5s infinite ease-in-out'
      }}>
        <img src="/logo-icon.png" alt="Pathfinder Loading..." style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>
      <p style={{
        color: 'var(--deep-navy)',
        fontFamily: 'var(--font-heading)',
        fontSize: '1.1rem',
        fontWeight: '600',
        letterSpacing: '1px'
      }}>{text}</p>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
