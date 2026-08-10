"use client";

import React, { useState } from 'react';
import { createClient } from '../../../../utils/supabase/client';
import imageCompression from 'browser-image-compression';
import { useRouter } from 'next/navigation';

export default function ProfessionalSignup() {
  const router = useRouter();
  const supabase = createClient();
  
  const [form, setForm] = useState({
    name: '',
    expertise: '',
    state: '',
    fee: 0,
    description: '',
    phone: '',
    whatsapp: '',
    email: '',
    files: []
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e) => {
    // limit to 3 images max
    if (e.target.files.length > 3) {
      alert("You can only upload up to 3 sample images.");
      return;
    }
    setForm({ ...form, files: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      let uploadedUrls = [];

      // Upload images
      if (form.files.length > 0) {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1024, useWebWorker: true };
        
        for (let i = 0; i < form.files.length; i++) {
          const file = form.files[i];
          const compressedFile = await imageCompression(file, options);
          
          const fileExt = file.name.split('.').pop();
          const fileName = `pro_${Date.now()}_${i}.${fileExt}`;
          
          const { error: uploadError } = await supabase.storage.from('professionals').upload(fileName, compressedFile);
          
          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage.from('professionals').getPublicUrl(fileName);
            uploadedUrls.push(publicUrl);
          }
        }
      }

      // Insert into professionals table
      const { error } = await supabase.from('professionals').insert([{
        name: form.name,
        expertise: form.expertise,
        state: form.state,
        fee: Number(form.fee),
        description: form.description,
        phone: form.phone,
        whatsapp: form.whatsapp,
        email: form.email,
        job_samples: uploadedUrls,
        status: 'pending'
      }]);

      if (error) throw error;
      
      setSuccess(true);
      setTimeout(() => {
        router.push('/services/professionals');
      }, 3000);

    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <main style={{ padding: '80px 20px', minHeight: '80vh', textAlign: 'center', background: 'var(--gray-50)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
          <h2 style={{ color: 'var(--deep-navy)' }}>Application Submitted!</h2>
          <p style={{ color: 'var(--gray-600)', marginTop: '10px' }}>Your profile has been submitted and is pending admin approval. You will be redirected shortly.</p>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: '60px 20px', minHeight: '80vh', background: 'var(--gray-50)' }}>
      <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: 'var(--deep-navy)', marginBottom: '10px' }}>Join the Professionals Network</h1>
          <p style={{ color: 'var(--gray-600)', marginBottom: '30px' }}>List your services, upload job samples, and get hired by Pathfinder clients in your area.</p>
          
          {errorMsg && (
            <div style={{ padding: '15px', background: '#ffebee', color: '#c62828', borderRadius: '4px', marginBottom: '20px' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>Full Name / Business Name</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. Adebayo Finishing Ltd" 
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} 
                style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-300)', borderRadius: '4px' }} 
              />
            </div>
            
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>Core Expertise</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. Painting, Screeding, Waterproofing" 
                value={form.expertise} 
                onChange={e => setForm({...form, expertise: e.target.value})} 
                style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-300)', borderRadius: '4px' }} 
              />
            </div>
            
            <div className="form-two-col" style={{ display: 'flex', gap: '20px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>Location (State)</label>
                <input 
                  required 
                  type="text" 
                  placeholder="e.g. Lagos" 
                  value={form.state} 
                  onChange={e => setForm({...form, state: e.target.value})} 
                  style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-300)', borderRadius: '4px' }} 
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>Starting Fee (₦)</label>
                <input 
                  required 
                  type="number" 
                  min="0"
                  placeholder="e.g. 50000" 
                  value={form.fee} 
                  onChange={e => setForm({...form, fee: e.target.value})} 
                  style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-300)', borderRadius: '4px' }} 
                />
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>Business Description</label>
              <textarea 
                required 
                placeholder="Tell clients about your experience, past projects, and why they should hire you..." 
                value={form.description} 
                onChange={e => setForm({...form, description: e.target.value})} 
                rows="4"
                style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-300)', borderRadius: '4px', fontFamily: 'inherit' }} 
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>Phone Number (for Calls)</label>
              <input 
                required 
                type="tel" 
                placeholder="e.g. 08012345678" 
                value={form.phone} 
                onChange={e => setForm({...form, phone: e.target.value})} 
                style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-300)', borderRadius: '4px' }} 
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>WhatsApp Number (for Messaging)</label>
              <input 
                required 
                type="tel" 
                placeholder="e.g. +2348012345678 (include country code)" 
                value={form.whatsapp} 
                onChange={e => setForm({...form, whatsapp: e.target.value})} 
                style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-300)', borderRadius: '4px' }} 
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>Email Address (Optional)</label>
              <input 
                type="email" 
                placeholder="e.g. hello@business.com" 
                value={form.email} 
                onChange={e => setForm({...form, email: e.target.value})} 
                style={{ width: '100%', padding: '12px', border: '1px solid var(--gray-300)', borderRadius: '4px' }} 
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '0.9rem' }}>Job Samples (Images)</label>
              <p style={{ margin: '0 0 10px 0', fontSize: '0.8rem', color: 'var(--gray-500)' }}>Upload up to 3 images showcasing your past work.</p>
              <input 
                type="file" 
                accept="image/*" 
                multiple
                onChange={handleFileChange} 
                style={{ width: '100%', padding: '10px', border: '1px dashed var(--gray-400)', borderRadius: '4px', background: 'var(--gray-50)' }} 
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              style={{ padding: '15px', background: '#25D366', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1rem', cursor: isSubmitting ? 'not-allowed' : 'pointer', marginTop: '10px' }}
            >
              {isSubmitting ? 'SUBMITTING APPLICATION...' : 'SUBMIT APPLICATION'}
            </button>
            
          </form>
        </div>
      </div>
    </main>
  );
}
