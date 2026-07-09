import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaClipboardCheck,
  FaBullhorn,
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar({ role }) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const menus = {
    admin: [
      {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <FaTachometerAlt />,
      },
      { name: "Students", path: "/admin/students", icon: <FaUserGraduate /> },
      {
        name: "Teachers",
        path: "/admin/teachers",
        icon: <FaChalkboardTeacher />,
      },
      { name: "Parents", path: "/admin/parents", icon: <FaUsers /> },
      {
        name: "Attendance",
        path: "/admin/attendance",
        icon: <FaClipboardCheck />,
      },
      { name: "Notices", path: "/admin/notices", icon: <FaBell /> },
      {
        name: "Announcements",
        path: "/admin/announcements",
        icon: <FaBullhorn />,
      },
      { name: "Profile", path: "/admin/profile", icon: <FaUserCircle /> },
    ],

    teacher: [
      {
        name: "Dashboard",
        path: "/teacher/dashboard",
        icon: <FaTachometerAlt />,
      },
      {
        name: "Attendance",
        path: "/teacher/attendance",
        icon: <FaClipboardCheck />,
      },
      {
        name: "Announcements",
        path: "/teacher/announcements",
        icon: <FaBullhorn />,
      },
      { name: "Profile", path: "/teacher/profile", icon: <FaUserCircle /> },
    ],

    student: [
      {
        name: "Dashboard",
        path: "/student/dashboard",
        icon: <FaTachometerAlt />,
      },
      {
        name: "Attendance",
        path: "/student/attendance",
        icon: <FaClipboardCheck />,
      },
      { name: "Notices", path: "/student/notices", icon: <FaBell /> },
      {
        name: "Announcements",
        path: "/student/announcements",
        icon: <FaBullhorn />,
      },
      { name: "Profile", path: "/student/profile", icon: <FaUserCircle /> },
    ],

    parent: [
      {
        name: "Dashboard",
        path: "/parent/dashboard",
        icon: <FaTachometerAlt />,
      },
      {
        name: "Student Profile",
        path: "/parent/student-profile",
        icon: <FaUserGraduate />,
      },
      { name: "Notices", path: "/parent/notices", icon: <FaBell /> },
      {
        name: "Announcements",
        path: "/parent/announcements",
        icon: <FaBullhorn />,
      },
      { name: "Profile", path: "/parent/profile", icon: <FaUserCircle /> },
    ],
  };

  return (
    <div className="sidebar">
      <h2 className="logo">🎓 SMS</h2>

      <div className="menu">
        {menus[role].map((item) => (
          <NavLink key={item.path} to={item.path}>
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
