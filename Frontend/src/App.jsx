// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // // Landing Page
// // import Landing from "./pages/Landing/Landing";

// // // Login Pages
// // import AdminLogin from "./pages/Login/AdminLogin";
// // import TeacherLogin from "./pages/Login/TeacherLogin";
// // import StudentLogin from "./pages/Login/StudentLogin";
// // import ParentLogin from "./pages/Login/ParentLogin";

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>

// //         {/* Landing Page */}
// //         <Route path="/" element={<Landing />} />

// //         {/* Login Pages */}
// //         <Route path="/admin-login" element={<AdminLogin />} />
// //         <Route path="/teacher-login" element={<TeacherLogin />} />
// //         <Route path="/student-login" element={<StudentLogin />} />
// //         <Route path="/parent-login" element={<ParentLogin />} />

// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Landing Page
// import Landing from "./pages/Landing/Landing";

// // Login Pages
// import AdminLogin from "./pages/Login/AdminLogin";
// import TeacherLogin from "./pages/Login/TeacherLogin";
// import StudentLogin from "./pages/Login/StudentLogin";
// import ParentLogin from "./pages/Login/ParentLogin";

// // Admin Pages
// import AdminDashboard from "./pages/Admin/Dashboard";
// import Students from "./pages/Admin/Students";
// import Teachers from "./pages/Admin/Teachers";
// import Parents from "./pages/Admin/Parents";
// import AdminAttendance from "./pages/Admin/Attendance";
// import Notices from "./pages/Admin/Notices";
// import Announcements from "./pages/Admin/Announcements";
// import AdminProfile from "./pages/Admin/Profile";

// // Teacher Pages
// import TeacherDashboard from "./pages/Teacher/Dashboard";
// import TeacherAttendance from "./pages/Teacher/Attendance";
// import TeacherAnnouncements from "./pages/Teacher/Announcements";
// import TeacherProfile from "./pages/Teacher/Profile";

// // Student Pages
// import StudentDashboard from "./pages/Student/Dashboard";
// import StudentAttendance from "./pages/Student/Attendance";
// import StudentNotices from "./pages/Student/Notices";
// import StudentAnnouncements from "./pages/Student/Announcements";
// import StudentProfile from "./pages/Student/Profile";

// // Parent Pages
// import ParentDashboard from "./pages/Parent/Dashboard";
// import StudentProfilePage from "./pages/Parent/StudentProfile";
// import ParentNotices from "./pages/Parent/Notices";
// import ParentAnnouncements from "./pages/Parent/Announcements";
// import ParentProfile from "./pages/Parent/Profile";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Landing */}
//         <Route path="/" element={<Landing />} />

//         {/* Login */}
//         <Route path="/admin-login" element={<AdminLogin />} />
//         <Route path="/teacher-login" element={<TeacherLogin />} />
//         <Route path="/student-login" element={<StudentLogin />} />
//         <Route path="/parent-login" element={<ParentLogin />} />

//         {/* Admin */}
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//         <Route path="/admin/students" element={<Students />} />
//         <Route path="/admin/teachers" element={<Teachers />} />
//         <Route path="/admin/parents" element={<Parents />} />
//         <Route path="/admin/attendance" element={<AdminAttendance />} />
//         <Route path="/admin/notices" element={<Notices />} />
//         <Route path="/admin/announcements" element={<Announcements />} />
//         <Route path="/admin/profile" element={<AdminProfile />} />

//         {/* Teacher */}
//         <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
//         <Route path="/teacher/attendance" element={<TeacherAttendance />} />
//         <Route path="/teacher/announcements" element={<TeacherAnnouncements />} />
//         <Route path="/teacher/profile" element={<TeacherProfile />} />

//         {/* Student */}
//         <Route path="/student/dashboard" element={<StudentDashboard />} />
//         <Route path="/student/attendance" element={<StudentAttendance />} />
//         <Route path="/student/notices" element={<StudentNotices />} />
//         <Route path="/student/announcements" element={<StudentAnnouncements />} />
//         <Route path="/student/profile" element={<StudentProfile />} />

//         {/* Parent */}
//         <Route path="/parent/dashboard" element={<ParentDashboard />} />
//         <Route path="/parent/student-profile" element={<StudentProfilePage />} />
//         <Route path="/parent/notices" element={<ParentNotices />} />
//         <Route path="/parent/announcements" element={<ParentAnnouncements />} />
//         <Route path="/parent/profile" element={<ParentProfile />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";

// Landing Page
import Landing from "./pages/Landing/Landing";

import AdminLogin from "./pages/Login/AdminLogin";
import TeacherLogin from "./pages/Login/TeacherLogin";
import StudentLogin from "./pages/Login/StudentLogin";
import ParentLogin from "./pages/Login/ParentLogin";
import AdminDashboard from "./pages/Admin/Dashboard";
import Students from "./pages/Admin/Students";
import Teachers from "./pages/Admin/Teachers";
import Parents from "./pages/Admin/Parents";
import Attendance from "./pages/Admin/Attendance";
import Notices from "./pages/Admin/Notices";
import Announcements from "./pages/Admin/Announcements";
import Profile from "./pages/Admin/Profile";
import TeacherDashboard from "./pages/Teacher/Dashboard";
import TeacherAttendance from "./pages/Teacher/Attendance";
import TeacherAnnouncements from "./pages/Teacher/Announcements";
import TeacherProfile from "./pages/Teacher/Profile";
import StudentDashboard from "./pages/Student/Dashboard";
import StudentAttendance from "./pages/Student/Attendance";
import StudentNotices from "./pages/Student/Notices";
import StudentAnnouncements from "./pages/Student/Announcements";
import StudentProfile from "./pages/Student/Profile";
import ParentDashboard from "./pages/Parent/Dashboard";
import StudentProfilePage from "./pages/Parent/StudentProfile";
import ParentNotices from "./pages/Parent/Notices";
import ParentAnnouncements from "./pages/Parent/Announcements";
import ParentProfile from "./pages/Parent/Profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Login Pages */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/parent-login" element={<ParentLogin />} />

        <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>}/>
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/teachers" element={<Teachers />} />
        <Route path="/admin/parents" element={<Parents />} />
        <Route path="/admin/attendance" element={<Attendance />} />
        <Route path="/admin/notices" element={<Notices />} />
        <Route path="/admin/announcements" element={<Announcements />} />
        <Route path="/admin/profile" element={<Profile />} />

        <Route path="/teacher/dashboard" element={<ProtectedRoute allowedRoles={["teacher"]}><TeacherDashboard /></ProtectedRoute>}/>
        <Route path="/teacher/attendance" element={<TeacherAttendance />} />
        <Route path="/teacher/announcements" element={<TeacherAnnouncements />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />

        <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>}/>
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/notices" element={<StudentNotices />} />
        <Route path="/student/announcements" element={<StudentAnnouncements />} />
        <Route path="/student/profile" element={<StudentProfile />} />

        <Route path="/parent/dashboard" element={<ProtectedRoute allowedRoles={["parent"]}><ParentDashboard /></ProtectedRoute>}/>
        <Route path="/parent/student-profile" element={<StudentProfilePage />} />
        <Route path="/parent/notices" element={<ParentNotices />} />
        <Route path="/parent/announcements" element={<ParentAnnouncements />} />
        <Route path="/parent/profile" element={<ParentProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
