import DashboardLayout from "../../components/DashboardLayout";

function Announcements() {

  return (

    <DashboardLayout
      role="teacher"
      title="Announcements"
    >

      <div className="card p-4">

        <h3>Latest Announcements</h3>

        <hr/>

        <ul>

          <li>Science Fair on Friday</li>

          <li>Parent Meeting Next Week</li>

          <li>Annual Sports Day Coming Soon</li>

        </ul>

      </div>

    </DashboardLayout>

  );

}

export default Announcements;