import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../store';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', age: user?.age || '' });

  const handleSave = () => {
    dispatch(updateProfile(form));
    toast.success('Profile updated!');
  };

  return (
    <div className="page-fade-in">
      <div className="dashboard-header section-padding" style={{ background: 'var(--bg-main)', borderBottom: 'none' }}>
        <div className="container">
          <h1 style={{ fontSize: '42px' }}>Profile Settings</h1>
          <p style={{ color: 'var(--text-gray)', marginTop: '10px' }}>Manage your personal information and account security</p>
        </div>
      </div>
      
      <div className="container section-padding" style={{ maxWidth: '700px' }}>
        <div className="card" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px', paddingBottom: '30px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ width: '80px', height: '80px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: '800' }}>
              {user?.name?.[0]}
            </div>
            <div>
              <h3 style={{ fontSize: '24px', marginBottom: '5px' }}>{user?.name}</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>Patient ID: #MED-9921</p>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '25px' }}>
            <div className="form-group">
              <label className="form-label" style={{ letterSpacing: '1px' }}>FULL NAME</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="form-input" style={{ background: 'var(--bg-main)', border: 'none', padding: '16px', borderRadius: '12px', outline: 'none', width: '100%' }} />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ letterSpacing: '1px' }}>PHONE NUMBER</label>
              <input type="text" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="form-input" style={{ background: 'var(--bg-main)', border: 'none', padding: '16px', borderRadius: '12px', outline: 'none', width: '100%' }} />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ letterSpacing: '1px' }}>AGE</label>
              <input type="number" value={form.age} onChange={e => setForm({...form, age: e.target.value})} className="form-input" style={{ background: 'var(--bg-main)', border: 'none', padding: '16px', borderRadius: '12px', outline: 'none', width: '100%' }} />
            </div>
          </div>
          
          <button onClick={handleSave} className="btn btn-primary" style={{ width: '100%', marginTop: '40px', padding: '16px' }}>Save Profile Changes</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;