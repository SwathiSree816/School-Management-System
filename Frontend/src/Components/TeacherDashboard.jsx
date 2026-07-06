import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "../index.css";

const staticTeachers = [
  {
    initials: "PP", name: "Parinita Piplewar",      subject: "Computer Science",
    phone: "+91 74159 81925", experience: "1 Year",  status: "Active",
    bgColor: "#ede0ff", textColor: "#5a00c6"
  },
  {
    initials: "SP", name: "Swathi Sree Perumalla",  subject: "Mathematics",
    phone: "+91 88558 06170", experience: "1 Year",  status: "Active",
    bgColor: "#dbeafe", textColor: "#1e40af"
  },
  {
    initials: "RY", name: "Rajitha Yerragudi",       subject: "English",
    phone: "+91 63040 09045", experience: "1 Year",  status: "Active",
    bgColor: "#fce7f3", textColor: "#9d174d"
  },
  {
    initials: "JV", name: "Jakkam Sai Sri Vyshnavi", subject: "Social Studies",
    phone: "+91 75694 88308", experience: "1 Year",  status: "Active",
    bgColor: "#ede9fe", textColor: "#6d28d9"
  },
];


// Seeded weekly attendance trend data
const trendData = [
  { week: "Jun W3", rate: 94.2 },
  { week: "Jun W4", rate: 96.8 },
  { week: "Jul W1", rate: 95.1 },
  { week: "Jul W2", rate: 98.5 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "rgba(255,245,247,0.95)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "12px", padding: "10px 14px", fontFamily: "Inter, sans-serif", fontSize: "13px" }}>
        <p style={{ fontWeight: 600, color: "#2a1a1f", marginBottom: "2px" }}>{label}</p>
        <p style={{ color: "#7c3aed" }}>Attendance: <strong>{payload[0].value}%</strong></p>
      </div>
    );
  }
  return null;
};

export default function TeacherDashboard() {
  const [stats, setStats] = useState({ totalTeachers: 124 });
  const [todayAbsent] = useState(3);

  useEffect(() => {
    fetch("/api/teachers/dashboard")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(() => {});
  }, []);

  return (
    <div style={{ maxWidth: "1100px" }}>
      {/* Header */}
      <header style={{ marginBottom: "36px" }}>
        <h2 className="page-title">Teacher Dashboard</h2>
        <p className="page-subtitle">Welcome back! Here is what's happening today.</p>
      </header>

      {/* Stat Cards Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
        {/* Total Teachers */}
        <div className="clay-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
            <div>
              <p className="stat-label">Total Teachers</p>
              <p className="stat-value" style={{ fontSize: "38px" }}>{stats.totalTeachers}</p>
            </div>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(124,58,237,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ color: "#7c3aed", fontVariationSettings: "'FILL' 1" }}>groups</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#7c3aed" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>trending_up</span>
            <span style={{ fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>+4 this month</span>
          </div>
        </div>

        {/* Classes Today */}
        <div className="clay-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
            <div>
              <p className="stat-label">Classes Today</p>
              <p className="stat-value" style={{ fontSize: "38px" }}>42</p>
            </div>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(59,130,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ color: "#3b82f6", fontVariationSettings: "'FILL' 1" }}>school</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#3b82f6" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>schedule</span>
            <span style={{ fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>8 active now</span>
          </div>
        </div>

        {/* Attendance Rate */}
        <div className="clay-card" style={{ padding: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
            <div>
              <p className="stat-label">Attendance Rate</p>
              <p className="stat-value" style={{ fontSize: "38px" }}>98.5%</p>
            </div>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ color: "#10b981", fontVariationSettings: "'FILL' 1" }}>analytics</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#10b981" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>trending_up</span>
            <span style={{ fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>+1.2% this week</span>
          </div>
        </div>

        {/* Today's Absences — glows red if high */}
        <div className="clay-card" style={{
          padding: "24px",
          boxShadow: todayAbsent >= 5
            ? "12px 12px 24px #e0bfc8, -12px -12px 24px #ffffff, 0 0 20px rgba(239,68,68,0.25)"
            : undefined
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
            <div>
              <p className="stat-label">Today's Absent</p>
              <p className="stat-value" style={{ fontSize: "38px", color: todayAbsent >= 5 ? "#dc2626" : undefined }}>{todayAbsent}</p>
            </div>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "rgba(239,68,68,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="material-symbols-outlined" style={{ color: "#ef4444", fontVariationSettings: "'FILL' 1" }}>person_off</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: todayAbsent >= 5 ? "#dc2626" : "#4a4455" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>{todayAbsent >= 5 ? "warning" : "check_circle"}</span>
            <span style={{ fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif" }}>
              {todayAbsent >= 5 ? "Above threshold!" : "Within normal range"}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Trend Chart + Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px", marginBottom: "28px" }}>
        {/* Trend Chart */}
        <div className="glass-panel" style={{ padding: "28px" }}>
          <h3 className="section-title" style={{ marginBottom: "6px" }}>Weekly Attendance Trend</h3>
          <p style={{ fontSize: "12px", color: "#5a4450", fontFamily: "Inter, sans-serif", marginBottom: "20px" }}>Overall attendance % across all classes</p>
          <ResponsiveContainer width="100%" height={170}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(124,58,237,0.1)" />
              <XAxis dataKey="week" tick={{ fontFamily: "Inter, sans-serif", fontSize: 11, fill: "#5a4450" }} axisLine={false} tickLine={false} />
              <YAxis domain={[90, 100]} tick={{ fontFamily: "Inter, sans-serif", fontSize: 11, fill: "#5a4450" }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="rate" stroke="#7c3aed" strokeWidth={3} dot={{ fill: "#7c3aed", r: 5, strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Actions */}
        <div className="clay-card" style={{ padding: "28px", display: "flex", flexDirection: "column", gap: "12px" }}>
          <h3 className="section-title" style={{ marginBottom: "4px" }}>Quick Actions</h3>
          {[
            { to: "/add-teacher", icon: "person_add", label: "Add New Teacher", color: "#7c3aed" },
            { to: "/mark-attendance", icon: "how_to_reg", label: "Mark Attendance", color: "#3b82f6" },
            { to: "/view-attendance", icon: "menu_book", label: "View Attendance", color: "#10b981" },
            { to: "/timetable", icon: "calendar_month", label: "View Timetable", color: "#f59e0b" },
            { to: "/teacher-profile", icon: "manage_accounts", label: "My Profile", color: "#ec4899" },
          ].map(({ to, icon, label, color }) => (
            <Link key={to} to={to} style={{
              display: "flex", alignItems: "center", gap: "12px", padding: "11px 14px",
              borderRadius: "12px", textDecoration: "none", background: "rgba(255,245,247,0.6)",
              border: "1px solid rgba(255,255,255,0.8)", transition: "all 0.2s",
              fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500, color: "#2a1a1f"
            }}
              onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.8)"; e.currentTarget.style.transform = "translateX(4px)"; }}
              onMouseOut={e => { e.currentTarget.style.background = "rgba(255,245,247,0.6)"; e.currentTarget.style.transform = "translateX(0)"; }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "18px", color, fontVariationSettings: "'FILL' 1" }}>{icon}</span>
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Teachers Table */}
      <div className="glass-panel" style={{ padding: "28px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 className="section-title">Recent Teachers</h3>
          <Link to="/add-teacher" style={{
            display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "10px",
            background: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.9)",
            color: "#7c3aed", textDecoration: "none", fontSize: "12px", fontWeight: 600, fontFamily: "Inter, sans-serif"
          }}>
            View All <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>arrow_forward</span>
          </Link>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.4)" }}>
                {["Name", "Subject", "Phone", "Experience", "Status"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif", letterSpacing: "0.07em", textTransform: "uppercase", color: "#5a4450" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staticTeachers.map((t, i) => (
                <tr key={i} style={{ borderBottom: i < staticTeachers.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none", transition: "background 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
                  onMouseOut={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: t.bgColor, color: t.textColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, fontFamily: "Inter, sans-serif", flexShrink: 0 }}>{t.initials}</div>
                    <span style={{ fontWeight: 500, fontSize: "13px", color: "#2a1a1f", fontFamily: "Inter, sans-serif" }}>{t.name}</span>
                  </td>
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#5a4450", fontFamily: "Inter, sans-serif" }}>{t.subject}</td>
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#5a4450", fontFamily: "Inter, sans-serif" }}>{t.phone}</td>
                  <td style={{ padding: "14px 16px", fontSize: "13px", color: "#5a4450", fontFamily: "Inter, sans-serif" }}>{t.experience}</td>
                  <td style={{ padding: "14px 16px" }}>
                    <span className={`stat-badge ${t.status === "Active" ? "badge-active" : "badge-leave"}`}>{t.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
