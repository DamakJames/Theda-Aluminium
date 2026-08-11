"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
    title: 'Building Strong Roofs.\nDelivering Excellence.',
    desc: 'Top-quality roofing sheets, roof structures and maintenance services for residential, commercial, and industrial projects across Nigeria.',
  },
  {
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1920&q=85',
    title: 'Expert Structural\nSteel Roofing.',
    desc: 'Unmatched durability for warehouses, factories, and massive commercial facilities built to stand the test of time.',
  },
  {
    image: 'https://images.unsplash.com/photo-1605276374104-a628b0969f6e?auto=format&fit=crop&w=1920&q=85',
    title: 'Premium Aluminium\nStep-Tile & Metcopo.',
    desc: 'Aesthetic appeal meets extreme weather resistance. Transform your home with our elegant roofing designs.',
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `linear-gradient(135deg, rgba(10, 61, 145, 0.85) 0%, rgba(10, 61, 145, 0.6) 100%), url('${slide.image}')` }}
        >
        </div>
      ))}
      
      <div className="container hero-content" style={{ position: 'relative', zIndex: 10 }}>
        <span className="hero-subtitle-badge">PREMIUM ROOFING & CONSTRUCTION SOLUTIONS</span>
        <h1 className="hero-title" style={{ whiteSpace: 'pre-line' }}>
          {slides[currentSlide].title}
        </h1>
        <p className="hero-desc">
          {slides[currentSlide].desc}
        </p>
        <div className="hero-buttons">
          <Link href="#contact" className="btn btn-primary">
            GET A FREE QUOTE
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginLeft: '8px' }}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
          <Link href="#projects" className="btn btn-outline-white">
            VIEW OUR PROJECTS
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '8px' }}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
      
      <div className="hero-indicators">
        {slides.map((_, index) => (
          <button 
            key={index} 
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
