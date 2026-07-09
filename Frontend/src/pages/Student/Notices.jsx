import DashboardLayout from "../../components/DashboardLayout";

function Notices() {
  return (
    <DashboardLayout
      role="student"
      title="Notices"
    >

      <div className="card p-4">

        <h2>School Notices</h2>

        <hr/>

        <ul>

          <li>Semester exams begin next month.</li>

          <li>Library books must be returned before Friday.</li>

          <li>Fee payment deadline is July 30.</li>

        </ul>

      </div>

    </DashboardLayout>
  );
}

export default Notices;