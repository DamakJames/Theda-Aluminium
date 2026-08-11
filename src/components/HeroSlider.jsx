"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    image: '/image/theda-aluminium-roofing-team.jpg',
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
    image: '/image/large-hall-steel-truss-roof-1.jpg',
    eyebrow: 'STRUCTURAL ROOFING SOLUTIONS',
    title: 'Engineered for Strength.\nBuilt to Last.',
    desc: 'Heavy-duty steel roofing structures designed and installed for warehouses, factories and large-scale commercial projects.',
    trust: 'STRUCTURAL STEEL  •  FABRICATION  •  INSTALLATION',
    button1: 'EXPLORE STRUCTURAL SOLUTIONS →',
    button1Link: '#services',
    button2: null
  },
  {
    image: '/image/residential-stone-coated-roofing.jpg',
    eyebrow: 'PREMIUM ROOFING PRODUCTS',
    title: 'Roofing That Looks Good.\nPerformance That Lasts.',
    desc: 'Premium aluminium and steel roofing sheets available in modern profiles, colours and finishes.',
    trust: 'STEP-TILE  •  METCOPPO  •  LONGSPAN',
    button1: 'EXPLORE ROOFING PRODUCTS →',
    button1Link: '#services',
    button2: null
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
      </div>
      
      <div className="hero-indicators">
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
    </section>
  );
}
