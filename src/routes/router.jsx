import { createBrowserRouter } from 'react-router-dom';
import Rootlayout from '../layout/Rootlayout';
import Home from '../pages/Home/Home/Home';
import Tuitions from '../pages/Tuitions/Tuitions';
import Tutors from '../pages/Tutors/Tutors';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import AuthLayout from '../layout/AuthLayout';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../layout/DashboardLayout';
import DashboardHome from '../Dashboard/DashboardHome/DashboardHome';
import PostNewTuition from '../Dashboard/PostNewTuition/PostNewTuition';
import MyTuition from '../Dashboard/MyTuition/MyTuition';
import ManageTuitions from '../Dashboard/ManageTuitions/ManageTuitions';
import TuitionDetails from '../pages/TuitionDatails/TuitionDatails';
import AppliedTutors from '../Dashboard/AppliedTutors/AppliedTutors';
import MyApplications from '../Dashboard/MyApplications/MyApplications';
import PaymentSuccess from '../Dashboard/Payment/PaymentSuccess';
import PaymentCancelled from '../Dashboard/Payment/PaymentCancelled';
import PaymentHistory from '../Dashboard/PaymentHistory/PaymentHistory';
import RevenueHistory from '../Dashboard/RevenueHistory/RevenueHistory';
import PaymentReports from '../Dashboard/PaymentReports/PaymentReports';
import UserManagement from '../Dashboard/UserManagement/UserManagement';
import NotFound from '../pages/NotFound/NotFound';
import ProfileSettings from '../Dashboard/ProfileSettings/ProfileSettings';
import OngoinTuitions from '../Dashboard/OngoingTuitions/OngoinTuitions';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Rootlayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'tuitions',
        element: (
          <PrivateRoute>
            <Tuitions></Tuitions>
          </PrivateRoute>
        ),
      },
      {
        path: 'tutors',
        Component: Tutors,
      },
      {
        path: 'about',
        Component: About,
      },
      {
        path: 'contact',
        Component: Contact,
      },
      {
        path: '/tuitions/:id',
        Component: TuitionDetails,
      },
      // 404 Page
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
  {
    path: 'dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: 'Post-New-Tuition',
        Component: PostNewTuition,
      },
      {
        path: 'My-Tuition',
        Component: MyTuition,
      },
      {
        path: 'Manage-Tuitions',
        Component: ManageTuitions,
      },
      {
        path: 'Applied-Tutors',
        Component: AppliedTutors,
      },
      {
        path: 'My-Applications',
        Component: MyApplications,
      },
      {
        path: 'User-Management',
        Component: UserManagement,
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess,
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled,
      },
      {
        path: 'Payment-History',
        Component: PaymentHistory,
      },
      {
        path: 'Revenue-History',
        Component: RevenueHistory,
      },
      {
        path: 'Payment-Reports',
        Component: PaymentReports,
      },
      {
        path: 'Profile-Setting',
        Component: ProfileSettings,
      },
      {
        path: 'Ongoing-Tuitions',
        Component: OngoinTuitions,
      },
      // 404 Page
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      },
    ],
  },
]);
