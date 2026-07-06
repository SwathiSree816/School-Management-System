import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "teacher",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO:
    // axios.post("http://localhost:5000/api/users/register", form)
    // .then(...)
    // .catch(...)

    console.log(form);

    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#130b16,#2a141e,#3b1f38,#1a1022)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          width: "450px",
          background: "rgba(42,20,30,.75)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          borderRadius: "24px",
          padding: "40px",
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow: "0 15px 45px rgba(0,0,0,.35)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "70px",
              height: "70px",
              margin: "0 auto 20px",
              borderRadius: "18px",
              background: "linear-gradient(135deg,#7c3aed,#ec4899)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 10px 25px rgba(124,58,237,.4)",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                color: "#fff",
                fontSize: "35px",
                fontVariationSettings: "'FILL' 1",
              }}
            >
              school
            </span>
          </div>

          <h2
            style={{
              color: "#fff",
              fontFamily: "Outfit,sans-serif",
              marginBottom: "8px",
            }}
          >
            Create Account
          </h2>

          <p style={{ color: "rgba(255,200,210,.65)" }}>
            Register to School Management System
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* Email */}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* Phone */}

          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          {/* Role */}

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
            <option value="parent">Parent</option>
          </select>

          {/* Password */}

          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <span
              className="material-symbols-outlined"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "14px",
                right: "15px",
                color: "#bbb",
                cursor: "pointer",
              }}
            >
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "14px",
              borderRadius: "14px",
              border: "none",
              cursor: "pointer",
              background: "linear-gradient(135deg,#7c3aed,#ec4899)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "600",
              boxShadow: "0 10px 25px rgba(124,58,237,.35)",
            }}
          >
            Register
          </button>
        </form>

        <p
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "rgba(255,200,210,.6)",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#ec4899",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  borderRadius: "14px",
  border: "1px solid rgba(255,255,255,.08)",
  background: "rgba(255,255,255,.05)",
  color: "#fff",
  outline: "none",
  fontSize: "14px",
  boxSizing: "border-box",
};

export default Register;