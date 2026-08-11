import React from 'react';
import Link from 'next/link';
import { testimonials } from '@/data/testimonials';
import { projects } from '@/data/projects';
import HeroSlider from '@/components/HeroSlider';

export default function HomePage() {
  return (
    <main>
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Trust Badges Strip */}
      <div className="container">
        <div className="trust-strip">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <div className="trust-title">QUALITY MATERIALS</div>
              <div className="trust-desc">Premium & Durable</div>
            </div>
            
            <div className="trust-item">
              <div className="trust-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="trust-title">EXPERT TEAM</div>
              <div className="trust-desc">Skilled & Experienced</div>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <div className="trust-title">RELIABLE SERVICE</div>
              <div className="trust-desc">On Time, Every Time</div>
            </div>

            <div className="trust-item">
              <div className="trust-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </div>
              <div className="trust-title">CUSTOMER SATISFACTION</div>
              <div className="trust-desc">Our Top Priority</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. About Section */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="about-grid">
            <div>
              <span className="section-tag">About THEDA</span>
              <h2 className="section-title">Building Strong Roofs Since 2015</h2>
              <p className="about-text">
                THEDA Aluminium Ltd is one of Nigeria&apos;s trusted roofing and construction companies, incorporated in 2015 and operating from modern facilities in Kaduna with a representative office in Abuja.
              </p>
              <p className="about-text">
                We specialize in supplying premium roofing materials and delivering complete roofing solutions—from design and fabrication to installation and maintenance.
              </p>
              
              <div className="stats-grid">
                <div className="stat-item">
                  <h3>10+</h3>
                  <p>Years of Experience</p>
                </div>
                <div className="stat-item">
                  <h3>500+</h3>
                  <p>Projects Completed</p>
                </div>
                <div className="stat-item">
                  <h3>100%</h3>
                  <p>Customer Satisfaction</p>
                </div>
                <div className="stat-item">
                  <h3><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></h3>
                  <p>Nationwide Service</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <img 
                src="/image/theda-aluminium-factory-exterior.jpg" 
                alt="THEDA Aluminium factory" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Grid */}
      <section className="services-section" id="services">
        <div className="container">
          <span className="section-tag" style={{ justifyContent: 'center', display: 'flex' }}>OUR SERVICES</span>
          <h2 className="section-title">Complete Roofing & Construction Solutions</h2>
          
          <div className="services-grid">
            
            <div className="service-card">
              <div className="service-icon">
                {/* Roof icon */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 22L12 2l10 20"></path>
                  <path d="M12 22V12"></path>
                  <path d="M6 14h12"></path>
                </svg>
              </div>
              <h3 className="service-title">Aluminium & Steel Sheets</h3>
              <p className="service-desc">Premium quality roofing sheets in various designs, colours and gauges. Engineered for durability and weather resistance.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 22L12 4l9 18"></path>
                  <path d="M8 14h8"></path>
                  <path d="M10 18h4"></path>
                  <path d="M12 4v18"></path>
                </svg>
              </div>
              <h3 className="service-title">Steel Roof Structures</h3>
              <p className="service-desc">Durable and high-strength structural steel roofing systems for residential, commercial and industrial projects.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22L12 6l8 16"></path>
                  <path d="M12 6v16"></path>
                  <path d="M7 16h10"></path>
                  <path d="M9 11h6"></path>
                </svg>
              </div>
              <h3 className="service-title">Wooden Roof Structures</h3>
              <p className="service-desc">Expertly crafted timber roof trusses designed for maximum stability and long-lasting durability.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
              </div>
              <h3 className="service-title">Roof Maintenance</h3>
              <p className="service-desc">Professional roof inspection, leak repairs, preventive maintenance, and complete restoration services.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                  <path d="M9 22v-4h6v4"></path>
                  <path d="M8 6h.01"></path>
                  <path d="M16 6h.01"></path>
                  <path d="M12 6h.01"></path>
                  <path d="M12 10h.01"></path>
                  <path d="M12 14h.01"></path>
                  <path d="M16 10h.01"></path>
                  <path d="M16 14h.01"></path>
                  <path d="M8 10h.01"></path>
                  <path d="M8 14h.01"></path>
                </svg>
              </div>
              <h3 className="service-title">Facility Management</h3>
              <p className="service-desc">Comprehensive maintenance solutions for residential estates, commercial buildings, schools, and offices.</p>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 className="service-title">General Contractor</h3>
              <p className="service-desc">End-to-end construction and project management services delivered with professionalism and efficiency.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Projects Section */}
      <section className="projects-section" id="projects">
        <div className="container">
          <div className="projects-header">
            <div>
              <span className="section-tag">OUR PROJECTS</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Some Of Our Recent Projects</h2>
            </div>
            <Link href="#projects" className="btn btn-outline" style={{ padding: '10px 20px' }}>
              VIEW ALL PROJECTS <span style={{ marginLeft: '8px' }}>→</span>
            </Link>
          </div>

          <div className="projects-grid">
            
            <div className="project-card">
              <div className="project-img-wrap">
                <img src="/image/residential-red-roof-installation.jpg" alt="Residential Roofing" />
              </div>
              <div className="project-info">
                <h4 className="project-title">Residential Roofing</h4>
                <p className="project-category">Step-Tile Aluminium Sheets</p>
              </div>
            </div>

            <div className="project-card">
              <div className="project-img-wrap">
                <img src="/image/large-hall-steel-truss-roof-3.jpg" alt="Commercial Building" />
              </div>
              <div className="project-info">
                <h4 className="project-title">Commercial Building</h4>
                <p className="project-category">Structural Steel Roofing</p>
              </div>
            </div>

            <div className="project-card">
              <div className="project-img-wrap">
                <img src="/image/throne-room-kafanchan-project.jpg" alt="Church Project" />
              </div>
              <div className="project-info">
                <h4 className="project-title">Church Project</h4>
                <p className="project-category">Long-Span Aluminium</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Recent Projects Gallery */}
      <section className="projects-section" id="projects" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-tag" style={{ justifyContent: 'center', display: 'flex' }}>OUR WORK</span>
            <h2 className="section-title">Recent Projects</h2>
          </div>
          
          <div className="projects-grid" style={{ display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {projects.slice(0, 3).map((project) => (
              <div key={project.id} className="project-card" style={{ background: 'white', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <div className="project-img-wrap" style={{ height: '240px', overflow: 'hidden' }}>
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }} 
                  />
                </div>
                <div className="project-info" style={{ padding: '20px' }}>
                  <h4 className="project-title" style={{ fontSize: '1.25rem', color: 'var(--gray-900)', marginBottom: '8px' }}>{project.title}</h4>
                  <p className="project-category" style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>{project.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/projects" className="btn btn-outline">
              VIEW ALL PROJECTS
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="testimonials-section" id="testimonials" style={{ padding: '80px 0', background: 'var(--gray-50)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-tag" style={{ justifyContent: 'center', display: 'flex' }}>CLIENT FEEDBACK</span>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} style={{ background: 'white', padding: '30px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', gap: '5px', marginBottom: '15px', color: '#fbbf24' }}>
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  ))}
                </div>
                <p style={{ color: 'var(--gray-600)', fontStyle: 'italic', marginBottom: '20px', lineHeight: '1.6' }}>&quot;{testimonial.content}&quot;</p>
                <div>
                  <h4 style={{ color: 'var(--gray-900)', fontWeight: '600', marginBottom: '2px' }}>{testimonial.client_name}</h4>
                  <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact CTA Banner */}
      <section className="cta-section" id="contact">
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', marginBottom: '24px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <h2 className="cta-title">Ready to Start Your Project? Let&apos;s Build Something Great Together!</h2>
          <p className="cta-desc">
            Partner with one of Nigeria&apos;s trusted roofing specialists for quality materials, expert installation, and reliable project delivery. Contact us today for a free consultation and quote.
          </p>
          <Link href="/contact" className="btn btn-white">
            GET A FREE QUOTE
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </section>

    </main>
  );
}
