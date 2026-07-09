import DashboardLayout from "../../components/DashboardLayout";

function Announcements() {
  return (
    <DashboardLayout role="parent" title="Announcements">

      <div className="card p-4">

        <h2>Announcements</h2>

        <hr />

        <ul>

          <li>Science Exhibition next week.</li>

          <li>Annual Sports Meet registration has started.</li>

          <li>School magazine submissions are open.</li>

        </ul>

      </div>

    </DashboardLayout>
  );
}

export default Announcements;