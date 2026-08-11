"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    image: '/image/theda-residential-roofing-installation.png',
    title: 'Building Strong Roofs.\nDelivering Excellence.',
    desc: 'Premium roofing and structural solutions for projects across Nigeria.',
    button1: 'GET A FREE QUOTE →',
    button1Link: '#contact'
  },
  {
    image: '/image/theda-structural-steel-installation.png',
    title: 'Engineered for Strength.\nBuilt to Last.',
    desc: 'Heavy-duty steel structures for large-scale commercial and industrial projects.',
    button1: 'EXPLORE STRUCTURAL SOLUTIONS →',
    button1Link: '#services'
  },
  {
    image: '/image/theda-industrial-roofing-engineers.png',
    title: 'Roofing That\nLooks Good.\nPerformance\nThat Lasts.',
    desc: 'Premium aluminium and steel roofing sheets in modern profiles and finishes.',
    button1: 'VIEW PRODUCTS CATALOG →',
    button1Link: '#products'
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
        <h1 className="hero-title" style={{ whiteSpace: 'pre-line' }}>
          {slides[currentSlide].title}
        </h1>
        <p className="hero-desc">
          {slides[currentSlide].desc}
        </p>
        <div className="hero-buttons">
          <Link href={slides[currentSlide].button1Link} className="btn btn-primary">
            {slides[currentSlide].button1}
          </Link>
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
