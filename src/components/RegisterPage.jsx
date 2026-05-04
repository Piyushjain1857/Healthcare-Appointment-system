import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (isAuthenticated) navigate('/dashboard', { replace: true }); }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    toast.error('Registration service is currently unavailable.');
  };

  return (
    <div className="page-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '40px 20px', background: 'var(--bg-light)' }}>
      <div style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--secondary)', color: 'white', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '24px' }}>M</div>
            <span style={{ fontWeight: '800', fontSize: '28px', color: 'var(--text-dark)' }}>Medi<span style={{ color: 'var(--primary)' }}>Care+</span></span>
          </Link>
          <h1 style={{ marginTop: '30px', fontSize: '32px', fontWeight: '800' }}>Create Account</h1>
          <p style={{ color: 'var(--text-gray)', marginTop: '8px' }}>Join 50,000+ patients getting better healthcare</p>
        </div>
        
        <div className="card" style={{ padding: '40px', borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ letterSpacing: '1px' }}>FULL NAME</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="e.g. John Doe" className="form-input" style={{ background: 'var(--bg-light)', border: 'none', padding: '16px' }} />
            </div>

            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label" style={{ letterSpacing: '1px' }}>EMAIL ADDRESS</label>
              <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" className="form-input" style={{ background: 'var(--bg-light)', border: 'none', padding: '16px' }} />
            </div>
            
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label className="form-label" style={{ letterSpacing: '1px' }}>PASSWORD</label>
              <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" className="form-input" style={{ background: 'var(--bg-light)', border: 'none', padding: '16px' }} />
            </div>
            
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', marginTop: '30px', padding: '16px', fontSize: '16px' }}>
              {loading ? 'Creating account...' : 'Get Started — It\'s Free'}
            </button>
          </form>
          
          <div style={{ marginTop: '30px', textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '30px' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-gray)' }}>
              Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '800' }}>Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;