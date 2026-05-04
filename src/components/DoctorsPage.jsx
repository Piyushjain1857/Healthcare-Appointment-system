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
      <div className="dashboard-header section-padding" style={{ background: 'var(--bg-main)', borderBottom: 'none' }}>
        <div className="container">
          <h1 style={{ fontSize: '42px' }}>Find Your Doctor</h1>
          <p style={{ color: 'var(--text-gray)', marginTop: '10px' }}>Explore 500+ verified healthcare professionals</p>
          
          <div className="search-bar" style={{ marginTop: '40px', maxWidth: '800px' }}>
            <input type="text" placeholder="Search by name, specialty, or hospital..." value={searchQuery} onChange={e => dispatch(setSearchQuery(e.target.value))} />
            <select value={selectedSpecialty} onChange={e => dispatch(setSpecialty(e.target.value))} style={{ width: '200px', border: 'none', borderLeft: '1px solid var(--border)', background: 'transparent', outline: 'none', padding: '0 15px', fontWeight: '700' }}>
              {specialties.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </div>

      <div className="container section-padding">
        <div className="flex justify-between items-center mb-4">
          <p style={{ fontWeight: '700', color: 'var(--text-gray)' }}>Showing {filteredDoctors.length} doctors</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '13px' }}>Sort by: Top Rated</button>
          </div>
        </div>

        {filteredDoctors.length === 0 ? (
          <div className="card text-center" style={{ padding: '100px', background: 'transparent', border: '2px dashed var(--border)' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔍</div>
            <h2>No doctors found</h2>
            <p style={{ color: 'var(--text-gray)' }}>Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        ) : (
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {filteredDoctors.map(d => <DoctorCard key={d.id} doctor={d} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;