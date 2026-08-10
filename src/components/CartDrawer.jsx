"use client";

import React from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { createClient } from '../utils/supabase/client';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const supabase = createClient();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = React.useState(false);
  const [deliveryRates, setDeliveryRates] = React.useState([]);
  const [isOrderSuccess, setIsOrderSuccess] = React.useState(false);
  const [checkoutForm, setCheckoutForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    state: ''
  });

  React.useEffect(() => {
    async function fetchRates() {
      const { data } = await supabase.from('delivery_fees').select('*');
      if (data) setDeliveryRates(data);
    }
    fetchRates();
  }, [supabase]);

  const deliveryFee = checkoutForm.state ? (deliveryRates.find(r => r.state === checkoutForm.state)?.fee || 0) : 0;
  
  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setShowCheckoutForm(true);
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    
    let message = "*Pathfinder Paints - New Order*\n\n";
    let orderItems = [];

    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (product) {
        message += `▪ ${product.name} (x${item.quantity}) - ₦${(product.price * item.quantity).toLocaleString()}\n`;
        orderItems.push({ product_id: product.id, name: product.name, quantity: item.quantity, price: product.price });
      }
    });
    
    const subtotal = getCartTotal();
    const total = subtotal + deliveryFee;
    
    message += `\n*Subtotal:* ₦${subtotal.toLocaleString()}`;
    message += `\n*Delivery Fee (${checkoutForm.state}):* ₦${deliveryFee.toLocaleString()}`;
    message += `\n*Total Amount:* ₦${total.toLocaleString()}\n\n`;
    
    message += `*Customer Details:*\nName: ${checkoutForm.name}\nEmail: ${checkoutForm.email}\nPhone: ${checkoutForm.phone}\nAddress: ${checkoutForm.address}, ${checkoutForm.state}\n\n`;
    message += "Please confirm my order and provide payment details.";

    // Save to Supabase
    try {
      await supabase.from('orders').insert([{
        total_amount: total,
        items: orderItems,
        status: 'pending',
        customer_name: checkoutForm.name,
        customer_phone: checkoutForm.phone,
        delivery_address: checkoutForm.address,
        delivery_state: checkoutForm.state,
        delivery_fee: deliveryFee
      }]);
    } catch (e) {
      console.error("Failed to save order to database", e);
    }

    // Send to Google Sheet via Proxy API
    try {
      await fetch('/api/webhook', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_name: checkoutForm.name,
            customer_email: checkoutForm.email,
            customer_phone: checkoutForm.phone,
            delivery_address: checkoutForm.address,
            delivery_state: checkoutForm.state,
            subtotal: subtotal,
            delivery_fee: deliveryFee,
            total: total,
            items: orderItems,
            timestamp: new Date().toISOString()
          })
      });
    } catch (e) {
      console.error("Webhook proxy failed", e);
    }

    setIsCheckingOut(false);
    setIsOrderSuccess(true);
    clearCart();
  };

  return (
    <div className={`cart-drawer-overlay ${isCartOpen ? 'active' : ''}`} onClick={() => setIsCartOpen(false)}>
      <div className={`cart-drawer ${isCartOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Your Shopping Cart</h3>
          <button className="btn-close-modal" onClick={() => { setIsCartOpen(false); setTimeout(() => { setShowCheckoutForm(false); setIsOrderSuccess(false); }, 300); }} aria-label="Close Cart">&times;</button>
        </div>
        
        <div className="cart-body">
          {isOrderSuccess ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '64px', marginBottom: '20px' }}>✅</div>
              <h3 style={{ color: 'var(--deep-navy)', marginBottom: '10px' }}>Order Placed Successfully!</h3>
              <p style={{ color: 'var(--gray-500)', marginBottom: '30px' }}>Your order has been recorded and is pending payment. A receipt will be sent to your email.</p>
              <button 
                onClick={() => {
                  const waMsg = encodeURIComponent(`Hello Admin, I just placed an order. Kindly check and process to prepare for delivery.\nName: ${checkoutForm.name}`);
                  window.open(`https://wa.me/2348182098824?text=${waMsg}`, '_blank');
                }}
                style={{ padding: '15px 20px', background: '#25D366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
              >
                <span>💬</span> Contact Admin for Quick Delivery
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748B' }}>
              Your cart is empty.
            </div>
          ) : (
            cart.map(item => {
              const product = products.find(p => p.id === item.id);
              if (!product) return null;
              
              return (
                <div key={item.id} className="cart-item">
                  <img src={product.image} alt={product.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h5 className="cart-item-title">{product.name}</h5>
                    <span className="cart-item-price">₦{(product.price * item.quantity).toLocaleString()}</span>
                    <div className="cart-qty-controls">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-cart-btn" onClick={() => removeFromCart(item.id)}>&times;</button>
                </div>
              );
            })
          )}
        </div>
        
        <div className="cart-footer">
          {showCheckoutForm ? (
            <form onSubmit={handleCheckoutSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input required type="text" placeholder="Full Name" value={checkoutForm.name} onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              <input required type="email" placeholder="Email Address" value={checkoutForm.email} onChange={e => setCheckoutForm({...checkoutForm, email: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              <input required type="tel" placeholder="Phone Number" value={checkoutForm.phone} onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              <input required placeholder="Delivery Address" value={checkoutForm.address} onChange={e => setCheckoutForm({...checkoutForm, address: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              <select required value={checkoutForm.state} onChange={e => setCheckoutForm({...checkoutForm, state: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option value="">Select State</option>
                {deliveryRates.map(rate => (
                  <option key={rate.id} value={rate.state}>{rate.state} (+₦{rate.fee.toLocaleString()})</option>
                ))}
              </select>
              <div className="cart-total-row" style={{ marginTop: '10px' }}>
                <span>Subtotal</span>
                <span>₦{getCartTotal().toLocaleString()}</span>
              </div>
              <div className="cart-total-row">
                <span>Delivery</span>
                <span>₦{deliveryFee.toLocaleString()}</span>
              </div>
              <div className="cart-total-row" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                <span>Total</span>
                <span>₦{(getCartTotal() + deliveryFee).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowCheckoutForm(false)} style={{ flex: 1, padding: '10px', background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Back</button>
                <button type="submit" disabled={isCheckingOut} style={{ flex: 2, padding: '10px', background: 'var(--primary-red)', color: 'white', border: 'none', borderRadius: '4px', cursor: isCheckingOut ? 'not-allowed' : 'pointer' }}>
                  {isCheckingOut ? 'SAVING...' : 'CONFIRM ORDER'}
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="cart-total-row">
                <span>Subtotal</span>
                <span>₦{getCartTotal().toLocaleString()}</span>
              </div>
              <button 
                className="btn-checkout" 
                onClick={handleProceedToCheckout} 
                disabled={cart.length === 0}
                style={{ opacity: cart.length === 0 ? 0.5 : 1, cursor: cart.length === 0 ? 'not-allowed' : 'pointer' }}
              >
                PROCEED TO CHECKOUT
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
