import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="page-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', textAlign: 'center', padding: '20px' }}>
      <div style={{ maxWidth: '500px' }}>
        <div style={{ fontSize: '80px', marginBottom: '20px' }}>🏥</div>
        <h1 style={{ fontSize: '72px', color: 'var(--primary)', marginBottom: '10px' }}>404</h1>
        <h2 style={{ marginBottom: '15px' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-gray)', marginBottom: '30px' }}>Oops! The page you're looking for doesn't exist. Let's get you back to health.</p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button onClick={() => navigate('/')} className="btn btn-primary" style={{ padding: '12px 30px' }}>Go Home</button>
          <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ padding: '12px 30px' }}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;