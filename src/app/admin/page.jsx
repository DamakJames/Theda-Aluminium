"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import { useRouter } from 'next/navigation';
import LoadingScreen from '../../components/LoadingScreen';
import imageCompression from 'browser-image-compression';

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Delivery Rates State
  const [deliveryRates, setDeliveryRates] = useState([]);
  const [ratesLoading, setRatesLoading] = useState(false);
  const [newRate, setNewRate] = useState({ state: '', fee: 0 });
  
  // Professionals State
  const [professionals, setProfessionals] = useState([]);
  const [professionalsLoading, setProfessionalsLoading] = useState(false);
  
  // Overview Stats
  const [stats, setStats] = useState({ totalOrders: 0, activeProducts: 0, pendingApprovals: 0 });
  const [statsLoading, setStatsLoading] = useState(false);

  // Products State
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [addForm, setAddForm] = useState({ name: '', category: 'interior', price: '', tagline: '', description: '', imageFile: null });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', category: 'interior', price: '', tagline: '', description: '', imageFile: null });
  
  // Users State
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  // Inquiries State
  const [inquiries, setInquiries] = useState([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);

  // Orders State
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    fetchUser();
  }, [router, supabase]);

  const loadStats = async () => {
    setStatsLoading(true);
    const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
    const { count: ordersCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
    const { count: pendingCount } = await supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending');
    
    setStats({
      totalOrders: ordersCount || 0,
      activeProducts: productsCount || 0,
      pendingApprovals: pendingCount || 0,
    });
    setStatsLoading(false);
  };

  const loadProducts = async () => {
    setProductsLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: true });
    if (!error && data) {
      setProducts(data);
    }
    setProductsLoading(false);
  };

  const loadOrders = async () => {
    setOrdersLoading(true);
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setOrders(data);
    }
    setOrdersLoading(false);
  };

  const loadUsers = async () => {
    setUsersLoading(true);
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setUsers(data);
    }
    setUsersLoading(false);
  };

  const loadInquiries = async () => {
    setInquiriesLoading(true);
    const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setInquiries(data);
    }
    setInquiriesLoading(false);
  };

  const loadDeliveryRates = async () => {
    setRatesLoading(true);
    const { data, error } = await supabase.from('delivery_fees').select('*').order('state', { ascending: true });
    if (!error && data) {
      setDeliveryRates(data);
    }
    setRatesLoading(false);
  };

  const loadProfessionals = async () => {
    setProfessionalsLoading(true);
    const { data, error } = await supabase.from('professionals').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setProfessionals(data);
    }
    setProfessionalsLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'overview') {
      loadStats();
    } else if (activeTab === 'products') {
      loadProducts();
    } else if (activeTab === 'orders') {
      loadOrders();
    } else if (activeTab === 'users') {
      loadUsers();
    } else if (activeTab === 'inquiries') {
      loadInquiries();
    } else if (activeTab === 'delivery') {
      loadDeliveryRates();
    } else if (activeTab === 'professionals') {
      loadProfessionals();
    }
  }, [activeTab]);

  // Product Actions
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert('Failed to delete product.');
      }
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setEditForm({ name: product.name, price: product.price, category: product.category, tagline: product.tagline, description: product.description, imageFile: null });
  };

  const handleSave = async (id) => {
    let updateData = { ...editForm };
    delete updateData.imageFile;

    if (editForm.imageFile) {
      let fileToUpload = editForm.imageFile;
      const fileExt = editForm.imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

      try {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
        fileToUpload = await imageCompression(editForm.imageFile, options);
      } catch (error) {
        console.warn('Image compression failed', error);
      }

      const { error: uploadError } = await supabase.storage.from('products').upload(fileName, fileToUpload);
      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);
        updateData.image = publicUrl;
      } else {
        alert('Image upload failed: ' + uploadError.message);
        return;
      }
    }

    const { error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id);
      
    if (!error) {
      setProducts(products.map(p => p.id === id ? { ...p, ...updateData } : p));
      setEditingId(null);
    } else {
      alert('Failed to update product.');
    }
  };

  const uploadImage = async (file) => {
      let fileToUpload = file;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      try {
        const options = { maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true };
        fileToUpload = await imageCompression(file, options);
      } catch (error) {
        console.warn('Image compression failed, using original file', error);
      }
      const { error: uploadError } = await supabase.storage.from('products').upload(fileName, fileToUpload);
      if (uploadError) {
        throw new Error('Image upload failed: ' + uploadError.message);
      }
      const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(fileName);
      return publicUrl;
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    let imageUrl = '/placeholder.jpg';
    if (addForm.imageFile) {
      try {
        imageUrl = await uploadImage(addForm.imageFile);
      } catch (error) {
        alert(error.message);
        return;
      }
    }

    const newProduct = { 
      name: addForm.name,
      price: Number(addForm.price),
      category: addForm.category,
      tagline: addForm.tagline,
      description: addForm.description,
      image: imageUrl
    };

    const { data, error } = await supabase.from('products').insert([newProduct]).select();

    if (!error && data) {
      setProducts([...products, data[0]]);
      setIsAddingProduct(false);
      setAddForm({ name: '', price: '', category: 'interior', tagline: '', description: '', imageFile: null });
    } else {
      alert('Failed to add product: ' + (error?.message || 'Unknown error'));
    }
  };

  // Order Actions
  const handleUpdateOrderStatus = async (id, newStatus) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    } else {
      alert('Failed to update order status.');
    }
  };

  // User Actions
  const handleUpdateUserRole = async (id, newRole) => {
    const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', id);
    if (!error) {
      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    } else {
      alert('Failed to update user role.');
    }
  };

  // Inquiry Actions
  const handleUpdateInquiryStatus = async (id, newStatus) => {
    const { error } = await supabase.from('inquiries').update({ status: newStatus }).eq('id', id);
    if (!error) {
      setInquiries(inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
    } else {
      alert('Failed to update inquiry status.');
    }
  };

  const handleAddDeliveryRate = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.from('delivery_fees').insert([{ state: newRate.state, fee: Number(newRate.fee) }]).select();
    if (!error && data) {
      setDeliveryRates([...deliveryRates, data[0]]);
      setNewRate({ state: '', fee: 0 });
    } else {
      alert('Failed to add rate.');
    }
  };

  const handleDeleteRate = async (id) => {
    if (confirm('Are you sure?')) {
      const { error } = await supabase.from('delivery_fees').delete().eq('id', id);
      if (!error) {
        setDeliveryRates(deliveryRates.filter(r => r.id !== id));
      }
    }
  };

  const handleUpdateProfessionalStatus = async (id, status) => {
    const { error } = await supabase.from('professionals').update({ status }).eq('id', id);
    if (!error) {
      setProfessionals(professionals.map(p => p.id === id ? { ...p, status } : p));
    }
  };

  const handleDeleteProfessional = async (id) => {
    if (confirm("Are you sure you want to delete this professional?")) {
      const { error } = await supabase.from('professionals').delete().eq('id', id);
      if (!error) {
        setProfessionals(professionals.filter(p => p.id !== id));
      }
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return <LoadingScreen text="Loading secure admin portal..." />;
  }

  if (!user) {
    return null;
  }

  return (
    <div style={{ padding: '60px 20px', minHeight: '60vh', background: 'var(--gray-50)', maxWidth: '100vw', overflowX: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary-red)' }}>
            Admin Portal
          </h2>
          <button onClick={handleSignOut} style={{ padding: '8px 16px', background: 'transparent', color: 'var(--gray-600)', border: '1px solid var(--gray-300)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 'bold' }}>
            Sign Out
          </button>
        </div>
        
        <div className="admin-layout">
          {/* Sidebar */}
          <div style={{ background: 'var(--deep-navy)', color: 'var(--white)', padding: '20px', borderRadius: 'var(--radius-md)', height: 'max-content' }}>
            <p style={{ fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px', marginBottom: '20px' }}>
              Management
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.9rem' }}>
              <button 
                onClick={() => setActiveTab('overview')}
                style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--white)', opacity: activeTab === 'overview' ? 1 : 0.7, fontWeight: activeTab === 'overview' ? 'bold' : 'normal', cursor: 'pointer' }}>
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('products')}
                style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--white)', opacity: activeTab === 'products' ? 1 : 0.7, fontWeight: activeTab === 'products' ? 'bold' : 'normal', cursor: 'pointer' }}>
                Products
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--white)', opacity: activeTab === 'orders' ? 1 : 0.7, fontWeight: activeTab === 'orders' ? 'bold' : 'normal', cursor: 'pointer' }}>
                Orders
              </button>
              <button 
                onClick={() => setActiveTab('users')}
                style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--white)', opacity: activeTab === 'users' ? 1 : 0.7, fontWeight: activeTab === 'users' ? 'bold' : 'normal', cursor: 'pointer' }}>
                Users
              </button>
              <button 
                onClick={() => setActiveTab('inquiries')}
                style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--white)', opacity: activeTab === 'inquiries' ? 1 : 0.7, fontWeight: activeTab === 'inquiries' ? 'bold' : 'normal', cursor: 'pointer' }}>
                Inquiries
              </button>
              <button 
                onClick={() => setActiveTab('delivery')}
                style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--white)', opacity: activeTab === 'delivery' ? 1 : 0.7, fontWeight: activeTab === 'delivery' ? 'bold' : 'normal', cursor: 'pointer' }}>
                Delivery Rates
              </button>
              <button 
                onClick={() => setActiveTab('professionals')}
                style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--white)', opacity: activeTab === 'professionals' ? 1 : 0.7, fontWeight: activeTab === 'professionals' ? 'bold' : 'normal', cursor: 'pointer' }}>
                Professionals
              </button>
            </div>
          </div>
          
          {/* Main Content */}
          <div>
            {activeTab === 'overview' && (
              <div>
                {statsLoading ? (
                  <LoadingScreen text="Loading statistics..." />
                ) : (
                  <div className="admin-stats-grid">
                    <div style={{ background: 'var(--white)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)' }}>
                      <h4 style={{ color: 'var(--gray-500)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Total Orders</h4>
                      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--deep-navy)' }}>{stats.totalOrders}</p>
                    </div>
                    <div style={{ background: 'var(--white)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)' }}>
                      <h4 style={{ color: 'var(--gray-500)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Active Products</h4>
                      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--deep-navy)' }}>{stats.activeProducts}</p>
                    </div>
                    <div style={{ background: 'var(--white)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)' }}>
                      <h4 style={{ color: 'var(--gray-500)', fontSize: '0.85rem', textTransform: 'uppercase' }}>Pending Approvals</h4>
                      <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-red)' }}>{stats.pendingApprovals}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'products' && (
              <div style={{ background: 'var(--white)', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ color: 'var(--deep-navy)' }}>Products Management</h3>
                  <button 
                    onClick={() => setIsAddingProduct(!isAddingProduct)}
                    style={{ padding: '8px 16px', background: isAddingProduct ? 'var(--gray-500)' : 'var(--primary-red)', color: 'white', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontWeight: 'bold' }}>
                    {isAddingProduct ? 'Cancel' : '+ Add New'}
                  </button>
                </div>

                {isAddingProduct && (
                  <form onSubmit={handleAddProduct} className="form-two-col" style={{ background: 'var(--gray-50)', padding: '20px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Name</label>
                      <input required value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid var(--gray-300)', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Category</label>
                      <select required value={addForm.category} onChange={e => setAddForm({...addForm, category: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid var(--gray-300)', borderRadius: '4px' }}>
                        <option value="interior">Interior</option>
                        <option value="exterior">Exterior</option>
                        <option value="specialty">Specialty</option>
                        <option value="tools">Tools</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Price (₦)</label>
                      <input required type="number" value={addForm.price} onChange={e => setAddForm({...addForm, price: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid var(--gray-300)', borderRadius: '4px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Tagline</label>
                      <input value={addForm.tagline} onChange={e => setAddForm({...addForm, tagline: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid var(--gray-300)', borderRadius: '4px' }} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Description</label>
                      <textarea value={addForm.description} onChange={e => setAddForm({...addForm, description: e.target.value})} rows="3" style={{ width: '100%', padding: '8px', border: '1px solid var(--gray-300)', borderRadius: '4px', fontFamily: 'inherit' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Image Upload</label>
                      <input required type="file" accept="image/*" onChange={e => setAddForm({...addForm, imageFile: e.target.files[0]})} style={{ width: '100%', padding: '6px', border: '1px solid var(--gray-300)', borderRadius: '4px' }} />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <button type="submit" style={{ padding: '10px 20px', background: '#25D366', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Save Product</button>
                    </div>
                  </form>
                )}

                {productsLoading ? (
                  <LoadingScreen text="Fetching products..." />
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ background: 'var(--gray-100)', textAlign: 'left', color: 'var(--gray-600)' }}>
                          <th style={{ padding: '12px' }}>Image</th>
                          <th style={{ padding: '12px' }}>Name</th>
                          <th style={{ padding: '12px' }}>Category</th>
                          <th style={{ padding: '12px' }}>Price (₦)</th>
                          <th style={{ padding: '12px' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map(product => (
                          <tr key={product.id} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                            <td style={{ padding: '12px' }}>
                              <img src={product.image || '/placeholder.jpg'} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginBottom: editingId === product.id ? '5px' : '0' }} />
                              {editingId === product.id && (
                                <div>
                                  <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={e => setEditForm({...editForm, imageFile: e.target.files[0]})} 
                                    style={{ width: '120px', fontSize: '10px' }} 
                                  />
                                </div>
                              )}
                            </td>
                            <td style={{ padding: '12px' }}>
                              {editingId === product.id ? (
                                <input 
                                  value={editForm.name} 
                                  onChange={e => setEditForm({...editForm, name: e.target.value})}
                                  style={{ padding: '6px', width: '100%' }}
                                />
                              ) : (
                                <strong>{product.name}</strong>
                              )}
                            </td>
                            <td style={{ padding: '12px', textTransform: 'capitalize' }}>
                              {editingId === product.id ? (
                                <select 
                                  value={editForm.category} 
                                  onChange={e => setEditForm({...editForm, category: e.target.value})}
                                  style={{ padding: '6px', width: '100%' }}>
                                  <option value="interior">Interior</option>
                                  <option value="exterior">Exterior</option>
                                  <option value="specialty">Specialty</option>
                                  <option value="tools">Tools</option>
                                </select>
                              ) : (
                                product.category
                              )}
                            </td>
                            <td style={{ padding: '12px' }}>
                              {editingId === product.id ? (
                                <input 
                                  type="number"
                                  value={editForm.price} 
                                  onChange={e => setEditForm({...editForm, price: Number(e.target.value)})}
                                  style={{ padding: '6px', width: '80px' }}
                                />
                              ) : (
                                product.price.toLocaleString()
                              )}
                            </td>
                            <td style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                              {editingId === product.id ? (
                                <>
                                  <button onClick={() => handleSave(product.id)} style={{ padding: '6px 12px', background: '#25D366', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Save</button>
                                  <button onClick={() => setEditingId(null)} style={{ padding: '6px 12px', background: 'var(--gray-200)', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                                </>
                              ) : (
                                <>
                                  <button onClick={() => handleEditClick(product)} style={{ padding: '6px 12px', background: 'var(--deep-navy)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                                  <button onClick={() => handleDelete(product.id)} style={{ padding: '6px 12px', background: 'var(--primary-red)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div style={{ background: 'var(--white)', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)' }}>
                <h3 style={{ color: 'var(--deep-navy)', marginBottom: '20px' }}>Orders Management</h3>
                
                {ordersLoading ? (
                  <LoadingScreen text="Fetching orders..." />
                ) : orders.length === 0 ? (
                  <p style={{ color: 'var(--gray-500)' }}>No orders found.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map(order => (
                      <div key={order.id} style={{ border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-sm)', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid var(--gray-100)', paddingBottom: '10px' }}>
                          <div>
                            <strong>Order #{order.id}</strong>
                            <span style={{ marginLeft: '15px', fontSize: '0.85rem', color: 'var(--gray-500)' }}>
                              {new Date(order.created_at).toLocaleString()}
                            </span>
                          </div>
                          <div>
                            <select 
                              value={order.status} 
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                              style={{ 
                                padding: '6px 12px', 
                                borderRadius: '20px', 
                                border: 'none', 
                                background: order.status === 'pending' ? '#FEF3C7' : order.status === 'processing' ? '#DBEAFE' : order.status === 'paid' ? '#D1FAE5' : order.status === 'declined' ? '#FEE2E2' : '#F3F4F6',
                                color: order.status === 'pending' ? '#D97706' : order.status === 'processing' ? '#1D4ED8' : order.status === 'paid' ? '#059669' : order.status === 'declined' ? '#DC2626' : '#4B5563',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                outline: 'none'
                              }}>
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="paid">Paid</option>
                              <option value="declined">Declined</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                        </div>
                        
                        <div style={{ fontSize: '0.9rem' }}>
                          <div style={{ background: 'var(--gray-50)', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>
                            <p style={{ margin: '0 0 5px 0' }}><strong>Customer:</strong> {order.customer_name || 'N/A'} ({order.customer_phone || 'N/A'})</p>
                            <p style={{ margin: 0 }}><strong>Address:</strong> {order.delivery_address || 'N/A'}, {order.delivery_state || 'N/A'}</p>
                          </div>
                          <table style={{ width: '100%', marginBottom: '10px' }}>
                            <tbody>
                              {order.items && order.items.map((item, idx) => (
                                <tr key={idx}>
                                  <td style={{ padding: '4px 0' }}>{item.quantity}x {item.name}</td>
                                  <td style={{ textAlign: 'right', padding: '4px 0' }}>₦{(item.price * item.quantity).toLocaleString()}</td>
                                </tr>
                              ))}
                              <tr>
                                <td style={{ padding: '4px 0', color: 'var(--gray-500)' }}>Delivery Fee</td>
                                <td style={{ textAlign: 'right', padding: '4px 0', color: 'var(--gray-500)' }}>₦{(order.delivery_fee || 0).toLocaleString()}</td>
                              </tr>
                            </tbody>
                          </table>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px dashed var(--gray-200)', paddingTop: '10px', marginTop: '10px' }}>
                            <strong style={{ fontSize: '1.1rem' }}>Total: ₦{(order.total_amount || 0).toLocaleString()}</strong>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div style={{ background: 'var(--white)', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)' }}>
                <h3 style={{ color: 'var(--deep-navy)', marginBottom: '20px' }}>Users Management</h3>
                
                {usersLoading ? (
                  <LoadingScreen text="Fetching users..." />
                ) : users.length === 0 ? (
                  <p style={{ color: 'var(--gray-500)' }}>No users found.</p>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <thead>
                        <tr style={{ background: 'var(--gray-100)', textAlign: 'left', color: 'var(--gray-600)' }}>
                          <th style={{ padding: '12px' }}>Email</th>
                          <th style={{ padding: '12px' }}>Role</th>
                          <th style={{ padding: '12px' }}>Joined Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                            <td style={{ padding: '12px' }}><strong>{user.email}</strong></td>
                            <td style={{ padding: '12px', textTransform: 'capitalize' }}>
                              <select 
                                value={user.role} 
                                onChange={e => handleUpdateUserRole(user.id, e.target.value)}
                                style={{ padding: '6px', width: '140px', border: '1px solid var(--gray-300)', borderRadius: '4px' }}>
                                <option value="user">User</option>
                                <option value="seller">Seller</option>
                                <option value="store_manager">Store Manager</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>
                            <td style={{ padding: '12px', color: 'var(--gray-500)' }}>
                              {new Date(user.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'inquiries' && (
              <div style={{ background: 'var(--white)', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)' }}>
                <h3 style={{ color: 'var(--deep-navy)', marginBottom: '20px' }}>Customer Inquiries</h3>
                
                {inquiriesLoading ? (
                  <LoadingScreen text="Fetching inquiries..." />
                ) : inquiries.length === 0 ? (
                  <p style={{ color: 'var(--gray-500)' }}>No inquiries found.</p>
                ) : (
                  <div style={{ display: 'grid', gap: '20px' }}>
                    {inquiries.map(inquiry => (
                      <div key={inquiry.id} style={{ border: '1px solid var(--gray-200)', borderRadius: '8px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                          <div>
                            <h4 style={{ margin: '0 0 5px 0', color: 'var(--deep-navy)' }}>{inquiry.subject}</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--gray-500)' }}>
                              From: <strong>{inquiry.name}</strong> ({inquiry.email}) | {inquiry.phone}
                            </p>
                          </div>
                          <select 
                            value={inquiry.status} 
                            onChange={e => handleUpdateInquiryStatus(inquiry.id, e.target.value)}
                            style={{ padding: '6px', border: '1px solid var(--gray-300)', borderRadius: '4px', background: inquiry.status === 'resolved' ? '#e6ffe6' : '#fff' }}>
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </div>
                        <div style={{ background: 'var(--gray-100)', padding: '15px', borderRadius: '4px', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>
                          {inquiry.message}
                        </div>
                        <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--gray-400)', textAlign: 'right' }}>
                          {new Date(inquiry.created_at).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'delivery' && (
              <div style={{ background: 'var(--white)', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)' }}>
                <h3 style={{ color: 'var(--deep-navy)', marginBottom: '20px' }}>Delivery Rates Management</h3>
                
                <form onSubmit={handleAddDeliveryRate} style={{ background: 'var(--gray-50)', padding: '20px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'flex-end' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>State / Region</label>
                    <input required value={newRate.state} onChange={e => setNewRate({...newRate, state: e.target.value})} placeholder="e.g. Lagos" style={{ width: '100%', padding: '8px', border: '1px solid var(--gray-300)', borderRadius: '4px' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Fee (₦)</label>
                    <input required type="number" value={newRate.fee} onChange={e => setNewRate({...newRate, fee: e.target.value})} style={{ width: '100%', padding: '8px', border: '1px solid var(--gray-300)', borderRadius: '4px' }} />
                  </div>
                  <button type="submit" style={{ padding: '10px 20px', background: '#25D366', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Rate</button>
                </form>

                {ratesLoading ? (
                  <LoadingScreen text="Fetching rates..." />
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--gray-100)', textAlign: 'left', color: 'var(--gray-600)' }}>
                        <th style={{ padding: '12px' }}>State / Region</th>
                        <th style={{ padding: '12px' }}>Fee (₦)</th>
                        <th style={{ padding: '12px', width: '100px' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deliveryRates.map(rate => (
                        <tr key={rate.id} style={{ borderBottom: '1px solid var(--gray-200)' }}>
                          <td style={{ padding: '12px' }}><strong>{rate.state}</strong></td>
                          <td style={{ padding: '12px' }}>₦{rate.fee.toLocaleString()}</td>
                          <td style={{ padding: '12px' }}>
                            <button onClick={() => handleDeleteRate(rate.id)} style={{ padding: '6px 12px', background: 'var(--primary-red)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                      {deliveryRates.length === 0 && (
                        <tr><td colSpan="3" style={{ padding: '12px', textAlign: 'center', color: 'var(--gray-500)' }}>No delivery rates added yet.</td></tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === 'professionals' && (
              <div style={{ background: 'var(--white)', padding: '30px', borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-200)' }}>
                <h3 style={{ color: 'var(--deep-navy)', marginBottom: '20px' }}>Professionals Directory Applications</h3>
                
                {professionalsLoading ? (
                  <LoadingScreen text="Fetching professionals..." />
                ) : professionals.length === 0 ? (
                  <p style={{ color: 'var(--gray-500)' }}>No professionals found.</p>
                ) : (
                  <div style={{ display: 'grid', gap: '20px' }}>
                    {professionals.map(pro => (
                      <div key={pro.id} style={{ border: '1px solid var(--gray-200)', borderRadius: '8px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                          <div>
                            <h4 style={{ margin: '0 0 5px 0', color: 'var(--deep-navy)' }}>{pro.name}</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--gray-500)' }}>
                              Expertise: <strong>{pro.expertise}</strong> | Location: <strong>{pro.state}</strong>
                            </p>
                            <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: 'var(--gray-500)' }}>
                              Starting Fee: ₦{Number(pro.fee).toLocaleString()}
                            </p>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <select 
                              value={pro.status} 
                              onChange={e => handleUpdateProfessionalStatus(pro.id, e.target.value)}
                              style={{ padding: '6px', border: '1px solid var(--gray-300)', borderRadius: '4px', background: pro.status === 'approved' ? '#e6ffe6' : (pro.status === 'rejected' ? '#ffe6e6' : '#fff') }}>
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                            <button onClick={() => handleDeleteProfessional(pro.id)} style={{ padding: '6px', background: 'var(--primary-red)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>Delete</button>
                          </div>
                        </div>
                        
                        {pro.job_samples && pro.job_samples.length > 0 && (
                          <div style={{ background: 'var(--gray-100)', padding: '15px', borderRadius: '4px', display: 'flex', gap: '10px' }}>
                            {pro.job_samples.map((img, idx) => (
                              <img key={idx} src={img} alt="Job Sample" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--gray-300)' }} />
                            ))}
                          </div>
                        )}
                        <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--gray-400)', textAlign: 'right' }}>
                          Applied: {new Date(pro.created_at).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
