import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  return (
    <nav className="navbar" style={{ padding: '0' }}>
      <div className="container navbar-content">
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'var(--secondary)', color: 'white', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '20px' }}>M</div>
          <span style={{ fontWeight: '800', fontSize: '22px', color: 'var(--text-dark)' }}>Medi<span style={{ color: 'var(--primary)' }}>Care+</span></span>
        </Link>
        <div className="nav-links" style={{ marginLeft: '40px' }}>
          <Link to="/doctors" className="nav-link" style={{ fontWeight: '700' }}>Find Doctors</Link>
          <Link to="/about" className="nav-link" style={{ fontWeight: '700' }}>About</Link>
        </div>
        <div style={{ flex: 1 }}></div>
        <div className="nav-actions">
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Link to="/dashboard" className="nav-link" style={{ fontWeight: '700' }}>Dashboard</Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '32px', height: '32px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px' }}>
                  {user?.name?.[0]}
                </div>
                <button onClick={() => { dispatch(logout()); navigate('/'); }} style={{ color: 'red', fontWeight: '700', fontSize: '13px' }}>Logout</button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Link to="/login" className="nav-link" style={{ fontWeight: '700' }}>Login</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;