"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../utils/supabase/client';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'Product Orders & Pricing', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Save to Supabase (Admin Dash)
      await supabase.from('inquiries').insert([formData]);

      // 2. Fire Webhook (via Proxy API to avoid CORS)
      try {
        await fetch('/api/webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } catch (err) {
        console.error("Webhook proxy failed:", err);
      }

      alert("Inquiry submitted successfully!");
      setFormData({ name: '', email: '', phone: '', subject: 'Product Orders & Pricing', message: '' });
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main>

    <section className="contact-hero">
      <div className="container">
        <h1>Contact Pathfinder Paints</h1>
        <p>Have questions about paint application, bulk supply, or contracting? Reach out directly to our sales & support admins.</p>
      </div>
    </section>

    
    <section className="contact-wrapper">
      <div className="contact-grid">
        
        
        <div className="contact-info-card">
          <h3>Contact Information</h3>
          
          <div className="contact-info-item">
            <div className="contact-info-icon">📍</div>
            <div className="contact-info-text">
              <h4>Headquarters Address</h4>
              <p>Plot 12, Commercial Road, Ikeja Industrial Estate, Ikeja, Lagos State, Nigeria</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">📞</div>
            <div className="contact-info-text">
              <h4>Phone Contacts</h4>
              <p>
                Sales & Quotes: <a href="tel:+2348123456789">+234 812 345 6789</a><br />
                Technical Support: <a href="tel:+2349012345678">+234 901 234 5678</a>
              </p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon">✉️</div>
            <div className="contact-info-text">
              <h4>Email Inquiries</h4>
              <p>
                General: <a href="mailto:info@pathfinderpaints.com.ng">info@pathfinderpaints.com.ng</a><br />
                Admin Support: <a href="mailto:admin@pathfinderpaints.com.ng">admin@pathfinderpaints.com.ng</a>
              </p>
            </div>
          </div>



          
          <div className="map-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.603373730079!2d3.3371987!3d6.571431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9228fa2a3999%3A0xd7a44e6b51eb8a!2sIkeja%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
              width="100%" 
              height="100%" 
              style={{"border":"0"}} 
              allowFullScreen 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
              title="Pathfinder Paints Headquarters Map">
            </iframe>
          </div>
        </div>

        <div className="contact-form-card">
          <h3>Send Us A Message</h3>
          <form id="pathfinder-contact-form" autoComplete="on" onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label htmlFor="contact-name">Full Name</label>
              <input type="text" id="contact-name" name="name" className="form-control" placeholder="Enter your full name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email Address</label>
              <input type="email" id="contact-email" name="email" className="form-control" placeholder="example@mail.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>

            <div className="form-group">
              <label htmlFor="contact-phone">Phone Number</label>
              <input type="tel" id="contact-phone" name="phone" className="form-control" placeholder="e.g. +234 80 1234 5678" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
            </div>

            <div className="form-group">
              <label htmlFor="contact-subject">Inquiry Subject</label>
              <select id="contact-subject" name="subject" className="form-control" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                <option value="Product Orders & Pricing">Product Orders & Pricing</option>
                <option value="Contractor Partnership">Contractor Partnership</option>
                <option value="Distributor Inquiry">Distributor Inquiry</option>
                <option value="Site Inspection Request">Site Inspection Request</option>
                <option value="Feedback & Support">Feedback & Support</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message Details</label>
              <textarea id="contact-message" name="message" className="form-control" rows={5} placeholder="Write down your detailed requirements..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} required></textarea>
            </div>

            <button type="submit" className="btn-submit" id="submit-contact-btn" disabled={isSubmitting}>
              {isSubmitting ? 'SUBMITTING...' : 'SUBMIT INQUIRY'}
            </button>

          </form>
        </div>

      </div>
    </section>
  
</main>
    </>
  );
}
