"use client";

import React from 'react';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <>
      <main>

    
    <section className="blog-hero">
      <div className="container">
        <h1>Pathfinder finishing advice column</h1>
        <p>Expert painting guides, structural waterproofing advice, stone craft design tips, and emulsion raw materials guides.</p>
      </div>
    </section>

    
    <div className="blog-container">
      
      
      <section className="blog-posts-list" id="blog-posts-list">
        
      </section>

      
      <aside className="blog-sidebar">
        
        
        <div className="blog-sidebar-widget">
          <h3 className="widget-title">SEARCH BLOG</h3>
          <div className="sidebar-search-box">
            <input type="text" id="blog-search-input" placeholder="Search articles..." />
            <button id="blog-search-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>

        
        <div className="blog-sidebar-widget">
          <h3 className="widget-title">CATEGORIES</h3>
          <div className="blog-cats-list">
            <button className="blog-cat-btn active" data-cat="all">
              <span>All Articles</span>
            </button>
            <button className="blog-cat-btn" data-cat="Waterproofing">
              <span>Waterproofing & Dampness</span>
            </button>
            <button className="blog-cat-btn" data-cat="Painting Tips">
              <span>Painting & Finishing Guides</span>
            </button>
            <button className="blog-cat-btn" data-cat="Raw Materials">
              <span>Production Raw Materials</span>
            </button>
            <button className="blog-cat-btn" data-cat="Stone Craft">
              <span>Stone Craft Façade Design</span>
            </button>
          </div>
        </div>

        
        <div className="blog-sidebar-widget">
          <h3 className="widget-title">NEWSLETTER</h3>
          <p style={{"fontSize":"0.85rem","color":"var(--gray-500)","marginBottom":"12px","lineHeight":"1.4"}}>Get professional finishing advice columns and trade discount updates delivered directly to your inbox.</p>
          <form id="newsletter-subscribe-form" className="newsletter-form">
            <input type="email" id="news-email" className="form-control" placeholder="example@mail.com" required style={{"padding":"10px"}} />
            <button type="submit" className="btn btn-primary" style={{"fontSize":"0.85rem","padding":"10px 14px"}}>SUBSCRIBE NOW</button>
          </form>
        </div>

      </aside>

    </div>
  
</main>
    </>
  );
}
