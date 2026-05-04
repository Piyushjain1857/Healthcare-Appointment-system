import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (isAuthenticated) navigate('/dashboard', { replace: true }); }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    toast.error('Login service is currently unavailable.');
  };

  return (
    <div className="page-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px', background: 'var(--bg-light)' }}>
      <div style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--secondary)', color: 'white', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '24px' }}>M</div>
            <span style={{ fontWeight: '800', fontSize: '28px', color: 'var(--text-dark)' }}>Medi<span style={{ color: 'var(--primary)' }}>Care+</span></span>
          </Link>
          <h1 style={{ marginTop: '30px', fontSize: '32px', fontWeight: '800' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-gray)', marginTop: '8px' }}>Sign in to manage your appointments</p>
        </div>
        
        <div className="card" style={{ padding: '40px', borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ letterSpacing: '1px' }}>EMAIL ADDRESS</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" className="form-input" style={{ background: 'var(--bg-light)', border: 'none', padding: '16px' }} />
            </div>
            
            <div className="form-group" style={{ marginTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="form-label" style={{ letterSpacing: '1px', marginBottom: '0' }}>PASSWORD</label>
                <Link to="/" style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '700' }}>Forgot?</Link>
              </div>
              <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" className="form-input" style={{ background: 'var(--bg-light)', border: 'none', padding: '16px' }} />
            </div>
            
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '30px', padding: '16px', fontSize: '16px' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '30px' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-gray)' }}>
              New to MediCare+? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '800' }}>Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;