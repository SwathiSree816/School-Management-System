import DashboardLayout from "../../components/DashboardLayout";
import "./Admin.css";
import CalendarWidget from "../../components/CalendarWidget";
import RecentActivity from "../../components/RecentActivity";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaClipboardCheck,
  FaUserPlus,
  FaBullhorn,
  FaBell,
} from "react-icons/fa";

import {
  Bar,
  Pie,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Attendance %",
        data: [90, 95, 93, 97, 94],
        backgroundColor: "#0d6efd",
      },
    ],
  };

  const pieData = {
    labels: ["Students", "Teachers", "Parents"],
    datasets: [
      {
        data: [250, 35, 210],
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

      {/* Stats */}

      <div className="stats-grid">

        <div className="stat-card blue">

          <FaUserGraduate />

          <div>

            <h3>Students</h3>

            <h1>250</h1>

          </div>

        </div>

        <div className="stat-card green">

          <FaChalkboardTeacher />

          <div>

            <h3>Teachers</h3>

            <h1>35</h1>

          </div>

        </div>

        <div className="stat-card orange">

          <FaUsers />

          <div>

            <h3>Parents</h3>

            <h1>210</h1>

          </div>

        </div>

        <div className="stat-card red">

          <FaClipboardCheck />

          <div>

            <h3>Attendance</h3>

            <h1>94%</h1>

          </div>

        </div>

      </div>

      {/* Charts */}

      <div className="chart-grid">

        <div className="chart-card">

          <h3>Weekly Attendance</h3>

          <Bar data={barData} />

        </div>

        <div className="chart-card">

          <h3>School Members</h3>

          <Pie data={pieData} />

        </div>

      </div>

      {/* Bottom */}

      <div className="bottom-grid">

        <RecentActivity />
        <CalendarWidget />

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;