import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Roofing Services | THEDA Aluminium Ltd",
  description: "Explore our comprehensive roofing services including aluminium sheets, structural steel design, and facility maintenance.",
  keywords: ["roofing services Nigeria", "roof installation Kaduna", "structural steel design", "roof maintenance Abuja", "industrial roofing services", "residential roofers Nigeria"],
};

export default function ServicesPage() {
  return (
    <main>
      <section className="hero-section inner-header" style={{ backgroundImage: 'linear-gradient(135deg, rgba(10, 61, 145, 0.85) 0%, rgba(10, 61, 145, 0.7) 100%), url(https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container hero-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 className="hero-title" style={{ color: 'var(--white)' }}>Our Services</h1>
          <p className="hero-desc" style={{ color: 'rgba(255,255,255,0.9)' }}>Comprehensive roofing and structural solutions tailored to your needs.</p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto 60px auto', textAlign: 'center' }}>
            <h2 className="section-title">What We Do Best</h2>
            <p className="about-text">
              At THEDA Aluminium Ltd, we provide end-to-end solutions for residential, commercial, and industrial properties. Our expertise spans from manufacturing and supplying premium materials to the final installation and long-term maintenance.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '60px' }}>
            
            {/* Service 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
              <div>
                <img src="https://images.unsplash.com/photo-1516216628859-9bccecab13ca?auto=format&fit=crop&w=800&q=80" alt="Aluminium Sheets" style={{ borderRadius: 'var(--radius-lg)', width: '100%', height: '350px', objectFit: 'cover' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', color: 'var(--primary-blue)', marginBottom: '16px' }}>Aluminium & Steel Sheets</h3>
                <p className="about-text" style={{ marginBottom: '20px' }}>
                  We supply and install premium quality roofing sheets in various designs including Step-Tile, Long-Span, and Metcopo profiles. Available in a wide range of colors and gauges (thickness), our sheets are engineered for extreme durability, weather resistance, and thermal efficiency.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Step-Tile Design
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Long-Span Design
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Stone-Coated Roof Tiles
                  </li>
                </ul>
              </div>
            </div>

            {/* Service 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
              <div className="service-image">
                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80" alt="Steel Structures" style={{ borderRadius: 'var(--radius-lg)', width: '100%', height: '350px', objectFit: 'cover' }} />
              </div>
              <div style={{ order: 1 }}>
                <h3 style={{ fontSize: '2rem', color: 'var(--primary-blue)', marginBottom: '16px' }}>Steel & Wooden Roof Structures</h3>
                <p className="about-text" style={{ marginBottom: '20px' }}>
                  The integrity of a roof lies in its structural foundation. We specialize in the design, fabrication, and installation of highly durable steel structural roofing systems and expertly crafted wooden roof trusses. Whether it&apos;s a massive warehouse or a complex residential design, we engineer structures built to last generations.
                </p>
                <Link href="/contact" className="btn btn-outline" style={{ marginTop: '10px' }}>Request Structural Assessment</Link>
              </div>
            </div>

            {/* Service 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
              <div>
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80" alt="Roof Maintenance" style={{ borderRadius: 'var(--radius-lg)', width: '100%', height: '350px', objectFit: 'cover' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', color: 'var(--primary-blue)', marginBottom: '16px' }}>Maintenance & Facility Management</h3>
                <p className="about-text" style={{ marginBottom: '20px' }}>
                  A great roof requires care. We offer professional roof inspection, leak repairs, preventive maintenance, and complete roof restoration services. Beyond roofing, we provide comprehensive facility management solutions for residential estates, commercial buildings, schools, and offices to ensure your property remains in top condition.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Leak Detection & Repairs
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Complete Re-roofing
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Estate Facility Management
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Ready to start your roofing project?</h2>
          <p className="cta-desc">Get a detailed quotation for any of our services.</p>
          <Link href="/contact" className="btn btn-white">GET A FREE QUOTE</Link>
        </div>
      </section>
    </main>
  );
}
