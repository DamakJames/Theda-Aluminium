import React from 'react';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';

export const metadata = {
  title: 'Blog & News | THEDA Aluminium Ltd',
  description: 'Read the latest industry news, roofing tips, and material guides from the experts at THEDA Aluminium Ltd.',
  keywords: ["roofing blog Nigeria", "aluminium roofing tips", "roof maintenance guide", "roofing materials comparison", "THEDA aluminium news"],
};

export default function BlogPage() {
  return (
    <main>
      <section className="hero-section inner-header" style={{ backgroundImage: 'linear-gradient(135deg, rgba(10, 61, 145, 0.85) 0%, rgba(10, 61, 145, 0.7) 100%), url(https://images.unsplash.com/photo-1437603568260-1950d3ca6eab?auto=format&fit=crop&w=1920&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container hero-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 className="hero-title" style={{ color: 'var(--white)' }}>Roofing Insights & News</h1>
          <p className="hero-desc" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Expert advice, industry trends, and practical guides to help you make the best roofing decisions.
          </p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {blogPosts.map((post) => (
              <div key={post.id} style={{ background: 'white', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)', marginBottom: '10px', display: 'block', fontWeight: '500' }}>
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--gray-900)', marginBottom: '15px', lineHeight: '1.4' }}>
                    {post.title}
                  </h3>
                  <p style={{ color: 'var(--gray-600)', marginBottom: '20px', lineHeight: '1.6', flexGrow: 1 }}>
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} className="btn btn-outline" style={{ display: 'inline-block', textAlign: 'center' }}>
                    READ ARTICLE
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
