import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchQuery, setSpecialty } from '../store';
import DoctorCard from './DoctorCard';
import { doctors, specialties, faqs } from '../data/mockData';

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const stats = [
    { num: '500+', label: 'Verified Doctors', icon: '👨‍⚕️' },
    { num: '50K+', label: 'Happy Patients', icon: '😊' },
    { num: '20+', label: 'Specialties', icon: '🏥' },
    { num: '30+', label: 'Cities', icon: '🏙️' }
  ];

  const features = [
    { title: 'Find the Right Doctor', desc: 'Search by specialty, location, or symptom and find verified doctors near you.', icon: '🔍' },
    { title: 'Book Instantly', desc: 'Choose your time slot and book appointments in under 2 minutes, no waiting.', icon: '📅' },
    { title: 'Video Consultations', desc: 'Connect with doctors from the comfort of your home via secure video calls.', icon: '💻' },
    { title: 'Digital Records', desc: 'Access your medical history, prescriptions, and reports anytime, anywhere.', icon: '📋' }
  ];

  return (
    <div className="page-fade-in">
      {/* Hero Section */}
      <section className="container hero-section">
        <div className="hero-text">
          <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--primary)', marginBottom: '20px' }}>• 500+ Doctors Available Now</span>
          <h1>Your Health, <span style={{ color: 'var(--secondary)' }}>Our Priority</span></h1>
          <p>Book appointments with top-rated doctors across India. Fast, easy, and 100% secure. Your care starts here.</p>
          
          <div className="search-bar">
            <input type="text" placeholder="Search by doctor, specialty, hospital..." style={{ flex: 1, border: 'none', outline: 'none' }} value={query} onChange={e => setQuery(e.target.value)} />
            <button onClick={() => { dispatch(setSearchQuery(query)); navigate('/doctors'); }} className="btn btn-primary">Find Doctors</button>
          </div>
          <p style={{ marginTop: '20px', fontSize: '13px', color: 'var(--text-gray)' }}>
            Popular: <span style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => { dispatch(setSpecialty('cardio')); navigate('/doctors'); }}>Cardiologist</span>, 
            <span style={{ color: 'var(--primary)', cursor: 'pointer', marginLeft: '5px' }} onClick={() => { dispatch(setSpecialty('derm')); navigate('/doctors'); }}>Dermatologist</span>
          </p>
        </div>
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '400px', height: '400px', background: 'var(--bg-main)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.02)' }}>
            <span style={{ fontSize: '150px' }}>🏥</span>
          </div>
          <div className="card" style={{ position: 'absolute', top: '40px', right: '-20px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '12px' }}>
            <span style={{ color: 'var(--success)' }}>✓</span> <span style={{ fontSize: '13px', fontWeight: '800' }}>Appointment Confirmed</span>
          </div>
          <div className="card" style={{ position: 'absolute', bottom: '60px', left: '-20px', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '12px' }}>
            <span style={{ color: 'var(--warning)' }}>★</span> <span style={{ fontSize: '13px', fontWeight: '800' }}>4.9 Rating</span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="container stats-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-item">
            <span className="icon">{s.icon}</span>
            <h3>{s.num}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* Specialties Grid */}
      <section className="container section-padding">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {specialties.slice(1).map(s => (
            <button key={s.id} onClick={() => { dispatch(setSpecialty(s.id)); navigate('/doctors'); }} className="card text-center" style={{ padding: '30px 15px' }}>
              <div style={{ fontSize: '32px', marginBottom: '15px' }}>{s.icon}</div>
              <span style={{ fontSize: '14px', fontWeight: '800' }}>{s.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Top Doctors */}
      <section className="container" style={{ padding: '80px 0' }}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 style={{ fontSize: '36px', fontWeight: '800' }}>Top Rated Doctors</h2>
            <p style={{ color: 'var(--text-gray)' }}>Verified experts, trusted by thousands</p>
          </div>
          <button onClick={() => navigate('/doctors')} style={{ color: 'var(--primary)', fontWeight: '700' }}>View all →</button>
        </div>
        <div className="features-grid">
          {doctors.map(d => <DoctorCard key={d.id} doctor={d} />)}
        </div>
      </section>

      {/* Why Section */}
      <section className="why-medicare">
        <div className="container text-center">
          <h2 style={{ fontSize: '42px', marginBottom: '15px' }}>Why MediCare+?</h2>
          <p style={{ opacity: 0.9 }}>Everything you need for seamless healthcare</p>
          <div className="feature-grid">
            {features.map(f => (
              <div key={f.title} className="feature-card">
                <div style={{ fontSize: '32px', marginBottom: '20px' }}>{f.icon}</div>
                <h3 style={{ marginBottom: '15px', fontSize: '18px' }}>{f.title}</h3>
                <p style={{ fontSize: '14px', opacity: 0.8 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container section-padding">
        <div className="text-center mb-40">
          <h2 style={{ fontSize: '42px' }}>Frequently Asked Questions</h2>
        </div>
        <div className="faq-container">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-header" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                {faq.q}
                <span>{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && <div style={{ padding: '0 30px 24px', color: 'var(--text-gray)' }}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container" style={{ paddingBottom: '100px' }}>
        <div className="card text-center" style={{ background: 'var(--grad-surface)', border: 'none', padding: '100px', borderRadius: '40px' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🩺</div>
          <h2 style={{ fontSize: '42px', marginBottom: '24px' }}>Ready to Take Charge of Your Health?</h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '40px', fontSize: '18px', maxWidth: '600px', margin: '0 auto 40px' }}>Join 50,000+ patients who trust MediCare+ for their healthcare needs.</p>
          <button onClick={() => navigate('/register')} className="btn btn-primary" style={{ padding: '18px 60px', fontSize: '16px' }}>Get Started — It's Free</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;