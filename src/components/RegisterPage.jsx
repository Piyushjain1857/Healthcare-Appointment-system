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

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated]);

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
    <div className="page-fade-in" style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-page)', position: 'relative', overflow: 'hidden' }}>

      {/* Blobs */}
      <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', padding: '40px 16px', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '100%', maxWidth: '900px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>

          {/* Left: Benefits panel */}
          <div style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                color: 'white', width: '44px', height: '44px',
                borderRadius: '12px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontWeight: '900', fontSize: '18px',
                fontFamily: 'Inter, sans-serif', letterSpacing: '-1px',
                boxShadow: '0 8px 24px rgba(14,165,233,0.3)',
              }}>M+</div>
              <span style={{ fontWeight: '800', fontSize: '26px', color: 'var(--text-dark)', fontFamily: 'Inter, sans-serif' }}>
                Medi<span style={{ color: '#0ea5e9' }}>Care+</span>
              </span>
            </Link>

            <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', marginBottom: '12px', color: 'var(--text-dark)' }}>
              Join 50,000+ Patients
            </h2>
            <p style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', fontSize: '15px', marginBottom: '36px', lineHeight: '1.7' }}>
              Get access to India's largest network of verified doctors and healthcare professionals.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {benefits.map((b, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '44px', height: '44px', flexShrink: 0,
                    background: 'var(--primary-light)',
                    border: '1px solid rgba(14,165,233,0.2)',
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px',
                  }}>{b.icon}</div>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: '600', color: 'var(--text-body)' }}>{b.text}</span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '40px', padding: '18px 20px',
              background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(6,182,212,0.06))',
              border: '1px solid rgba(14,165,233,0.15)',
              borderRadius: '14px',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <span style={{ fontSize: '20px' }}>🔒</span>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
                Your data is <strong style={{ color: 'var(--primary-dark)' }}>100% private</strong> and protected by end-to-end encryption.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: '24px',
              padding: '40px',
              border: '1px solid var(--border)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            }}>
              <h1 style={{ fontSize: '26px', marginBottom: '6px' }}>Create Account</h1>
              <p style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', fontSize: '14px', marginBottom: '28px' }}>
                It's free — no credit card required
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '16px' }}>
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

                <div className="form-group" style={{ marginBottom: '16px' }}>
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

                <div className="form-group" style={{ marginBottom: '16px' }}>
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

                <div className="form-group" style={{ marginBottom: '28px' }}>
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
                      style={{ paddingRight: '52px' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      style={{
                        position: 'absolute', right: '16px', top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'var(--text-muted)', fontSize: '16px',
                      }}
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
                  style={{ width: '100%', padding: '15px', fontSize: '15px', borderRadius: '12px' }}
                >
                  {loading ? (
                    <><span className="spinner" style={{ width: '18px', height: '18px', marginRight: '8px' }} /> Creating Account...</>
                  ) : 'Get Started — It\'s Free →'}
                </button>

                <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-light)', fontFamily: 'Inter, sans-serif', marginTop: '16px' }}>
                  By registering you agree to our{' '}
                  <Link to="/" style={{ color: 'var(--primary)' }}>Terms</Link> &{' '}
                  <Link to="/" style={{ color: 'var(--primary)' }}>Privacy Policy</Link>
                </p>
              </form>

              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '800' }}>
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stacking via inline responsive */}
      <style>{`
        @media (max-width: 768px) {
          .register-grid { grid-template-columns: 1fr !important; }
          .register-benefits { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;