import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="footer-logo">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'var(--secondary)', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '18px' }}>M</div>
                <span>MediCare+</span>
              </div>
            </Link>
            <p style={{ marginTop: '20px', lineHeight: '1.6', fontSize: '14px', maxWidth: '300px' }}>
              Your trusted healthcare partner. Book appointments with top doctors and manage your health journey seamlessly.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '30px' }}>
              {['T', 'F', 'I', 'L'].map(s => (
                <div key={s} style={{ width: '36px', height: '36px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700' }}>{s}</div>
              ))}
            </div>
          </div>
          
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/doctors">Find Doctors</Link></li>
              <li><Link to="/dashboard">Patient Dashboard</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4>Specialties</h4>
            <ul style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
              <li><Link to="/doctors?specialty=Cardiologist">Cardiologist</Link></li>
              <li><Link to="/doctors?specialty=Neurologist">Neurologist</Link></li>
              <li><Link to="/doctors?specialty=Dermatologist">Dermatologist</Link></li>
              <li><Link to="/doctors?specialty=Orthopedic">Orthopedic</Link></li>
              <li><Link to="/doctors?specialty=Pediatrician">Pediatrician</Link></li>
              <li><Link to="/doctors?specialty=Gynecologist">Gynecologist</Link></li>
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul style={{ color: '#94a3b8' }}>
              <li style={{ display: 'flex', gap: '10px' }}><span>📍</span> 123 Health Street, Medical District, New Delhi, India</li>
              <li style={{ display: 'flex', gap: '10px' }}><span>📞</span> +91 1800-MEDICARE</li>
              <li style={{ display: 'flex', gap: '10px' }}><span>✉️</span> support@medicare.in</li>
              <li style={{ display: 'flex', gap: '10px' }}><span>🕒</span> 24/7 Support Available</li>
            </ul>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
          <p>© 2026 MediCare+. All rights reserved. | Built with React + Vite</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
            <Link to="/">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;