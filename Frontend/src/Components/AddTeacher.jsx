import { useState } from "react";
import "../index.css";

export default function AddTeacher() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", phone: "", experience: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/teachers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setMessage({ text: "Teacher added successfully!", type: "success" });
        setFormData({ name: "", email: "", subject: "", phone: "", experience: "" });
      } else {
        setMessage({ text: "Failed to add teacher.", type: "error" });
      }
    } catch {
      setMessage({ text: "Error connecting to server.", type: "error" });
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "560px" }}>
      {/* Header */}
      <header style={{ marginBottom: "36px" }}>
        <h2 className="page-title">Add New Teacher</h2>
        <p className="page-subtitle">Fill in the details below to register a new teacher.</p>
      </header>

      <div className="clay-card" style={{ padding: "36px" }}>
        {message.text && (
          <div style={{
            padding: "12px 18px", borderRadius: "12px", marginBottom: "24px",
            background: message.type === "success" ? "#d1fae5" : "#fee2e2",
            color: message.type === "success" ? "#065f46" : "#991b1b",
            border: message.type === "success" ? "1px solid #a7f3d0" : "1px solid #fca5a5",
            fontSize: "13px", fontFamily: "Inter, sans-serif", fontWeight: 500,
            display: "flex", alignItems: "center", gap: "8px"
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              {message.type === "success" ? "check_circle" : "error"}
            </span>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { field: "name", placeholder: "Full Name", icon: "person", type: "text" },
            { field: "email", placeholder: "Email Address", icon: "mail", type: "email" },
            { field: "subject", placeholder: "Subject Specialization", icon: "menu_book", type: "text" },
            { field: "phone", placeholder: "Phone Number", icon: "phone", type: "text" },
            { field: "experience", placeholder: "Years of Experience", icon: "workspace_premium", type: "number" },
          ].map(({ field, placeholder, icon, type }) => (
            <div key={field} style={{ position: "relative", marginBottom: "18px" }}>
              <span className="material-symbols-outlined" style={{
                position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                color: "#7b7487", fontSize: "18px", pointerEvents: "none"
              }}>{icon}</span>
              <input
                className="clay-input"
                type={type}
                placeholder={placeholder}
                required
                value={formData[field]}
                style={{ paddingLeft: "44px" }}
                onChange={e => setFormData({ ...formData, [field]: e.target.value })}
              />
            </div>
          ))}

          <button type="submit" className="clay-btn" disabled={loading} style={{ width: "100%", marginTop: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            {loading
              ? <><span className="material-symbols-outlined" style={{ fontSize: "18px" }}>hourglass_top</span> Saving...</>
              : <><span className="material-symbols-outlined" style={{ fontSize: "18px" }}>person_add</span> Add Teacher</>
            }
          </button>
        </form>
      </div>
    </div>
  );
}
