import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../Services/api";
import "./Login.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await API.post("/users/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role !== "admin") {
        alert("This is not an Admin account.");
        localStorage.clear();
        return;
      }

      navigate("/admin/dashboard");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>

          <div className="mb-3">

            <label>Username</label>

            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

          </div>

          <div className="mb-3">

            <label>Password</label>

            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          <button
            className="btn btn-primary login-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="back-link">
          <Link to="/">← Back to Home</Link>
        </div>

      </div>

    </div>

  );
}

export default AdminLogin;