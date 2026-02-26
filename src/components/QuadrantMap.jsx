import { PROFILES } from "../data/profiles";
import { fullName } from "../utils/helpers";

export default function QuadrantMap({ participants }) {
  if (!participants.length) {
    return (
      <div style={{ textAlign: "center", color: "#444", padding: "30px 0" }}>
        Aucun participant
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "100%",
        maxWidth: 380,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        {/* Quadrant backgrounds */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "50%", background: "rgba(232,57,58,0.06)" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "50%", background: "rgba(212,168,0,0.06)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: "50%", height: "50%", background: "rgba(27,127,196,0.06)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: "50%", height: "50%", background: "rgba(58,158,107,0.06)" }} />

        {/* Labels */}
        <div style={{ position: "absolute", top: 8, left: 12, fontSize: 11, fontWeight: 700, color: "#E8393A", opacity: 0.7 }}>D</div>
        <div style={{ position: "absolute", top: 8, right: 12, fontSize: 11, fontWeight: 700, color: "#D4A800", opacity: 0.7 }}>I</div>
        <div style={{ position: "absolute", bottom: 8, left: 12, fontSize: 11, fontWeight: 700, color: "#1B7FC4", opacity: 0.7 }}>C</div>
        <div style={{ position: "absolute", bottom: 8, right: 12, fontSize: 11, fontWeight: 700, color: "#3A9E6B", opacity: 0.7 }}>S</div>

        {/* Axes */}
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.07)" }} />

        {/* Participant dots */}
        {participants.map((p, i) => {
          if (!p.scores) return null;
          const { D, I, S, C } = p.scores;
          const tot = (D + I + S + C) || 1;
          const x = ((D + I) / tot) * 100;
          const y = ((D + C) / tot) * 100;
          const prof = PROFILES[p.dominant];

          return (
            <div
              key={i}
              title={`${fullName(p)} (${prof.disc})`}
              style={{
                position: "absolute",
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%,-50%)",
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: prof.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 900,
                color: "#fff",
                cursor: "default",
                boxShadow: "0 0 0 2px rgba(0,0,0,0.5)",
                zIndex: 2,
                fontFamily: "'DM Serif Display',serif",
              }}
            >
              {(p.name || "?").charAt(0).toUpperCase()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
