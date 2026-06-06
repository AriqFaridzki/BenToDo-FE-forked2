// ─── Mini Line Chart (SVG) ────────────────────────────────────────────────────
// Data Labels: Week (Sun-Sat), Month (Week 1-4), Year (Jan-Dec)

import { useState } from "react";
import { getCalendarWeek, DAY_HEADERS } from "../../lib/utils";
import { COLOR } from "../ui/color";



type ChartRange = "week" | "month" | "year"; // custom type for chart range

const CHART_DATA: Record<ChartRange, { labels: string[]; data: number[] }> = {
  week: {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    data: [3, 4, 2, 3, 3, 4, 1],
  },
  month: {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    data: [8, 12, 6, 10],
  },
  year: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    data: [15, 20, 12, 18, 22, 14, 19, 25, 17, 21, 16, 23],
  },
};

export function ProductivityChart({ range = "week" }: { range?: ChartRange }) {
  const { labels, data } = CHART_DATA[range];
  const width = 520;
  const height = 220;
  const padX = 40;
  const padY = 20;
  const maxVal = Math.max(...data) + 2;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;



  const totalValue = data.reduce((sum, v) => sum + v, 0);
  const avgValue = data.length ? (totalValue / data.length).toFixed(1) : "0";

  const currentWeekDates = getCalendarWeek(new Date()); // get current week's dates
  const formattedLabels = range === "week"
    ? currentWeekDates.map((date, i) => `${date.getDate()} · ${DAY_HEADERS[i]}`)
    : labels;

  const points = data.map((v, i) => {
    const x = padX + (i / (data.length - 1)) * chartW;
    const y = padY + chartH - (v / maxVal) * chartH;
    return `${x},${y}`;
  });
  
  const areaPoints = [
    `${padX},${height - padY}`,
    ...points,
    `${width - padX},${height - padY}`,
  ].join(" ");

  const ySteps = 7;
  const yLabels = Array.from({ length: ySteps }, (_, i) => Math.round((maxVal / (ySteps - 1)) * i));

  const lineLength = points.reduce((acc, _, i, arr) => {
    if (i === 0) return 0;
    const [x1, y1] = arr[i - 1].split(",").map(Number);
    const [x2, y2] = arr[i].split(",").map(Number);
    return acc + Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }, 0);

  return (
    <div style={{ width: "100%" }}>
      {/* Header Info */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "16px",
        padding: "0 4px" 
      }}>
        <span style={{ fontSize: "11px", color: COLOR.muted, fontWeight: 500 }}>
          Tugas Selesai Dikejakan:
        </span>
        <div style={{ fontSize: "12px", color: COLOR.text, fontWeight: 500 }}>
          <span>Total: <strong style={{ color: COLOR.primary }}>{totalValue} Jam</strong></span>
          <span style={{ margin: "0 8px", color: "#E8E8E8" }}>|</span>
          <span>Rata-rata: <strong style={{ color: COLOR.primary }}>{avgValue} Jam/hari</strong></span>
        </div>
      </div>

      {/* SVG Chart - garisnya */}
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height + 30}`} style={{ overflow: "visible" }}>
        <style>{`
          @keyframes drawLine { from { stroke-dashoffset: ${lineLength}; } to { stroke-dashoffset: 0; } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes popIn { 0% { r: 0; } 60% { r: 4.5; } 100% { r: 3; } }
        `}</style>
        
        {/* Y axis labels & grid */}
        {yLabels.map((v, i) => {
          const y = padY + chartH - (v / maxVal) * chartH;
          return (
            <g key={`y-${i}`} style={{ animation: `fadeIn 0.4s ease ${i * 0.05}s both` }}>
              <text x={padX - 12} y={y + 4} textAnchor="end" fontSize="9" fill={COLOR.muted}>{v}</text>
              <line x1={padX} y1={y} x2={width - padX} y2={y} stroke="#E8E8E8" strokeWidth="1" />
            </g>
          );
        })}
        
        {/* X axis labels */}
        {formattedLabels.map((d, i) => {
          const x = padX + (i / (formattedLabels.length - 1)) * chartW;
          return (
            <text key={d} x={x} y={height + 16} textAnchor="middle" fontSize="8" fill={COLOR.text}
              style={{ animation: `fadeIn 0.4s ease ${0.2 + i * 0.04}s both` }}>{d}</text>
          );
        })}
        
        <polygon points={areaPoints} fill="#EEFFF0" opacity="0.95" style={{ animation: `fadeIn 0.8s ease 0.3s both` }} />
        
        {/* Animated Line */}
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke={COLOR.primary}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray={lineLength}
          strokeDashoffset="0"
          style={{ animation: `drawLine 1.2s ease-out 0.3s both` }}
        />
        
        {/* Animated Dots */}
        {data.map((v, i) => {
          const x = padX + (i / (data.length - 1)) * chartW;
          const y = padY + chartH - (v / maxVal) * chartH;
          return <circle key={i} cx={x} cy={y} r="3" fill={COLOR.primary}
            style={{ animation: `popIn 0.4s ease ${0.5 + i * 0.1}s both` }} />;
        })}
      </svg>
    </div>
  );
}


