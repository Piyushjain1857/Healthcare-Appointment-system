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
    <div className="card" onClick={() => navigate(`/doctors/${doctor.id}`)} style={{ cursor: 'pointer', padding: '20px' }}>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
        <div style={{ position: 'relative' }}>
          <img src={doctor.image} alt={doctor.name} style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} />
          {doctor.isOnline && <div style={{ position: 'absolute', bottom: '0', right: '0', width: '12px', height: '12px', background: '#10b981', border: '2px solid white', borderRadius: '50%' }}></div>}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800' }}>{doctor.name}</h3>
            {doctor.isOnline && <span className="badge" style={{ background: '#ecfdf5', color: '#059669', fontSize: '10px' }}>Online</span>}
          </div>
          <p style={{ color: 'var(--primary)', fontSize: '12px', fontWeight: '700' }}>{doctor.specialty}</p>
          <p style={{ color: 'var(--text-gray)', fontSize: '11px', marginTop: '2px' }}>{doctor.hospital}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < Math.floor(doctor.rating) ? '#f59e0b' : '#e2e8f0', fontSize: '12px' }}>★</span>
        ))}
        <span style={{ fontSize: '11px', color: 'var(--text-gray)', marginLeft: '4px', fontWeight: '700' }}>{doctor.rating} ({doctor.reviews})</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
        {doctor.tags?.map(tag => (
          <span key={tag} className="badge" style={{ background: '#f1f5f9', color: 'var(--text-gray)' }}>{tag}</span>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-gray)', fontWeight: '700' }}>EXPERIENCE</div>
            <div style={{ fontSize: '13px', fontWeight: '800' }}>{doctor.experience} yrs</div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-gray)', fontWeight: '700' }}>FEE</div>
            <div style={{ fontSize: '13px', fontWeight: '800' }}>₹{doctor.fee}</div>
          </div>
        </div>
        <button onClick={handleBook} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '12px', borderRadius: '8px' }}>Book Now</button>
      </div>
    </div>
  );
};

export default DoctorCard;