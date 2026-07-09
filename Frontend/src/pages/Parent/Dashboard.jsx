import DashboardLayout from "../../components/DashboardLayout";
import "./Parent.css";

function Dashboard() {
  return (
    <DashboardLayout role="parent" title="Parent Dashboard">

      <div className="parent-cards">

        <div className="parent-card">
          <h3>Attendance</h3>
          <h1>94%</h1>
        </div>

        <div className="parent-card">
          <h3>Notices</h3>
          <h1>6</h1>
        </div>

        <div className="parent-card">
          <h3>Announcements</h3>
          <h1>3</h1>
        </div>

      </div>

      <div className="info-box">
        <h3>Welcome Parent</h3>

        <p>
          Here you can monitor your child's attendance,
          announcements and notices from the school.
        </p>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;