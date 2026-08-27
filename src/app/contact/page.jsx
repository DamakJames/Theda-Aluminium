'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      
      if (res.ok) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', service: '', message: '' }); // reset form
      } else {
        setStatus({ loading: false, success: false, error: data.error || 'Failed to send message.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Network error. Please try again later.' });
    }
  };
  return (
    <main>
      <section className="hero-section inner-header" style={{ backgroundImage: 'linear-gradient(135deg, rgba(10, 61, 145, 0.85) 0%, rgba(10, 61, 145, 0.7) 100%), url(https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container hero-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 className="hero-title" style={{ color: 'var(--white)' }}>Contact Us</h1>
          <p className="hero-desc" style={{ color: 'rgba(255,255,255,0.8)' }}>Get in touch for free quotes, consultations, or any inquiries.</p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div className="contact-grid">
            
            {/* Contact Information & Locations */}
            <div>
              <h2 className="section-title">We&apos;d love to hear from you</h2>
              <p className="about-text" style={{ marginBottom: '40px' }}>
                Whether you need premium aluminium roofing sheets, a complete structural steel roof, or facility maintenance, our team of experts is ready to assist you.
              </p>

              <div style={{ display: 'grid', gap: '30px' }}>
                {/* Office 1 */}
                <div style={{ background: 'var(--gray-50)', padding: '30px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-blue)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--gray-900)' }}>Kaduna Head Office & Factory</h3>
                  <p style={{ color: 'var(--gray-600)', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    No. 18-19 PAN Drive, Opposite Finetex, Kakuri Industrial Layout, Kaduna.
                  </p>
                </div>

                {/* Office 2 */}
                <div style={{ background: 'var(--gray-50)', padding: '30px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-blue)' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--gray-900)' }}>Abuja Representative Office</h3>
                  <p style={{ color: 'var(--gray-600)', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    Plot 12/14, Idu Industrial Area, Abuja.
                  </p>
                </div>

                {/* Direct Contact */}
                <div style={{ padding: '20px 0' }}>
                  <p style={{ fontSize: '1.1rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    08033116873, 09019969999
                  </p>
                  <p style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    thedaaluminiumltd@gmail.com
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: 'var(--white)', padding: '40px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', color: 'var(--gray-900)' }}>Send us a message</h3>
              
              <form style={{ display: 'grid', gap: '20px' }} onSubmit={handleSubmit}>
                {status.success && (
                  <div style={{ background: '#dcfce7', color: '#166534', padding: '15px', borderRadius: 'var(--radius-sm)' }}>
                    Message sent successfully! We will get back to you shortly.
                  </div>
                )}
                {status.error && (
                  <div style={{ background: '#fee2e2', color: '#991b1b', padding: '15px', borderRadius: 'var(--radius-sm)' }}>
                    {status.error}
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--gray-700)' }}>Full Name</label>
                  <input type="text" id="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gray-300)', outline: 'none' }} />
                </div>
                
                <div>
                  <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--gray-700)' }}>Email Address</label>
                  <input type="email" id="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gray-300)', outline: 'none' }} />
                </div>

                <div>
                  <label htmlFor="service" style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--gray-700)' }}>Service Required</label>
                  <select id="service" value={formData.service} onChange={handleChange} style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gray-300)', outline: 'none', background: 'white' }}>
                    <option value="">Select a service...</option>
                    <option value="roofing-sheets">Aluminium / Steel Roofing Sheets</option>
                    <option value="steel-structure">Steel Roof Structure</option>
                    <option value="wooden-structure">Wooden Roof Structure</option>
                    <option value="maintenance">Roof Maintenance</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'var(--gray-700)' }}>Message</label>
                  <textarea id="message" required value={formData.message} onChange={handleChange} rows="5" placeholder="Tell us about your project..." style={{ width: '100%', padding: '12px 15px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--gray-300)', outline: 'none', resize: 'vertical' }}></textarea>
                </div>

                <button type="submit" className="btn btn-primary" disabled={status.loading} style={{ width: '100%', padding: '14px', fontSize: '1rem', opacity: status.loading ? 0.7 : 1 }}>
                  {status.loading ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
