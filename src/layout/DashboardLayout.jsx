import React from 'react';
import { Link, Outlet } from 'react-router';
import logoImg from '../assets/pngegg.png';
import {
  FaBook,
  FaChalkboardTeacher,
  FaChartBar,
  FaChartLine,
  FaClipboardList,
  FaFileAlt,
  FaMoneyCheckAlt,
  FaPlusCircle,
  FaUserCheck,
  FaUsersCog,
} from 'react-icons/fa';
import useRole from '../hooks/useRole';
import { CiSettings } from 'react-icons/ci';

const DashboardLayout = () => {
  const { role } = useRole();
  console.log(role);
  return (
    <div className="drawer lg:drawer-open w-full max-w-7xl mx-auto bg-gray-100">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">Navbar Title</div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-80">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            <li>
              <Link to="/">
                <img className="w-[40px] mx-auto" src={logoImg}></img>
              </Link>
            </li>

            {/* Home section */}
            <li>
              <Link
                to={'/dashboard'}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* only Student Linck */}
            {role === 'student' && (
              <>
                {/* Post New Tuition section*/}
                <li>
                  <Link
                    to="/dashboard/Post-New-Tuition"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Post New Tuition"
                  >
                    <FaPlusCircle />

                    <span className="is-drawer-close:hidden">
                      Post New Tuition
                    </span>
                  </Link>
                </li>
                {/* My Tuition */}
                <li>
                  <Link
                    to="/dashboard/My-Tuition"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Tuition "
                  >
                    <FaBook />

                    <span className="is-drawer-close:hidden">My Tuition </span>
                  </Link>
                </li>
                {/* Applied Tutors */}
                <li>
                  <Link
                    to="/dashboard/Applied-Tutors"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Applied Tutors"
                  >
                    <FaUserCheck></FaUserCheck>

                    <span className="is-drawer-close:hidden">
                      Applied Tutors
                    </span>
                  </Link>
                </li>

                {/* Payment History */}
                <li>
                  <Link
                    to="/dashboard/Payment-History"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Payment History"
                  >
                    <FaMoneyCheckAlt />

                    <span className="is-drawer-close:hidden">
                      Payment History
                    </span>
                  </Link>
                </li>
              </>
            )}
            {/* only Tutor Linck */}
            {role === 'tutor' && (
              <>
                {/* My Applications */}
                <li>
                  <Link
                    to="/dashboard/My-Applications"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Applications"
                  >
                    <FaFileAlt />

                    <span className="is-drawer-close:hidden">
                      My Applications
                    </span>
                  </Link>
                </li>
                {/* Revenue History */}
                <li>
                  <Link
                    to="/dashboard/Revenue-History"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Revenue History"
                  >
                    <FaChartLine />

                    <span className="is-drawer-close:hidden">
                      Revenue History
                    </span>
                  </Link>
                </li>
                {/* Ongoing Tuitions */}
                <li>
                  <Link
                    to="/dashboard/Ongoing-Tuitions"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Ongoing Tuitions"
                  >
                    <FaChalkboardTeacher />

                    <span className="is-drawer-close:hidden">
                      Ongoing Tuitions
                    </span>
                  </Link>
                </li>
              </>
            )}
            {/* only Admin Linck */}
            {role === 'admin' && (
              <>
                <li>
                  <Link
                    to="/dashboard/Manage-Tuitions"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Manage Tuitions"
                  >
                    <FaClipboardList />

                    <span className="is-drawer-close:hidden">
                      Manage Tuitions
                    </span>
                  </Link>
                </li>
                {/* Payment Reports */}
                <li>
                  <Link
                    to="/dashboard/Payment-Reports"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Payment Reports"
                  >
                    <FaChartBar />

                    <span className="is-drawer-close:hidden">
                      Payment Reports
                    </span>
                  </Link>
                </li>
                {/* User Management */}
                <li>
                  <Link
                    to="/dashboard/User-Management"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="User Management"
                  >
                    <FaUsersCog />

                    <span className="is-drawer-close:hidden">
                      User Management
                    </span>
                  </Link>
                </li>
              </>
            )}

            {/* Sating section */}
            <li>
              <Link
                to="/dashboard/Profile-Setting"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile Setting"
              >
                <CiSettings />

                <span className="is-drawer-close:hidden">Profile Setting</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
