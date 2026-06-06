// ─── Stat Card Badge ──────────────────────────────────────────────────────────

import { COLOR } from "./color";
import { TrendDownIcon, TrendUpIcon } from "./icons";

export function TrendBadge({ value, up }: { value: string; up: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "2px",
        fontSize: "12px", 
        fontWeight: 700,
        color: up ? COLOR.primary : "#D62839",
        backgroundColor: up ? "#BDFCC8" : COLOR.dangerSoft,
        borderRadius: "999px",
        padding: "2px 8px",
      }}
    >
      {up ? <TrendUpIcon /> : <TrendDownIcon />}
      {value}
    </span>
  );
}

// ─── Priority Badge ───────────────────────────────────────────────────────────

export function PriorityBadge({ level }: { level: "HIGH" | "MEDIUM" | "LOW" }) {
  const map = {
    HIGH: { bg: "#6D6D6D", text: "#fff" },
    MEDIUM: { bg: "#7B7B7B", text: "#fff" },
    LOW: { bg: "#8E8E8E", text: "#fff" },
  };
  const { bg, text } = map[level];
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.04em",
        color: text,
        backgroundColor: bg,
        borderRadius: "999px",
        padding: "3px 10px",
        lineHeight: "16px",
        flexShrink: 0,
      }}
    >
      {level}
    </span>
  );
}