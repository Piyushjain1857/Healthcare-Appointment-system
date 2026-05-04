import { configureStore, createSlice } from '@reduxjs/toolkit';
import { doctors } from './data/mockData';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isAuthenticated: !!localStorage.getItem('user'),
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('appointments');
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
    },
  },
});

const doctorSlice = createSlice({
  name: 'doctors',
  initialState: { doctors, filteredDoctors: doctors, searchQuery: '', selectedSpecialty: 'all' },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredDoctors = state.doctors.filter(d => 
        d.name.toLowerCase().includes(action.payload.toLowerCase()) || 
        d.specialty.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    setSpecialty: (state, action) => {
      state.selectedSpecialty = action.payload;
      state.filteredDoctors = action.payload === 'all' ? state.doctors : state.doctors.filter(d => d.specialty.toLowerCase() === action.payload.toLowerCase() || d.id === action.payload);
    },
  },
});

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: localStorage.getItem('appointments') ? JSON.parse(localStorage.getItem('appointments')) : [],
  },
  reducers: {
    bookAppointment: (state, action) => {
      state.appointments.unshift({ id: Date.now().toString(), ...action.payload, status: 'confirmed' });
      localStorage.setItem('appointments', JSON.stringify(state.appointments));
    },
    cancelAppointment: (state, action) => {
      const apt = state.appointments.find(a => a.id === action.payload);
      if (apt) {
        apt.status = 'cancelled';
        localStorage.setItem('appointments', JSON.stringify(state.appointments));
      }
    },
  },
});

export const { loginSuccess, logout, updateProfile } = authSlice.actions;
export const { setSearchQuery, setSpecialty } = doctorSlice.actions;
export const { bookAppointment, cancelAppointment } = appointmentSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    doctors: doctorSlice.reducer,
    appointments: appointmentSlice.reducer,
  },
});

export default store;
