import { PROFILES } from "../data/profiles";

export default function DonutChart({ data }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0) || 1;
  let offset = 0;
  const r = 40;
  const cx = 60;
  const cy = 60;
  const stroke = 18;
  const circ = 2 * Math.PI * r;

  const slices = ["D", "I", "S", "C"].map((k) => {
    const pct = data[k] / total;
    const dash = pct * circ;
    const sl = {
      key: k,
      dasharray: `${dash} ${circ - dash}`,
      offset: circ - offset,
      color: PROFILES[k].color,
    };
    offset += dash;
    return sl;
  });

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      {slices.map((s) => (
        <circle
          key={s.key}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={s.color}
          strokeWidth={stroke}
          strokeDasharray={s.dasharray}
          strokeDashoffset={s.offset}
          style={{ transform: "rotate(-90deg)", transformOrigin: "60px 60px" }}
        />
      ))}
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        fill="#fff"
        fontSize="13"
        fontWeight="700"
      >
        {total}
      </text>
      <text
        x={cx}
        y={cy + 18}
        textAnchor="middle"
        fill="#666"
        fontSize="9"
      >
        total
      </text>
    </svg>
  );
}
