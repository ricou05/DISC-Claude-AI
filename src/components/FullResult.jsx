import { PROFILES } from "../data/profiles";
import { fullName } from "../utils/helpers";

export default function FullResult({ participant }) {
  const { scores, dominant } = participant;
  const prof = PROFILES[dominant];
  if (!prof || !scores) return null;

  const displayName = fullName(participant);

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div
          style={{
            fontSize: 11,
            color: "#555",
            letterSpacing: 2,
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 8,
          }}
        >
          {displayName}
        </div>
        <div
          style={{
            fontFamily: "'DM Serif Display',serif",
            fontSize: "clamp(60px,12vw,100px)",
            lineHeight: 1,
            color: prof.color,
            marginBottom: 4,
          }}
        >
          {prof.disc}
        </div>
        <div
          style={{
            fontFamily: "'DM Serif Display',serif",
            fontSize: "clamp(20px,4vw,30px)",
            color: "#fff",
            marginBottom: 6,
          }}
        >
          {prof.label}
        </div>
        <div
          style={{
            fontSize: 12,
            color: prof.color,
            letterSpacing: 1,
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 16,
          }}
        >
          {prof.tagline}
        </div>
        <div
          style={{
            fontStyle: "italic",
            fontSize: 14,
            color: "#777",
            padding: "12px 20px",
            borderLeft: `3px solid ${prof.color}`,
            borderRadius: "0 10px 10px 0",
            background: "rgba(255,255,255,0.02)",
            maxWidth: 440,
            margin: "0 auto",
            textAlign: "left",
          }}
        >
          {prof.quote}
        </div>
      </div>

      {/* Score bars */}
      <div
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 16,
          padding: 22,
          marginBottom: 18,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#333",
            marginBottom: 14,
          }}
        >
          Profil DISC complet
        </div>
        {Object.entries(PROFILES).map(([key, p]) => (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 120,
                fontSize: 13,
                fontWeight: 700,
                color: p.color,
                flexShrink: 0,
              }}
            >
              {p.disc} — {p.label}
            </div>
            <div
              style={{
                flex: 1,
                height: 8,
                background: "rgba(255,255,255,0.05)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 4,
                  background: p.color,
                  width: `${(scores[key] / 25) * 100}%`,
                  transition: "width 1s ease",
                }}
              />
            </div>
            <div
              style={{
                width: 22,
                fontSize: 13,
                fontWeight: 700,
                color: p.color,
                textAlign: "right",
              }}
            >
              {scores[key]}
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div
        style={{
          background: "rgba(255,255,255,0.025)",
          border: `1px solid ${prof.color}25`,
          borderRadius: 16,
          padding: 22,
          marginBottom: 16,
        }}
      >
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "#bbb" }}>
          {prof.description}
        </p>
      </div>

      {/* Traits grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 16,
        }}
      >
        {[
          { title: "Dans un bon jour ☀️", items: prof.goodDay, cls: "good" },
          { title: "Dans un mauvais jour 🌧️", items: prof.badDay, cls: "bad" },
          { title: "Ce que j'aime 💛", items: prof.loves, cls: "neutral" },
          { title: "Ce que je crains 😰", items: prof.fears, cls: "bad" },
        ].map(({ title, items, cls }) => (
          <div
            key={title}
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 14,
              padding: 16,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#444",
                marginBottom: 10,
              }}
            >
              {title}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {items.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 500,
                    background:
                      cls === "good"
                        ? "rgba(58,158,107,0.13)"
                        : cls === "bad"
                          ? "rgba(232,57,58,0.1)"
                          : "rgba(255,255,255,0.05)",
                    color:
                      cls === "good"
                        ? "#5ecb90"
                        : cls === "bad"
                          ? "#f87171"
                          : "#888",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Dos / Don'ts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            borderRadius: 14,
            padding: 16,
            background: "rgba(58,158,107,0.07)",
            border: "1px solid rgba(58,158,107,0.18)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#5ecb90",
              marginBottom: 10,
            }}
          >
            ✅ Ce qui fonctionne
          </div>
          {prof.dos.map((d, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 7,
                fontSize: 13,
                lineHeight: 1.5,
                color: "#bbb",
              }}
            >
              <span>→</span>
              <span>{d}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            borderRadius: 14,
            padding: 16,
            background: "rgba(232,57,58,0.06)",
            border: "1px solid rgba(232,57,58,0.18)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#f87171",
              marginBottom: 10,
            }}
          >
            ❌ À éviter
          </div>
          {prof.donts.map((d, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 8,
                marginBottom: 7,
                fontSize: 13,
                lineHeight: 1.5,
                color: "#bbb",
              }}
            >
              <span>→</span>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compatibility */}
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "#444",
          marginBottom: 12,
        }}
      >
        🤝 Compatibilité
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}
      >
        {Object.entries(PROFILES).map(([key, p]) => (
          <div
            key={key}
            style={{
              borderRadius: 12,
              padding: 14,
              background: p.bg,
              border: `1px solid ${p.color}30`,
            }}
          >
            <div
              style={{
                fontFamily: "'DM Serif Display',serif",
                fontSize: 22,
                color: p.color,
                marginBottom: 4,
              }}
            >
              {p.disc}
            </div>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: p.color,
                marginBottom: 6,
              }}
            >
              {p.label}
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.6, color: "#999" }}>
              {prof.compat[key]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
