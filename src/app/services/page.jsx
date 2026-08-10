"use client";

import React from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  return (
    <>
      <main>

    
    <section className="services-hero">
      <div className="container">
        <h1>Professional Finishing Services</h1>
        <p>From custom residential color consultations to high-volume trade partnerships, Pathfinder delivers premium expertise across Nigeria.</p>
        
        
        <div className="services-tabs-row">
          <button className="service-tab-btn active" data-target="services-list-tab">🛠️ Core Services</button>
          <button className="service-tab-btn" data-target="inspection-tab">📅 Site Inspection</button>
          <button className="service-tab-btn" data-target="contractor-tab">👷 Contractor Portal</button>
          <button className="service-tab-btn" data-target="distributor-tab">🏢 Distributor Portal</button>
          <button className="service-tab-btn" data-target="calculator-tab">🧮 Material Estimator</button>
        </div>
      </div>
    </section>

    
    <div className="services-main-content">
      
      
      <section className="service-section-block active" id="services-list-tab">
        <div className="portal-card-grid">
          
          <div className="service-detail-card">
            <div className="service-icon-wrap">🎨</div>
            <h4 className="service-title">Residential & Commercial Painting</h4>
            <p className="service-desc">State-of-the-art paint application by certified painters using premium Weather Shield and Luxury Silk finishes. Beautiful results, guaranteed longevity.</p>
          </div>

          <div className="service-detail-card">
            <div className="service-icon-wrap">💧</div>
            <h4 className="service-title">Advanced Waterproofing Solutions</h4>
            <p className="service-desc">Complete moisture diagnosis, damp walls injection, concrete roof overlays, and high-performance Hydroseal membrane installations for premium moisture barrier shielding.</p>
          </div>

          <div className="service-detail-card">
            <div className="service-icon-wrap">🪨</div>
            <h4 className="service-title">Classic Stone Craft Design</h4>
            <p className="service-desc">Exquisite natural stone wall installations, travertine effects, Old Stone textures, and bespoke architectural carvings that elevate home value and curb aesthetics.</p>
          </div>

          <div className="service-detail-card">
            <div className="service-icon-wrap">🌈</div>
            <h4 className="service-title">Color Consultations</h4>
            <p className="service-desc">Struggling to pick colors? Speak with our design team. We offer digital renders overlaying custom Pathfinder palettes on your building photos before you purchase.</p>
          </div>
          
        </div>
      </section>

      
      <section className="service-section-block" id="inspection-tab">
        <div className="portal-form-wrapper">
          <h3>Request a Site Inspection</h3>
          <p>Book an expert engineer to visit your construction site, conduct waterproofing tests, and estimate paint bucket quantities.</p>
          
          <form id="inspection-request-form">
            <div className="form-two-col">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" className="form-control" id="ins-name" placeholder="Adebayo Cole" required />
              </div>
              <div className="form-group">
                <label>Phone / WhatsApp</label>
                <input type="tel" className="form-control" id="ins-phone" placeholder="e.g. 08123456789" required />
              </div>
            </div>

            <div className="form-two-col">
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" className="form-control" id="ins-email" placeholder="example@mail.com" required />
              </div>
              <div className="form-group">
                <label>Preferred Date</label>
                <input type="date" className="form-control" id="ins-date" required />
              </div>
            </div>

            <div className="form-group">
              <label>Site Address</label>
              <input type="text" className="form-control" id="ins-address" placeholder="Plot 10, Lekki Phase 1, Lagos" required />
            </div>

            <div className="form-group">
              <label>Inquiry Details / Wall Conditions</label>
              <textarea className="form-control" id="ins-notes" rows="4" placeholder="Briefly describe the wall condition, square meters, dampness issues, or stone craft requirements..."></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{"width":"100%","marginTop":"10px"}}>SUBMIT INSPECTION REQUEST</button>
          </form>
        </div>
      </section>

      
      <section className="service-section-block" id="contractor-tab">
        <div className="portal-form-wrapper" style={{"maxWidth":"800px"}}>
          <h3>Pathfinder Certified Contractors Network</h3>
          <p>Are you a professional painter, finishing contractor, or project architect? Apply today to unlock exclusive trade discounts, project referrals, and certification courses.</p>
          
          <div style={{"background":"var(--gray-50)","padding":"20px","borderRadius":"var(--radius-sm)","marginBottom":"24px","borderLeft":"4px solid var(--primary-red)"}}>
            <ul style={{"display":"flex","flexDirection":"column","gap":"10px","fontSize":"0.9rem","color":"var(--gray-700)"}}>
              <li>🔥 <strong>15% Discount:</strong> Flat trade rate across all paint, putty, and equipment catalog items.</li>
              <li>🤝 <strong>Referrals:</strong> We connect certified contractors directly with residential build clients.</li>
              <li>🎓 <strong>Training Academy:</strong> Free access to advanced Stone Craft and waterproofing application classes.</li>
            </ul>
          </div>

          <form id="contractor-application-form">
            <div className="form-two-col">
              <div className="form-group">
                <label>Business Name / Registered Brand</label>
                <input type="text" className="form-control" id="con-brand" placeholder="Ade Finishing Ltd" required />
              </div>
              <div className="form-group">
                <label>Contact Person</label>
                <input type="text" className="form-control" id="con-person" placeholder="Adebayo Ade" required />
              </div>
            </div>

            <div className="form-two-col">
              <div className="form-group">
                <label>Phone / WhatsApp Number</label>
                <input type="tel" className="form-control" id="con-phone" placeholder="080 1234 5678" required />
              </div>
              <div className="form-group">
                <label>Years of Painting Experience</label>
                <input type="number" className="form-control" id="con-years" placeholder="e.g. 5" min="1" required />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{"width":"100%","marginTop":"10px"}}>SUBMIT APPLICATION</button>
          </form>
        </div>
      </section>

      
      <section className="service-section-block" id="distributor-tab">
        <div className="portal-form-wrapper" style={{"maxWidth":"800px"}}>
          <h3>Become a Authorized Pathfinder Distributor</h3>
          <p>Join our nationwide supply ecosystem. Distribute premium waterproofing solutions, decorative stone craft materials, and paints in your locality.</p>

          <div style={{"background":"var(--gray-50)","padding":"20px","borderRadius":"var(--radius-sm)","marginBottom":"24px","borderLeft":"4px solid var(--deep-navy)"}}>
            <ul style={{"display":"flex","flexDirection":"column","gap":"10px","fontSize":"0.9rem","color":"var(--gray-700)"}}>
              <li>📍 <strong>Territorial Protection:</strong> Exclusive distribution rights in your designated local government or state.</li>
              <li>📦 <strong>Volume Pricing:</strong> Highest profit margins with tiered wholesale volume rates.</li>
              <li>📣 <strong>Marketing Assets:</strong> Free store signs, flyers, color charts, and sample buckets.</li>
            </ul>
          </div>

          <form id="distributor-application-form">
            <div className="form-two-col">
              <div className="form-group">
                <label>Company Legal Name</label>
                <input type="text" className="form-control" id="dist-company" placeholder="Ecosystem Supplies Nigeria Ltd" required />
              </div>
              <div className="form-group">
                <label>Proposed Store Location / State</label>
                <input type="text" className="form-control" id="dist-location" placeholder="e.g. Benin City, Edo State" required />
              </div>
            </div>

            <div className="form-two-col">
              <div className="form-group">
                <label>WhatsApp Contact</label>
                <input type="tel" className="form-control" id="dist-phone" placeholder="09012345678" required />
              </div>
              <div className="form-group">
                <label>Estimated Monthly Volume (₦)</label>
                <select className="form-control" id="dist-volume">
                  <option>₦1M – ₦5M</option>
                  <option>₦5M – ₦15M</option>
                  <option>₦15M – ₦50M</option>
                  <option>Over ₦50M</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{"width":"100%","marginTop":"10px"}}>REGISTER INQUIRY</button>
          </form>
        </div>
      </section>

      
      <section className="service-section-block" id="calculator-tab">
        <div className="portal-form-wrapper" style={{"maxWidth":"600px"}}>
          <span style={{"color":"var(--primary-red)","fontSize":"0.7rem","fontWeight":"700","letterSpacing":"1px"}}>INTERACTIVE WIDGET</span>
          <h3>AI Paint & Putty Calculator</h3>
          <p style={{"marginBottom":"20px"}}>Calculate exact paint buckets (4L / 20L) and cementitious putty bags required based on wall area dimensions.</p>
          
          <form id="page-paint-calc-form">
            <div className="quote-form-group" style={{"marginBottom":"15px"}}>
              <label style={{"fontSize":"0.875rem","fontWeight":"600","color":"var(--gray-700)"}}>Total Surface / Wall Area (Square Meters m²)</label>
              <input type="number" id="page-calc-area" className="form-control" placeholder="e.g. 150" min="1" required />
            </div>
            
            <div className="quote-form-group" style={{"marginBottom":"15px"}}>
              <label style={{"fontSize":"0.875rem","fontWeight":"600","color":"var(--gray-700)"}}>Number of Coats</label>
              <select id="page-calc-coats" className="form-control">
                <option value="2">2 Coats (Standard Recommendation)</option>
                <option value="1">1 Coat (Repainting matching color)</option>
                <option value="3">3 Coats (Rough, brand new walls)</option>
              </select>
            </div>

            <div className="quote-form-group" style={{"marginBottom":"20px"}}>
              <label style={{"fontSize":"0.875rem","fontWeight":"600","color":"var(--gray-700)"}}>Surface Condition</label>
              <select id="page-calc-surface" className="form-control">
                <option value="smooth">Smooth Plastered Wall</option>
                <option value="rough">Rough / Unscreeded Block</option>
                <option value="damp">Damp / Wet Prone Wall (Requires Hydroseal)</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{"width":"100%"}}>RUN ESTIMATION</button>
          </form>

          <div id="page-calc-result-box" style={{"display":"none","marginTop":"24px","padding":"20px","borderRadius":"var(--radius-sm)","background":"var(--gray-50)","border":"1px dashed var(--gray-300)"}}></div>
        </div>
      </section>

    </div>
  
</main>
    </>
  );
}
