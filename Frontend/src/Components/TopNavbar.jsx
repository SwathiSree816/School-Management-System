import "./TopNavbar.css";
import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaBars,
} from "react-icons/fa";

function TopNavbar({ title }) {

  const today = new Date();

  return (
    <div className="top-navbar">

      <div className="left-nav">

        <FaBars className="menu-icon" />

        <h2>{title}</h2>

      </div>

      <div className="nav-right">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search..."
          />

        </div>

        <div className="notification">

          <FaBell />

          <span className="badge">3</span>

        </div>

        <div className="profile">

          <FaUserCircle />

          <span>Admin</span>

        </div>

        <div className="date">

          {today.toDateString()}

        </div>

      </div>

    </div>
  );
}

export default TopNavbar;