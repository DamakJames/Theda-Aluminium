"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '../../../utils/supabase/client';
import LoadingScreen from '../../../components/LoadingScreen';
import Link from 'next/link';

export default function ProfessionalsDirectory() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stateFilter, setStateFilter] = useState('');
  const [expertiseFilter, setExpertiseFilter] = useState('');

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data, error } = await supabase.from('professionals').select('*').eq('status', 'approved');
      if (!error && data) {
        setProfessionals(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  const filteredProfessionals = professionals.filter(p => {
    if (stateFilter && !p.state.toLowerCase().includes(stateFilter.toLowerCase())) return false;
    if (expertiseFilter && !p.expertise.toLowerCase().includes(expertiseFilter.toLowerCase())) return false;
    return true;
  });

  return (
    <main style={{ padding: '60px 20px', minHeight: '80vh', background: 'var(--gray-50)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h1 style={{ color: 'var(--deep-navy)', marginBottom: '10px' }}>Professionals Directory</h1>
            <p style={{ color: 'var(--gray-600)' }}>Find trusted painters and finishing experts for your project.</p>
          </div>
          <Link href="/services/professionals/signup" style={{ background: '#25D366', color: 'white', padding: '12px 24px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
            List Your Services
          </Link>
        </div>

        <div className="pro-filter-bar" style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            placeholder="Filter by State (e.g. Lagos)" 
            value={stateFilter} 
            onChange={(e) => setStateFilter(e.target.value)}
            style={{ padding: '12px', border: '1px solid var(--gray-300)', borderRadius: '4px', minWidth: '250px', flex: 1 }}
          />
          <input 
            type="text" 
            placeholder="Filter by Expertise (e.g. Painter, Waterproofing)" 
            value={expertiseFilter} 
            onChange={(e) => setExpertiseFilter(e.target.value)}
            style={{ padding: '12px', border: '1px solid var(--gray-300)', borderRadius: '4px', minWidth: '250px', flex: 1 }}
          />
        </div>

        {loading ? (
          <LoadingScreen text="Loading professionals..." />
        ) : filteredProfessionals.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
            {filteredProfessionals.map(pro => (
              <div key={pro.id} style={{ border: '1px solid var(--gray-200)', borderRadius: '8px', overflow: 'hidden', background: 'var(--white)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <div style={{ padding: '25px' }}>
                  <h3 style={{ margin: '0 0 10px 0', color: 'var(--deep-navy)' }}>{pro.name}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                    <span style={{ fontSize: '0.9rem', color: 'var(--gray-600)' }}><strong>Expertise:</strong> {pro.expertise}</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--gray-600)' }}><strong>Location:</strong> {pro.state}</span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--gray-600)' }}><strong>Starting Fee:</strong> ₦{Number(pro.fee).toLocaleString()}</span>
                  </div>
                  
                  {pro.description && (
                    <div style={{ marginBottom: '15px' }}>
                      <p style={{ fontSize: '0.9rem', color: 'var(--gray-700)', lineHeight: '1.5' }}>{pro.description}</p>
                    </div>
                  )}
                  
                  {pro.job_samples && pro.job_samples.length > 0 && (
                    <div style={{ marginTop: '15px', borderTop: '1px solid var(--gray-100)', paddingTop: '15px' }}>
                      <p style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '10px' }}>Job Samples:</p>
                      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                        {pro.job_samples.map((img, idx) => (
                          <img key={idx} src={img} alt="Sample" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--gray-200)' }} />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {pro.whatsapp && (
                      <a 
                        href={`https://wa.me/${pro.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi, I found your profile on Pathfinder Paints and would like to discuss a job.`)}`} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ display: 'block', textAlign: 'center', background: '#25D366', color: 'white', padding: '10px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}
                      >
                        Contact on WhatsApp
                      </a>
                    )}
                    {pro.phone && (
                      <a 
                        href={`tel:${pro.phone}`} 
                        style={{ display: 'block', textAlign: 'center', background: 'var(--deep-navy)', color: 'white', padding: '10px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}
                      >
                        Call Professional
                      </a>
                    )}
                    {pro.email && (
                      <a 
                        href={`mailto:${pro.email}`} 
                        style={{ display: 'block', textAlign: 'center', background: 'var(--gray-200)', color: 'var(--deep-navy)', padding: '10px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}
                      >
                        Email Professional
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
            <p style={{ color: 'var(--gray-500)', fontSize: '1.1rem' }}>No approved professionals found matching your filters.</p>
          </div>
        )}
      </div>
    </main>
  );
}
