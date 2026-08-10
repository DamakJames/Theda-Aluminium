"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import { useRouter } from 'next/navigation';
import LoadingScreen from '../../components/LoadingScreen';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await createClient().auth.getSession();
      
      if (!session) {
        router.push('/auth/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkUser();
  }, [router]);

  if (loading) {
    return <LoadingScreen text="Loading secure dashboard..." />;
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div style={{ padding: '60px 20px', minHeight: '60vh', background: 'var(--gray-50)' }}>
      <div className="container">
        <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--deep-navy)', marginBottom: '30px' }}>
          My Dashboard
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '30px' }}>
          {/* Sidebar */}
          <div style={{ background: 'var(--white)', padding: '20px', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', height: 'max-content' }}>
            <p style={{ fontWeight: 'bold', borderBottom: '2px solid var(--gray-200)', paddingBottom: '10px', marginBottom: '20px' }}>
              Welcome back!
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--gray-600)', wordBreak: 'break-all' }}>{user.email}</p>
            
            <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="#" style={{ color: 'var(--primary-red)', fontWeight: 'bold' }}>My Orders</a>
              <a href="#" style={{ color: 'var(--gray-600)' }}>Contractor Discounts</a>
              <a href="#" style={{ color: 'var(--gray-600)' }}>Account Settings</a>
            </div>
          </div>
          
          {/* Main Content */}
          <div style={{ background: 'var(--white)', padding: '30px', borderRadius: 'var(--radius-md)', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--deep-navy)' }}>Recent Orders</h3>
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-500)', border: '1px dashed var(--gray-300)', borderRadius: 'var(--radius-sm)' }}>
              You don't have any recent orders. Head over to the <a href="/shop" style={{ color: 'var(--primary-red)' }}>Shop</a> to get started!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
