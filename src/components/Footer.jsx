import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                color: 'white', width: '38px', height: '38px',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '900', fontSize: '16px', fontFamily: 'Inter, sans-serif',
                letterSpacing: '-1px',
              }}>M+</div>
              <span style={{ fontWeight: '800', fontSize: '20px', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
                MediCare<span style={{ color: '#0ea5e9' }}>+</span>
              </span>
            </Link>
            <p className="footer-desc">
              Your trusted healthcare partner. Book appointments with top doctors and manage your health journey seamlessly across 30+ cities.
            </p>
            <div className="footer-social">
              {[
                { label: 'TW', title: 'Twitter' },
                { label: 'FB', title: 'Facebook' },
                { label: 'IG', title: 'Instagram' },
                { label: 'LI', title: 'LinkedIn' },
              ].map(s => (
                <button key={s.label} className="footer-social-btn" title={s.title}>{s.label}</button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/doctors">Find Doctors</Link></li>
              <li><Link to="/dashboard">Patient Dashboard</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/register">Register</Link></li>
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h4>Specialties</h4>
            <ul>
              {[
                'Cardiologist', 'Neurologist', 'Dermatologist',
                'Orthopedic', 'Pediatrician', 'Gynecologist',
              ].map(s => (
                <li key={s}><Link to={`/doctors?specialty=${s}`}>→ {s}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4>Contact Us</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li>
                <a href="#" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span>📍</span>
                  <span>123 Health Street, Medical District, New Delhi 110001</span>
                </a>
              </li>
              <li>
                <a href="tel:+911800MEDICARE" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📞</span>
                  <span>+91 1800-MEDICARE</span>
                </a>
              </li>
              <li>
                <a href="mailto:support@medicare.in" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>✉️</span>
                  <span>support@medicare.in</span>
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                <span>🕒</span>
                <span>24/7 Support Available</span>
              </li>
            </ul>

            {/* Trust Badges */}
            <div style={{ marginTop: '24px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['HIPAA Compliant', 'ISO Certified', 'SSL Secured'].map(b => (
                <span key={b} style={{
                  background: 'rgba(14,165,233,0.1)',
                  border: '1px solid rgba(14,165,233,0.2)',
                  color: '#7dd3fc',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  fontWeight: '700',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.4px',
                }}>✓ {b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p style={{ color: 'var(--text-light)' }}>
            © 2026 MediCare+. All rights reserved. Built with ❤️ for better healthcare.
          </p>
          <div className="footer-bottom-links">
            <Link to="/" style={{ color: 'var(--text-light)', fontSize: '13px' }}>Privacy Policy</Link>
            <Link to="/" style={{ color: 'var(--text-light)', fontSize: '13px' }}>Terms of Service</Link>
            <Link to="/" style={{ color: 'var(--text-light)', fontSize: '13px' }}>Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;