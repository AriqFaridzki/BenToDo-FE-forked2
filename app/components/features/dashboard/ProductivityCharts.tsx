// ─── Mini Line Chart (SVG) ────────────────────────────────────────────────────
// Data Labels: Week (Sun-Sat), Month (Week 1-4), Year (Jan-Dec)

import { getCalendarWeek } from "../../../lib/utils";
import { COLOR } from "../../ui/color";
import { DAY_HEADERS, DAY_HEADERS_COMPLETE, tooltipChartState } from "../../../dashboard/typesAndMaps";
import { ChartRangeOption } from "../../../dashboard/typesAndMaps";
import { useState } from "react";
import { dashedVerticalGreenLine } from "../../ui/icons";



const CHART_DATA: Record<ChartRangeOption, { labels: string[]; data: number[] }> = {
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

export function ProductivityChart({ range = "week" }: { range?: ChartRangeOption }) {
  const { labels, data } = CHART_DATA[range];
  const width = 520;
  const height = 220;
  const padX = 40;
  const padY = 20;
  const maxVal = Math.max(...data) + 2;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;

  const [ChartToolTip, setChartToolTips] = useState<tooltipChartState>({
            visible: false,
            x: 0,
            y: 0,
            label: "",
            completed: 0,
            incomplete: 0,
          });
  

  const totalValue = data.reduce((sum, v) => sum + v, 0);
  const avgValue = data.length ? (totalValue / data.length).toFixed(1) : "0";

  const currentWeekDates = getCalendarWeek(new Date()); // get current week's dates
  const formattedLabels = range === "week"
    ? currentWeekDates.map((date, i) => `${date.getDate()} · ${DAY_HEADERS[i]}`)
    : labels;


  const today = new Date();
  let currentIndex = 0;
  if (range === "week") {
    currentIndex = today.getDay(); // 0 (Minggu) sampai 6 (Sabtu)
  } else if (range === "month") {
    currentIndex = Math.min(Math.floor((today.getDate() - 1) / 7), 3); // Minggu ke-1 sd ke-4
  } else if (range === "year") {
    currentIndex = today.getMonth(); // 0 (Jan) sampai 11 (Des)
  }

  // 1. Buat Array of Objects (punya properti .x dan .y)
  const pointsData = data.map((v, i) => {
    const x = padX + (i / (data.length - 1)) * chartW;
    const y = padY + chartH - (v / maxVal) * chartH;
    return { x, y, value: v }; 
  });
  
  // 2. Buat Array of Strings untuk areaPoints dan polyline SVG
  const points = pointsData.map(p => `${p.x},${p.y}`);

  // 3. TAMBAHKAN INI: Ambil koordinat presisi untuk "hari ini"
  const currentPoint = (currentIndex >= 0 && currentIndex < pointsData.length) 
    ? pointsData[currentIndex] 
    : null;
  
  const areaPoints = [
    `${padX},${height - padY}`,
    ...points,
    `${width - padX},${height - padY}`,
  ].join(" ");

  const ySteps = 7;
  const yLabels = Array.from({ length: ySteps }, (_, i) => Math.round((maxVal / (ySteps - 1)) * i));
  const oneStepHeight = chartH / (ySteps - 1);

  // const oneStepBelow = chartH / (ySteps - 2);
  const lineStartY = currentPoint ? Math.max(padY, currentPoint.y - oneStepHeight) : padY;
  

  const lineLength = points.reduce((acc, _, i, arr) => {
    if (i === 0) return 0;
    const [x1, y1] = arr[i - 1].split(",").map(Number);
    const [x2, y2] = arr[i].split(",").map(Number);
    return acc + Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }, 0);

  return (
    <div style={{ width: "100%",display: "flex", flexDirection: "column", position: "relative" }}>
      {/* Header Info */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "16px",
        padding: "0 4px" 
      }}>
        <span style={{ fontSize: "11px", color: COLOR.muted, fontWeight: 500 }}>
          Task Completed:
        </span>
        <div style={{ fontSize: "12px", color: COLOR.text, fontWeight: 500 }}>
          <span>Total: <strong style={{ color: COLOR.primary }}>{totalValue} Hour</strong></span>
          <span style={{ margin: "0 8px", color: "#E8E8E8" }}>|</span>
          <span>Average: <strong style={{ color: COLOR.primary }}>{avgValue} Hour/Day</strong></span>
        </div>
      </div>

      <div style={{ position: "relative", width: "100%", flex: 1 }}>

      {/* SVG Chart - garisnya */}
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height + 30}`} style={{ overflow: "visible" }}>

        <defs>
          <linearGradient 
            id="currentDayGradient"
            x1="0" 
            y1={lineStartY} // <--- UBAH: Mulai persis di ketinggian titik
            x2="0" 
            y2={height - padY} //
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#009E08" stopOpacity="0.3"/>
            <stop offset="0.480769" stopColor="#009E08"/>
            <stop offset="1" stopColor="#009E08" stopOpacity="0.3"/>
          </linearGradient>
        </defs>

        <style>{`
          @keyframes drawLine { from { stroke-dashoffset: ${lineLength}; } to { stroke-dashoffset: 0; } }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes popIn { 0% { r: 0; } 60% { r: 4.5; } 100% { r: 3; } }
          @keyframes tooltipFadeIn {
              from { opacity: 0; transform: translate(-50%, calc(-100% - 2px)); }
              to { opacity: 1; transform: translate(-50%, calc(-100% - 12px)); }
            }
        `}</style>
        
        {/* Y axis labels & grid */}
        {yLabels.map((v, i) => {
          const y = padY + chartH - (v / maxVal) * chartH; //
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

        {/* 3. GARIS VERTIKAL "HARI INI" */}
          {currentPoint && (
            <line
              x1={currentPoint.x}
              y1={lineStartY} 
              x2={currentPoint.x} 
              y2={currentPoint.y + oneStepHeight}
              stroke="url(#currentDayGradient)"
              strokeDasharray="2 2" 
              strokeWidth="1"
              pointerEvents="none" 
              style={{ animation: `fadeIn 0.6s ease 0.8s both`, transform: `ScaleX(0.1)` }} 
            />
            
          )}
        
        {/* Animated Dots */}
        {data.map((v, i) => {
          const x = padX + (i / (data.length - 1)) * chartW;
          const y = padY + chartH - (v / maxVal) * chartH;
          return <circle key={i} cx={x} cy={y} r="4" fill={COLOR.primary} stroke={"#fff"} strokeWidth="2"
            style={{ animation: `popIn 0.4s ease ${0.5 + i * 0.1}s both`, cursor: "pointer", pointerEvents: "all" 
          }} onMouseEnter={(e) => {
            // Handle mouse enter event
            const xPercent = (x / width) * 100;

            const simulateIncomplete = Math.floor(Math.random() * 3);
            let dayLabel = "PRODUCTIVITY"

            if (range === "week") {
            dayLabel = `${DAY_HEADERS_COMPLETE[i] } PRODUCTIVITY`;
            } else if (range === "month") {
                dayLabel = `Week ${i + 1} PRODUCTIVITY` 
            } else {
              dayLabel = `${labels[i]} PRODUCTIVITY`
            }


            setChartToolTips({
                    visible: true,
                    x: xPercent, // Simpan persentase posisi X
                    y: y, // Posisi Y (masih berdasar viewBox, kita konversi nanti di styling)
                    label: dayLabel,
                    completed: v,
                    incomplete: simulateIncomplete,
                  });
            
          }} onMouseLeave={() => setChartToolTips(prev => ({ ...prev, visible: false }))}
          
          />;

         
           
        
        })}
      </svg>

      </div>
      {/* Tooltip Overlay (HTML Div di atas SVG) */}
        {ChartToolTip.visible && (
          <div
            style={{
              position: "absolute",
              // Posisi X menggunakan persentase agar responsif. 
              // Posisi Y menggunakan perhitungan proporsional tinggi SVG vs div container (agak tricky dengan preserveAspectRatio="none", 
              // tapi biasanya cukup akurat jika container dan viewBox rasio-nya tidak terlalu beda jauh)
              left: `${ChartToolTip.x + 13}%`,
              // Kita geser Y ke atas sedikit agar tooltip berada tepat di atas titik
              // Perkiraan konversi tinggi viewBox (250) ke tinggi div (100%)
              top: `${(ChartToolTip.y / (height + 30)) * 100}%`, 
              transform: "translate(-50%, calc(-100% - 12px))", // Menengahkah tooltip berdasarkan sumbu X
              zIndex: 10,
              pointerEvents: "none", // Agar tooltip tidak memblokir event hover
              animation: "tooltipFadeIn 0.2s ease-out forwards",
              
              /* Berdasarkan CSS dari Figma */
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "16px",
              gap: "4px",
              width: "176px",
              // height: "99px", // Sebaiknya auto agar menyesuaikan konten
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px 12px 12px 12px", // Sedikit modifikasi, biasanya tooltip membulat semua kecuali ada panah
            }}
          >
            {/* THURSDAY PRODUCTIVITY Label */}
            <div style={{
              width: "100%",
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "10px",
              lineHeight: "15px",
              display: "flex",
              alignItems: "center",
              textTransform: "uppercase",
              color: "#7E7576",
              marginBottom: "8px"
            }}>
              {ChartToolTip.label}
            </div>

            {/* List Tugas Selesai */}
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              marginBottom: "4px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "8px", height: "8px", backgroundColor: "#4AE176", borderRadius: "9999px" }} />
                <span style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#4C4546",
                  letterSpacing: "0.12px"
                }}>
                  Completed
                </span>
              </div>
              <span style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                color: "#191C1D",
                letterSpacing: "0.12px"
              }}>
                {ChartToolTip.completed} tasks
              </span>
            </div>

            {/* List Tugas Belum Selesai (Simulasi) */}
            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "8px", height: "8px", backgroundColor: "#BA1A1A", borderRadius: "9999px" }} />
                <span style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#4C4546",
                  letterSpacing: "0.12px"
                }}>
                  Not Completed
                </span>
              </div>
              <span style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                color: "#191C1D",
                letterSpacing: "0.12px"
              }}>
                {ChartToolTip.incomplete} tasks
              </span>
            </div>
          </div>
        )}
      </div>
  );
}


