import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  const values = [
    { title: 'Patient First', desc: 'Every feature, every decision — made with patient wellbeing and comfort at the center.', icon: '❤️', color: '#ef4444' },
    { title: 'Trust & Privacy', desc: 'Your health data is protected with enterprise-grade encryption and strict HIPAA compliance.', icon: '🔒', color: '#0ea5e9' },
    { title: 'Innovation', desc: 'We leverage AI and technology to simplify healthcare access for every Indian citizen.', icon: '💡', color: '#f59e0b' },
    { title: 'Accessibility', desc: 'Quality healthcare for everyone — from metros to small towns, in 30+ cities and growing.', icon: '🌐', color: '#10b981' },
  ];

  const milestones = [
    { year: '2020', event: 'MediCare+ founded in New Delhi with a mission to simplify healthcare' },
    { year: '2021', event: 'Launched in 5 major cities with 100+ verified doctors onboard' },
    { year: '2022', event: 'Introduced video consultations — 10,000+ teleconsults in first month' },
    { year: '2023', event: 'Expanded to 30+ cities. Crossed 25,000 registered patients' },
    { year: '2026', event: 'Now serving 50,000+ patients with 500+ specialist doctors' },
  ];

  const team = [
    { name: 'Dr. Arjun Mehta', role: 'Chief Medical Officer', avatar: 'A', bg: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' },
    { name: 'Sneha Kapoor', role: 'Chief Executive Officer', avatar: 'S', bg: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
    { name: 'Rahul Verma', role: 'Chief Technology Officer', avatar: 'R', bg: 'linear-gradient(135deg, #10b981, #34d399)' },
    { name: 'Priya Nair', role: 'Head of Patient Experience', avatar: 'P', bg: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
  ];

  return (
    <div className="page-fade-in">

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(160deg, #0a1628 0%, #0d2141 40%, #0a3260 100%)',
        padding: '100px 0 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 120%, rgba(14,165,233,0.12) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)',
            color: '#7dd3fc', padding: '6px 16px', borderRadius: '999px',
            fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px',
            textTransform: 'uppercase', fontFamily: 'Inter, sans-serif', marginBottom: '24px',
          }}>
            Our Story
          </span>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 60px)', color: '#f1f5f9', marginBottom: '20px' }}>
            About <span style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>MediCare+</span>
          </h1>
          <p style={{
            maxWidth: '680px', margin: '0 auto', color: '#94a3b8',
            fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: '1.8',
            fontFamily: 'Inter, sans-serif',
          }}>
            Founded in 2020, MediCare+ was built with a single mission — to eliminate the friction between patients and quality healthcare. We believe finding the right doctor should be simple, stress-free, and accessible to everyone.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="container section-py">
        <div className="section-header">
          <div className="section-tag">Our Values</div>
          <h2 className="section-title">What Drives Us</h2>
          <p className="section-subtitle">The principles that guide every decision we make at MediCare+</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {values.map(v => (
            <div key={v.title} className="card" style={{ textAlign: 'center', padding: '36px 24px' }}>
              <div style={{
                width: '64px', height: '64px',
                background: `${v.color}15`,
                border: `1px solid ${v.color}30`,
                borderRadius: '18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '30px', margin: '0 auto 20px',
              }}>{v.icon}</div>
              <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>{v.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.7', fontFamily: 'Inter, sans-serif' }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: 'var(--bg-soft)', padding: 'var(--section-py) 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Our Journey</div>
            <h2 className="section-title">Milestones</h2>
          </div>
          <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(180deg, #0ea5e9, #06b6d4)', borderRadius: '2px' }} />
            {milestones.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: '28px', marginBottom: '32px', position: 'relative' }}>
                <div style={{
                  width: '42px', height: '42px', flexShrink: 0,
                  background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  zIndex: 1, boxShadow: '0 0 0 4px var(--bg-soft), 0 8px 20px rgba(14,165,233,0.3)',
                }}>
                  <span style={{ color: 'white', fontSize: '11px', fontWeight: '800', fontFamily: 'Inter, sans-serif' }}>{m.year.slice(2)}</span>
                </div>
                <div className="card" style={{ flex: 1, padding: '20px 24px', marginBottom: 0 }}>
                  <div style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '13px', fontFamily: 'Inter, sans-serif', marginBottom: '6px' }}>{m.year}</div>
                  <p style={{ color: 'var(--text-body)', fontSize: '14px', lineHeight: '1.6', fontFamily: 'Inter, sans-serif' }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision + Map */}
      <section className="container section-py">
        <div className="card about-vision-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(28px, 4vw, 60px)',
          alignItems: 'center',
          padding: 'clamp(24px, 4vw, 60px)',
          background: 'linear-gradient(135deg, rgba(14,165,233,0.03) 0%, rgba(6,182,212,0.03) 100%)',
          border: '1px solid rgba(14,165,233,0.15)',
        }}>
          <div>
            <div className="section-tag" style={{ marginBottom: '20px', display: 'inline-flex' }}>Our Vision</div>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '18px' }}>
              A Healthier India, One Appointment at a Time
            </h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '18px', fontFamily: 'Inter, sans-serif', fontSize: '15px' }}>
              We aim to become India's most trusted healthcare platform — connecting millions of patients with top-tier medical professionals across every corner of the country.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '32px', fontFamily: 'Inter, sans-serif', fontSize: '15px' }}>
              From small towns to large metros, our goal is to ensure no health concern goes unaddressed due to lack of access or information.
            </p>
            <button onClick={() => navigate('/doctors')} className="btn btn-primary btn-lg">
              Browse Our Doctors →
            </button>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, var(--bg-soft), var(--bg-page))',
            height: '280px', borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '100px',
            border: '1px solid var(--border)',
            flexDirection: 'column', gap: '12px',
          }}>
            🇮🇳
            <span style={{ fontSize: '14px', fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)', fontWeight: '700' }}>30+ Cities & Growing</span>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: 'var(--bg-soft)', padding: 'var(--section-py) 0' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Leadership</div>
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">Passionate professionals committed to transforming healthcare in India</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {team.map(t => (
              <div key={t.name} className="card" style={{ textAlign: 'center', padding: '32px 20px' }}>
                <div style={{
                  width: '72px', height: '72px',
                  background: t.bg,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: '800', fontSize: '28px',
                  fontFamily: 'Inter, sans-serif',
                  margin: '0 auto 16px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                }}>{t.avatar}</div>
                <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>{t.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container section-py">
        <div className="cta-section">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-tag" style={{ display: 'inline-flex', marginBottom: '20px' }}>Get Started</div>
            <h2 className="section-title" style={{ marginBottom: '16px' }}>Ready to Experience Better Healthcare?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '36px', fontSize: '17px', maxWidth: '520px', margin: '0 auto 36px', fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}>
              Join thousands of patients who trust MediCare+ for their healthcare needs.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/register')} className="btn btn-primary btn-lg">Get Started Free</button>
              <button onClick={() => navigate('/doctors')} className="btn btn-outline btn-lg">Browse Doctors</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;