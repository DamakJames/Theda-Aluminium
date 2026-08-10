"use client";

import React from 'react';
import Link from 'next/link';

export default function ProjectsPage() {
  return (
    <>
      <main>

    
    <section className="projects-hero">
      <div className="container">
        <h1>Architectural Showcase</h1>
        <p>A curated gallery of recent residential and commercial buildings across Nigeria styled and protected by Pathfinder Paints & Waterproofing.</p>
      </div>
    </section>

    
    <div className="portfolio-wrapper">
      
      <div className="portfolio-filters">
        <button className="portfolio-filter-btn active" data-filter="all">All Projects</button>
        <button className="portfolio-filter-btn" data-filter="paints">Premium Paints</button>
        <button className="portfolio-filter-btn" data-filter="waterproofing">Waterproofing</button>
        <button className="portfolio-filter-btn" data-filter="stonecraft">Stone Craft & Finishes</button>
      </div>

      <div className="portfolio-grid" id="portfolio-grid">
        
        
        <div className="portfolio-card" data-cat="stonecraft">
          <div className="portfolio-img-container">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80" alt="Luxury Lekki Residence" />
            <span className="portfolio-category-badge">Stone Craft</span>
          </div>
          <div className="portfolio-content">
            <h4 className="portfolio-title">Luxury Lekki Residence</h4>
            <p className="portfolio-desc">Complete exterior envelope detailing using Pathfinder Classic Stone Craft Design, creating a weather-resistant limestone finish designed for coastal Lagos weather.</p>
            <div className="portfolio-meta-row">
              <span>Materials: <span className="portfolio-materials">Classic Stone Mix</span></span>
              <span>Lagos, 2026</span>
            </div>
          </div>
        </div>

        
        <div className="portfolio-card" data-cat="paints">
          <div className="portfolio-img-container">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80" alt="Ikeja Commercial Complex" />
            <span className="portfolio-category-badge">Paints</span>
          </div>
          <div className="portfolio-content">
            <h4 className="portfolio-title">Ikeja Commercial Complex</h4>
            <p className="portfolio-desc">High-occupancy corporate workspace layered with Weather Shield Exterior Paint to resist heavy UV sun exposure and rain degradation.</p>
            <div className="portfolio-meta-row">
              <span>Materials: <span className="portfolio-materials">Weather Shield 20L</span></span>
              <span>Lagos, 2025</span>
            </div>
          </div>
        </div>

        
        <div className="portfolio-card" data-cat="waterproofing">
          <div className="portfolio-img-container">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" alt="Victoria Island Hotel" />
            <span className="portfolio-category-badge">Waterproofing</span>
          </div>
          <div className="portfolio-content">
            <h4 className="portfolio-title">Victoria Island Hotel</h4>
            <p className="portfolio-desc">Deep basement and concrete rooftop moisture barrier injection using Hydroseal Super Lock to prevent rising dampness and concrete saltpeter corrosion.</p>
            <div className="portfolio-meta-row">
              <span>Materials: <span className="portfolio-materials">Hydroseal Super Lock</span></span>
              <span>Lagos, 2026</span>
            </div>
          </div>
        </div>

        
        <div className="portfolio-card" data-cat="stonecraft">
          <div className="portfolio-img-container">
            <img src="https://images.unsplash.com/photo-1548625361-16800b590897?auto=format&fit=crop&w=600&q=80" alt="Cathedral Stone Cladding" />
            <span className="portfolio-category-badge">Stone Craft</span>
          </div>
          <div className="portfolio-content">
            <h4 className="portfolio-title">Cathedral Cladding Project</h4>
            <p className="portfolio-desc">Bespoke wall design using Natural Travertino finishing techniques for high-ceiling durability, creating a premium marble texture.</p>
            <div className="portfolio-meta-row">
              <span>Materials: <span className="portfolio-materials">Travertino Finish</span></span>
              <span>Abuja, 2026</span>
            </div>
          </div>
        </div>

        
        <div className="portfolio-card" data-cat="paints">
          <div className="portfolio-img-container">
            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" alt="Banana Island Villa" />
            <span className="portfolio-category-badge">Paints</span>
          </div>
          <div className="portfolio-content">
            <h4 className="portfolio-title">Banana Island Villa</h4>
            <p className="portfolio-desc">Premium interior satin finishing utilizing Pathfinder Washable Luxury Silk Acrylic Paint, ensuring clean walls and satin glow aesthetics.</p>
            <div className="portfolio-meta-row">
              <span>Materials: <span className="portfolio-materials">Luxury Silk White</span></span>
              <span>Lagos, 2026</span>
            </div>
          </div>
        </div>

      </div>

    </div>

    
    <section className="slider-section">
      <div className="slider-container">
        <h2 className="slider-title">Breathtaking Transitions</h2>
        <p className="slider-subtitle">Drag the interactive slider below to witness a raw plastered concrete wall transformed into a luxury limestone Stone Craft facade.</p>
        
        <div className="before-after-box" id="slider-box">
          <div className="slider-label before-lbl">BEFORE (RAW CEMENT)</div>
          <div className="slider-label after-lbl">AFTER (PATHFINDER STONE CRAFT)</div>
          
          <div className="ba-img before"></div>
          <div className="ba-img after" id="after-image"></div>
          
          <div className="slider-handle" id="slider-handle">
            <div className="slider-btn">↔</div>
          </div>
        </div>
      </div>
    </section>
  
</main>
    </>
  );
}
