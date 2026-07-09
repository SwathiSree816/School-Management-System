import DashboardLayout from "../../components/DashboardLayout";
import "./Teacher.css";

function Dashboard() {
  return (
    <DashboardLayout role="teacher" title="Teacher Dashboard">
      <div className="teacher-cards">

        <div className="teacher-card">
          <h3>Total Classes</h3>
          <h1>6</h1>
        </div>

        <div className="teacher-card">
          <h3>Today's Attendance</h3>
          <h1>95%</h1>
        </div>

        <div className="teacher-card">
          <h3>Announcements</h3>
          <h1>4</h1>
        </div>

      </div>

      <div className="teacher-actions">

        <h2>Quick Actions</h2>

        <button>Mark Attendance</button>
        <button>View Announcements</button>
        <button>Update Profile</button>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;