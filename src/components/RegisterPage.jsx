import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill all required fields');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    toast.error('Registration service is currently unavailable.');
  };

  const benefits = [
    { icon: '📅', text: 'Book appointments in under 2 minutes' },
    { icon: '💊', text: 'Access digital prescriptions anytime' },
    { icon: '💻', text: 'Video consult with top doctors' },
    { icon: '📋', text: 'Store & manage all health records' },
  ];

  return (
    <div className="page-fade-in reg-page">
      {/* Ambient blobs */}
      <div className="reg-blob reg-blob-1" />
      <div className="reg-blob reg-blob-2" />

      <div className="reg-inner">

        {/* ── Left: Benefits (hidden on mobile) ── */}
        {!isMobile && (
          <div className="reg-benefits">
            <Link to="/" className="reg-logo">
              <div className="nav-logo-icon">M+</div>
              <span className="nav-logo-text">Medi<span>Care</span>+</span>
            </Link>

            <h2 className="reg-benefits-title">Join 50,000+ Patients</h2>
            <p className="reg-benefits-sub">
              Get access to India's largest network of verified doctors and healthcare professionals.
            </p>

            <div className="reg-benefits-list">
              {benefits.map((b, i) => (
                <div key={i} className="reg-benefit-item">
                  <div className="reg-benefit-icon">{b.icon}</div>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>

            <div className="reg-privacy-badge">
              <span>🔒</span>
              <p>Your data is <strong>100% private</strong> and protected by end-to-end encryption.</p>
            </div>
          </div>
        )}

        {/* ── Right: Form ── */}
        <div className="reg-form-col">
          {/* Mobile logo */}
          {isMobile && (
            <Link to="/" className="reg-logo reg-logo-mobile">
              <div className="nav-logo-icon" style={{ width: 40, height: 40, fontSize: 17 }}>M+</div>
              <span className="nav-logo-text" style={{ fontSize: 22 }}>Medi<span>Care</span>+</span>
            </Link>
          )}

          <div className="reg-card">
            <h1 className="reg-card-title">Create Account</h1>
            <p className="reg-card-sub">It's free — no credit card required</p>

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="form-label">Full Name *</label>
                <input
                  id="reg-name"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Priya Sharma"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  autoComplete="name"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="form-label">Email Address *</label>
                <input
                  id="reg-email"
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  autoComplete="email"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="form-label">Phone (Optional)</label>
                <input
                  id="reg-phone"
                  type="tel"
                  className="form-input"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  autoComplete="tel"
                />
              </div>

              <div className="form-group" style={{ marginBottom: 24 }}>
                <label className="form-label">Password *</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="reg-password"
                    type={showPass ? 'text' : 'password'}
                    className="form-input"
                    placeholder="At least 6 characters"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    autoComplete="new-password"
                    style={{ paddingRight: 52 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    style={{
                      position: 'absolute', right: 16, top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--text-muted)', fontSize: 16,
                    }}
                    aria-label="Toggle password visibility"
                  >
                    {showPass ? '🙈' : '👁'}
                  </button>
                </div>
              </div>

              <button
                id="reg-submit"
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '15px', fontSize: 15, borderRadius: 12 }}
              >
                {loading
                  ? <><span className="spinner" style={{ width: 18, height: 18, marginRight: 8 }} />Creating Account...</>
                  : "Get Started — It's Free →"
                }
              </button>

              <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-light)', fontFamily: 'Inter, sans-serif', marginTop: 14 }}>
                By registering you agree to our{' '}
                <Link to="/" style={{ color: 'var(--primary)' }}>Terms</Link> &{' '}
                <Link to="/" style={{ color: 'var(--primary)' }}>Privacy Policy</Link>
              </p>
            </form>

            <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)', textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 800 }}>Sign in here</Link>
              </p>
            </div>

            {/* Mobile privacy note */}
            {isMobile && (
              <div className="reg-privacy-badge" style={{ marginTop: 20 }}>
                <span>🔒</span>
                <p>Your data is <strong>100% private</strong> and protected by end-to-end encryption.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scoped CSS */}
      <style>{`
        .reg-page {
          min-height: 100vh;
          background: var(--bg-page);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px var(--container-px);
        }
        .reg-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .reg-blob-1 {
          top: -20%; right: -10%;
          width: min(600px, 80vw); height: min(600px, 80vw);
          background: radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%);
        }
        .reg-blob-2 {
          bottom: -20%; left: -10%;
          width: min(500px, 70vw); height: min(500px, 70vw);
          background: radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%);
        }
        .reg-inner {
          width: 100%;
          max-width: 960px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .reg-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 36px;
          text-decoration: none;
        }
        .reg-logo-mobile {
          display: flex;
          justify-content: center;
          margin-bottom: 28px;
        }
        .reg-benefits {
          padding: 20px 0;
        }
        .reg-benefits-title {
          font-size: clamp(26px, 3vw, 34px);
          margin-bottom: 12px;
          color: var(--text-dark);
        }
        .reg-benefits-sub {
          color: var(--text-muted);
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          margin-bottom: 32px;
          line-height: 1.7;
        }
        .reg-benefits-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }
        .reg-benefit-item {
          display: flex;
          align-items: center;
          gap: 14px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-body);
        }
        .reg-benefit-icon {
          width: 44px; height: 44px;
          flex-shrink: 0;
          background: var(--primary-light);
          border: 1px solid rgba(14,165,233,0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }
        .reg-privacy-badge {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px 18px;
          background: linear-gradient(135deg, rgba(14,165,233,0.07), rgba(6,182,212,0.05));
          border: 1px solid rgba(14,165,233,0.15);
          border-radius: 14px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.6;
        }
        .reg-privacy-badge span { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
        .reg-form-col {
          width: 100%;
        }
        .reg-card {
          background: white;
          border-radius: 24px;
          padding: clamp(24px, 4vw, 40px);
          border: 1px solid var(--border);
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }
        .reg-card-title {
          font-size: clamp(22px, 4vw, 28px);
          margin-bottom: 6px;
          color: var(--text-dark);
        }
        .reg-card-sub {
          color: var(--text-muted);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          margin-bottom: 28px;
        }

        /* ── Tablet (601–900px): single column, form only ── */
        @media (max-width: 900px) {
          .reg-inner {
            grid-template-columns: 1fr;
            max-width: 520px;
            gap: 0;
          }
        }

        /* ── Mobile ── */
        @media (max-width: 480px) {
          .reg-page { padding: 24px var(--container-px) 40px; }
          .reg-card { padding: 22px 18px; border-radius: 20px; }
          .reg-card-title { font-size: 22px; }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;