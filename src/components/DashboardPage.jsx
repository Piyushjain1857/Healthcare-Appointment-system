import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cancelAppointment } from '../store';
import toast from 'react-hot-toast';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const { appointments } = useSelector(state => state.appointments);
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcoming = appointments.filter(a => a.status === 'confirmed' || a.status === 'rescheduled');
  const past = appointments.filter(a => a.status === 'cancelled' || a.status === 'completed');
  const allDisplay = activeTab === 'upcoming' ? upcoming : activeTab === 'past' ? past : appointments;

  const handleCancel = (id) => {
    dispatch(cancelAppointment(id));
    toast.success('Appointment cancelled');
  };

  const statsData = [
    { label: 'Total', val: appointments.length, color: 'var(--primary)', icon: '📋' },
    { label: 'Upcoming', val: upcoming.length, color: 'var(--success)', icon: '📅' },
    { label: 'Completed', val: past.filter(a => a.status === 'completed').length, color: 'var(--secondary)', icon: '✅' },
    { label: 'Cancelled', val: past.filter(a => a.status === 'cancelled').length, color: 'var(--danger)', icon: '❌' },
  ];

  return (
    <div className="page-fade-in">
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #0a1628 0%, #0d2141 100%)',
        padding: '48px 0 40px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(14,165,233,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="dash-header-row">
            <div>
              <h1 className="dash-title">Welcome, {user?.name?.split(' ')[0]} 👋</h1>
              <p style={{ color: '#94a3b8', marginTop: '6px', fontFamily: 'Inter, sans-serif', fontSize: '15px' }}>
                Manage your appointments and healthcare journey
              </p>
            </div>
            <button
              onClick={() => navigate('/doctors')}
              className="btn btn-primary"
              style={{ flexShrink: 0 }}
            >
              + Book Appointment
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px var(--container-px) 60px' }}>
        {/* Stats Grid */}
        <div className="dash-stats-grid">
          {statsData.map(s => (
            <div key={s.label} className="card text-center" style={{ padding: '24px 16px' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
              <div style={{ fontSize: '32px', fontWeight: '900', color: s.color, marginBottom: '4px', fontFamily: 'Playfair Display, serif' }}>{s.val}</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', letterSpacing: '0.5px', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Appointments Card */}
        <div className="card" style={{ padding: '0', overflow: 'hidden', marginTop: '32px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: 'var(--bg-soft)' }}>
            {['upcoming', 'past', 'all'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1, padding: '18px 12px',
                  fontWeight: '700', fontSize: '13px',
                  textTransform: 'capitalize', letterSpacing: '0.3px',
                  color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                  borderBottom: activeTab === tab ? '3px solid var(--primary)' : '3px solid transparent',
                  background: 'transparent', transition: '0.2s',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {tab === 'upcoming' ? '🔜 Upcoming' : tab === 'past' ? '📂 Past' : '📋 All'}
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{ padding: 'clamp(20px, 4vw, 40px)' }}>
            {allDisplay.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                <div style={{ fontSize: '56px', marginBottom: '16px' }}>📅</div>
                <h3 style={{ marginBottom: '8px', fontSize: '20px' }}>No appointments yet</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
                  You don't have any appointments in this category.
                </p>
                <button onClick={() => navigate('/doctors')} className="btn btn-primary">
                  Book Now →
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {allDisplay.map(apt => (
                  <div key={apt.id} className="apt-card">
                    <div className="apt-card-left">
                      <div style={{
                        width: '48px', height: '48px', flexShrink: 0,
                        background: 'var(--primary-light)', borderRadius: '12px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px',
                      }}>🏥</div>
                      <div>
                        <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-dark)', fontFamily: 'Inter, sans-serif', marginBottom: '4px' }}>
                          {apt.doctorName}
                        </h4>
                        <p style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: '700', fontFamily: 'Inter, sans-serif', marginBottom: '3px' }}>
                          {apt.specialty}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>
                          📅 {apt.date} &nbsp;•&nbsp; 🕐 {apt.slot}
                        </p>
                      </div>
                    </div>
                    <div className="apt-card-right">
                      <span style={{
                        display: 'inline-block',
                        padding: '5px 12px', borderRadius: '20px',
                        fontSize: '11px', fontWeight: '800', letterSpacing: '0.5px',
                        fontFamily: 'Inter, sans-serif', textTransform: 'uppercase',
                        background: apt.status === 'confirmed' ? 'var(--success-light)' : apt.status === 'cancelled' ? 'var(--danger-light)' : 'var(--bg-soft)',
                        color: apt.status === 'confirmed' ? '#059669' : apt.status === 'cancelled' ? 'var(--danger)' : 'var(--text-muted)',
                      }}>
                        {apt.status}
                      </span>
                      {apt.status === 'confirmed' && (
                        <button
                          onClick={() => handleCancel(apt.id)}
                          className="btn btn-outline btn-sm"
                          style={{ color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.3)', marginTop: '8px' }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="dash-quick-links">
          {[
            { icon: '🔍', label: 'Find Doctors', path: '/doctors' },
            { icon: '👤', label: 'My Profile', path: '/profile' },
            { icon: '📋', label: 'All Records', path: '/dashboard' },
          ].map(q => (
            <button
              key={q.label}
              onClick={() => navigate(q.path)}
              className="card"
              style={{ textAlign: 'center', padding: '24px 16px', cursor: 'pointer', border: '1px solid var(--border)' }}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{q.icon}</div>
              <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-dark)', fontFamily: 'Inter, sans-serif' }}>{q.label}</div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .dash-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          flex-wrap: wrap;
        }
        .dash-title {
          font-size: clamp(24px, 4vw, 36px);
          color: #f1f5f9;
        }
        .dash-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .apt-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          background: var(--bg-soft);
          border: 1px solid var(--border);
          border-radius: var(--r-lg);
          padding: 18px 20px;
          transition: border-color 0.2s;
        }
        .apt-card:hover { border-color: var(--primary); }
        .apt-card-left { display: flex; gap: 14px; align-items: center; flex: 1; min-width: 0; }
        .apt-card-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; flex-shrink: 0; }
        .dash-quick-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 24px;
        }
        @media (max-width: 768px) {
          .dash-stats-grid { grid-template-columns: repeat(2, 1fr); }
          .dash-quick-links { grid-template-columns: repeat(3, 1fr); }
          .apt-card { flex-direction: column; align-items: flex-start; }
          .apt-card-right { flex-direction: row; align-items: center; width: 100%; justify-content: flex-start; }
        }
        @media (max-width: 480px) {
          .dash-quick-links { grid-template-columns: repeat(3, 1fr); gap: 10px; }
          .dash-stats-grid { gap: 12px; }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;