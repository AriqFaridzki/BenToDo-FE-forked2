"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const TaskIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <path d="m9 14 2 2 4-4" />
  </svg>
);

const TemplateIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const SignOutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const CheckSquareIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const ClockAlertIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const BatteryIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111827" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
    <line x1="23" y1="13" x2="23" y2="11" />
  </svg>
);

const CalendarSmIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const SubtaskIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const MoreDotsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="5" cy="12" r="2" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="19" cy="12" r="2" />
  </svg>
);

const TrendUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const TrendDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
    <polyline points="17 18 23 18 23 12" />
  </svg>
);

const CompassIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="2" />
    <path d="M10.585 6.415l-6.585 13.585" />
    <path d="M13.415 6.415l6.585 13.585" />
    <path d="M7 16h10" />
  </svg>
);

const EyeOutlineIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);


// ─── Stat Card Badge ──────────────────────────────────────────────────────────

function TrendBadge({ value, up }: { value: string; up: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
        fontSize: "11px",
        fontWeight: 600,
        color: up ? "#16a34a" : "#ef4444",
        backgroundColor: up ? "#f0fdf4" : "#fef2f2",
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

function PriorityBadge({ level }: { level: "HIGH" | "MEDIUM" | "LOW" }) {
  const map = {
    HIGH: { bg: "#16a34a", text: "#fff" },
    MEDIUM: { bg: "#f59e0b", text: "#fff" },
    LOW: { bg: "#ef4444", text: "#fff" },
  };
  const { bg, text } = map[level];
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.04em",
        color: text,
        backgroundColor: bg,
        borderRadius: "4px",
        padding: "2px 10px",
        lineHeight: "18px",
      }}
    >
      {level}
    </span>
  );
}

// ─── Mini Line Chart (SVG) ────────────────────────────────────────────────────

function ProductivityChart() {
  // Example data points
  const data = [3, 2, 4, 3.5, 3, 3.5, 3.8, 3.5, 3.5, 4, 3.5, 1];
  const width = 520;
  const height = 220;
  const padX = 40;
  const padY = 20;
  const maxVal = 7;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;

  const points = data.map((v, i) => {
    const x = padX + (i / (data.length - 1)) * chartW;
    const y = padY + chartH - (v / maxVal) * chartH;
    return `${x},${y}`;
  });

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const yLabels = [0, 1, 2, 3, 4, 5, 6];

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height + 30}`} style={{ overflow: "visible" }}>
      {/* Y axis labels */}
      {yLabels.map((v) => {
        const y = padY + chartH - (v / maxVal) * chartH;
        return (
          <g key={v}>
            <text x={padX - 12} y={y + 4} textAnchor="end" fontSize="11" fill="#9ca3af">{v}</text>
            <line x1={padX} y1={y} x2={width - padX} y2={y} stroke="#f3f4f6" strokeWidth="1" />
          </g>
        );
      })}
      {/* X axis labels */}
      {days.map((d, i) => {
        const x = padX + (i / (days.length - 1)) * chartW;
        return (
          <text key={d} x={x} y={height + 16} textAnchor="middle" fontSize="10" fill="#9ca3af">{d}</text>
        );
      })}
      {/* Line */}
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke="#16a34a"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Dots */}
      {data.map((v, i) => {
        const x = padX + (i / (data.length - 1)) * chartW;
        const y = padY + chartH - (v / maxVal) * chartH;
        return <circle key={i} cx={x} cy={y} r="3" fill="#16a34a" />;
      })}
    </svg>
  );
}

// ─── Sample Data ──────────────────────────────────────────────────────────────

const priorityTasks = [
  { title: "Draft Client Proposal", level: "HIGH" as const, subtask: "0/5", date: "Oct 2, 2026" },
  { title: "Finalize UI Screens", level: "MEDIUM" as const, subtask: "7/10", date: "Sep 30, 2026" },
  { title: "Research for Mobile App", level: "LOW" as const, subtask: "4/4", date: "Sep 28, 2026" },
];

const recentTasks = [
  { title: "Skripsi", level: "HIGH" as const, subtask: "0/5", date: "Oct 2, 2026", done: false },
  { title: "Metopen Bab 1", level: "MEDIUM" as const, subtask: "7/10", date: "Sep 30, 2026", done: true },
  { title: "SRS Mobile app Task", level: "LOW" as const, subtask: "4/4", date: "Sep 28, 2026", done: false },
];

// ─── Calendar Data ────────────────────────────────────────────────────────────

const calendarDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const calendarDates = [4, 5, 6, 7, 8, 9, 10];
const todayIndex = 2; // Wednesday = index 2 (6th)
const dotDays = [1]; // Tuesday has a dot

// ─── Template Data ────────────────────────────────────────────────────────────

const templatesData = [
  { id: 1, title: "Weekly Design Sprint", desc: "A collaborative 5-day process for answering critical business questions through design, prototyping, and testing.", level: "HIGH", subtasks: 2, type: ["All", "Public"] },
  { id: 2, title: "Proyek Kelompok", desc: "A collaborative 5-day process for answering critical business questions through design, prototyping, and testing.", level: "MIDLE", subtasks: 4, type: ["All", "Private"] },
  { id: 3, title: "Rencana Belajar Semester", desc: "A collaborative 5-day process for answering critical business questions through design, prototyping, and testing.", level: "LOW", subtasks: 3, type: ["All", "Public"] },
  { id: 4, title: "Menulis Skripsi", desc: "A collaborative 5-day process for answering critical business questions through design, prototyping, and testing.", level: "HIGH", subtasks: 4, type: ["All", "Private"] },
  { id: 5, title: "Persiapan Ujian", desc: "A collaborative 5-day process for answering critical business questions through design, prototyping, and testing.", level: "LOW", subtasks: 2, type: ["All"] },
  { id: 6, title: "Persiapan Presentasi", desc: "A collaborative 5-day process for answering critical business questions through design, prototyping, and testing.", level: "MIDLE", subtasks: 5, type: ["All", "Public", "Private"] },
  { id: 7, title: "Project PKM Mahasiswa", desc: "A collaborative 5-day process for answering critical business questions through design, prototyping, and testing.", level: "HIGH", subtasks: 4, type: ["Private"] },
];

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<"Daily" | "Weekly" | "Monthly" | "Yearly">("Weekly");
  const [templateFilter, setTemplateFilter] = useState<"All" | "Public" | "Private">("All");
  const [searchTask, setSearchTask] = useState("");
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleSignOut = () => {
    localStorage.removeItem("bentodo_token");
    sessionStorage.removeItem("bentodo_token");
    router.push("/");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#fafafa", fontFamily: "inherit" }}>

      {/* ═══════════════════════════════════════
          SIDEBAR
      ═══════════════════════════════════════ */}
      <aside
        style={{
          width: "220px",
          minHeight: "100vh",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #f0f0f0",
          display: "flex",
          flexDirection: "column",
          padding: "24px 0",
          position: "sticky",
          top: 0,
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0 20px", marginBottom: "32px" }}>
          <Image
            src="/Logo BenTodo.png"
            alt="Ben To Do Logo"
            width={36}
            height={36}
            style={{ width: "36px", height: "auto" }}
          />
          <div>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>Ben To Do</div>
            <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 400 }}>Task Dashboard</div>
          </div>
        </div>

        {/* Menu Label */}
        <div style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", padding: "0 20px", marginBottom: "8px" }}>
          MENU
        </div>

        {/* Nav Items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "2px", padding: "0 12px" }}>
          {[
            { key: "dashboard", label: "DashBoard", icon: <DashboardIcon /> },
            { key: "task", label: "Task", icon: <TaskIcon /> },
            { key: "template", label: "Template", icon: <TemplateIcon /> },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveMenu(key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "13px",
                fontWeight: activeMenu === key ? 600 : 400,
                color: activeMenu === key ? "#ffffff" : "#6b7280",
                backgroundColor: activeMenu === key ? "#16a34a" : "transparent",
                transition: "all 0.15s",
                width: "100%",
                textAlign: "left",
              }}
            >
              <span style={{ display: "flex", color: activeMenu === key ? "#ffffff" : "#9ca3af" }}>
                {icon}
              </span>
              {label}
            </button>
          ))}
        </nav>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Sign Out */}
        <div style={{ padding: "0 12px" }}>
          <button
            onClick={handleSignOut}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "13px",
              fontWeight: 400,
              color: "#6b7280",
              backgroundColor: "transparent",
              transition: "all 0.15s",
              width: "100%",
              textAlign: "left",
            }}
          >
            <SignOutIcon />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ═══════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════ */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* ── Top Bar ── */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 32px",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #f0f0f0",
            position: "sticky",
            top: 0,
            zIndex: 20,
          }}
        >
          <h1 style={{ fontSize: "18px", fontWeight: 700, color: "#111827", margin: 0 }}>
            {activeMenu === "dashboard" ? "Dashboard" : activeMenu === "task" ? "Task" : "Template"}
          </h1>

          {/* Search + Notification + Profile */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", display: "flex" }}>
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search task"
                value={searchTask}
                onChange={(e) => setSearchTask(e.target.value)}
                style={{
                  width: "200px",
                  height: "36px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  paddingLeft: "36px",
                  paddingRight: "12px",
                  fontSize: "13px",
                  color: "#111827",
                  backgroundColor: "#ffffff",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
            </div>

            {/* Notification */}
            <button
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                background: "none",
                color: "#6b7280",
                cursor: "pointer",
              }}
            >
              <BellIcon />
            </button>

            {/* User Avatar + Name */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#6b7280",
                }}
              >
                A
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "#111827", lineHeight: 1.2 }}>
                  Ariqmuzakki
                </div>
                <div style={{ fontSize: "11px", color: "#9ca3af" }}>My Workspace</div>
              </div>
            </div>
          </div>
        </header>

        {/* ── Scrollable Content ── */}
        <div style={{ flex: 1, padding: "24px 32px", overflowY: "auto" }}>

          {/* Welcome + Time Range + Focus Timer */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
                Welcome, Ariqmuzakki
              </h2>
              <p style={{ fontSize: "13px", color: "#9ca3af", margin: 0 }}>
                Here&apos;s what&apos;s happening with your workspace today.
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              {/* Toggle Buttons */}
              <div
                style={{
                  display: "flex",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  overflow: "hidden",
                }}
              >
                {activeMenu === "dashboard" ? (
                  (["Daily", "Weekly", "Monthly", "Yearly"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeRange(t)}
                      style={{
                        padding: "8px 16px",
                        fontSize: "12px",
                        fontWeight: timeRange === t ? 600 : 400,
                        fontFamily: "inherit",
                        color: timeRange === t ? "#111827" : "#9ca3af",
                        backgroundColor: timeRange === t ? "#f9fafb" : "#ffffff",
                        border: "none",
                        borderRight: "1px solid #e5e7eb",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {t}
                    </button>
                  ))
                ) : (
                  (["All", "Public", "Private"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTemplateFilter(t)}
                      style={{
                        padding: "8px 16px",
                        fontSize: "12px",
                        fontWeight: templateFilter === t ? 600 : 400,
                        fontFamily: "inherit",
                        color: templateFilter === t ? "#111827" : "#9ca3af",
                        backgroundColor: templateFilter === t ? "#ffffff" : "#f3f4f6",
                        border: "none",
                        borderRight: t !== "Private" ? "1px solid #e5e7eb" : "none",
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {t}
                    </button>
                  ))
                )}
              </div>

              {/* Start Focus Timer Button */}
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  backgroundColor: "#16a34a",
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background-color 0.15s",
                }}
              >
                <PlayIcon />
                {activeMenu === "dashboard" ? "Start Focus Timer" : "Template Baru"}
              </button>
            </div>
          </div>

          {/* ── Dashboard View ── */}
          {activeMenu === "dashboard" && (
            <>
              {/* ── Stats Cards ── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                {/* Task Completed */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "20px" }}>
                  <div style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500, marginBottom: "12px" }}>Task Completed</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <CheckSquareIcon />
                    <span style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}>128</span>
                    <TrendBadge value="+10%" up />
                  </div>
                  <div style={{ fontSize: "11px", color: "#d1d5db" }}>from last week</div>
                </div>

                {/* Upcoming Deadlines */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "20px" }}>
                  <div style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500, marginBottom: "12px" }}>Upcoming Deadlines</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <ClockAlertIcon />
                    <span style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}>50</span>
                    <TrendBadge value="+10%" up />
                  </div>
                  <div style={{ fontSize: "11px", color: "#d1d5db" }}>from last week</div>
                </div>

                {/* Overdue Task */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "20px" }}>
                  <div style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500, marginBottom: "12px" }}>Overdue Task</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <AlertTriangleIcon />
                    <span style={{ fontSize: "28px", fontWeight: 700, color: "#111827" }}>9000</span>
                    <TrendBadge value="-10%" up={false} />
                  </div>
                  <div style={{ fontSize: "11px", color: "#d1d5db" }}>from last week</div>
                </div>

                {/* Energy */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "20px" }}>
                  <div style={{ fontSize: "12px", color: "#9ca3af", fontWeight: 500, marginBottom: "12px" }}>Energy</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <BatteryIcon />
                    <span style={{ fontSize: "20px", fontWeight: 700, color: "#111827" }}>76%</span>
                  </div>
                  {/* Progress bar */}
                  <div style={{ width: "100%", height: "8px", backgroundColor: "#e5e7eb", borderRadius: "999px", marginBottom: "8px" }}>
                    <div style={{ width: "76%", height: "100%", backgroundColor: "#16a34a", borderRadius: "999px", transition: "width 0.5s" }} />
                  </div>
                  <div style={{ fontSize: "11px", color: "#16a34a", fontWeight: 500 }}>▸ Ready for do Task</div>
                </div>
              </div>

              {/* ── Priority Task + Productivity Chart Row ── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "340px 1fr",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                {/* Priority Task Card */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>Priority Task</span>
                    <span style={{ fontSize: "12px", color: "#9ca3af", cursor: "pointer" }}>View all</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {priorityTasks.map((task) => (
                      <div
                        key={task.title}
                        style={{
                          backgroundColor: "#f9fafb",
                          borderRadius: "10px",
                          padding: "14px 16px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                          <span style={{ fontSize: "13px", fontWeight: 600, color: "#111827" }}>{task.title}</span>
                          <PriorityBadge level={task.level} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#9ca3af" }}>
                            <SubtaskIcon /> {task.subtask}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#9ca3af" }}>
                            <CalendarSmIcon /> {task.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Productivity Overview Chart */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>Productivity Overview</span>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 14px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                        backgroundColor: "#ffffff",
                        fontSize: "12px",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      <CalendarSmIcon /> This Week ▾
                    </button>
                  </div>
                  <div style={{ width: "100%", height: "240px" }}>
                    <ProductivityChart />
                  </div>
                </div>
              </div>

              {/* ── Calendar ── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "340px 1fr",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                {/* Calendar Card */}
                <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                    <span style={{ fontSize: "15px", fontWeight: 700, color: "#111827" }}>Calendar</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", display: "flex" }}>
                        <ChevronLeftIcon />
                      </button>
                      <span style={{ fontSize: "13px", fontWeight: 500, color: "#111827" }}>June 2026</span>
                      <button style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", display: "flex" }}>
                        <ChevronRightIcon />
                      </button>
                    </div>
                  </div>

                  {/* Days header */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", marginBottom: "8px" }}>
                    {calendarDays.map((d) => (
                      <span key={d} style={{ fontSize: "10px", fontWeight: 600, color: "#9ca3af", letterSpacing: "0.04em" }}>{d}</span>
                    ))}
                  </div>

                  {/* Dates */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", gap: "4px" }}>
                    {calendarDates.map((date, i) => (
                      <div key={date} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "13px",
                            fontWeight: i === todayIndex ? 700 : 400,
                            color: i === todayIndex ? "#ffffff" : "#111827",
                            backgroundColor: i === todayIndex ? "#111827" : "transparent",
                            cursor: "pointer",
                            transition: "all 0.15s",
                          }}
                        >
                          {date}
                        </div>
                        {/* Dot indicator */}
                        {dotDays.includes(i) && (
                          <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: "#16a34a" }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spacer or placeholder for the right */}
                <div />
              </div>

              {/* ── Recent Tasks Table ── */}
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "20px", marginBottom: "32px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <span style={{ fontSize: "16px", fontWeight: 700, color: "#111827" }}>Recent Tasks</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {/* Search in table */}
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af", display: "flex" }}>
                        <SearchIcon />
                      </span>
                      <input
                        type="text"
                        placeholder="Search task"
                        style={{
                          width: "180px",
                          height: "32px",
                          borderRadius: "6px",
                          border: "1px solid #e5e7eb",
                          paddingLeft: "32px",
                          paddingRight: "10px",
                          fontSize: "12px",
                          color: "#111827",
                          fontFamily: "inherit",
                          outline: "none",
                        }}
                      />
                    </div>
                    {/* Filter */}
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "1px solid #e5e7eb",
                        background: "#fff",
                        fontSize: "12px",
                        color: "#6b7280",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      <FilterIcon /> Filter
                    </button>
                  </div>
                </div>

                {/* Table */}
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      {["TASK ↕", "TASK LEVEL ↕", "SUBTASK ↕", "DUE DATE ↕", "VIEW DETAIL ↕"].map((h) => (
                        <th
                          key={h}
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#9ca3af",
                            textAlign: "left",
                            padding: "10px 12px",
                            letterSpacing: "0.02em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentTasks.map((task) => (
                      <tr key={task.title} style={{ borderBottom: "1px solid #f9fafb" }}>
                        <td style={{ padding: "14px 12px", display: "flex", alignItems: "center", gap: "10px" }}>
                          <input
                            type="checkbox"
                            defaultChecked={task.done}
                            style={{
                              width: "16px",
                              height: "16px",
                              accentColor: "#16a34a",
                              borderRadius: "4px",
                              cursor: "pointer",
                              flexShrink: 0,
                            }}
                          />
                          <span style={{ fontSize: "13px", fontWeight: 500, color: "#111827" }}>{task.title}</span>
                        </td>
                        <td style={{ padding: "14px 12px" }}>
                          <PriorityBadge level={task.level} />
                        </td>
                        <td style={{ padding: "14px 12px", fontSize: "13px", color: "#6b7280" }}>
                          {task.subtask}
                        </td>
                        <td style={{ padding: "14px 12px", fontSize: "13px", color: "#6b7280" }}>
                          {task.date}
                        </td>
                        <td style={{ padding: "14px 12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex" }}>
                              <MoreDotsIcon />
                            </button>
                            <button
                              style={{
                                padding: "6px 14px",
                                borderRadius: "6px",
                                border: "1px solid #e5e7eb",
                                backgroundColor: "#ffffff",
                                fontSize: "12px",
                                fontWeight: 500,
                                color: "#111827",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Mulai Fokus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ── Template / Task View ── */}
          {(activeMenu === "template" || activeMenu === "task") && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {templatesData
                  .filter((item) => item.type.includes(templateFilter))
                  .map((item) => (
                    <div key={item.id} style={{
                      flex: "1 1 300px",
                      maxWidth: "400px",
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      border: "1px solid #f0f0f0",
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column"
                    }}>
                      {/* Icon & Badge */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                        <div style={{
                          width: "44px", height: "44px", borderRadius: "8px", backgroundColor: "#e0e7ff",
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                          <CompassIcon />
                        </div>
                        <span style={{
                          display: "inline-block", fontSize: "10px", fontWeight: 700, letterSpacing: "0.04em",
                          color: "#4b5563", backgroundColor: "#f3f4f6", borderRadius: "999px", padding: "4px 12px",
                        }}>
                          {item.level}
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", marginBottom: "8px", marginTop: 0 }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, marginBottom: "24px" }}>
                        {item.desc}
                      </p>

                      {/* Tags */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                        <span style={{
                          display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4b5563",
                          backgroundColor: "#f3f4f6", padding: "6px 10px", borderRadius: "6px", fontWeight: 500
                        }}>
                          <SubtaskIcon /> {item.subtasks} Subtasks
                        </span>
                        <span style={{
                          display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4b5563",
                          backgroundColor: "#f3f4f6", padding: "6px 10px", borderRadius: "6px", fontWeight: 500
                        }}>
                          <CalendarSmIcon /> No due date
                        </span>
                      </div>

                      {/* Buttons */}
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}>
                        <button style={{
                          flex: 1, height: "40px", borderRadius: "8px", backgroundColor: "#16a34a", color: "#ffffff",
                          fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "inherit",
                          transition: "background-color 0.15s"
                        }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#15803d"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#16a34a"; }}
                        >
                          Use Template
                        </button>
                        <button style={{
                          width: "40px", height: "40px", borderRadius: "8px", border: "1px solid #e5e7eb", backgroundColor: "#ffffff",
                          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color 0.15s"
                        }}>
                          <EyeOutlineIcon />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Pagination */}
              <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
                {[1, 2, 3].map((page) => (
                  <button key={page} style={{
                    width: "28px", height: "28px", borderRadius: "4px",
                    border: page === 1 ? "1px solid #86efac" : "1px solid #e5e7eb",
                    backgroundColor: "#ffffff",
                    color: page === 1 ? "#16a34a" : "#6b7280",
                    fontSize: "12px", fontWeight: 500, cursor: "pointer", fontFamily: "inherit"
                  }}>
                    {page}
                  </button>
                ))}
              </div>

              {/* Tips Banner */}
              <div style={{
                backgroundColor: "#dcfce7", color: "#166534", padding: "16px 24px",
                borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                textAlign: "center", marginTop: "16px"
              }}>
                Tips : Use templates to speed up your task planning. You can still edit them after use.
              </div>
            </div>
          )}


        </div>
      </main>
    </div>
  );
}
