// import { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   NavLink,
// } from "react-router-dom";
// import TeacherDashboard from "./Components/TeacherDashboard";
// import AddTeacher from "./Components/AddTeacher";
// import MarkAttendance from "./Components/MarkAttendance";
// import ViewAttendance from "./Components/ViewAttendance";
// import TeacherProfile from "./Components/TeacherProfile";
// import Timetable from "./Components/Timetable";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import Home from "./Components/Home";
// import DashboardLayout from "./Components/DashboardLayout"

// const getInitials = (name = "") =>
//   name
//     .trim()
//     .split(/\s+/)
//     .slice(0, 2)
//     .map((w) => w[0]?.toUpperCase())
//     .join("");

// const loadSidebarProfile = () => {
//   try {
//     const s = localStorage.getItem("teacherProfile");
//     return s
//       ? JSON.parse(s)
//       : { name: "Parinita Piplewar", subject: "Computer Science" };
//   } catch {
//     return { name: "Parinita Piplewar", subject: "Computer Science" };
//   }
// };

// const NAV_ITEMS = [
//   {
//     to: "/teacher-dashboard",
//     icon: "dashboard",
//     label: "Dashboard",
//     end: true,
//   },
//   { to: "/add-teacher", icon: "person_add", label: "Add Teacher" },
//   { to: "/mark-attendance", icon: "how_to_reg", label: "Mark Attendance" },
//   { to: "/view-attendance", icon: "menu_book", label: "View Attendance" },
//   { to: "/timetable", icon: "calendar_month", label: "Timetable" },
//   { to: "/login", icon: "login", label: "Login" },
//   { to: "/register", icon: "person", label: "register" },
// ];

// function App() {
//   const [sidebarProfile, setSidebarProfile] = useState(loadSidebarProfile);

//   useEffect(() => {
//     const handler = (e) => setSidebarProfile(e.detail);
//     window.addEventListener("profileUpdated", handler);
//     return () => window.removeEventListener("profileUpdated", handler);
//   }, []);
//   return (
//     <Router>
//       <div style={{ display: "flex", minHeight: "100vh" }}>
//         {/* Sidebar */}
//         <nav
//           style={{
//             width: "256px",
//             minWidth: "256px",
//             position: "fixed",
//             left: 0,
//             top: 0,
//             bottom: 0,
//             background: "rgba(42, 20, 30, 0.78)",
//             backdropFilter: "blur(22px)",
//             WebkitBackdropFilter: "blur(22px)",
//             borderRight: "1px solid rgba(255,255,255,0.08)",
//             display: "flex",
//             flexDirection: "column",
//             padding: "32px 18px",
//             zIndex: 50,
//           }}
//         >
//           {/* Brand */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "12px",
//               marginBottom: "44px",
//             }}
//           >
//             <div
//               style={{
//                 width: "44px",
//                 height: "44px",
//                 borderRadius: "14px",
//                 background: "linear-gradient(135deg, #7c3aed, #ec4899)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexShrink: 0,
//                 boxShadow: "0 4px 14px rgba(124,58,237,0.4)",
//               }}
//             >
//               <span
//                 className="material-symbols-outlined"
//                 style={{
//                   color: "#fff",
//                   fontSize: "22px",
//                   fontVariationSettings: "'FILL' 1",
//                 }}
//               >
//                 school
//               </span>
//             </div>
//             <div>
//               <div
//                 style={{
//                   color: "#fff",
//                   fontFamily: "Outfit, sans-serif",
//                   fontWeight: 700,
//                   fontSize: "15px",
//                   lineHeight: 1.2,
//                 }}
//               >
//                 Teacher Portal
//               </div>
//               <div
//                 style={{
//                   color: "rgba(255,200,210,0.55)",
//                   fontSize: "11px",
//                   fontFamily: "Inter, sans-serif",
//                   marginTop: "2px",
//                 }}
//               >
//                 Management System
//               </div>
//             </div>
//           </div>

//           {/* Nav section label */}
//           <p
//             style={{
//               fontSize: "10px",
//               fontWeight: 700,
//               letterSpacing: "0.1em",
//               color: "rgba(255,180,195,0.4)",
//               fontFamily: "Inter, sans-serif",
//               textTransform: "uppercase",
//               marginBottom: "10px",
//               paddingLeft: "6px",
//             }}
//           >
//             Navigation
//           </p>

//           {/* Nav Items */}
//           <ul
//             style={{
//               listStyle: "none",
//               padding: 0,
//               margin: 0,
//               flex: 1,
//               display: "flex",
//               flexDirection: "column",
//               gap: "4px",
//             }}
//           >
//             {NAV_ITEMS.map(({ to, icon, label, end }) => (
//               <li key={to}>
//                 <NavLink
//                   to={to}
//                   end={end}
//                   style={({ isActive }) => ({
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "13px",
//                     padding: "11px 14px",
//                     borderRadius: "13px",
//                     textDecoration: "none",
//                     fontFamily: "Inter, sans-serif",
//                     fontSize: "13px",
//                     fontWeight: 600,
//                     letterSpacing: "0.02em",
//                     transition: "all 0.2s ease",
//                     background: isActive
//                       ? "linear-gradient(135deg, rgba(124,58,237,0.28), rgba(236,72,153,0.15))"
//                       : "transparent",
//                     color: isActive ? "#f3d8e8" : "rgba(255,200,215,0.5)",
//                     borderLeft: isActive
//                       ? "3px solid #ec4899"
//                       : "3px solid transparent",
//                   })}
//                 >
//                   <span
//                     className="material-symbols-outlined"
//                     style={{ fontSize: "19px", flexShrink: 0 }}
//                   >
//                     {icon}
//                   </span>
//                   {label}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>

//           {/* Divider */}
//           <div
//             style={{
//               borderTop: "1px solid rgba(255,200,210,0.1)",
//               marginBottom: "12px",
//             }}
//           />

//           {/* Profile Footer */}
//           <NavLink
//             to="/teacher-profile"
//             style={({ isActive }) => ({
//               display: "flex",
//               alignItems: "center",
//               gap: "12px",
//               padding: "11px 14px",
//               borderRadius: "13px",
//               textDecoration: "none",
//               transition: "all 0.2s ease",
//               background: isActive
//                 ? "rgba(236,72,153,0.15)"
//                 : "rgba(255,255,255,0.04)",
//               border: isActive
//                 ? "1px solid rgba(236,72,153,0.25)"
//                 : "1px solid transparent",
//             })}
//           >
//             <div
//               style={{
//                 width: "34px",
//                 height: "34px",
//                 borderRadius: "50%",
//                 background: "linear-gradient(135deg, #7c3aed, #ec4899)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 fontSize: "13px",
//                 fontWeight: 700,
//                 color: "#fff",
//                 fontFamily: "Outfit, sans-serif",
//                 flexShrink: 0,
//               }}
//             >
//               {getInitials(sidebarProfile.name)}
//             </div>
//             <div>
//               <div
//                 style={{
//                   color: "rgba(255,230,235,0.9)",
//                   fontFamily: "Inter, sans-serif",
//                   fontSize: "13px",
//                   fontWeight: 600,
//                 }}
//               >
//                 {sidebarProfile.name}
//               </div>
//               <div
//                 style={{
//                   color: "rgba(255,180,195,0.45)",
//                   fontFamily: "Inter, sans-serif",
//                   fontSize: "11px",
//                 }}
//               >
//                 {sidebarProfile.subject}
//               </div>
//             </div>
//             <span
//               className="material-symbols-outlined"
//               style={{
//                 fontSize: "16px",
//                 color: "rgba(255,180,195,0.35)",
//                 marginLeft: "auto",
//               }}
//             >
//               chevron_right
//             </span>
//           </NavLink>
//         </nav>

//         {/* Main Content */}
//         <main
//           style={{
//             flex: 1,
//             marginLeft: "256px",
//             padding: "44px 40px",
//             minHeight: "100vh",
//           }}
//         >
//           <Routes>
//             {/* Public Pages (No Sidebar) */}
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />

//             {/* Protected Pages (With Sidebar) */}
//             <Route path="/*" element={<DashboardLayout />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import DashboardLayout from "./Components/DashboardLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard Pages */}
        <Route path="/*" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}

export default App;