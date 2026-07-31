import React from 'react';
import useRole from '../../hooks/useRole';
import Loging from '../../Loding/Loging';
import AdminDashboradHome from './AdminDashboradHome';
import TutorDashboradHome from './TutorDashboradHome';
import StudentDashboradHome from './StudentDashboradHome';

const DashboardHome = () => {
  const { role, roleLoding } = useRole();
  if (roleLoding) {
    return <Loging></Loging>;
  }
  if (role === 'admin') {
    return <AdminDashboradHome></AdminDashboradHome>;
  } else if (role === 'tutor') {
    return <TutorDashboradHome></TutorDashboradHome>;
  } else {
    return <StudentDashboradHome></StudentDashboradHome>;
  }
};

export default DashboardHome;
