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

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

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
                <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'var(--primary-light)', borderRadius: 'var(--r-full)', color: 'var(--primary-dark)', fontWeight: '700', fontSize: '13px' }}>
                  <div style={{
                    width: '28px', height: '28px',
                    background: 'var(--grad-blue)',
                    color: 'white', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '800', fontSize: '13px', flexShrink: 0
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
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <Link to="/" className="nav-link">🏠 Home</Link>
        <Link to="/doctors">🔍 Find Doctors</Link>
        <Link to="/about">ℹ️ About</Link>
        {isAuthenticated && <Link to="/dashboard">📊 Dashboard</Link>}
        {isAuthenticated && <Link to="/profile">👤 My Profile</Link>}
        <div className="mobile-menu-divider" />
        {isAuthenticated ? (
          <button onClick={handleLogout} style={{ color: 'var(--danger)', fontWeight: '700' }}>
            🚪 Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700' }}>Login</Link>
            <Link
              to="/register"
              style={{
                background: 'var(--grad-blue)',
                color: 'white',
                borderRadius: 'var(--r-md)',
                fontWeight: '700',
                textAlign: 'center',
                marginTop: '4px',
                padding: '14px 18px',
              }}
            >
              Get Started — Free
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;