import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();
  
  const values = [
    { title: 'Patient First', desc: 'Every decision we make starts with patient wellbeing and experience.', icon: '❤️' },
    { title: 'Trust & Privacy', desc: 'Your health data is protected with enterprise-grade security.', icon: '🔒' },
    { title: 'Innovation', desc: 'We leverage technology to simplify healthcare access for everyone.', icon: '💡' }
  ];

  return (
    <div className="page-fade-in">
      <section className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '56px', fontWeight: '800' }}>About <span style={{ color: 'var(--primary)' }}>MediCare+</span></h1>
        <p style={{ maxWidth: '800px', margin: '30px auto', color: 'var(--text-gray)', fontSize: '18px', lineHeight: '1.8' }}>
          MediCare+ was founded with a single mission: to eliminate the friction between patients and quality healthcare. We believe that finding the right doctor should be simple, stress-free, and accessible to everyone.
        </p>
      </section>

      <section className="why-section">
        <div className="container">
          <div className="why-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {values.map(v => (
              <div key={v.title} className="why-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '20px' }}>{v.icon}</div>
                <h3 style={{ marginBottom: '15px' }}>{v.title}</h3>
                <p style={{ opacity: 0.8, fontSize: '14px', lineHeight: '1.6' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '100px 0' }}>
        <div className="card" style={{ padding: '60px', borderRadius: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '20px' }}>Our Vision for India</h2>
            <p style={{ color: 'var(--text-gray)', lineHeight: '1.8', marginBottom: '20px' }}>
              We aim to become India's most trusted healthcare platform by connecting millions of patients with top-tier medical professionals. From small towns to large metros, our goal is to ensure no health concern goes unaddressed due to lack of access.
            </p>
            <button onClick={() => navigate('/doctors')} className="btn btn-primary">Browse Our Doctors</button>
          </div>
          <div style={{ background: 'var(--bg-light)', height: '300px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '100px' }}>
            🇮🇳
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;