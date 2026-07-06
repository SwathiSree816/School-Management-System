import { useState } from "react";
import "../index.css";

const ABSENT_THRESHOLD = 3;

const STATUS_CONFIG = {
  Present: { color: "#065f46", bg: "#d1fae5", border: "#a7f3d0", symbol: "✓" },
  Late:    { color: "#92400e", bg: "#fef3c7", border: "#fde68a", symbol: "⏱" },
  Absent:  { color: "#991b1b", bg: "#fee2e2", border: "#fca5a5", symbol: "✗" },
};

export default function ViewAttendance() {
  const [date, setDate] = useState("");
  const [className, setClassName] = useState("");
  const [monthYear, setMonthYear] = useState("");
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [mode, setMode] = useState("records"); // "records" | "report"

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const query = new URLSearchParams();
      if (date) query.append("date", date);
      if (className) query.append("class", className);
      const res = await fetch(`/api/attendance?${query.toString()}`);
      if (res.ok) setAttendances(await res.json());
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  // Compute per-student absence count across all fetched records
  const getAbsenceMap = () => {
    const map = {};
    attendances.forEach(att => {
      att.records.forEach(r => {
        if (!map[r.studentName]) map[r.studentName] = { absent: 0, late: 0 };
        if (r.status === "Absent") map[r.studentName].absent++;
        if (r.status === "Late") map[r.studentName].late++;
      });
    });
    return map;
  };

  // Generate monthly calendar grid from fetched records
  const buildMonthlyGrid = () => {
    if (!monthYear) return null;
    const [year, month] = monthYear.split("-").map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const byDay = {};
    attendances.forEach(att => {
      const d = new Date(att.date).getDate();
      const present = att.records.filter(r => r.status === "Present").length;
      const total = att.records.length;
      byDay[d] = { present, total };
    });
    return { days, byDay, year, month };
  };

  const absenceMap = getAbsenceMap();
  const monthlyGrid = mode === "report" ? buildMonthlyGrid() : null;

  return (
    <div style={{ maxWidth: "900px" }}>
      {/* Header */}
      <header style={{ marginBottom: "36px" }}>
        <h2 className="page-title">Attendance Records</h2>
        <p className="page-subtitle">View daily records or generate monthly reports with chronic-absence flags.</p>
      </header>

      {/* Mode Switcher */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {[
          { key: "records", icon: "list_alt", label: "Daily Records" },
          { key: "report", icon: "calendar_month", label: "Monthly Report" },
        ].map(m => (
          <button key={m.key} type="button" onClick={() => setMode(m.key)} style={{
            display: "flex", alignItems: "center", gap: "6px", padding: "10px 18px",
            borderRadius: "12px", cursor: "pointer", border: "1px solid",
            fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600,
            background: mode === m.key ? "rgba(124,58,237,0.12)" : "rgba(255,255,255,0.5)",
            color: mode === m.key ? "#7c3aed" : "#5a4450",
            borderColor: mode === m.key ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.8)",
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>{m.icon}</span>
            {m.label}
          </button>
        ))}
      </div>

      {/* Search / Filter Panel */}
      <div className="clay-card" style={{ padding: "24px", marginBottom: "24px" }}>
        <form onSubmit={handleSearch} style={{ display: "grid", gridTemplateColumns: mode === "report" ? "1fr 1fr auto" : "1fr 1fr auto", gap: "14px", alignItems: "end" }}>
          {mode === "report" ? (
            <div>
              <p className="stat-label" style={{ marginBottom: "8px" }}>Month</p>
              <div style={{ position: "relative" }}>
                <span className="material-symbols-outlined" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#7b7487", fontSize: "18px", pointerEvents: "none" }}>date_range</span>
                <input className="clay-input" type="month" value={monthYear} onChange={e => setMonthYear(e.target.value)} style={{ paddingLeft: "40px", marginBottom: 0 }} />
              </div>
            </div>
          ) : (
            <div>
              <p className="stat-label" style={{ marginBottom: "8px" }}>Filter by Date</p>
              <div style={{ position: "relative" }}>
                <span className="material-symbols-outlined" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#7b7487", fontSize: "18px", pointerEvents: "none" }}>calendar_today</span>
                <input className="clay-input" type="date" value={date} onChange={e => setDate(e.target.value)} style={{ paddingLeft: "40px", marginBottom: 0 }} />
              </div>
            </div>
          )}
          <div>
            <p className="stat-label" style={{ marginBottom: "8px" }}>Class</p>
            <div style={{ position: "relative" }}>
              <span className="material-symbols-outlined" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#7b7487", fontSize: "18px", pointerEvents: "none" }}>class</span>
              <input className="clay-input" type="text" placeholder="e.g. 10-A" value={className} onChange={e => setClassName(e.target.value)} style={{ paddingLeft: "40px", marginBottom: 0 }} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <button type="submit" className="clay-btn" style={{ display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>search</span>
              Search
            </button>
            {searched && attendances.length > 0 && (
              <button type="button" onClick={() => window.print()} style={{
                padding: "12px 16px", borderRadius: "14px", border: "1px solid rgba(124,58,237,0.3)",
                background: "rgba(124,58,237,0.08)", color: "#7c3aed", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "6px",
                fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>print</span>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Results */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "40px", color: "#7c3aed" }}>hourglass_top</span>
          <p style={{ color: "#5a4450", fontFamily: "Inter, sans-serif", marginTop: "12px" }}>Loading records...</p>
        </div>
      ) : searched && attendances.length === 0 ? (
        <div className="glass-panel" style={{ padding: "60px", textAlign: "center" }}>
          <span className="material-symbols-outlined" style={{ fontSize: "48px", color: "#ddc6cc" }}>search_off</span>
          <p style={{ color: "#5a4450", fontFamily: "Inter, sans-serif", marginTop: "12px" }}>No attendance records found for this filter.</p>
        </div>
      ) : mode === "report" && monthlyGrid ? (
        // ─── Monthly Report Grid ───
        <div className="glass-panel" style={{ padding: "28px" }}>
          <h3 className="section-title" style={{ marginBottom: "20px" }}>
            Monthly Report — Class {className || "All"} — {new Date(monthlyGrid.year, monthlyGrid.month - 1).toLocaleString("en-IN", { month: "long", year: "numeric" })}
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
            {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
              <div key={d} style={{ textAlign: "center", fontSize: "10px", fontWeight: 700, color: "#5a4450", fontFamily: "Inter, sans-serif", textTransform: "uppercase", letterSpacing: "0.05em", paddingBottom: "8px" }}>{d}</div>
            ))}
            {monthlyGrid.days.map(day => {
              const rec = monthlyGrid.byDay[day];
              const pct = rec ? Math.round((rec.present / rec.total) * 100) : null;
              const color = pct === null ? "#e8c8d3" : pct >= 90 ? "#d1fae5" : pct >= 75 ? "#fef3c7" : "#fee2e2";
              const textColor = pct === null ? "#5a4450" : pct >= 90 ? "#065f46" : pct >= 75 ? "#92400e" : "#991b1b";
              return (
                <div key={day} style={{ padding: "10px 6px", borderRadius: "10px", background: color, textAlign: "center", border: "1px solid rgba(255,255,255,0.6)" }}>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: textColor, fontFamily: "Outfit, sans-serif" }}>{day}</div>
                  {rec && <div style={{ fontSize: "9px", color: textColor, fontFamily: "Inter, sans-serif", marginTop: "2px" }}>{rec.present}/{rec.total}</div>}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
            {[["#d1fae5","#065f46","≥90% Present"],["#fef3c7","#92400e","75-89% Present"],["#fee2e2","#991b1b","<75% Present"],["#e8c8d3","#5a4450","No data"]].map(([bg, color, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: bg, border: "1px solid rgba(0,0,0,0.08)" }} />
                <span style={{ fontSize: "11px", color, fontFamily: "Inter, sans-serif", fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // ─── Daily Records ───
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {attendances.map((att, idx) => {
            const present = att.records.filter(r => r.status === "Present").length;
            const late = att.records.filter(r => r.status === "Late").length;
            const absent = att.records.filter(r => r.status === "Absent").length;
            const total = att.records.length;
            return (
              <div key={idx} className="glass-panel" style={{ padding: "28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <div>
                    <h3 className="section-title">Class: {att.class}</h3>
                    <p style={{ fontSize: "12px", color: "#5a4450", fontFamily: "Inter, sans-serif", marginTop: "4px" }}>
                      {new Date(att.date).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    {[["Present", present, "#d1fae5", "#065f46"], ["Late", late, "#fef3c7", "#92400e"], ["Absent", absent, "#fee2e2", "#991b1b"]].map(([label, count, bg, color]) => (
                      <div key={label} style={{ textAlign: "center", padding: "8px 14px", borderRadius: "10px", background: bg, border: `1px solid rgba(0,0,0,0.06)` }}>
                        <div style={{ fontSize: "18px", fontWeight: 700, fontFamily: "Outfit, sans-serif", color }}>{count}</div>
                        <div style={{ fontSize: "10px", fontWeight: 600, color, fontFamily: "Inter, sans-serif" }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ height: "5px", background: "#efd4dd", borderRadius: "9999px", marginBottom: "20px", overflow: "hidden", display: "flex" }}>
                  <div style={{ width: `${(present / total) * 100}%`, background: "#10b981" }} />
                  <div style={{ width: `${(late / total) * 100}%`, background: "#f59e0b" }} />
                </div>

                {/* Student cards with chronic absence flag */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
                  {att.records.map((rec, i) => {
                    const absCnt = absenceMap[rec.studentName]?.absent || 0;
                    const cfg = STATUS_CONFIG[rec.status] || STATUS_CONFIG.Absent;
                    const isChronic = absCnt >= ABSENT_THRESHOLD;
                    return (
                      <div key={i} style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "10px 14px", borderRadius: "12px",
                        background: cfg.bg, border: `1px solid ${cfg.border}`,
                        boxShadow: isChronic ? "0 0 10px rgba(239,68,68,0.2)" : "none"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          {isChronic && <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "#dc2626" }}>warning</span>}
                          <span style={{ fontSize: "13px", fontWeight: 500, color: "#2a1a1f", fontFamily: "Inter, sans-serif" }}>{rec.studentName}</span>
                        </div>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: cfg.color, fontFamily: "Inter, sans-serif" }}>{cfg.symbol}</span>
                      </div>
                    );
                  })}
                </div>
                {Object.entries(absenceMap).some(([, v]) => v.absent >= ABSENT_THRESHOLD) && (
                  <p style={{ marginTop: "12px", fontSize: "11px", color: "#dc2626", fontFamily: "Inter, sans-serif", display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>warning</span>
                    Students with ⚠ have {ABSENT_THRESHOLD}+ absences — consider early intervention.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
