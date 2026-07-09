import DashboardLayout from "../../components/DashboardLayout";

function Notices() {
  return (
    <DashboardLayout role="parent" title="School Notices">

      <div className="card p-4">

        <h2>Latest Notices</h2>

        <hr />

        <ul>

          <li>Parent-Teacher Meeting on Saturday.</li>

          <li>Fee payment deadline is July 30.</li>

          <li>School will remain closed on Independence Day.</li>

        </ul>

      </div>

    </DashboardLayout>
  );
}

export default Notices;