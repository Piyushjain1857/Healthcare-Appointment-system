import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './components/HomePage';
import DoctorsPage from './components/DoctorsPage';
import DoctorDetailPage from './components/DoctorDetailPage';
import BookingPage from './components/BookingPage';
import DashboardPage from './components/DashboardPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProfilePage from './components/ProfilePage';
import AboutPage from './components/AboutPage';
import NotFoundPage from './components/NotFoundPage';

const WithFooter = ({ children }) => (
  <>
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<WithFooter><HomePage /></WithFooter>} />
            <Route path="/doctors" element={<WithFooter><DoctorsPage /></WithFooter>} />
            <Route path="/doctors/:id" element={<WithFooter><DoctorDetailPage /></WithFooter>} />
            <Route path="/about" element={<WithFooter><AboutPage /></WithFooter>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/book/:doctorId" element={
              <ProtectedRoute><BookingPage /></ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute><DashboardPage /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><WithFooter><ProfilePage /></WithFooter></ProtectedRoute>
            } />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;