import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import './app.css';

function App() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: '',
        quantity: '',
    });
    const [activePage, setActivePage] = useState('dashboard');
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState('');
    const [message, setMessage] = useState('');

    const loadProducts = async () => {
        try {
            const response = await axios.get('/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
            setMessage('Unable to load products.');
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm({ name: '', description: '', price: '', quantity: '' });
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        const data = {
            ...form,
            price: Number(form.price),
            quantity: Number(form.quantity),
        };

        try {
            if (editingId) {
                await axios.put(`/api/products/${editingId}`, data);
                setMessage('Product updated successfully.');
            } else {
                await axios.post('/api/products', data);
                setMessage('Product added successfully.');
            }

            resetForm();
            await loadProducts();
        } catch (error) {
            console.error(error.response?.data || error);
            setMessage(
                error.response?.data?.message || 'Unable to save product.'
            );
        }
    };

    const handleEdit = (product) => {
        setForm({
            name: product.name,
            description: product.description || '',
            price: product.price,
            quantity: product.quantity,
        });
        setEditingId(product.id);
        setMessage('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            await axios.delete(`/api/products/${id}`);
            setMessage('Product deleted successfully.');
            await loadProducts();
        } catch (error) {
            console.error(error);
            setMessage('Unable to delete product.');
        }
    };

    const filteredProducts = products.filter((product) =>
        `${product.name} ${product.description || ''}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const totalStock = products.reduce(
        (sum, product) => sum + Number(product.quantity),
        0
    );

    const inventoryValue = products.reduce(
        (sum, product) =>
            sum + Number(product.price) * Number(product.quantity),
        0
    );

    return (
        <div className="app-layout">
            <aside className="sidebar">
                <div className="brand">
                    <div className="brand-icon">P</div>
                    <div>
                        <strong>ProductHub</strong>
                        <span>INVENTORY SYSTEM</span>
                    </div>
                </div>

                <p className="nav-label">WORKSPACE</p>

                            
                <button
                    type="button"
                    className={`nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
                    onClick={() => {
                        setActivePage('dashboard');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    <span>▦</span> Dashboard
                </button>

                <button
                    type="button"
                    className={`nav-item ${activePage === 'products' ? 'active' : ''}`}
                    onClick={() => {
                        setActivePage('products');
                        document.getElementById('products-section')?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                        });
                    }}
                >
                    <span>▤</span> Products
                </button>


                <div className="sidebar-bottom">
                    <div className="profile-avatar">A</div>
                    <div className="profile-info">
                        <strong>Administrator</strong>
                        <span>Inventory Manager</span>
                    </div>
                </div>
            </aside>

            <main className="dashboard">
                <header className="topbar">
                    <div>
                        <p className="breadcrumb">Workspace / Overview</p>
                        <h1>Dashboard</h1>
                    </div>
                    <div className="topbar-right">
                        <span className="status-dot"></span>
                        System Online
                    </div>
                </header>

                <section className="welcome">
                    <div>
                        <p className="eyebrow">INVENTORY OVERVIEW</p>
                        <h2>Welcome back, Administrator!</h2>
                        <p>Manage your products and monitor your inventory.</p>
                    </div>
                    <div className="welcome-icon">▦</div>
                </section>

                <section className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon blue">▤</div>
                        <p>Total Products</p>
                        <h2>{products.length}</h2>
                        <span className="stat-note">Products in catalog</span>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon purple">▦</div>
                        <p>Total Stock Units</p>
                        <h2>{totalStock.toLocaleString()}</h2>
                        <span className="stat-note">Units available</span>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon orange">₱</div>
                        <p>Inventory Value</p>
                        <h2>
                            ₱{inventoryValue.toLocaleString('en-PH', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </h2>
                        <span className="stat-note">Price × quantity</span>
                    </div>
                </section>

                <section className="content-card">
                    <div className="section-heading">
                        <div>
                            <h2>{editingId ? 'Edit Product' : 'Product Form'}</h2>
                            <p>
                                {editingId
                                    ? 'Update the selected product details.'
                                    : 'Enter the details to add a new product.'}
                            </p>
                        </div>
                        {editingId && (
                            <button className="cancel-button" onClick={resetForm}>
                                Cancel Edit
                            </button>
                        )}
                    </div>

                    <form className="product-form" onSubmit={handleSubmit}>
                        <label>
                            Product Name *
                            <input
                                name="name"
                                placeholder="e.g. Wireless Mouse"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Description
                            <input
                                name="description"
                                placeholder="Short product description"
                                value={form.description}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            Price (₱) *
                            <input
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                value={form.price}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label>
                            Quantity *
                            <input
                                name="quantity"
                                type="number"
                                min="0"
                                step="1"
                                placeholder="0"
                                value={form.quantity}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <div className="form-actions">
                            <button className="primary-button" type="submit">
                                {editingId ? '✓ Save Changes' : '+ Add Product'}
                            </button>
                            {editingId && (
                                <button
                                    className="cancel-button"
                                    type="button"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>

                    {message && (
                        <p className="feedback-message" role="status">
                            {message}
                        </p>
                    )}
                </section>

               <section
                    id="products-section"
                    className="content-card inventory-card"
                >
                    <div className="section-heading inventory-heading">
                        <div>
                            <h2>Product Inventory</h2>
                            <p>View and manage all registered products.</p>
                        </div>

                        <div className="search-box">
                            <span>⌕</span>
                            <input
                                aria-label="Search products"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <div className="product-name">
                                                <span className="product-symbol">P</span>
                                                <strong>{product.name}</strong>
                                            </div>
                                        </td>
                                        <td>{product.description || '—'}</td>
                                        <td className="price-cell">
                                            ₱{Number(product.price).toLocaleString(
                                                'en-PH',
                                                {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }
                                            )}
                                        </td>
                                        <td>
                                            <span
                                                className={
                                                    Number(product.quantity) === 0
                                                        ? 'stock-badge out'
                                                        : 'stock-badge'
                                                }
                                            >
                                                {product.quantity} units
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    type="button"
                                                    className="edit-button"
                                                    onClick={() => handleEdit(product)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="delete-button"
                                                    onClick={() => handleDelete(product.id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="empty-state">
                                            <div className="empty-icon">▤</div>
                                            <strong>
                                                {search
                                                    ? 'No matching products'
                                                    : 'No products yet'}
                                            </strong>
                                            <p>
                                                {search
                                                    ? 'Try another search term.'
                                                    : 'Add your first product using the form above.'}
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="table-footer">
                        Showing {filteredProducts.length} of {products.length} products
                    </div>
                </section>

                <footer className="page-footer">
                    ProductHub Inventory System · React + Laravel
                </footer>
            </main>
        </div>
    );
}

createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
