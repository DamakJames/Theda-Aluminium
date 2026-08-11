"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="main-header">
        <div className="header-content">
          {/* Brand Logo */}
          <Link href="/" className="brand-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/thedalgo.svg" alt="THEDA Aluminium Ltd" style={{ height: '72px', width: 'auto' }} />
          </Link>

          {/* Main Navigation Bar */}
          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item"><Link href="/" className="nav-link">Home</Link></li>
              <li className="nav-item"><Link href="/about" className="nav-link">About Us</Link></li>
              <li className="nav-item"><Link href="/services" className="nav-link">Services</Link></li>
              <li className="nav-item"><Link href="/projects" className="nav-link">Projects</Link></li>
              <li className="nav-item"><Link href="/blog" className="nav-link">Blog</Link></li>
              <li className="nav-item"><Link href="/contact" className="nav-link">Contact Us</Link></li>
            </ul>
          </nav>

          {/* Header Actions & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="header-actions">
              <Link href="/contact" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.8rem' }}>
                GET A QUOTE
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '6px' }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-btn" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--primary-blue)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="mobile-nav" style={{ background: 'var(--white)', borderBottom: '1px solid var(--gray-200)', position: 'absolute', width: '100%', zIndex: 999, boxShadow: 'var(--shadow-md)' }}>
          <ul className="mobile-nav-list" style={{ listStyle: 'none', padding: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li><Link href="/" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: '600', color: 'var(--gray-700)', display: 'block' }}>Home</Link></li>
            <li><Link href="/about" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: '600', color: 'var(--gray-700)', display: 'block' }}>About Us</Link></li>
            <li><Link href="/services" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: '600', color: 'var(--gray-700)', display: 'block' }}>Services</Link></li>
            <li><Link href="/projects" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: '600', color: 'var(--gray-700)', display: 'block' }}>Projects</Link></li>
            <li><Link href="/blog" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: '600', color: 'var(--gray-700)', display: 'block' }}>Blog</Link></li>
            <li><Link href="/contact" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: '600', color: 'var(--gray-700)', display: 'block' }}>Contact Us</Link></li>
            <li style={{ marginTop: '8px' }}>
              <Link href="/contact" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }} onClick={() => setIsMenuOpen(false)}>
                GET A QUOTE
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
