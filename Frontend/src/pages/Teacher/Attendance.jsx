import DashboardLayout from "../../components/DashboardLayout";

function Attendance() {

  return (

    <DashboardLayout role="teacher" title="Attendance">

      <h2>Mark Attendance</h2>

      <table className="table table-bordered mt-4">

        <thead>

          <tr>

            <th>Student</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td>John</td>

            <td>

              <select className="form-select">

                <option>Present</option>

                <option>Absent</option>

                <option>Late</option>

              </select>

            </td>

          </tr>

        </tbody>

      </table>

      <button className="btn btn-primary">
        Save Attendance
      </button>

    </DashboardLayout>

  );

}

export default Attendance;