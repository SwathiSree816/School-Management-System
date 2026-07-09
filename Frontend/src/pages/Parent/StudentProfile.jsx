import DashboardLayout from "../../components/DashboardLayout";

function StudentProfile() {
  return (
    <DashboardLayout role="parent" title="Student Profile">

      <div className="card p-4">

        <h2>Student Details</h2>

        <hr />

        <p><strong>Name:</strong> Rahul Sharma</p>
        <p><strong>Roll Number:</strong> 101</p>
        <p><strong>Class:</strong> X</p>
        <p><strong>Section:</strong> A</p>
        <p><strong>Attendance:</strong> 94%</p>

      </div>

    </DashboardLayout>
  );
}

export default StudentProfile;