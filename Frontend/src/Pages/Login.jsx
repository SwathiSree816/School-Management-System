import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        form,
      );

      // Store JWT Token
      localStorage.setItem("token", data.token);

      // Store logged-in user
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
      switch (data.user.role) {
        case "admin":
          navigate("/admin-dashboard");
          break;

        case "teacher":
          navigate("/teacher-dashboard");
          break;

        case "student":
          navigate("/student-dashboard");
          break;

        case "parent":
          navigate("/parent-dashboard");
          break;

        default:
          navigate("/");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#130b16,#2a141e,#3b1f38,#1a1022)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "rgba(42,20,30,0.75)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          borderRadius: "24px",
          padding: "40px",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 20px 50px rgba(0,0,0,.35)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              width: "75px",
              height: "75px",
              borderRadius: "20px",
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
                fontSize: "38px",
                fontVariationSettings: "'FILL' 1",
              }}
            >
              school
            </span>
          </div>
        </div>

        <h2
          style={{
            color: "#fff",
            textAlign: "center",
            fontFamily: "Outfit,sans-serif",
            fontSize: "30px",
            marginBottom: "8px",
          }}
        >
          Welcome Back
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "rgba(255,200,210,.65)",
            marginBottom: "35px",
            fontSize: "14px",
          }}
        >
          Login to your {role} Portal
        </p>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                color: "#f3d8e8",
                fontSize: "13px",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Username
            </label>

            <input
              type="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,.08)",
                background: "rgba(255,255,255,.05)",
                color: "#fff",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>

          {/* Password */}

          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                color: "#f3d8e8",
                fontSize: "13px",
                display: "block",
                marginBottom: "8px",
              }}
            >
              Password
            </label>

            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,.08)",
                  background: "rgba(255,255,255,.05)",
                  color: "#fff",
                  fontSize: "14px",
                  outline: "none",
                }}
              />

              <span
                className="material-symbols-outlined"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "13px",
                  color: "#bbb",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              border: "none",
              background: "linear-gradient(135deg,#7c3aed,#ec4899)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: "600",
              cursor: "pointer",
              transition: ".3s",
              boxShadow: "0 10px 25px rgba(124,58,237,.35)",
            }}
          >
            Login
          </button>
        </form>

        {/* <p
          style={{
            marginTop: "25px",
            color: "rgba(255,200,210,.6)",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#ec4899",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            Register
          </Link>
        </p> */}
      </div>
    </div>
  );
}

export default Login;
