import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchQuery, setSpecialty } from '../store';
import DoctorCard from './DoctorCard';
import { doctors, specialties, faqs } from '../data/mockData';

// Animated particles helper
const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: Math.random() * 60 + 20,
  left: Math.random() * 100,
  duration: Math.random() * 15 + 10,
  delay: Math.random() * 10,
}));

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [countedStats, setCountedStats] = useState([0, 0, 0, 0]);
  const statsRef = useRef(null);
  const hasAnimated = useRef(false);

  const stats = [
    { num: 500, suffix: '+', label: 'Verified Doctors', icon: '👨‍⚕️' },
    { num: 50, suffix: 'K+', label: 'Happy Patients', icon: '😊' },
    { num: 20, suffix: '+', label: 'Specialties', icon: '🏥' },
    { num: 30, suffix: '+', label: 'Cities', icon: '🏙️' },
  ];

  const features = [
    { title: 'Find the Right Doctor', desc: 'Search by specialty, location, or symptom. Find verified doctors near you instantly.', icon: '🔍' },
    { title: 'Book in 2 Minutes', desc: 'Choose your time slot and confirm your appointment instantly — no waiting, no hassle.', icon: '📅' },
    { title: 'Video Consultations', desc: 'Connect with top doctors from the comfort of your home via secure, HD video calls.', icon: '💻' },
    { title: 'Digital Health Records', desc: 'Access your medical history, prescriptions, and test reports anytime, anywhere.', icon: '📋' },
  ];

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        stats.forEach((stat, i) => {
          let start = 0;
          const duration = 1800;
          const step = 16;
          const steps = duration / step;
          const increment = stat.num / steps;
          const timer = setInterval(() => {
            start += increment;
            if (start >= stat.num) {
              start = stat.num;
              clearInterval(timer);
            }
            setCountedStats(prev => {
              const next = [...prev];
              next[i] = Math.floor(start);
              return next;
            });
          }, step);
        });
      }
    }, { threshold: 0.3 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Reveal on scroll
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-fade-in">
      {/* Ambient Background */}
      <div className="page-bg" />

      {/* ── Hero ── */}
      <section className="hero-wrapper">
        {/* Particles */}
        <div className="hero-particles">
          {particles.map(p => (
            <div
              key={p.id}
              className="hero-particle"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.left}%`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        <div className="container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-left">
              <div className="hero-badge">
                <span className="dot" />
                500+ Verified Doctors Available Now
              </div>

              <h1 className="hero-title">
                Your Health,<br />
                <span className="highlight">Our Priority</span>
              </h1>

              <p className="hero-subtitle">
                Book appointments with India's top-rated doctors across 30+ cities.
                Fast, easy, and 100% secure. Your care starts here.
              </p>

              <div className="hero-search">
                <input
                  type="text"
                  placeholder="Search by doctor, specialty, hospital..."
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') { dispatch(setSearchQuery(query)); navigate('/doctors'); }
                  }}
                  id="hero-search-input"
                />
                <button
                  onClick={() => { dispatch(setSearchQuery(query)); navigate('/doctors'); }}
                  className="btn btn-primary"
                  style={{ flexShrink: 0 }}
                >
                  🔍 Find Doctors
                </button>
              </div>

              <div className="hero-tags">
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter, sans-serif' }}>Popular:</span>
                {[
                  { label: 'Cardiologist', id: 'cardio' },
                  { label: 'Dermatologist', id: 'derm' },
                  { label: 'Neurologist', id: 'neuro' },
                  { label: 'Orthopedic', id: 'ortho' },
                ].map(s => (
                  <button
                    key={s.id}
                    className="hero-tag"
                    onClick={() => { dispatch(setSpecialty(s.id)); navigate('/doctors'); }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="hero-visual">
              <div style={{ position: 'relative' }}>
                <div className="hero-card-main">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                    <div style={{
                      width: '56px', height: '56px',
                      background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                      borderRadius: '16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '28px',
                    }}>
                      👨‍⚕️
                    </div>
                    <div>
                      <div style={{ color: 'white', fontWeight: '700', fontSize: '15px', fontFamily: 'Inter, sans-serif' }}>Dr. Arjun Mehta</div>
                      <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '2px', fontFamily: 'Inter, sans-serif' }}>Cardiologist • 12 yrs exp</div>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                      <span style={{ background: 'rgba(16,185,129,0.2)', color: '#34d399', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', fontFamily: 'Inter, sans-serif', border: '1px solid rgba(16,185,129,0.3)' }}>● Online</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                    {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f59e0b', fontSize: '16px' }}>★</span>)}
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginLeft: '6px', fontFamily: 'Inter, sans-serif' }}>4.9 (243)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>NEXT SLOT</div>
                      <div style={{ color: 'white', fontSize: '13px', fontWeight: '700', fontFamily: 'Inter, sans-serif' }}>Today 3PM</div>
                    </div>
                    <div style={{ flex: 1, background: 'rgba(14,165,233,0.15)', borderRadius: '10px', padding: '12px', textAlign: 'center', border: '1px solid rgba(14,165,233,0.3)' }}>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '10px', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>FEE</div>
                      <div style={{ color: '#7dd3fc', fontSize: '13px', fontWeight: '700', fontFamily: 'Inter, sans-serif' }}>₹500</div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate('/doctors')}
                    style={{
                      width: '100%',
                      marginTop: '16px',
                      padding: '12px',
                      background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    Book Appointment →
                  </button>
                </div>

                {/* Floating Badges */}
                <div className="hero-floating-badge top-right">
                  <span style={{ color: '#34d399' }}>✓</span>
                  <div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}>Status</div>
                    <div style={{ fontFamily: 'Inter, sans-serif' }}>Confirmed</div>
                  </div>
                </div>

                <div className="hero-floating-badge bottom-left">
                  <span style={{ color: '#f59e0b', fontSize: '18px' }}>★</span>
                  <div>
                    <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Inter, sans-serif' }}>Rating</div>
                    <div style={{ fontFamily: 'Inter, sans-serif' }}>4.9 / 5.0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={s.label} className="stat-item">
                <span className="stat-icon">{s.icon}</span>
                <span className="stat-num">{countedStats[i]}{s.suffix}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Specialties ── */}
      <section className="container section-py">
        <div className="section-header reveal">
          <div className="section-tag">Browse by Specialty</div>
          <h2 className="section-title">Find Your Specialist</h2>
          <p className="section-subtitle">Choose from 20+ medical specialties and connect with the right expert</p>
        </div>
        <div className="specialty-grid reveal">
          {specialties.slice(1).map(s => (
            <button
              key={s.id}
              onClick={() => { dispatch(setSpecialty(s.id)); navigate('/doctors'); }}
              className="specialty-card"
            >
              <span className="specialty-icon">{s.icon}</span>
              <span className="specialty-label">{s.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Top Doctors ── */}
      <section style={{ background: 'var(--bg-soft)', padding: 'var(--section-py) 0' }}>
        <div className="container">
          <div className="flex justify-between items-center mb-8 reveal" style={{ flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div className="section-tag" style={{ marginBottom: '12px', display: 'inline-flex' }}>Top Rated</div>
              <h2 className="section-title" style={{ marginBottom: '6px' }}>Meet Our Doctors</h2>
              <p style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', fontSize: '15px' }}>Verified experts, trusted by thousands of patients</p>
            </div>
            <button
              onClick={() => navigate('/doctors')}
              className="btn btn-outline"
              style={{ flexShrink: 0 }}
            >
              View All Doctors →
            </button>
          </div>
          <div className="doctors-grid reveal">
            {doctors.map(d => <DoctorCard key={d.id} doctor={d} />)}
          </div>
        </div>
      </section>

      {/* ── Why MediCare ── */}
      <section className="why-section">
        <div className="container text-center">
          <div className="section-tag reveal" style={{ display: 'inline-flex', marginBottom: '16px' }}>Why Choose Us</div>
          <h2 className="section-title reveal">Why MediCare+?</h2>
          <p className="section-subtitle reveal">Everything you need for seamless, world-class healthcare — all in one place</p>
          <div className="feature-grid">
            {features.map((f, i) => (
              <div key={f.title} className="feature-card reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials Strip ── */}
      <section className="container section-py">
        <div className="section-header reveal">
          <div className="section-tag">Patient Stories</div>
          <h2 className="section-title">Loved by Patients</h2>
        </div>
        <div className="grid reveal" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {[
            { name: 'Priya Sharma', role: 'Patient', quote: 'Found a great cardiologist in minutes. The booking was seamless and the doctor was amazing!', rating: 5, avatar: 'P' },
            { name: 'Rahul Gupta', role: 'Patient', quote: 'Video consultation was crystal clear. Saved me 2 hours of travel. Highly recommend MediCare+!', rating: 5, avatar: 'R' },
            { name: 'Anita Singh', role: 'Patient', quote: 'Best healthcare platform I have used. My entire family now books appointments through here.', rating: 5, avatar: 'A' },
          ].map((t, i) => (
            <div key={i} className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= t.rating ? '#f59e0b' : '#e2e8f0', fontSize: '16px' }}>★</span>)}
              </div>
              <p style={{ color: 'var(--text-body)', fontSize: '14px', lineHeight: '1.8', marginBottom: '20px', fontFamily: 'Inter, sans-serif', fontStyle: 'italic' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px', height: '42px',
                  background: 'var(--grad-blue)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: '800', fontSize: '16px',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-dark)', fontFamily: 'Inter, sans-serif' }}>{t.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>Verified {t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQs ── */}
      <section style={{ background: 'var(--bg-soft)', padding: 'var(--section-py) 0' }}>
        <div className="container">
          <div className="section-header reveal">
            <div className="section-tag">Help Center</div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know about MediCare+</p>
          </div>
          <div className="faq-container reveal">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' open' : ''}`}>
                <button className="faq-header" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-chevron">▾</span>
                </button>
                {openFaq === i && <div className="faq-body">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container section-py">
        <div className="cta-section reveal">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-tag" style={{ display: 'inline-flex', marginBottom: '20px' }}>Start Today</div>
            <div style={{ fontSize: '64px', marginBottom: '24px', lineHeight: 1 }}>🩺</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(26px, 4vw, 40px)', marginBottom: '16px' }}>
              Ready to Take Charge of Your Health?
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '36px', fontSize: '17px', maxWidth: '520px', margin: '0 auto 36px', fontFamily: 'Inter, sans-serif', lineHeight: '1.7' }}>
              Join 50,000+ patients who trust MediCare+ for their healthcare needs. Sign up free and book your first appointment today.
            </p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/register')} className="btn btn-primary btn-lg">
                Get Started — It's Free
              </button>
              <button onClick={() => navigate('/doctors')} className="btn btn-outline btn-lg">
                Browse Doctors
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;