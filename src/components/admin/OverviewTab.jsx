import { PROFILES } from "../../data/profiles";
import DonutChart from "../DonutChart";
import QuadrantMap from "../QuadrantMap";

export default function OverviewTab({
  participants,
  groups,
  groupMembers,
  unassigned,
  onSelectGroup,
}) {
  return (
    <>
      <div className="kpi-row">
        <DonutChart
          data={participants.reduce(
            (acc, p) => {
              acc[p.dominant] = (acc[p.dominant] || 0) + 1;
              return acc;
            },
            { D: 0, I: 0, S: 0, C: 0 },
          )}
        />
        <div className="kpi-stats">
          {Object.entries(PROFILES).map(([key, p]) => {
            const count = participants.filter(
              (pt) => pt.dominant === key,
            ).length;
            return (
              <div
                key={key}
                className="stat-card"
                style={{
                  background: p.bg,
                  border: `1px solid ${p.color}30`,
                  padding: "14px",
                }}
              >
                <div
                  className="stat-num"
                  style={{ color: p.color, fontSize: 28 }}
                >
                  {count}
                </div>
                <div className="stat-label" style={{ color: p.color }}>
                  {p.disc} · {p.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {participants.length > 0 && (
        <div className="quadrant-section">
          <h3 className="section-title">Carte des profils</h3>
          <QuadrantMap participants={participants} />
        </div>
      )}

      <div className="groups-overview-grid">
        {groups.map((g) => {
          const members = groupMembers(g.id);
          const tally = members.reduce(
            (acc, p) => {
              acc[p.dominant] = (acc[p.dominant] || 0) + 1;
              return acc;
            },
            { D: 0, I: 0, S: 0, C: 0 },
          );
          return (
            <div
              key={g.id}
              className="group-overview-card"
              role="button"
              tabIndex={0}
              aria-label={`Voir le groupe ${g.name}`}
              onClick={() => onSelectGroup(g)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectGroup(g);
                }
              }}
            >
              <div className="group-overview-name">{g.name}</div>
              <div className="group-overview-count">
                {members.length} membre{members.length > 1 ? "s" : ""}
              </div>
              {members.length > 0 ? (
                <div className="group-overview-chart">
                  <DonutChart data={tally} />
                  <div style={{ flex: 1 }}>
                    {Object.entries(PROFILES).map(([k, p]) => {
                      const c = tally[k] || 0;
                      const pct = Math.round((c / members.length) * 100);
                      return (
                        c > 0 && (
                          <div key={k} className="group-overview-bar-row">
                            <span
                              className="group-overview-bar-label"
                              style={{ color: p.color }}
                            >
                              {p.disc}
                            </span>
                            <div className="group-overview-bar-track">
                              <div
                                className="group-overview-bar-fill"
                                style={{
                                  background: p.color,
                                  width: `${pct}%`,
                                }}
                              />
                            </div>
                            <span className="group-overview-bar-value">
                              {c} ({pct}%)
                            </span>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              ) : (
                <span className="group-overview-empty">Vide</span>
              )}
            </div>
          );
        })}
        {unassigned.length > 0 && (
          <div className="group-overview-card unassigned">
            <div className="group-overview-name unassigned">Sans groupe</div>
            <div className="group-overview-count">
              {unassigned.length} participant
              {unassigned.length > 1 ? "s" : ""}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
