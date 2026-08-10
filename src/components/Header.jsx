"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <header className="main-header">
        <div className="header-content">
          {/* Brand Logo */}
          <Link href="/" className="brand-logo">
            <div className="logo-symbol" style={{ width: '48px', height: '48px', background: 'var(--primary-blue)', borderRadius: '8px', position: 'relative' }}>
              {/* Abstract roof symbol */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12L12 3l9 9"></path>
                <path d="M4 11v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9"></path>
              </svg>
            </div>
            <div className="logo-text">
              <div className="logo-title">THEDA</div>
              <div className="logo-subtitle">ALUMINIUM LTD</div>
            </div>
          </Link>

          {/* Main Navigation Bar */}
          <nav className="main-nav">
            <ul className="nav-list">
              <li className="nav-item"><Link href="/" className="nav-link">Home</Link></li>
              <li className="nav-item"><Link href="#about" className="nav-link">About Us</Link></li>
              <li className="nav-item"><Link href="#services" className="nav-link">Services</Link></li>
              <li className="nav-item"><Link href="#projects" className="nav-link">Projects</Link></li>
              <li className="nav-item"><Link href="#why-us" className="nav-link">Why Us</Link></li>
              <li className="nav-item"><Link href="#testimonials" className="nav-link">Testimonials</Link></li>
              <li className="nav-item"><Link href="/contact" className="nav-link">Contact Us</Link></li>
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <a href="#quote" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.8rem' }}>
              GET A QUOTE
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>

            <div className="hamburger-menu-wrapper" style={{ display: 'none' }}>
              {/* For mobile view we will handle it later with css but adding the skeleton */}
              <button className="hamburger-trigger" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Open Navigation Dropdown" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu simple implementation */}
      {isMenuOpen && (
        <div style={{ background: 'var(--white)', padding: '20px', borderBottom: '1px solid var(--gray-200)', position: 'absolute', width: '100%', zIndex: 999, boxShadow: 'var(--shadow-md)' }}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Link href="/" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: '600', color: 'var(--gray-700)' }}>Home</Link>
              <Link href="#about" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: '600', color: 'var(--gray-700)' }}>About Us</Link>
              <Link href="#services" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: '600', color: 'var(--gray-700)' }}>Services</Link>
              <Link href="#projects" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: '600', color: 'var(--gray-700)' }}>Projects</Link>
              <Link href="#why-us" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: '600', color: 'var(--gray-700)' }}>Why Us</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} style={{ fontWeight: '600', color: 'var(--gray-700)' }}>Contact Us</Link>
           </div>
        </div>
      )}
    </>
  );
}
