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

  if (!doctor) return <div className="container text-center" style={{ padding: '100px' }}><h2>Doctor not found</h2></div>;

  const update = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!formData.date || !formData.slot) { toast.error('Please select date and time'); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    dispatch(bookAppointment({
      doctorId: doctor.id, doctorName: doctor.name, specialty: doctor.specialty, hospital: doctor.hospital,
      date: formData.date, slot: formData.slot, patientName: formData.patientName, fee: doctor.fee,
    }));
    setSubmitting(false);
    setBooked(true);
    toast.success('Appointment booked!');
  };

  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(new Date(), i + 1);
    return { date, dStr: format(date, 'yyyy-MM-dd'), dayName: format(date, 'EEE'), dNum: format(date, 'd') };
  });

  if (booked) {
    return (
      <div className="container text-center" style={{ padding: '100px 20px' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto', padding: '40px' }}>
          <div style={{ fontSize: '72px', marginBottom: '20px' }}>🎉</div>
          <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '10px' }}>Booking Confirmed!</h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '30px' }}>Your appointment with {doctor.name} is scheduled successfully.</p>
          <div style={{ background: 'var(--bg-light)', padding: '24px', borderRadius: '16px', textAlign: 'left', marginBottom: '30px' }}>
            <p style={{ marginBottom: '12px', fontSize: '14px' }}><strong>Doctor:</strong> {doctor.name}</p>
            <p style={{ marginBottom: '12px', fontSize: '14px' }}><strong>Date:</strong> {format(new Date(formData.date), 'PPPP')}</p>
            <p style={{ marginBottom: '12px', fontSize: '14px' }}><strong>Time:</strong> {formData.slot}</p>
            <p style={{ fontSize: '14px' }}><strong>Amount:</strong> ₹{doctor.fee}</p>
          </div>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary" style={{ width: '100%', padding: '16px' }}>View in Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-fade-in">
      <div className="dashboard-header" style={{ background: 'var(--bg-light)', padding: '60px 0' }}>
        <div className="container">
          <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', color: 'var(--text-gray)', fontWeight: '700', background: 'white', border: '1px solid var(--border-color)', padding: '8px 16px', borderRadius: '8px' }}>← Back</button>
          <h1 style={{ fontSize: '36px', fontWeight: '800' }}>Book Your Appointment</h1>
          <p style={{ color: 'var(--text-gray)', marginTop: '5px' }}>Complete the steps below to confirm your visit</p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '900px', padding: '60px 0', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="card">
            <h3 style={{ marginBottom: '25px', fontSize: '20px', fontWeight: '800' }}>1. Select Date</h3>
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '15px' }}>
              {availableDates.map(d => (
                <button key={d.dStr} onClick={() => update('date', d.dStr)} style={{
                  padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)', minWidth: '85px', textAlign: 'center', cursor: 'pointer', transition: '0.2s',
                  background: formData.date === d.dStr ? 'var(--primary)' : 'white',
                  color: formData.date === d.dStr ? 'white' : 'var(--text-dark)',
                  boxShadow: formData.date === d.dStr ? '0 4px 12px rgba(0,142,204,0.3)' : 'none'
                }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', marginBottom: '5px', opacity: formData.date === d.dStr ? 0.9 : 0.6 }}>{d.dayName.toUpperCase()}</div>
                  <div style={{ fontSize: '20px', fontWeight: '800' }}>{d.dNum}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '25px', fontSize: '20px', fontWeight: '800' }}>2. Available Slots</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
              {doctor.slots?.map(s => (
                <button key={s} onClick={() => update('slot', s)} style={{
                  padding: '15px', borderRadius: '12px', border: '1px solid var(--border-color)', textAlign: 'center', cursor: 'pointer', transition: '0.2s',
                  background: formData.slot === s ? 'var(--primary)' : 'white',
                  color: formData.slot === s ? 'white' : 'var(--text-dark)',
                  fontWeight: '800', fontSize: '14px',
                  boxShadow: formData.slot === s ? '0 4px 12px rgba(0,142,204,0.3)' : 'none'
                }}>{s}</button>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '25px', fontSize: '20px', fontWeight: '800' }}>3. Patient Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label className="form-label">PATIENT NAME</label>
                <input type="text" value={formData.patientName} onChange={e => update('patientName', e.target.value)} className="form-input" placeholder="e.g. John Doe" />
              </div>
              <div className="form-group">
                <label className="form-label">AGE</label>
                <input type="number" value={formData.age} onChange={e => update('age', e.target.value)} className="form-input" placeholder="e.g. 25" />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '10px' }}>
              <label className="form-label">REASON FOR VISIT (OPTIONAL)</label>
              <textarea value={formData.reason} onChange={e => update('reason', e.target.value)} className="form-input" style={{ height: '100px' }} placeholder="Briefly describe your health concern..." />
            </div>
          </div>
        </div>

        <aside>
          <div className="card" style={{ position: 'sticky', top: '100px', padding: '0', overflow: 'hidden' }}>
            <div style={{ padding: '30px' }}>
              <h3 style={{ marginBottom: '20px', fontSize: '18px' }}>Booking Summary</h3>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '25px' }}>
                <img src={doctor.image} alt="" style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontWeight: '800', fontSize: '15px' }}>{doctor.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '700' }}>{doctor.specialty}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-gray)' }}>Consultation Fee</span>
                  <span style={{ fontWeight: '700' }}>₹{doctor.fee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-gray)' }}>Service Tax</span>
                  <span style={{ fontWeight: '700' }}>₹0</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', paddingTop: '15px', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontWeight: '800' }}>Total Amount</span>
                  <span style={{ fontWeight: '800', color: 'var(--primary)' }}>₹{doctor.fee}</span>
                </div>
              </div>
            </div>
            
            <div style={{ padding: '20px 30px', background: 'var(--bg-light)' }}>
              <button onClick={handleSubmit} disabled={submitting} className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '15px' }}>
                {submitting ? 'Confirming...' : 'Confirm Appointment'}
              </button>
              <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-gray)', marginTop: '15px' }}>By confirming, you agree to our terms of service.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BookingPage;