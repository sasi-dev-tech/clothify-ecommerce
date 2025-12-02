import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar() {
    return (
        <nav style={{ padding: '1.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '2px' }}>LUXE ATTIRE</div>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <a href="#" style={{ color: 'var(--color-text-muted)' }}>Collections</a>
                    <a href="#" style={{ color: 'var(--color-text-muted)' }}>Men</a>
                    <a href="#" style={{ color: 'var(--color-text-muted)' }}>Women</a>
                    <a href="#" style={{ color: 'var(--color-text-muted)' }}>About</a>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <Search size={20} />
                    <ShoppingBag size={20} />
                </div>
            </div>
        </nav>
    );
}

function Hero() {
    return (
        <section style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: 'radial-gradient(circle at center, #1a1a1a 0%, #0a0a0a 100%)' }}>
            <div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ fontSize: '4rem', marginBottom: '1rem', lineHeight: '1.1' }}
                >
                    ELEVATE YOUR <br /> <span style={{ color: 'var(--color-primary)' }}>STYLE</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1.2rem' }}
                >
                    Discover the new collection of premium streetwear.
                </motion.p>
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="btn btn-primary"
                >
                    Shop Now
                </motion.button>
            </div>
        </section>
    );
}

function ProductCard({ product }) {
    return (
        <div style={{ background: 'var(--color-surface)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ height: '300px', background: '#222', marginBottom: '1rem', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>
                Image Placeholder
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.name}</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>${product.price}</p>
            <button className="btn btn-outline" style={{ width: '100%', fontSize: '0.9rem' }}>Add to Cart</button>
        </div>
    );
}

function App() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from backend
        // fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
        // Mock data for now
        setProducts([
            { id: 1, name: 'Classic Bomber Jacket', price: 129.99 },
            { id: 2, name: 'Oversized Tee', price: 45.00 },
            { id: 3, name: 'Cargo Pants', price: 89.50 },
        ]);
    }, []);

    return (
        <div>
            <Navbar />
            <Hero />
            <section className="container" style={{ padding: '4rem 0' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Featured Products</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {products.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
            </section>
        </div>
    );
}

export default App;
