import { useState } from "react";
import "../index.css";

const STORAGE_KEY = "teacherProfile";

const DEFAULT_PROFILE = {
  name: "Parinita Piplewar",
  subject: "Computer Science",
  email: "parinita.24mei10133@vitbhopal.ac.in",
  phone: "+91 74159 81925",
  experience: "1 Year",
  joinDate: "2024-07-01",
  bio: "Passionate about teaching computer science and inspiring students to explore technology.",
  classes: ["10-A", "10-B", "11-Sci"],
};

/** Auto-generate up to 2 initials from a full name */
const getInitials = (name = "") =>
  name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase()).join("");

/** Read profile from localStorage, fall back to defaults */
const loadProfile = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { ...DEFAULT_PROFILE };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
};

export default function TeacherProfile() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(loadProfile);
  const [savedMsg, setSavedMsg] = useState(false);

  const initials = getInitials(form.name);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    // Dispatch a custom event so App.jsx sidebar can react
    window.dispatchEvent(new CustomEvent("profileUpdated", { detail: form }));
    setEditing(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const handleCancel = () => {
    setForm(loadProfile()); // revert unsaved changes
    setEditing(false);
  };

  return (
    <div style={{ maxWidth: "720px" }}>
      {/* Header */}
      <header style={{ marginBottom: "36px" }}>
        <h2 className="page-title">My Profile</h2>
        <p className="page-subtitle">View and manage your teacher profile information.</p>
      </header>

      {savedMsg && (
        <div style={{
          padding: "12px 18px", borderRadius: "12px", marginBottom: "20px",
          background: "#d1fae5", color: "#065f46", border: "1px solid #a7f3d0",
          fontSize: "13px", fontFamily: "Inter, sans-serif", fontWeight: 500,
          display: "flex", alignItems: "center", gap: "8px"
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>check_circle</span>
          Profile saved successfully!
        </div>
      )}

      {/* Profile Card */}
      <div className="clay-card" style={{ padding: "36px", marginBottom: "24px" }}>
        {/* Avatar Row */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%",
            background: "linear-gradient(135deg, #7c3aed, #ec4899)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "26px", fontWeight: 700, color: "#fff", fontFamily: "Outfit, sans-serif",
            boxShadow: "8px 8px 20px #e0bfc8, -8px -8px 20px #ffffff", flexShrink: 0
          }}>
            {initials}
          </div>
          <div>
            <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "24px", fontWeight: 700, color: "#2a1a1f", marginBottom: "4px" }}>
              {form.name}
            </h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#5a4450" }}>
              {form.subject} Teacher
            </p>
            <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
              {form.classes.map(c => (
                <span key={c} style={{
                  padding: "3px 10px", borderRadius: "999px",
                  background: "rgba(124,58,237,0.1)", color: "#7c3aed",
                  fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif",
                  border: "1px solid rgba(124,58,237,0.2)"
                }}>{c}</span>
              ))}
            </div>
          </div>
          <button
            onClick={() => editing ? handleCancel() : setEditing(true)}
            style={{
              marginLeft: "auto", padding: "10px 18px", borderRadius: "12px", cursor: "pointer",
              background: editing ? "rgba(239,68,68,0.1)" : "rgba(124,58,237,0.1)",
              color: editing ? "#991b1b" : "#7c3aed",
              border: editing ? "1px solid rgba(239,68,68,0.25)" : "1px solid rgba(124,58,237,0.25)",
              fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600,
              display: "flex", alignItems: "center", gap: "6px", flexShrink: 0
            }}>
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              {editing ? "close" : "edit"}
            </span>
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Fields Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px" }}>
          {[
            { label: "Full Name",     field: "name",       icon: "person" },
            { label: "Subject",       field: "subject",    icon: "menu_book" },
            { label: "Email Address", field: "email",      icon: "mail" },
            { label: "Phone Number",  field: "phone",      icon: "phone" },
            { label: "Experience",    field: "experience", icon: "workspace_premium" },
            { label: "Join Date",     field: "joinDate",   icon: "calendar_today", type: "date" },
          ].map(({ label, field, icon, type }) => (
            <div key={field}>
              <p className="stat-label" style={{ marginBottom: "8px" }}>{label}</p>
              {editing ? (
                <div style={{ position: "relative" }}>
                  <span className="material-symbols-outlined" style={{
                    position: "absolute", left: "12px", top: "50%",
                    transform: "translateY(-50%)", color: "#7b7487",
                    fontSize: "16px", pointerEvents: "none"
                  }}>{icon}</span>
                  <input
                    className="clay-input"
                    type={type || "text"}
                    value={form[field]}
                    style={{ paddingLeft: "38px", marginBottom: 0 }}
                    onChange={e => handleChange(field, e.target.value)}
                  />
                </div>
              ) : (
                <p style={{
                  fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500,
                  color: "#2a1a1f", padding: "10px 0",
                  borderBottom: "1px solid rgba(220,180,190,0.3)"
                }}>{form[field]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Bio */}
        <div style={{ marginTop: "18px" }}>
          <p className="stat-label" style={{ marginBottom: "8px" }}>Bio</p>
          {editing ? (
            <textarea
              className="clay-input"
              value={form.bio}
              rows={3}
              style={{ marginBottom: 0, resize: "vertical" }}
              onChange={e => handleChange("bio", e.target.value)}
            />
          ) : (
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#5a4450", lineHeight: "1.6" }}>
              {form.bio}
            </p>
          )}
        </div>

        {/* Save Button */}
        {editing && (
          <button onClick={handleSave} className="clay-btn" style={{
            marginTop: "24px", width: "100%",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>save</span>
            Save Changes
          </button>
        )}
      </div>

      {/* Stats Panel */}
      <div className="glass-panel" style={{ padding: "24px" }}>
        <h3 className="section-title" style={{ marginBottom: "16px" }}>Teaching Overview</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
          {[
            { label: "Classes Assigned",  value: form.classes.length, icon: "class",              color: "#7c3aed" },
            { label: "Attendance Marked", value: "24",                icon: "how_to_reg",          color: "#10b981" },
            { label: "Experience",        value: form.experience,     icon: "workspace_premium",   color: "#f59e0b" },
          ].map(({ label, value, icon, color }) => (
            <div key={label} style={{
              textAlign: "center", padding: "16px", borderRadius: "14px",
              background: "rgba(255,245,247,0.6)", border: "1px solid rgba(255,255,255,0.8)"
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: "24px", color, fontVariationSettings: "'FILL' 1" }}>{icon}</span>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "22px", fontWeight: 700, color: "#2a1a1f", marginTop: "6px" }}>{value}</div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#5a4450", fontWeight: 600, marginTop: "2px" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
