import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { doctors } from '../data/mockData';

const DoctorDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);
  const doctor = doctors.find(d => d.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="container text-center" style={{ padding: '100px' }}>
        <h2>Doctor not found</h2>
        <button onClick={() => navigate('/doctors')} className="btn btn-primary">Browse Doctors</button>
      </div>
    );
  }

  const handleBooking = () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    navigate(`/book/${doctor.id}`);
  };

  return (
    <div className="page-fade-in">
      <div className="dashboard-header section-padding" style={{ background: 'var(--bg-main)', borderBottom: 'none' }}>
        <div className="container">
          <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', color: 'var(--text-gray)', fontWeight: '700', background: 'white', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: '8px' }}>← Back</button>
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <img src={doctor.image} alt={doctor.name} style={{ width: '120px', height: '120px', borderRadius: '20px', objectFit: 'cover', border: '4px solid white', boxShadow: 'var(--shadow-md)' }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <h1 style={{ fontSize: '32px' }}>{doctor.name}</h1>
                {doctor.isOnline && <span className="badge" style={{ background: '#ecfdf5', color: '#059669' }}>Online</span>}
              </div>
              <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '18px' }}>{doctor.specialty}</p>
              <p style={{ color: 'var(--text-gray)', marginTop: '5px' }}>{doctor.hospital}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container section-padding" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="card">
            <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>About the Doctor</h3>
            <p style={{ color: 'var(--text-gray)', lineHeight: '1.8' }}>{doctor.about}</p>
            
            <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '30px' }}>
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: '700', marginBottom: '5px' }}>EXPERIENCE</p>
                <p style={{ fontWeight: '800', fontSize: '18px' }}>{doctor.experience} Years</p>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: '700', marginBottom: '5px' }}>RATING</p>
                <p style={{ fontWeight: '800', fontSize: '18px' }}>⭐ {doctor.rating}</p>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-gray)', fontWeight: '700', marginBottom: '5px' }}>FEE</p>
                <p style={{ fontWeight: '800', fontSize: '18px' }}>₹{doctor.fee}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '20px', fontSize: '20px' }}>Specializations</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {doctor.tags?.map(tag => (
                <span key={tag} className="badge" style={{ background: 'var(--bg-light)', color: 'var(--primary)', padding: '8px 16px', fontSize: '13px' }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <aside>
          <div className="card" style={{ position: 'sticky', top: '120px', border: '2px solid var(--primary)' }}>
            <h3 style={{ marginBottom: '20px' }}>Instant Booking</h3>
            <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: '12px', marginBottom: '25px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Availability</span>
                <span style={{ color: 'var(--success)', fontWeight: '800', fontSize: '14px' }}>✓ Available Today</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-gray)', fontSize: '14px' }}>Next Slot</span>
                <span style={{ color: 'var(--text-dark)', fontWeight: '800', fontSize: '14px' }}>09:00 AM</span>
              </div>
            </div>
            <button onClick={handleBooking} className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px' }}>Book Appointment</button>
            <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-gray)', marginTop: '15px' }}>No payment required upfront</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DoctorDetailPage;