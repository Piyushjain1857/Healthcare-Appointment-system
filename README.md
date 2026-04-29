

#  MediCare+ — Healthcare Appointment System

A full-featured, production-ready healthcare appointment booking UI built with **React + Vite**, following the capstone project specifications.

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| State Management | Redux Toolkit |
| Routing | React Router v6 |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Notifications | React Hot Toast |
| Date Utils | date-fns |
| Deployment | Netlify |

---

##  Features Implemented

### Core (per SOP)
- ✅ Doctor listing with search, filter by specialty, sort by rating/fee/experience
- ✅ Appointment booking UI — 4-step multi-step form with full validation
- ✅ Time slot selection with booked/available states
- ✅ Patient dashboard with appointment management, charts, health metrics
- ✅ Redux Toolkit state management (auth, appointments, doctors, UI slices)
- ✅ React Router with protected routes
- ✅ Lazy loading for all pages (performance optimization)
- ✅ Pagination on doctor listing
- ✅ Error boundaries on all pages

### Advanced Features (3+ required)
- ✅ **Authentication & Role-based access** — Register/Login with localStorage, protected routes
- ✅ **Pagination** — Doctor listing with page controls
- ✅ **Search + Filter + Sort** — Debounced search, specialty filter, multi-sort
- ✅ **Dashboard with charts** — Recharts bar chart for appointment history
- ✅ **Multi-step form with validation** — 4-step booking flow, comprehensive field validation
- ✅ **Error boundary implementation** — Class-based error boundaries wrapping all routes
- ✅ **Debounced API calls** — 350ms debounce on doctor search
- ✅ **Real-world UI patterns** — Skeleton loading, toast notifications, modals, responsive nav

### Bonus
- ✅ Password strength meter
- ✅ Profile management page
- ✅ About page
- ✅ 404 Not Found page
- ✅ Netlify SPA redirect config
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Light healthcare color palette (sky blue + teal)
- ✅ Playfair Display + DM Sans typography

---

##  Project Structure

```
src/
├── components/
│   ├── auth/          # ProtectedRoute
│   ├── doctor/        # DoctorCard
│   ├── layout/        # Navbar, Footer
│   └── ui/            # ErrorBoundary
├── data/
│   └── mockData.js    # Doctors, specialties, sample data
├── pages/
│   ├── HomePage.jsx
│   ├── DoctorsPage.jsx
│   ├── DoctorDetailPage.jsx
│   ├── BookingPage.jsx
│   ├── DashboardPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── ProfilePage.jsx
│   ├── AboutPage.jsx
│   └── NotFoundPage.jsx
├── store/
│   ├── index.js        # Redux store
│   ├── authSlice.js
│   ├── appointmentSlice.js
│   ├── doctorSlice.js
│   └── uiSlice.js
├── App.jsx             # Routes + lazy loading
├── main.jsx
└── index.css
```

---

##  Setup & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

##  Demo Login

```
Email:    demo@medicare.com
Password: demo123
```

Or register a new account using the Sign Up page.

---

##  Submission Checklist

- [x] GitHub repository
- [x] Project report (this README)
- [x] All features functional
- [x] Responsive design
- [x] Error boundaries
- [x] Form validation

---

*Built for the Capstone Project — Healthcare Domain | React + Redux + Tailwind CSS*