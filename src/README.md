# 🎓 eTuitionBD - Online Tuition Management Platform

A full-stack web application that connects students with qualified tutors across
Bangladesh. Students can post tuition requirements, tutors can apply, and admins
manage the entire platform.

---

## 🌐 Live Links

- **Frontend:**
  [https://your-frontend-url.netlify.app](https://your-frontend-url.netlify.app)
- **Backend:**
  [https://your-backend-url.vercel.app](https://your-backend-url.vercel.app)
- **Client Repo:**
  [https://github.com/your-username/etuitionbd-client](https://github.com/your-username/etuitionbd-client)
- **Server Repo:**
  [https://github.com/your-username/etuitionbd-server](https://github.com/your-username/etuitionbd-server)

---

## 👤 Test Credentials

| Role    | Email                  | Password    |
| ------- | ---------------------- | ----------- |
| Admin   | admin@etuitionbd.com   | Admin@123   |
| Student | student@etuitionbd.com | Student@123 |
| Tutor   | tutor@etuitionbd.com   | Tutor@123   |

---

## ✨ Key Features

### 🔐 Authentication

- Email & Password Register/Login
- Google Social Login
- JWT Token based authentication
- Role based access control (Student / Tutor / Admin)
- Private routes (protected from unauthorized access)

### 🎓 Student Features

- Post new tuition requirements
- View own tuition posts with status (Pending/Approved/Rejected)
- Delete own tuition posts
- View tutors who applied for their tuitions
- Accept or Reject tutor applications
- Secure payment via Stripe after accepting a tutor
- Payment history

### 🧑‍🏫 Tutor Features

- Browse all approved tuition posts
- Search and filter tuitions
- Apply for tuitions with qualifications and experience
- Cannot apply twice for the same tuition
- View own applications and their status
- Delete pending applications
- View ongoing (approved) tuitions
- Revenue history

### 🛡️ Admin Features

- Approve or Reject tuition posts
- Manage all users (View / Change Role / Delete)
- View all payments and transactions
- Dashboard with analytics and charts

### 🌐 Public Pages

- Home page with banner, latest tuitions, latest tutors, how it works, why
  choose us, reviews
- Tuition listing with search and filter
- Tutor listing page
- About page with CountUp animation
- Contact page with EmailJS
- 404 Error page

---

## 🛠️ Tech Stack

### Frontend

| Package                     | Purpose                   |
| --------------------------- | ------------------------- |
| React.js                    | UI Framework              |
| React Router DOM            | Routing                   |
| Tailwind CSS + DaisyUI      | Styling                   |
| TanStack Query              | Data fetching & caching   |
| Axios                       | HTTP requests             |
| Firebase                    | Authentication            |
| Stripe.js                   | Payment                   |
| Framer Motion               | Animations                |
| Recharts                    | Charts & graphs           |
| React Hook Form             | Form handling             |
| SweetAlert2                 | Alerts                    |
| Date-fns                    | Date formatting           |
| Swiper.js                   | Slider/Carousel           |
| React Responsive Carousel   | Banner slider             |
| React CountUp               | Number animation          |
| React Intersection Observer | Scroll detection          |
| Canvas Confetti             | Payment success animation |
| React Icons                 | Icons                     |

### Backend

| Package              | Purpose               |
| -------------------- | --------------------- |
| Node.js + Express.js | Server                |
| MongoDB Atlas        | Database              |
| Firebase Admin SDK   | Token verification    |
| Stripe               | Payment processing    |
| CORS                 | Cross origin requests |
| Dotenv               | Environment variables |
| Nodemon              | Development server    |

---

## 📁 Project Structure

### Frontend

src/ ├── assets/ ├── components/ │ └── shared/ ├── hooks/ │ ├── useAuth.js │ ├──
useAxios.js │ ├── useAxiosSecure.js │ └── useRole.js ├── layouts/ │ ├──
MainLayout.jsx │ └── DashboardLayout.jsx ├── pages/ │ ├── Home/ │ │ ├── Banner/
│ │ ├── LatestTuitions/ │ │ ├── LatestTutors/ │ │ ├── HowItWorks/ │ │ ├──
WhyChooseUs/ │ │ └── Reviews/ │ ├── Tuitions/ │ ├── TuitionDetails/ │ ├──
Tutors/ │ ├── About/ │ ├── Contact/ │ ├── Auth/ │ │ ├── Login/ │ │ └── Register/
│ ├── Dashboard/ │ │ ├── Admin/ │ │ │ ├── AdminDashboardHome/ │ │ │ ├──
ManageTuitions/ │ │ │ ├── UserManagement/ │ │ │ └── AdminPayments/ │ │ ├──
Student/ │ │ │ ├── StudentDashboardHome/ │ │ │ ├── MyTuitions/ │ │ │ ├──
AppliedTutors/ │ │ │ └── StudentPayments/ │ │ └── Tutor/ │ │ ├──
TutorDashboardHome/ │ │ ├── MyApplications/ │ │ ├── OngoingTuitions/ │ │ └──
RevenueHistory/ │ ├── PaymentSuccess/ │ ├── PaymentCancelled/ │ └── NotFound/
├── providers/ │ └── AuthProvider.jsx └── router/ └── router.jsx
