import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        School Management System
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/admin-login">
          Admin
        </Link>

        <Link to="/teacher-login">
          Teacher
        </Link>

        <Link to="/student-login">
          Student
        </Link>

        <Link to="/parent-login">
          Parent
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;