import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bookAppointment } from '../store';
import { doctors } from '../data/mockData';
import toast from 'react-hot-toast';
import { format, addDays } from 'date-fns';

const BookingPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const doctor = doctors.find(d => d.id === parseInt(doctorId));

  const [formData, setFormData] = useState({
    date: '', slot: '',
    patientName: user?.name || '', age: user?.age || '',
    reason: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);

  if (!doctor) return (
    <div className="container text-center" style={{ padding: '80px 20px' }}>
      <div style={{ fontSize: '56px', marginBottom: '16px' }}>😕</div>
      <h2 style={{ marginBottom: '12px' }}>Doctor Not Found</h2>
      <button onClick={() => navigate('/doctors')} className="btn btn-primary" style={{ marginTop: '8px' }}>Browse Doctors</button>
    </div>
  );

  const update = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!formData.date || !formData.slot) { toast.error('Please select date and time slot'); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    dispatch(bookAppointment({
      doctorId: doctor.id, doctorName: doctor.name, specialty: doctor.specialty,
      hospital: doctor.hospital, date: formData.date, slot: formData.slot,
      patientName: formData.patientName, fee: doctor.fee,
    }));
    setSubmitting(false);
    setBooked(true);
    toast.success('Appointment booked successfully!');
  };

  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(new Date(), i + 1);
    return { date, dStr: format(date, 'yyyy-MM-dd'), dayName: format(date, 'EEE'), dNum: format(date, 'd') };
  });

  if (booked) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <div className="card" style={{ maxWidth: '480px', width: '100%', padding: 'clamp(28px, 5vw, 48px)', textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ fontSize: 'clamp(22px, 4vw, 28px)', marginBottom: '10px' }}>Booking Confirmed!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '28px', fontFamily: 'Inter, sans-serif' }}>
            Your appointment with <strong>{doctor.name}</strong> is confirmed.
          </p>
          <div style={{
            background: 'var(--bg-soft)', border: '1px solid var(--border)',
            padding: '20px', borderRadius: '14px', textAlign: 'left', marginBottom: '24px',
          }}>
            {[
              ['Doctor', doctor.name],
              ['Date', format(new Date(formData.date), 'PPPP')],
              ['Time', formData.slot],
              ['Fee', `₹${doctor.fee}`],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                <span style={{ fontWeight: '700', color: 'var(--text-dark)', textAlign: 'right', maxWidth: '60%' }}>{v}</span>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
            View in Dashboard →
          </button>
          <button onClick={() => navigate('/doctors')} className="btn btn-ghost" style={{ width: '100%', marginTop: '10px' }}>
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-fade-in">
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #0a1628, #0d2141)',
        padding: 'clamp(40px, 6vw, 60px) 0',
      }}>
        <div className="container">
          <button
            onClick={() => navigate(-1)}
            style={{
              marginBottom: '16px', color: '#94a3b8', fontWeight: '600', fontSize: '14px',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              padding: '8px 16px', borderRadius: '8px', fontFamily: 'Inter, sans-serif',
            }}
          >
            ← Back
          </button>
          <h1 style={{ fontSize: 'clamp(26px, 4vw, 36px)', color: '#f1f5f9', marginBottom: '6px' }}>
            Book Your Appointment
          </h1>
          <p style={{ color: '#94a3b8', fontFamily: 'Inter, sans-serif', fontSize: '15px' }}>
            Complete the steps below to confirm your visit
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="container" style={{ padding: 'clamp(24px, 4vw, 60px) var(--container-px)' }}>
        <div className="booking-grid">
          {/* Left — Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Step 1: Date */}
            <div className="card">
              <h3 style={{ marginBottom: '20px', fontSize: '18px', fontFamily: 'Inter, sans-serif', fontWeight: '800' }}>
                1. Select Date
              </h3>
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px' }}>
                {availableDates.map(d => (
                  <button
                    key={d.dStr}
                    onClick={() => update('date', d.dStr)}
                    style={{
                      flexShrink: 0,
                      padding: '14px 10px', borderRadius: '12px',
                      border: `2px solid ${formData.date === d.dStr ? 'var(--primary)' : 'var(--border)'}`,
                      minWidth: '72px', textAlign: 'center', cursor: 'pointer',
                      background: formData.date === d.dStr ? 'var(--primary)' : 'var(--bg-white)',
                      color: formData.date === d.dStr ? 'white' : 'var(--text-dark)',
                      transition: '0.2s',
                      boxShadow: formData.date === d.dStr ? 'var(--shadow-primary)' : 'none',
                    }}
                  >
                    <div style={{ fontSize: '10px', fontWeight: '700', marginBottom: '4px', opacity: 0.8, fontFamily: 'Inter, sans-serif' }}>
                      {d.dayName.toUpperCase()}
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: '900', fontFamily: 'Inter, sans-serif' }}>{d.dNum}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Slots */}
            <div className="card">
              <h3 style={{ marginBottom: '20px', fontSize: '18px', fontFamily: 'Inter, sans-serif', fontWeight: '800' }}>
                2. Available Slots
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '10px' }}>
                {doctor.slots?.map(s => (
                  <button
                    key={s}
                    onClick={() => update('slot', s)}
                    style={{
                      padding: '13px 8px', borderRadius: '10px',
                      border: `2px solid ${formData.slot === s ? 'var(--primary)' : 'var(--border)'}`,
                      textAlign: 'center', cursor: 'pointer',
                      background: formData.slot === s ? 'var(--primary)' : 'var(--bg-white)',
                      color: formData.slot === s ? 'white' : 'var(--text-dark)',
                      fontWeight: '700', fontSize: '13px', fontFamily: 'Inter, sans-serif',
                      transition: '0.2s',
                      boxShadow: formData.slot === s ? 'var(--shadow-primary)' : 'none',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Patient Info */}
            <div className="card">
              <h3 style={{ marginBottom: '20px', fontSize: '18px', fontFamily: 'Inter, sans-serif', fontWeight: '800' }}>
                3. Patient Information
              </h3>
              <div className="booking-info-grid">
                <div className="form-group">
                  <label className="form-label">Patient Name</label>
                  <input
                    type="text" value={formData.patientName}
                    onChange={e => update('patientName', e.target.value)}
                    className="form-input" placeholder="e.g. John Doe"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input
                    type="number" value={formData.age}
                    onChange={e => update('age', e.target.value)}
                    className="form-input" placeholder="e.g. 28"
                  />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: '14px' }}>
                <label className="form-label">Reason for Visit (Optional)</label>
                <textarea
                  value={formData.reason}
                  onChange={e => update('reason', e.target.value)}
                  className="form-input"
                  style={{ height: '90px', resize: 'vertical' }}
                  placeholder="Briefly describe your health concern..."
                />
              </div>
            </div>

            {/* Mobile: Show confirm button here too */}
            <div className="booking-mobile-confirm">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '15px' }}
              >
                {submitting ? <><span className="spinner" style={{ width: '18px', height: '18px', marginRight: '8px' }} />Confirming...</> : 'Confirm Appointment'}
              </button>
            </div>
          </div>

          {/* Right — Summary Sidebar */}
          <aside className="booking-sidebar">
            <div className="card" style={{ position: 'sticky', top: 'calc(var(--nav-h) + 20px)', padding: '0', overflow: 'hidden' }}>
              {/* Doctor info */}
              <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '16px', fontFamily: 'Inter, sans-serif', fontWeight: '800', marginBottom: '16px' }}>
                  Booking Summary
                </h3>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img
                    src={doctor.image} alt={doctor.name}
                    style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', border: '2px solid var(--border)' }}
                  />
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '14px', color: 'var(--text-dark)', fontFamily: 'Inter, sans-serif' }}>{doctor.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '700', fontFamily: 'Inter, sans-serif' }}>{doctor.specialty}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', marginTop: '2px' }}>
                      ⭐ {doctor.rating} • {doctor.experience} yrs exp
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected details */}
              {(formData.date || formData.slot) && (
                <div style={{ padding: '16px 24px', background: 'var(--primary-light)', borderBottom: '1px solid var(--border)' }}>
                  {formData.date && (
                    <div style={{ fontSize: '13px', fontFamily: 'Inter, sans-serif', color: 'var(--primary-dark)', fontWeight: '600', marginBottom: '4px' }}>
                      📅 {format(new Date(formData.date), 'EEEE, MMM d')}
                    </div>
                  )}
                  {formData.slot && (
                    <div style={{ fontSize: '13px', fontFamily: 'Inter, sans-serif', color: 'var(--primary-dark)', fontWeight: '600' }}>
                      🕐 {formData.slot}
                    </div>
                  )}
                </div>
              )}

              {/* Fee breakdown */}
              <div style={{ padding: '20px 24px' }}>
                {[
                  ['Consultation Fee', `₹${doctor.fee}`],
                  ['Service Tax', '₹0'],
                ].map(([label, val]) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontFamily: 'Inter, sans-serif', marginBottom: '10px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                    <span style={{ fontWeight: '700' }}>{val}</span>
                  </div>
                ))}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: '16px', fontFamily: 'Inter, sans-serif',
                  paddingTop: '14px', borderTop: '1px solid var(--border)', marginTop: '4px',
                }}>
                  <span style={{ fontWeight: '800', color: 'var(--text-dark)' }}>Total</span>
                  <span style={{ fontWeight: '900', color: 'var(--primary)' }}>₹{doctor.fee}</span>
                </div>
              </div>

              {/* CTA */}
              <div style={{ padding: '16px 24px', background: 'var(--bg-soft)' }}>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '15px' }}
                >
                  {submitting
                    ? <><span className="spinner" style={{ width: '18px', height: '18px', marginRight: '8px' }} />Confirming...</>
                    : 'Confirm Appointment'
                  }
                </button>
                <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-muted)', marginTop: '10px', fontFamily: 'Inter, sans-serif' }}>
                  By confirming, you agree to our terms of service.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .booking-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 28px;
          align-items: start;
          max-width: 960px;
        }
        .booking-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .booking-sidebar { display: block; }
        .booking-mobile-confirm { display: none; }

        @media (max-width: 768px) {
          .booking-grid {
            grid-template-columns: 1fr;
          }
          .booking-sidebar { display: none; }
          .booking-mobile-confirm { display: block; }
          .booking-info-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .booking-info-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default BookingPage;