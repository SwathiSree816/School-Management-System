import DashboardLayout from "../../components/DashboardLayout";

function Profile() {
  return (
    <DashboardLayout role="parent" title="Parent Profile">

      <div className="card p-4">

        <h2>Parent Profile</h2>

        <hr />

        <p><strong>Name:</strong> Ramesh Sharma</p>
        <p><strong>Email:</strong> parent@gmail.com</p>
        <p><strong>Phone:</strong> +91 9876543210</p>

      </div>

    </DashboardLayout>
  );
}

export default Profile;