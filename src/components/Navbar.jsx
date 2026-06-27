import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container navbar-content">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <div className="nav-logo-icon">M+</div>
            <span className="nav-logo-text">Medi<span>Care</span>+</span>
          </Link>

          {/* Desktop Links */}
          <div className="nav-links">
            <Link to="/doctors" className={`nav-link${isActive('/doctors') ? ' active' : ''}`}>Find Doctors</Link>
            <Link to="/about" className={`nav-link${isActive('/about') ? ' active' : ''}`}>About</Link>
            {isAuthenticated && (
              <Link to="/dashboard" className={`nav-link${isActive('/dashboard') ? ' active' : ''}`}>Dashboard</Link>
            )}
          </div>

          <div className="nav-spacer" />

          {/* Desktop Actions */}
          <div className="nav-actions">
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link to="/profile" style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '6px 14px', background: 'var(--primary-light)',
                  borderRadius: 'var(--r-full)', color: 'var(--primary-dark)',
                  fontWeight: '700', fontSize: '13px', fontFamily: 'Inter, sans-serif',
                }}>
                  <div style={{
                    width: '28px', height: '28px', background: 'var(--grad-blue)',
                    color: 'white', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '800', fontSize: '13px', flexShrink: 0,
                  }}>
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  {user?.name?.split(' ')[0]}
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline btn-sm"
                  style={{ color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.25)' }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Get Started</Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className={`nav-toggle${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
            zIndex: 998, backdropFilter: 'blur(2px)',
          }}
        />
      )}

      {/* Mobile Drawer */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} style={{ display: 'flex' }}>
        <div style={{ padding: '8px 0' }}>
          <Link to="/">🏠 Home</Link>
          <Link to="/doctors">🔍 Find Doctors</Link>
          <Link to="/about">ℹ️ About</Link>
          {isAuthenticated && <Link to="/dashboard">📊 Dashboard</Link>}
          {isAuthenticated && <Link to="/profile">👤 My Profile</Link>}
          <div className="mobile-menu-divider" />
          {isAuthenticated ? (
            <button onClick={handleLogout} style={{ color: 'var(--danger)', fontWeight: '700', width: '100%', textAlign: 'left', padding: '14px 18px' }}>
              🚪 Logout
            </button>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 4px' }}>
              <Link to="/login" style={{ padding: '14px 18px', color: 'var(--primary)', fontWeight: '700', display: 'block', borderRadius: 'var(--r-md)' }}>Login</Link>
              <Link
                to="/register"
                style={{
                  background: 'var(--grad-blue)', color: 'white',
                  borderRadius: 'var(--r-md)', fontWeight: '700',
                  textAlign: 'center', padding: '14px 18px', display: 'block',
                  boxShadow: 'var(--shadow-primary)',
                }}
              >
                Get Started — Free 🚀
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;