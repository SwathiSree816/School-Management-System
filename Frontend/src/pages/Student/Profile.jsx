import DashboardLayout from "../../components/DashboardLayout";

function Profile() {
  return (
    <DashboardLayout
      role="student"
      title="My Profile"
    >

      <div className="card p-4">

        <h2>Student Profile</h2>

        <hr/>

        <p><strong>Name:</strong> Rahul Sharma</p>

        <p><strong>Roll No:</strong> 101</p>

        <p><strong>Class:</strong> X</p>

        <p><strong>Section:</strong> A</p>

        <p><strong>Email:</strong> rahul@gmail.com</p>

      </div>

    </DashboardLayout>
  );
}

export default Profile;