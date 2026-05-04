export const specialties = [
  { id: "all", label: "All Specialties", icon: "🏥" },
  { id: "cardio", label: "Cardiologist", icon: "❤️" },
  { id: "derm", label: "Dermatologist", icon: "🌿" },
  { id: "neuro", label: "Neurologist", icon: "🧠" },
  { id: "ortho", label: "Orthopedic", icon: "🦴" },
  { id: "ped", label: "Pediatrician", icon: "👶" },
  { id: "psych", label: "Psychiatrist", icon: "🐱" },
  { id: "gyn", label: "Gynecologist", icon: "🌸" },
  { id: "ophth", label: "Ophthalmologist", icon: "👁️" },
  { id: "dent", label: "Dentist", icon: "🦷" },
  { id: "gp", label: "General Physician", icon: "🩺" },
];

export const doctors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialty: "Cardiologist",
    hospital: "Apollo Hospital, Delhi",
    experience: 14,
    fee: 800,
    rating: 4.9,
    reviews: 312,
    image: "https://api.dicebear.com/7.x/personas/svg?seed=PriyaSharma&backgroundColor=b6e3f4",
    about: "Expert in interventional cardiology and heart failure management.",
    tags: ["Heart Disease", "ECG", "Angioplasty"],
    isOnline: true
  },
  {
    id: 2,
    name: "Dr. Rahul Mehta",
    specialty: "Neurologist",
    hospital: "Fortis Hospital, Gurgaon",
    experience: 11,
    fee: 1000,
    rating: 4.7,
    reviews: 241,
    image: "https://api.dicebear.com/7.x/personas/svg?seed=RahulMehta&backgroundColor=c0aede",
    about: "Specializes in stroke management and epilepsy.",
    tags: ["Stroke", "Epilepsy", "Migraine"],
    isOnline: true
  },
  {
    id: 3,
    name: "Dr. Meera Pillai",
    specialty: "Gynecologist",
    hospital: "Cloudnine Hospital, Bangalore",
    experience: 16,
    fee: 750,
    rating: 4.9,
    reviews: 502,
    image: "https://api.dicebear.com/7.x/personas/svg?seed=MeeraPillai&backgroundColor=fce4ec",
    about: "Specializing in high-risk pregnancy and women's health.",
    tags: ["Pregnancy", "PCOS", "Infertility"],
    isOnline: false
  },
  {
    id: 4,
    name: "Dr. Ananya Roy",
    specialty: "Dermatologist",
    hospital: "Max Hospital, Saket",
    experience: 8,
    fee: 600,
    rating: 4.8,
    reviews: 189,
    image: "https://api.dicebear.com/7.x/personas/svg?seed=AnanyaRoy&backgroundColor=ffdfbf",
    about: "Specializing in medical and cosmetic dermatology.",
    tags: ["Acne", "Eczema", "Hair Loss"],
    isOnline: true
  },
];

export const faqs = [
  { q: "How do I book an appointment?", a: "Search for a doctor, select a time slot, and confirm instantly." },
  { q: "Can I reschedule or cancel an appointment?", a: "Yes. Go to Dashboard -> My Appointments to manage your bookings." },
  { q: "Are video consultations available?", a: "Yes, look for the 'Online' badge on doctor profiles for video calls." },
];