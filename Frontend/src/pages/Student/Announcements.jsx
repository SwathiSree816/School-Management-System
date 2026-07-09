import DashboardLayout from "../../components/DashboardLayout";

function Announcements() {
  return (
    <DashboardLayout
      role="student"
      title="Announcements"
    >

      <div className="card p-4">

        <h2>Announcements</h2>

        <hr/>

        <ul>

          <li>Science Exhibition registration is open.</li>

          <li>Sports Day practice starts Monday.</li>

          <li>Essay competition on Independence Day.</li>

        </ul>

      </div>

    </DashboardLayout>
  );
}

export default Announcements;