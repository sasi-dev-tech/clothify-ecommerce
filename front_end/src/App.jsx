import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar({ onSearchToggle, onCartToggle }) {
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

                <div style={{ display: 'flex', gap: '1.5rem', cursor: 'pointer' }}>
                    <Search size={20} onClick={onSearchToggle} />
                    <ShoppingBag size={20} onClick={onCartToggle} />
                </div>
            </div>
        </nav>
    );
}

function SearchBar({ searchTerm, setSearchTerm, onClose }) {
    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                padding: '1rem',
                background: '#111',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}
        >
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '5px',
                    border: '1px solid #333',
                    background: '#222',
                    color: '#fff',
                }}
            />
            <X size={26} onClick={onClose} style={{ cursor: 'pointer' }} />
        </motion.div>
    );
}

function CartSidebar({ cart, onClose, removeFromCart }) {
    return (
        <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            style={{
                position: 'fixed',
                right: 0,
                top: 0,
                width: '350px',
                height: '100vh',
                background: '#111',
                padding: '1.5rem',
                zIndex: 1000,
                color: '#fff',
                overflowY: 'auto'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h2>Shopping Bag</h2>
                <X size={26} onClick={onClose} style={{ cursor: 'pointer' }} />
            </div>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cart.map(item => (
                    <div key={item.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                        <strong>{item.name}</strong>
                        <p>${item.price}</p>
                        <button 
                            onClick={() => removeFromCart(item.id)}
                            style={{ background: 'red', padding: '5px', border: 'none', color: '#fff', marginTop: '5px' }}
                        >
                            Remove
                        </button>
                    </div>
                ))
            )}

            {cart.length > 0 && (
                <h3>Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</h3>
            )}
        </motion.div>
    );
}

function ProductCard({ product, addToCart }) {
    return (
        <div style={{ background: 'var(--color-surface)', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ height: '300px', marginBottom: '1rem' }}>
                <img 
                    src={product.image} 
                    alt={product.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px'
                    }}
                />
            </div>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{product.name}</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>${product.price}</p>
            <button 
                className="btn btn-outline" 
                style={{ width: '100%', fontSize: '0.9rem' }}
                onClick={() => addToCart(product)}
            >
                Add to Cart
            </button>
        </div>
    );
}

function App() {
    const [products, setProducts] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setProducts([
            { id: 1, name: 'Classic Bomber Jacket', price: 129.99, image: '/images/bomber.jpg' },
            { id: 2, name: 'Oversized Tee', price: 45.00, image: '/images/tee.jpg' },
            { id: 3, name: 'Cargo Pants', price: 89.50, image: '/images/cargo.jpg' },
        ]);
    }, []);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    return (
        <div>
            <Navbar 
                onSearchToggle={() => setSearchOpen(true)}
                onCartToggle={() => setCartOpen(true)}
            />

            {searchOpen && (
                <SearchBar 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onClose={() => setSearchOpen(false)}
                />
            )}

            {cartOpen && (
                <CartSidebar 
                    cart={cart}
                    onClose={() => setCartOpen(false)}
                    removeFromCart={removeFromCart}
                />
            )}

            <section className="container" style={{ padding: '4rem 0' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center' }}>Featured Products</h2>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {filteredProducts.map(p => (
                        <ProductCard key={p.id} product={p} addToCart={addToCart} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default App;
