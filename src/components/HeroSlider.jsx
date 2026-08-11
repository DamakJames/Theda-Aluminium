"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    image: '/image/theda-residential-roofing-installation.png',
    eyebrow: 'PREMIUM ROOFING & CONSTRUCTION SOLUTIONS',
    title: 'Building Strong Roofs.\nDelivering Excellence.',
    desc: 'Quality roofing materials, structural solutions and expert installation for residential, commercial and industrial projects across Nigeria.',
    trust: '✓ Quality Materials   ✓ Expert Installation   ✓ Nationwide Service',
    button1: 'GET A FREE QUOTE →',
    button1Link: '#contact',
    button2: 'VIEW OUR PROJECTS →',
    button2Link: '#projects'
  },
  {
    image: '/image/theda-structural-steel-installation.png',
    eyebrow: 'STRUCTURAL ROOFING SOLUTIONS',
    title: 'Engineered for Strength.\nBuilt to Last.',
    desc: 'Heavy-duty steel roofing structures designed and installed for warehouses, factories and large-scale commercial projects.',
    trust: 'STRUCTURAL STEEL  •  FABRICATION  •  INSTALLATION',
    button1: 'EXPLORE STRUCTURAL SOLUTIONS →',
    button1Link: '#services',
    button2: 'GET A QUOTE →',
    button2Link: '#contact'
  },
  {
    image: '/image/theda-industrial-roofing-engineers.png',
    eyebrow: 'PREMIUM ROOFING PRODUCTS',
    title: 'Roofing That\nLooks Good.\nPerformance\nThat Lasts.',
    desc: 'Premium aluminium and steel roofing sheets available in modern profiles, colours and finishes.',
    trust: 'STEP-TILE  •  METCOPO  •  LONGSPAN',
    button1: 'VIEW PRODUCTS CATALOG →',
    button1Link: '#products',
    button2: 'CONTACT SALES →',
    button2Link: '#contact'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500); // Change slide every 6.5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section">
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url('${slide.image}')` }}
        >
        </div>
      ))}
      
      <div className="hero-overlay"></div>
      
      <div className="container hero-content" style={{ position: 'relative', zIndex: 10 }}>
        <span className="hero-subtitle-badge">{slides[currentSlide].eyebrow}</span>
        <h1 className="hero-title" style={{ whiteSpace: 'pre-line' }}>
          {slides[currentSlide].title}
        </h1>
        <p className="hero-desc">
          {slides[currentSlide].desc}
        </p>
        <div className="hero-buttons" style={{ marginBottom: '30px' }}>
          <Link href={slides[currentSlide].button1Link} className="btn btn-primary">
            {slides[currentSlide].button1}
          </Link>
          {slides[currentSlide].button2 && (
            <Link href={slides[currentSlide].button2Link} className="btn btn-outline-white">
              {slides[currentSlide].button2}
            </Link>
          )}
        </div>
        <div className="hero-trust-line">
          {slides[currentSlide].trust}
        </div>
        <div className="hero-indicators" style={{ marginTop: '40px', display: 'flex', gap: '15px', alignItems: 'center' }}>
          {slides.map((_, index) => (
            <button 
              key={index} 
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              {String(index + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
