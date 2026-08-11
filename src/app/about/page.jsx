import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "About Us | THEDA Aluminium Ltd",
  description: "Learn about THEDA Aluminium Ltd, our history since 2015, and our commitment to premium roofing solutions across Nigeria.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="hero-section" style={{ padding: '40px 0', minHeight: 'auto', backgroundImage: 'linear-gradient(135deg, rgba(10, 61, 145, 0.85) 0%, rgba(10, 61, 145, 0.7) 100%), url(https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container hero-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 className="hero-title">About THEDA Aluminium Ltd</h1>
          <p className="hero-desc">Building Strong Roofs Since 2015</p>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="about-grid" style={{ gap: '60px' }}>
            <div>
              <span className="section-tag">OUR STORY</span>
              <h2 className="section-title">A Decade of Excellence in Roofing</h2>
              <p className="about-text">
                THEDA Aluminium Ltd is one of Nigeria&apos;s most trusted roofing and construction companies. Incorporated in 2015, we operate from our modern, state-of-the-art facilities in Kaduna, with a representative office in Abuja, allowing us to serve clients nationwide.
              </p>
              <p className="about-text">
                Over the past decade, we have built a reputation for excellence, durability, and unmatched customer service. We specialize in supplying premium roofing materials—including step-tile, long-span, and metcopo aluminium sheets—and delivering complete roofing solutions, from design and structural fabrication (steel and wooden) to installation and long-term maintenance.
              </p>
              
              <div style={{ marginTop: '40px' }}>
                <h3 style={{ color: 'var(--primary-blue)', marginBottom: '15px' }}>Our Mission</h3>
                <p className="about-text">To provide high-quality, durable, and aesthetically pleasing roofing and construction solutions that protect investments and enhance the value of properties across Nigeria.</p>
              </div>

              <div style={{ marginTop: '30px' }}>
                <h3 style={{ color: 'var(--primary-blue)', marginBottom: '15px' }}>Our Vision</h3>
                <p className="about-text">To be the undisputed leader in the Nigerian roofing and structural construction industry, known for innovation, reliability, and absolute customer satisfaction.</p>
              </div>
            </div>
            
            <div className="about-image" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80" alt="Roof construction site" style={{ borderRadius: 'var(--radius-lg)', width: '100%', height: '300px', objectFit: 'cover' }} />
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" alt="Roofing materials" style={{ borderRadius: 'var(--radius-lg)', width: '100%', height: '300px', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ background: 'var(--gray-50)', padding: '60px 0' }}>
        <div className="container">
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            <div className="stat-item" style={{ background: 'var(--white)', padding: '30px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-blue)', marginBottom: '10px' }}>10+</h3>
              <p style={{ fontWeight: '600', color: 'var(--gray-600)' }}>Years of Experience</p>
            </div>
            <div className="stat-item" style={{ background: 'var(--white)', padding: '30px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-blue)', marginBottom: '10px' }}>500+</h3>
              <p style={{ fontWeight: '600', color: 'var(--gray-600)' }}>Projects Completed</p>
            </div>
            <div className="stat-item" style={{ background: 'var(--white)', padding: '30px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-blue)', marginBottom: '10px' }}>100%</h3>
              <p style={{ fontWeight: '600', color: 'var(--gray-600)' }}>Customer Satisfaction</p>
            </div>
            <div className="stat-item" style={{ background: 'var(--white)', padding: '30px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-blue)', marginBottom: '10px' }}>36</h3>
              <p style={{ fontWeight: '600', color: 'var(--gray-600)' }}>States Covered</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Want to work with us?</h2>
          <p className="cta-desc">Join hundreds of satisfied clients who trust THEDA Aluminium Ltd for their roofing needs.</p>
          <Link href="/contact" className="btn btn-white">GET IN TOUCH</Link>
        </div>
      </section>
    </main>
  );
}
