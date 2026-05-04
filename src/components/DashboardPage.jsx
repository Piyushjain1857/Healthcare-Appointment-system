import { useState } from 'react';
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

  return (
    <div className="page-fade-in">
      <div className="dashboard-header section-padding" style={{ background: 'var(--bg-main)', borderBottom: 'none' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '36px' }}>Welcome, {user?.name?.split(' ')[0]} 👋</h1>
            <p style={{ color: 'var(--text-gray)', marginTop: '5px' }}>Manage your appointments and healthcare journey</p>
          </div>
          <button onClick={() => navigate('/doctors')} className="btn btn-primary" style={{ padding: '16px 32px' }}>+ Book New Appointment</button>
        </div>
      </div>

      <div className="container section-padding">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '60px' }}>
          {[
            { label: 'TOTAL', val: appointments.length, color: 'var(--primary)' },
            { label: 'UPCOMING', val: upcoming.length, color: 'var(--success)' },
            { label: 'COMPLETED', val: past.filter(a => a.status === 'completed').length, color: 'var(--secondary)' },
            { label: 'CANCELLED', val: past.filter(a => a.status === 'danger').length, color: 'var(--danger)' }
          ].map(s => (
            <div key={s.label} className="card text-center" style={{ padding: '30px' }}>
              <div style={{ fontSize: '36px', fontWeight: '800', color: s.color, marginBottom: '5px' }}>{s.val}</div>
              <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-light)', letterSpacing: '1px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ display: 'flex', background: 'var(--white)', borderBottom: '1px solid var(--border-color)' }}>
            {['upcoming', 'past', 'all'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)} 
                style={{ 
                  flex: 1, 
                  padding: '20px', 
                  fontWeight: '800', 
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: activeTab === tab ? 'var(--primary)' : 'var(--text-gray)', 
                  borderBottom: activeTab === tab ? '4px solid var(--primary)' : 'none',
                  background: activeTab === tab ? 'var(--bg-light)' : 'transparent',
                  transition: '0.2s'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div style={{ padding: '40px' }}>
            {allDisplay.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px' }}>
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>📅</div>
                <h3 style={{ marginBottom: '10px' }}>No appointments found</h3>
                <p style={{ color: 'var(--text-gray)', marginBottom: '30px' }}>You don't have any appointments in this category.</p>
                <button onClick={() => navigate('/doctors')} className="btn btn-outline">Schedule Now</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {allDisplay.map(apt => (
                  <div key={apt.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', background: 'var(--bg-main)', border: 'none' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <div style={{ width: '50px', height: '50px', background: '#fff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: 'var(--shadow-sm)' }}>🏥</div>
                      <div>
                        <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '4px' }}>{apt.doctorName}</h4>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                          <span style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: '700' }}>{apt.specialty}</span>
                          <span style={{ fontSize: '12px', color: 'var(--text-light)' }}>📅 {apt.date} • 🕐 {apt.slot}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                      <span className="badge" style={{ 
                        padding: '8px 16px',
                        background: apt.status === 'confirmed' ? '#ecfdf5' : apt.status === 'cancelled' ? '#fef2f2' : '#f1f5f9',
                        color: apt.status === 'confirmed' ? 'var(--success)' : apt.status === 'cancelled' ? 'var(--danger)' : 'var(--text-gray)',
                        fontWeight: '800'
                      }}>{apt.status.toUpperCase()}</span>
                      {apt.status === 'confirmed' && (
                        <button onClick={() => handleCancel(apt.id)} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '12px', color: 'var(--danger)', borderColor: '#fee2e2' }}>Cancel</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;