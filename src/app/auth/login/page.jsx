"use client";

import React, { useState } from 'react';
import { createClient } from '../../../utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  
  const supabase = createClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };
  
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    
    if (error) {
      setError(error.message);
    } else {
      setError('Check your email for the confirmation link.');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'var(--gray-50)' }}>
      <div className="contact-form-card" style={{ maxWidth: '450px', width: '100%' }}>
        <h3 style={{ textAlign: 'center', borderBottom: 'none', marginBottom: '10px' }}>Welcome Back</h3>
        <p style={{ textAlign: 'center', color: 'var(--gray-500)', fontSize: '0.9rem', marginBottom: '30px' }}>Sign in to Pathfinder Paints or create an account.</p>
        
        {error && (
          <div style={{ padding: '12px', background: '#fee2e2', color: '#b91c1c', borderRadius: '4px', marginBottom: '20px', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}
        
        <form>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              className="form-control" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              className="form-control" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
            <button 
              type="button" 
              className="btn-submit" 
              onClick={handleLogin}
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? 'WAIT...' : 'SIGN IN'}
            </button>
            <button 
              type="button" 
              className="btn-submit" 
              onClick={handleSignUp}
              disabled={loading}
              style={{ flex: 1, background: 'var(--deep-navy)' }}
            >
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
