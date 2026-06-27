import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleBook = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) { navigate('/login'); return; }
    navigate(`/book/${doctor.id}`);
  };

  return (
    <div
      className="doctor-card"
      onClick={() => navigate(`/doctors/${doctor.id}`)}
    >
      {/* Header */}
      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <img
            src={doctor.image}
            alt={doctor.name}
            style={{
              width: '64px', height: '64px',
              borderRadius: '16px',
              objectFit: 'cover',
              border: '2px solid var(--border)',
            }}
          />
          {doctor.isOnline && (
            <div style={{
              position: 'absolute',
              bottom: '2px', right: '2px',
              width: '14px', height: '14px',
              background: 'var(--success)',
              border: '2px solid white',
              borderRadius: '50%',
              boxShadow: '0 0 0 2px rgba(16,185,129,0.2)',
            }} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
            <h3 style={{
              fontSize: '15px',
              fontWeight: '700',
              color: 'var(--text-dark)',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.3',
            }}>
              {doctor.name}
            </h3>
            {doctor.isOnline && (
              <span className="badge badge-success" style={{ flexShrink: 0, fontSize: '10px' }}>● Online</span>
            )}
          </div>
          <p style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: '700', marginTop: '3px', fontFamily: 'Inter, sans-serif' }}>
            {doctor.specialty}
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px', fontFamily: 'Inter, sans-serif' }}>
            🏥 {doctor.hospital}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{
            color: i < Math.floor(doctor.rating) ? '#f59e0b' : '#e2e8f0',
            fontSize: '13px',
          }}>★</span>
        ))}
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '4px', fontWeight: '700', fontFamily: 'Inter, sans-serif' }}>
          {doctor.rating} ({doctor.reviews} reviews)
        </span>
      </div>

      {/* Tags */}
      {doctor.tags?.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {doctor.tags.slice(0, 3).map(tag => (
            <span key={tag} className="badge" style={{ background: 'var(--bg-soft)', color: 'var(--text-muted)', fontSize: '10px' }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid var(--border)',
        paddingTop: '14px',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.5px', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' }}>
              Exp
            </div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-dark)', fontFamily: 'Inter, sans-serif' }}>
              {doctor.experience} yrs
            </div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.5px', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' }}>
              Fee
            </div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--primary)', fontFamily: 'Inter, sans-serif' }}>
              ₹{doctor.fee}
            </div>
          </div>
        </div>
        <button
          onClick={handleBook}
          className="btn btn-primary btn-sm"
          style={{ borderRadius: 'var(--r-md)' }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DoctorCard;