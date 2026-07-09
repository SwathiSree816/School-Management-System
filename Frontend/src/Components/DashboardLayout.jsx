import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import "./DashboardLayout.css";

function DashboardLayout({
  role,
  title,
  children,
}) {

  return (

    <div className="dashboard">

      <Sidebar role={role} />

      <div className="main-content">

        <TopNavbar title={title} />

        <div className="page-content">

          {children}

        </div>

      </div>

    </div>

  );
}

export default DashboardLayout;