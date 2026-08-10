"use client";

import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { fetchProducts } from '../../data/products';
import LoadingScreen from '../../components/LoadingScreen';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchProducts();
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  }, [category, products]);

  const handleCategoryClick = (cat) => {
    setCategory(cat);
  };

  const getCount = (cat) => {
    if (cat === 'all') return products.length;
    return products.filter(p => p.category === cat).length;
  };

  return (
    <main>
      <div className="shop-container">
        
        <aside className="shop-sidebar">
          <div className="sidebar-widget">
            <h3 className="widget-title">CATEGORIES</h3>
            <div className="category-list">
              {[
                { id: 'all', label: 'All Divisions' },
                { id: 'paints', label: 'Premium Paints' },
                { id: 'tools', label: 'Tools & Accessories' },
                { id: 'working', label: 'Working Materials' },
                { id: 'production', label: 'Production Materials' }
              ].map(cat => (
                <button 
                  key={cat.id}
                  className={`category-item-btn ${category === cat.id ? 'active' : ''}`} 
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="category-count">{getCount(cat.id)}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <section className="shop-content">
          <div className="shop-header-row">
            <div className="shop-title-col">
              <h1>Pathfinder Catalog</h1>
              <p>Showing {filteredProducts.length} {category === 'all' ? 'materials and products' : category}</p>
            </div>
          </div>

          <div className="shop-products-grid">
            {loading ? (
              <LoadingScreen text="Loading shop catalog..." />
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
