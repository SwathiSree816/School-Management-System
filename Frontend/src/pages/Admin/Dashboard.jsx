import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import API from "../../services/api";

import "./Admin.css";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaClipboardCheck,
} from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [parents, setParents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [notices, setNotices] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const [
        studentRes,
        teacherRes,
        parentRes,
        attendanceRes,
        noticeRes,
        announcementRes,
      ] = await Promise.all([
        API.get("/students"),
        API.get("/teachers"),
        API.get("/parents"),
        API.get("/attendance"),
        API.get("/notices"),
        API.get("/announcements"),
      ]);

      setStudents(studentRes.data);
      setTeachers(teacherRes.data);
      setParents(parentRes.data);
      setAttendance(attendanceRes.data);
      setNotices(noticeRes.data);
      setAnnouncements(announcementRes.data);

    } catch (error) {
      console.log(error);
    }
  };

  const attendancePercentage = attendance.length
    ? Math.round(
        attendance.reduce(
          (sum, item) =>
            sum +
            item.records.filter(
              (record) => record.status === "Present"
            ).length,
          0
        ) /
          attendance.reduce(
            (sum, item) => sum + item.records.length,
            0
          ) *
          100
      )
    : 0;

  const barData = {
    labels: [
      "Students",
      "Teachers",
      "Parents",
      "Notices",
      "Announcements",
    ],
    datasets: [
      {
        label: "Count",
        data: [
          students.length,
          teachers.length,
          parents.length,
          notices.length,
          announcements.length,
        ],
        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#fd7e14",
          "#dc3545",
          "#6f42c1",
        ],
      },
    ],
  };

  const pieData = {
    labels: ["Students", "Teachers", "Parents"],
    datasets: [
      {
        data: [
          students.length,
          teachers.length,
          parents.length,
        ],
        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#ffc107",
        ],
      },
    ],
  };

  return (
    <DashboardLayout role="admin" title="Admin Dashboard">

      <div className="stats-grid">

        <div className="stat-card blue">
          <FaUserGraduate />
          <div>
            <h3>Students</h3>
            <h2>{students.length}</h2>
          </div>
        </div>

        <div className="stat-card green">
          <FaChalkboardTeacher />
          <div>
            <h3>Teachers</h3>
            <h2>{teachers.length}</h2>
          </div>
        </div>

        <div className="stat-card orange">
          <FaUsers />
          <div>
            <h3>Parents</h3>
            <h2>{parents.length}</h2>
          </div>
        </div>

        <div className="stat-card red">
          <FaClipboardCheck />
          <div>
            <h3>Attendance</h3>
            <h2>{attendancePercentage}%</h2>
          </div>
        </div>

      </div>

      <div className="chart-grid">

        <div className="chart-card">
          <h3>School Overview</h3>
          <Bar data={barData} />
        </div>

        <div className="chart-card">
          <h3>Members Distribution</h3>
          <Pie data={pieData} />
        </div>

      </div>

      <div className="bottom-grid">

        <div className="activity-card">

          <h3>Latest Notices</h3>

          <ul>

            {notices.slice(0, 5).map((notice) => (
              <li key={notice._id}>
                {notice.title}
              </li>
            ))}

          </ul>

        </div>

        <div className="activity-card">

          <h3>Latest Announcements</h3>

          <ul>

            {announcements.slice(0, 5).map((announcement) => (
              <li key={announcement._id}>
                {announcement.title}
              </li>
            ))}

          </ul>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;