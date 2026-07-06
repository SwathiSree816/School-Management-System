import "../index.css";

const PERIODS = ["P1\n08:00", "P2\n09:00", "P3\n10:00", "Break", "P4\n11:30", "P5\n12:30", "Lunch", "P6\n14:00", "P7\n15:00"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const CLASS_COLORS = {
  "10-A CS":     { bg: "rgba(124,58,237,0.12)", color: "#7c3aed", border: "rgba(124,58,237,0.25)" },
  "10-B CS":     { bg: "rgba(59,130,246,0.12)", color: "#2563eb", border: "rgba(59,130,246,0.25)" },
  "11-Sci CS":   { bg: "rgba(16,185,129,0.12)", color: "#059669", border: "rgba(16,185,129,0.25)" },
  "Free":        { bg: "transparent", color: "#ddc6cc", border: "transparent" },
  "Break":       { bg: "rgba(245,158,11,0.1)", color: "#92400e", border: "rgba(245,158,11,0.2)" },
  "Lunch":       { bg: "rgba(245,158,11,0.1)", color: "#92400e", border: "rgba(245,158,11,0.2)" },
};

// Seeded timetable — rows = periods, cols = days
const TIMETABLE = [
  ["10-A CS", "Free",    "10-B CS", "Free",    "11-Sci CS", "10-A CS"],
  ["Free",    "10-B CS", "Free",    "10-A CS", "Free",      "Free"],
  ["11-Sci CS","Free",   "10-A CS", "10-B CS", "Free",      "11-Sci CS"],
  ["Break",   "Break",   "Break",   "Break",   "Break",     "Break"],
  ["10-B CS", "11-Sci CS","Free",   "Free",    "10-A CS",   "Free"],
  ["Free",    "10-A CS", "11-Sci CS","10-B CS","Free",      "Free"],
  ["Lunch",   "Lunch",   "Lunch",   "Lunch",   "Lunch",     "Lunch"],
  ["10-A CS", "Free",    "Free",    "11-Sci CS","10-B CS",  "Free"],
  ["Free",    "Free",    "10-B CS", "Free",    "Free",      "10-A CS"],
];

const today = new Date().toLocaleDateString("en-US", { weekday: "long" });

export default function Timetable() {
  return (
    <div style={{ maxWidth: "1000px" }}>
      {/* Header */}
      <header style={{ marginBottom: "36px" }}>
        <h2 className="page-title">My Timetable</h2>
        <p className="page-subtitle">Your weekly class schedule — today's column is highlighted.</p>
      </header>

      {/* Legend */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        {Object.entries(CLASS_COLORS).filter(([k]) => !["Break","Lunch","Free"].includes(k)).map(([label, cfg]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "8px", background: cfg.bg, border: `1px solid ${cfg.border}` }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: cfg.color }} />
            <span style={{ fontSize: "11px", fontWeight: 600, color: cfg.color, fontFamily: "Inter, sans-serif" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="glass-panel" style={{ padding: "24px", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "6px" }}>
          <thead>
            <tr>
              <th style={{ width: "70px", padding: "8px", fontSize: "10px", color: "#5a4450", fontFamily: "Inter, sans-serif", fontWeight: 600, textAlign: "center" }}>Period</th>
              {DAYS.map(day => (
                <th key={day} style={{
                  padding: "10px 8px", borderRadius: "10px", fontSize: "12px", fontWeight: 700,
                  fontFamily: "Outfit, sans-serif", textAlign: "center",
                  background: day === today ? "rgba(124,58,237,0.12)" : "transparent",
                  color: day === today ? "#7c3aed" : "#2a1a1f",
                  border: day === today ? "1px solid rgba(124,58,237,0.25)" : "none"
                }}>
                  {day === today && <span className="material-symbols-outlined" style={{ fontSize: "10px", display: "block", color: "#7c3aed" }}>fiber_manual_record</span>}
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIMETABLE.map((row, pi) => {
              const period = PERIODS[pi];
              const isBreak = period === "Break" || period === "Lunch";
              return (
                <tr key={pi}>
                  <td style={{ textAlign: "center", padding: "6px", fontSize: "10px", fontWeight: 600, color: "#5a4450", fontFamily: "Inter, sans-serif", whiteSpace: "pre-line" }}>{period}</td>
                  {row.map((cell, di) => {
                    const cfg = CLASS_COLORS[cell] || CLASS_COLORS["Free"];
                    const isToday = DAYS[di] === today;
                    return (
                      <td key={di} style={{
                        padding: "10px 8px", borderRadius: "12px", textAlign: "center",
                        background: cell === "Free" ? (isToday ? "rgba(124,58,237,0.04)" : "transparent") : cfg.bg,
                        border: isToday ? `1px solid rgba(124,58,237,0.15)` : cell !== "Free" ? `1px solid ${cfg.border}` : "none",
                        fontSize: "12px", fontWeight: isBreak ? 400 : 600,
                        color: cfg.color, fontFamily: "Inter, sans-serif",
                        transition: "transform 0.15s",
                        cursor: cell !== "Free" && !isBreak ? "default" : "default",
                        opacity: cell === "Free" ? 0.4 : 1
                      }}>
                        {cell === "Free" ? "—" : cell}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Today Summary */}
      <div className="clay-card" style={{ padding: "24px", marginTop: "20px" }}>
        <h3 className="section-title" style={{ marginBottom: "16px" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "18px", verticalAlign: "middle", marginRight: "6px", color: "#7c3aed" }}>today</span>
          Today's Classes — {today}
        </h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {(() => {
            const todayIdx = DAYS.indexOf(today);
            if (todayIdx === -1) return <p style={{ fontSize: "13px", color: "#5a4450", fontFamily: "Inter, sans-serif" }}>No classes scheduled today.</p>;
            const todayClasses = TIMETABLE.map((row, pi) => ({ period: PERIODS[pi], subject: row[todayIdx] }))
              .filter(({ subject }) => subject !== "Free" && subject !== "Break" && subject !== "Lunch");
            if (todayClasses.length === 0) return <p style={{ fontSize: "13px", color: "#5a4450", fontFamily: "Inter, sans-serif" }}>No classes scheduled today.</p>;
            return todayClasses.map(({ period, subject }) => {
              const cfg = CLASS_COLORS[subject] || CLASS_COLORS["Free"];
              return (
                <div key={`${period}-${subject}`} style={{ padding: "12px 16px", borderRadius: "12px", background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                  <div style={{ fontSize: "10px", color: "#5a4450", fontFamily: "Inter, sans-serif", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{period.replace("\n", " ")}</div>
                  <div style={{ fontSize: "14px", color: cfg.color, fontFamily: "Outfit, sans-serif", fontWeight: 700, marginTop: "2px" }}>{subject}</div>
                </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
}
