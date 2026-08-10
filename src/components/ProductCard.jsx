"use client";

import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="product-card">
      <div className="product-badge">Top Seller</div>
      <div className="product-img-wrapper">
        <img src={product.image} alt={product.name} className="product-img" loading="lazy" />
        <div className="product-overlay">
          <button className="btn-action" onClick={() => toggleWishlist(product.id)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" style={{ color: isWishlisted ? "#E31E24" : "currentColor" }}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="product-info">
        <span className="product-category" style={{ textTransform: 'capitalize' }}>{product.category}</span>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-tagline" style={{ fontSize: '0.85rem', color: 'var(--text-color)', marginBottom: '8px', minHeight: '40px' }}>
          {product.tagline}
        </p>
        <div className="product-price">{product.formattedPrice || `₦${product.price.toLocaleString()}`}</div>
        <div className="product-rating">
          <span className="stars">{'★'.repeat(product.rating)}</span>
          <span className="reviews">({product.reviews})</span>
        </div>
        <button className="btn-primary btn-add-cart" style={{ width: '100%', marginTop: '15px' }} onClick={() => addToCart(product.id)}>
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
