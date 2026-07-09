import DashboardLayout from "../../components/DashboardLayout";

function Profile() {

  return (

    <DashboardLayout
      role="teacher"
      title="Profile"
    >

      <div className="card p-4">

        <h2>Teacher Profile</h2>

        <hr/>

        <p><strong>Name:</strong> Teacher Name</p>

        <p><strong>Subject:</strong> Mathematics</p>

        <p><strong>Email:</strong> teacher@gmail.com</p>

      </div>

    </DashboardLayout>

  );

}

export default Profile;