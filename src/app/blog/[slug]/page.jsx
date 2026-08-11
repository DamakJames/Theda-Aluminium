import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog';

// Generate static params so Next.js can pre-render these pages
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);
  
  if (!post) {
    return { title: 'Post Not Found | THEDA Aluminium Ltd' };
  }

  return {
    title: `${post.title} | THEDA Aluminium Ltd`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image_url],
    },
  };
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <article>
        {/* Post Hero */}
        <section style={{ padding: '80px 0 60px 0', background: 'var(--gray-800)', color: 'white' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Link href="/blog" style={{ color: 'var(--primary-blue)', display: 'inline-block', marginBottom: '20px', textDecoration: 'none', fontWeight: '500' }}>
              ← Back to Blog
            </Link>
            <h1 style={{ fontSize: '3rem', lineHeight: '1.2', marginBottom: '20px' }}>{post.title}</h1>
            <div style={{ display: 'flex', gap: '20px', color: 'var(--gray-400)', fontSize: '0.9rem' }}>
              <span>By {post.author}</span>
              <span>•</span>
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </section>

        {/* Post Image */}
        <div className="container" style={{ maxWidth: '1000px', margin: '-40px auto 40px auto', position: 'relative', zIndex: 10 }}>
          <img 
            src={post.image_url} 
            alt={post.title} 
            style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }} 
          />
        </div>

        {/* Post Content */}
        <section style={{ padding: '40px 0 80px 0' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Using dangerouslySetInnerHTML because we are trusting our local data source */}
            <div 
              className="blog-content" 
              dangerouslySetInnerHTML={{ __html: post.content }} 
              style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--gray-700)' }}
            />
          </div>
        </section>
      </article>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Need professional roofing advice?</h2>
          <p className="cta-desc">Our experts are available for free consultations.</p>
          <Link href="/contact" className="btn btn-white" style={{ marginTop: '20px' }}>CONTACT US TODAY</Link>
        </div>
      </section>
    </main>
  );
}
