import DashboardLayout from "../../components/DashboardLayout";
import "./Student.css";

function Dashboard() {
  return (
    <DashboardLayout
      role="student"
      title="Student Dashboard"
    >

      <div className="student-cards">

        <div className="student-card">
          <h3>Attendance</h3>
          <h1>94%</h1>
        </div>

        <div className="student-card">
          <h3>Notices</h3>
          <h1>5</h1>
        </div>

        <div className="student-card">
          <h3>Announcements</h3>
          <h1>3</h1>
        </div>

        <div className="student-card">
          <h3>Assignments</h3>
          <h1>7</h1>
        </div>

      </div>

      <div className="notice-box">

        <h3>Latest Notice</h3>

        <div className="notice-item">

          Mid-Term Exams start from 15th August.

        </div>

      </div>

      <div className="announcement-box">

        <h3>Latest Announcement</h3>

        <div className="announcement-item">

          Independence Day celebrations will be held on campus.

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;