import { useEffect, useState } from "react";
import "../index.css";

export default function AddTeacher() {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    subject: "",
    experience: "",
  });

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch("/api/users/teachers");
        const data = await res.json();
        setTeachers(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTeachers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          text: "Teacher profile created successfully!",
          type: "success",
        });

        setFormData({
          userId: "",
          subject: "",
          experience: "",
        });
      } else {
        setMessage({
          text: data.message,
          type: "error",
        });
      }
    } catch {
      setMessage({
        text: "Server Error",
        type: "error",
      });
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "560px" }}>
      <header style={{ marginBottom: "36px" }}>
        <h2 className="page-title">Add Teacher Details</h2>

        <p className="page-subtitle">
          Select a registered teacher and assign subject details.
        </p>
      </header>

      <div className="clay-card" style={{ padding: "36px" }}>
        {message.text && (
          <div
            style={{
              padding: "12px 18px",
              borderRadius: "12px",
              marginBottom: "24px",
              background:
                message.type === "success"
                  ? "#d1fae5"
                  : "#fee2e2",
              color:
                message.type === "success"
                  ? "#065f46"
                  : "#991b1b",
            }}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Teacher */}

          <div style={{ marginBottom: "18px" }}>
            <select
              className="clay-input"
              required
              value={formData.userId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  userId: e.target.value,
                })
              }
            >
              <option value="">Select Teacher</option>

              {teachers.map((teacher) => (
                <option
                  key={teacher._id}
                  value={teacher._id}
                >
                  {teacher.username}
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}

          <div style={{ marginBottom: "18px" }}>
            <input
              className="clay-input"
              placeholder="Subject"
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subject: e.target.value,
                })
              }
            />
          </div>

          {/* Experience */}

          <div style={{ marginBottom: "18px" }}>
            <input
              className="clay-input"
              type="number"
              placeholder="Experience (Years)"
              value={formData.experience}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experience: e.target.value,
                })
              }
            />
          </div>

          <button
            className="clay-btn"
            style={{ width: "100%" }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Teacher"}
          </button>
        </form>
      </div>
    </div>
  );
}