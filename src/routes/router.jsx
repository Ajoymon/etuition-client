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
