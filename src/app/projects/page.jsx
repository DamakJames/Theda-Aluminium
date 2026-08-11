import React from 'react';
import Link from 'next/link';
import { projects } from '@/data/projects';

export default function ProjectsPage() {

  return (
    <main>
      <section className="hero-section" style={{ padding: '80px 0', minHeight: 'auto', background: 'var(--gray-800)' }}>
        <div className="container hero-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h1 className="hero-title" style={{ color: 'var(--white)' }}>Our Projects Gallery</h1>
          <p className="hero-desc" style={{ color: 'rgba(255,255,255,0.8)' }}>Take a look at some of the structures we&apos;ve proudly roofed across Nigeria.</p>
        </div>
      </section>

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          
          {/* Filtering could go here in a future update */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '50px', flexWrap: 'wrap' }}>
            <button className="btn" style={{ background: 'var(--primary-blue)', color: 'white', padding: '8px 20px', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>All Projects</button>
            <button className="btn" style={{ background: 'var(--gray-200)', color: 'var(--gray-700)', padding: '8px 20px', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Residential</button>
            <button className="btn" style={{ background: 'var(--gray-200)', color: 'var(--gray-700)', padding: '8px 20px', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Commercial</button>
            <button className="btn" style={{ background: 'var(--gray-200)', color: 'var(--gray-700)', padding: '8px 20px', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer' }}>Structural Steel</button>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-img-wrap">
                  <img src={project.image_url || project.image} alt={project.title} />
                </div>
                <div className="project-info">
                  <h4 className="project-title">{project.title}</h4>
                  <p className="project-category">{project.category}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">Want your project to be our next masterpiece?</h2>
          <Link href="/contact" className="btn btn-white" style={{ marginTop: '20px' }}>CONTACT US TODAY</Link>
        </div>
      </section>
    </main>
  );
}
