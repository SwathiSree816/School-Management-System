import DashboardLayout from "../../components/DashboardLayout";
import "./Admin.css";

function Students() {
  return (
    <DashboardLayout role="admin" title="Students">

      <h2>Students</h2>

      <table className="table table-bordered table-striped mt-4">

        <thead>

          <tr>

            <th>Roll No</th>

            <th>Name</th>

            <th>Class</th>

            <th>Section</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td>101</td>

            <td>John</td>

            <td>10</td>

            <td>A</td>

            <td>

              <button className="btn btn-warning btn-sm me-2">
                Edit
              </button>

              <button className="btn btn-danger btn-sm">
                Delete
              </button>

            </td>

          </tr>

        </tbody>

      </table>

    </DashboardLayout>
  );
}

export default Students;