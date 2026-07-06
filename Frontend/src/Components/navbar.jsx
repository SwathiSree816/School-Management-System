import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="glass-panel" style={{ margin: "20px", display: "flex", gap: "20px", justifyContent: "center" }}>
      <Link to="/" className="clay-btn" style={{ textDecoration: "none" }}>Dashboard</Link>
      <Link to="/add-teacher" className="clay-btn" style={{ textDecoration: "none" }}>Add Teacher</Link>
      <Link to="/mark-attendance" className="clay-btn" style={{ textDecoration: "none" }}>Mark Attendance</Link>
      <Link to="/view-attendance" className="clay-btn" style={{ textDecoration: "none" }}>View Attendance</Link>
    </nav>
  );
}
