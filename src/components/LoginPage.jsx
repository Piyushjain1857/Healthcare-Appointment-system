import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please fill all fields');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    toast.error('Login service is currently unavailable. Try demo credentials.');
  };

  return (
    <div className="page-fade-in" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px', background: 'var(--bg-page)', position: 'relative', overflow: 'hidden' }}>

      {/* Background Blobs */}
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-15%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '460px', position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
              color: 'white', width: '44px', height: '44px',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: '900', fontSize: '18px', fontFamily: 'Inter, sans-serif',
              letterSpacing: '-1px', boxShadow: '0 8px 24px rgba(14,165,233,0.3)',
            }}>M+</div>
            <span style={{ fontWeight: '800', fontSize: '26px', color: 'var(--text-dark)', fontFamily: 'Inter, sans-serif' }}>
              Medi<span style={{ color: '#0ea5e9' }}>Care+</span>
            </span>
          </Link>
          <h1 style={{ fontSize: '30px', marginBottom: '8px', color: 'var(--text-dark)' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', fontSize: '15px' }}>
            Sign in to manage your appointments
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          border: '1px solid var(--border)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
        }}>
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label">Email Address</label>
              <input
                id="login-email"
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="form-group" style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                <Link to="/" style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '700', fontFamily: 'Inter, sans-serif' }}>
                  Forgot password?
                </Link>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  autoComplete="current-password"
                  style={{ paddingRight: '52px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-muted)', fontSize: '16px',
                  }}
                  aria-label="Toggle password visibility"
                >
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '15px', fontSize: '15px', borderRadius: '12px' }}
            >
              {loading ? (
                <><span className="spinner" style={{ width: '18px', height: '18px', marginRight: '8px' }} /> Signing In...</>
              ) : 'Sign In →'}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '28px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-light)', fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>

          {/* Demo Hint */}
          <div style={{
            background: 'var(--primary-light)',
            border: '1px solid rgba(14,165,233,0.2)',
            borderRadius: '12px',
            padding: '14px 18px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
          }}>
            <span style={{ fontSize: '16px', flexShrink: 0 }}>ℹ️</span>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary-dark)', fontFamily: 'Inter, sans-serif', marginBottom: '2px' }}>Demo Mode</p>
              <p style={{ fontSize: '12px', color: 'var(--primary-dark)', opacity: 0.8, fontFamily: 'Inter, sans-serif' }}>
                Live auth is coming soon. Register to explore the dashboard.
              </p>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
            New to MediCare+?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '800' }}>
              Create a free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;