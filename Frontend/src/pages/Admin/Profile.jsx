import DashboardLayout from "../../components/DashboardLayout";

function Profile() {

  return (

    <DashboardLayout role="admin" title="Profile">

      <div className="card p-4">

        <h3>Admin Profile</h3>

        <hr />

        <p><strong>Name:</strong> Admin User</p>

        <p><strong>Email:</strong> admin@gmail.com</p>

        <p><strong>Role:</strong> Admin</p>

      </div>

    </DashboardLayout>

  );

}

export default Profile;