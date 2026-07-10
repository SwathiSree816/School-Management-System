import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

function TeacherLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/users/login", {
        username,
        password,
      });

      const { token, user } = response.data;

      if (user.role !== "teacher") {
        alert("This is not a Teacher account.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/teacher/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2>Teacher Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default TeacherLogin;