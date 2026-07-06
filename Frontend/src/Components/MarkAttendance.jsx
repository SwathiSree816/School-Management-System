import { useState } from "react";
import "../index.css";

const STATUS_CONFIG = {
  Present: { color: "#065f46", bg: "#d1fae5", border: "#a7f3d0", symbol: "✓" },
  Late:    { color: "#92400e", bg: "#fef3c7", border: "#fde68a", symbol: "⏱" },
  Absent:  { color: "#991b1b", bg: "#fee2e2", border: "#fca5a5", symbol: "✗" },
};

export default function MarkAttendance() {
  const [date, setDate] = useState("");
  const [className, setClassName] = useState("");
  const [students, setStudents] = useState([{ studentName: "", status: "Present" }]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [qrMode, setQrMode] = useState(false);

  const handleAddStudent = () => setStudents([...students, { studentName: "", status: "Present" }]);

  const handleRemoveStudent = (i) => setStudents(students.filter((_, idx) => idx !== i));

  const handleStudentChange = (i, field, value) => {
    const updated = [...students];
    updated[i][field] = value;
    setStudents(updated);
  };

  // Mark all students to a given status at once
  const handleMarkAll = (status) => setStudents(students.map(s => ({ ...s, status })));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, class: className, records: students }),
      });
      setMessage(res.ok
        ? { text: "Attendance submitted successfully!", type: "success" }
        : { text: "Failed to submit attendance.", type: "error" }
      );
    } catch {
      setMessage({ text: "Error connecting to server.", type: "error" });
    }
    setLoading(false);
  };

  // Count summary
  const summary = Object.keys(STATUS_CONFIG).reduce((acc, s) => {
    acc[s] = students.filter(st => st.status === s).length;
    return acc;
  }, {});

  return (
    <div style={{ maxWidth: "760px" }}>
      {/* Header */}
      <header style={{ marginBottom: "36px" }}>
        <h2 className="page-title">Mark Attendance</h2>
        <p className="page-subtitle">Select the date and class, then record each student's attendance status.</p>
      </header>

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
        {/* Date + Class */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
          <div className="clay-card" style={{ padding: "20px 24px" }}>
            <p className="stat-label" style={{ marginBottom: "10px" }}>Date</p>
            <div style={{ position: "relative" }}>
              <span className="material-symbols-outlined" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#7b7487", fontSize: "18px", pointerEvents: "none" }}>calendar_today</span>
              <input className="clay-input" type="date" required value={date} onChange={e => setDate(e.target.value)} style={{ paddingLeft: "40px", marginBottom: 0 }} />
            </div>
          </div>
          <div className="clay-card" style={{ padding: "20px 24px" }}>
            <p className="stat-label" style={{ marginBottom: "10px" }}>Class</p>
            <div style={{ position: "relative" }}>
              <span className="material-symbols-outlined" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#7b7487", fontSize: "18px", pointerEvents: "none" }}>class</span>
              <input className="clay-input" type="text" placeholder="e.g. 10-A" required value={className} onChange={e => setClassName(e.target.value)} style={{ paddingLeft: "40px", marginBottom: 0 }} />
            </div>
          </div>
        </div>

        {/* Live Summary Strip */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {Object.entries(STATUS_CONFIG).map(([s, cfg]) => (
            <div key={s} style={{ flex: 1, padding: "12px", borderRadius: "14px", background: cfg.bg, border: `1px solid ${cfg.border}`, textAlign: "center" }}>
              <div style={{ fontSize: "20px", fontFamily: "Outfit, sans-serif", fontWeight: 700, color: cfg.color }}>{summary[s]}</div>
              <div style={{ fontSize: "11px", fontWeight: 600, color: cfg.color, fontFamily: "Inter, sans-serif" }}>{s}</div>
            </div>
          ))}
        </div>

        {/* Students Panel */}
        <div className="glass-panel" style={{ padding: "28px", marginBottom: "20px" }}>
          {/* Panel Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
            <h3 className="section-title">Students</h3>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {/* Bulk mark buttons */}
              {Object.entries(STATUS_CONFIG).map(([s, cfg]) => (
                <button key={s} type="button" onClick={() => handleMarkAll(s)} style={{
                  padding: "6px 14px", borderRadius: "10px", cursor: "pointer",
                  fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif",
                  background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}`,
                  display: "flex", alignItems: "center", gap: "4px"
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>done_all</span>
                  All {s}
                </button>
              ))}
              {/* QR Mode toggle */}
              <button type="button" onClick={() => setQrMode(!qrMode)} style={{
                padding: "6px 14px", borderRadius: "10px", cursor: "pointer",
                fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif",
                background: qrMode ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.5)",
                color: "#7c3aed", border: "1px solid rgba(124,58,237,0.3)",
                display: "flex", alignItems: "center", gap: "4px"
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>qr_code_2</span>
                {qrMode ? "Exit QR" : "QR Mode"}
              </button>
              <button type="button" onClick={handleAddStudent} style={{
                padding: "6px 14px", borderRadius: "10px", cursor: "pointer",
                fontSize: "11px", fontWeight: 600, fontFamily: "Inter, sans-serif",
                background: "rgba(255,255,255,0.5)", color: "#2a1a1f", border: "1px solid rgba(255,255,255,0.9)",
                display: "flex", alignItems: "center", gap: "4px"
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>add</span>
                Add
              </button>
            </div>
          </div>

          {/* QR Mode Banner */}
          {qrMode && (
            <div style={{ padding: "16px", borderRadius: "14px", background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "16px" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "36px", color: "#7c3aed" }}>qr_code_scanner</span>
              <div>
                <p style={{ fontFamily: "Outfit, sans-serif", fontWeight: 600, fontSize: "15px", color: "#2a1a1f", marginBottom: "4px" }}>QR Attendance Mode Active</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#5a4450" }}>Students scan the session QR to auto-mark Present. You can still manually override below.</p>
              </div>
              <button type="button" onClick={() => handleMarkAll("Present")} style={{
                marginLeft: "auto", padding: "10px 18px", borderRadius: "12px", cursor: "pointer",
                fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 700,
                background: "#7c3aed", color: "#fff", border: "none", flexShrink: 0
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: "14px", verticalAlign: "middle", marginRight: "4px" }}>qr_code_scanner</span>
                Simulate Scan All
              </button>
            </div>
          )}

          {/* Student Rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {students.map((student, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: "10px", alignItems: "center" }}>
                <div style={{ position: "relative" }}>
                  <span className="material-symbols-outlined" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#7b7487", fontSize: "16px", pointerEvents: "none" }}>person</span>
                  <input className="clay-input" type="text" placeholder={`Student ${i + 1} name`} required value={student.studentName}
                    style={{ paddingLeft: "38px", marginBottom: 0 }}
                    onChange={e => handleStudentChange(i, "studentName", e.target.value)} />
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  {Object.entries(STATUS_CONFIG).map(([s, cfg]) => (
                    <button key={s} type="button" onClick={() => handleStudentChange(i, "status", s)} style={{
                      padding: "8px 10px", borderRadius: "10px", cursor: "pointer",
                      fontSize: "12px", fontWeight: 600, fontFamily: "Inter, sans-serif",
                      background: student.status === s ? cfg.bg : "rgba(255,255,255,0.5)",
                      color: student.status === s ? cfg.color : "#4a4455",
                      border: student.status === s ? `1px solid ${cfg.border}` : "1px solid rgba(255,255,255,0.8)",
                      transition: "all 0.15s", minWidth: "60px"
                    }}>{cfg.symbol} {s}</button>
                  ))}
                </div>
                {students.length > 1 && (
                  <button type="button" onClick={() => handleRemoveStudent(i)} style={{
                    width: "32px", height: "32px", borderRadius: "8px", border: "none",
                    background: "#fee2e2", color: "#991b1b", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>delete</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="clay-btn" disabled={loading} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          {loading
            ? <><span className="material-symbols-outlined" style={{ fontSize: "18px" }}>hourglass_top</span> Submitting...</>
            : <><span className="material-symbols-outlined" style={{ fontSize: "18px" }}>how_to_reg</span> Submit Attendance</>
          }
        </button>
      </form>
    </div>
  );
}
