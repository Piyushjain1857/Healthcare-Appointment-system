import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSpecialty } from '../store';
import DoctorCard from './DoctorCard';
import { specialties } from '../data/mockData';

const DoctorsPage = () => {
  const dispatch = useDispatch();
  const { filteredDoctors, searchQuery, selectedSpecialty } = useSelector(state => state.doctors);

  return (
    <div className="page-fade-in">
      {/* Page Header */}
      <div style={{
        background: 'linear-gradient(160deg, #0a1628 0%, #0d2141 40%, #0a3260 100%)',
        padding: '72px 0 60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(14,165,233,0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: '8px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(14,165,233,0.15)', border: '1px solid rgba(14,165,233,0.3)',
              color: '#7dd3fc', padding: '5px 14px', borderRadius: '999px',
              fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px',
              textTransform: 'uppercase', fontFamily: 'Inter, sans-serif',
            }}>
              <span style={{ width: '6px', height: '6px', background: '#7dd3fc', borderRadius: '50%', display: 'inline-block' }} />
              500+ Verified Professionals
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: '#f1f5f9', marginBottom: '12px' }}>
            Find Your Doctor
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '17px', fontFamily: 'Inter, sans-serif', marginBottom: '40px' }}>
            Explore 500+ verified healthcare professionals across 20+ specialties
          </p>

          {/* Search Bar */}
          <div style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '16px',
            padding: '8px',
            display: 'flex',
            gap: '8px',
            maxWidth: '800px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
            <input
              type="text"
              placeholder="🔍  Search by name, specialty, or hospital..."
              value={searchQuery}
              onChange={e => dispatch(setSearchQuery(e.target.value))}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                padding: '12px 16px',
                fontSize: '15px',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                minWidth: 0,
              }}
            />
            <select
              value={selectedSpecialty}
              onChange={e => dispatch(setSpecialty(e.target.value))}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '10px',
                color: '#fff',
                outline: 'none',
                padding: '0 14px',
                fontWeight: '700',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                minWidth: '160px',
              }}
            >
              {specialties.map(s => (
                <option key={s.id} value={s.id} style={{ background: '#0d2141', color: '#fff' }}>
                  {s.label}
                </option>
              ))}
            </select>
            <button className="btn btn-primary" style={{ flexShrink: 0 }}>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container" style={{ padding: '48px var(--container-px)' }}>
        {/* Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <div>
            <p style={{ fontWeight: '700', color: 'var(--text-dark)', fontFamily: 'Inter, sans-serif', fontSize: '15px' }}>
              {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
            </p>
            {(searchQuery || selectedSpecialty !== 'all') && (
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', marginTop: '2px' }}>
                {searchQuery && `Searching for "${searchQuery}"`}
                {searchQuery && selectedSpecialty !== 'all' && ' • '}
                {selectedSpecialty !== 'all' && `Filtered by specialty`}
              </p>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-outline btn-sm">⬆ Sort: Top Rated</button>
            <button className="btn btn-outline btn-sm">🎛 Filter</button>
          </div>
        </div>

        {/* Grid or Empty */}
        {filteredDoctors.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            background: 'var(--bg-white)',
            border: '2px dashed var(--border)',
            borderRadius: '24px',
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
            <h2 style={{ marginBottom: '12px', fontSize: '24px' }}>No Doctors Found</h2>
            <p style={{ color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif', marginBottom: '28px' }}>
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => { dispatch(setSearchQuery('')); dispatch(setSpecialty('all')); }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="doctors-grid">
            {filteredDoctors.map(d => <DoctorCard key={d.id} doctor={d} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;