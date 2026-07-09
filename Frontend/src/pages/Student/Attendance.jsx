import DashboardLayout from "../../components/DashboardLayout";

function Attendance() {
  return (
    <DashboardLayout
      role="student"
      title="Attendance"
    >

      <h2>Attendance Record</h2>

      <table className="table table-striped mt-4">

        <thead>

          <tr>

            <th>Date</th>

            <th>Subject</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td>10-07-2026</td>

            <td>Mathematics</td>

            <td className="text-success">
              Present
            </td>

          </tr>

          <tr>

            <td>09-07-2026</td>

            <td>Physics</td>

            <td className="text-danger">
              Absent
            </td>

          </tr>

        </tbody>

      </table>

    </DashboardLayout>
  );
}

export default Attendance;