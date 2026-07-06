import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Admin",
      icon: "admin_panel_settings",
      role: "admin",
    },
    {
      title: "Teacher",
      icon: "school",
      role: "teacher",
    },
    {
      title: "Student",
      icon: "school",
      role: "student",
    },
    {
      title: "Parent",
      icon: "family_restroom",
      role: "parent",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#130b16,#2a141e,#3b1f38,#1a1022)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "90px",
            height: "90px",
            margin: "auto",
            borderRadius: "25px",
            background:
              "linear-gradient(135deg,#7c3aed,#ec4899)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 10px 30px rgba(124,58,237,.4)",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "45px",
              color: "white",
              fontVariationSettings: "'FILL' 1",
            }}
          >
            school
          </span>
        </div>

        <h1
          style={{
            color: "white",
            fontFamily: "Outfit,sans-serif",
            fontSize: "48px",
            marginTop: "25px",
            marginBottom: "10px",
          }}
        >
          ABC Public School
        </h1>

        <p
          style={{
            color: "rgba(255,220,230,.7)",
            fontSize: "18px",
            marginBottom: "60px",
          }}
        >
          School Management System
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "30px",
          }}
        >
          {roles.map((item) => (
            <div
              key={item.role}
              onClick={() => navigate(`/login?role=${item.role}`)}
              style={{
                background: "rgba(42,20,30,.75)",
                backdropFilter: "blur(18px)",
                borderRadius: "25px",
                padding: "40px",
                cursor: "pointer",
                transition: ".3s",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  margin: "auto",
                  borderRadius: "18px",
                  background:
                    "linear-gradient(135deg,#7c3aed,#ec4899)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    color: "white",
                    fontSize: "35px",
                  }}
                >
                  {item.icon}
                </span>
              </div>

              <h3
                style={{
                  color: "white",
                  marginTop: "20px",
                  fontFamily: "Outfit,sans-serif",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "rgba(255,220,230,.65)",
                  fontSize: "14px",
                }}
              >
                Continue as {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}