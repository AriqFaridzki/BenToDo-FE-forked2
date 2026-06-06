"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useDashboard } from "./useDashboard"
import { 
  ChartRange,
  mapEnergyToLevel,
  ViewCard, 
  MONTH_NAMES,
  DAY_HEADERS, } from "./typesAndMaps";


import type { EnergyWeight, Task, TaskStatus, TaskTemplate } from "../lib/api";

//color and SVG assets
import { // import icons
  DashboardIcon, 
  TaskIcon, 
  TemplateIcon, 
  SignOutIcon, 
  SearchIcon, 
  BellIcon, 
  PlayIcon, 
  CheckSquareIcon, 
  ClockAlertIcon, 
  AlertTriangleIcon, 
  BatteryIcon, 
  CalendarSmIcon, 
  SubtaskIcon, 
  FilterIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  MoreDotsIcon, 
  TrendUpIcon, 
  TrendDownIcon, 
  CompassIcon, 
  EyeOutlineIcon, 
  UsersIcon, 
  ShareIcon, 
  WrenchIcon, 
  MailIcon, 
  UsersUpIcon, 
  DownloadSquareIcon, 
  ArrowLeftIcon, 
  CalendarLineIcon, 
  SuccessCheckIcon, 
  CheckCircleSolidIcon, 
  PlusCircleIcon} from "../components/ui/icons";

import { COLOR, GUEST_ENERGY_SUMMARY, CARD_STYLE_COLOR, buttonReset} from "../components/ui/color"; //import color
import { LOGO_SRC } from "../lib/assets"; // logo

//badges
import { TrendBadge, PriorityBadge } from "../components/ui/badge";

//helper or utils
import { 
  getCalendarWeek,
  isSameDay,
  formatDate,

} from "../lib/utils";


//Components
import { ProductivityChart } from "../components/features/dashboard/ProductivityCharts";


import { Sidebar } from "../components/layout/Sidebar";
import { TopHeader } from "../components/layout/topHeader";


export default function DashboardPage() {
  const router = useRouter();
  const dashboardStates = useDashboard();

  const {
 // STATES

        apiTasks,
        displayName,
        energyData,
        deadlineStats,
        activeMenu,
        templateFilter,
        templateView,
        notice,
        chartRange,
        timeRange,
        chartDropdownOpen,
        calendarRef,
        selectedTaskId,
        taskDetailCopied,
        templatesList,
        isAddTaskModalOpen,
        addTaskTitle,
        addTaskEnergy,
        addTaskDeadline,
        addTaskDesc,
        addTaskSubtasks,
        newSubtaskText,
        localTaskMeta,
        searchTask,
        isActionLoading,
        selectedTemplateId,
        newTemplate,

        setApiTasks,
        setDisplayName,
        setEnergyData,
        setDeadlineStats,
        setActiveMenu,

        setNotice,

        setChartRange,
        setTimeRange,
        setChartDropdownOpen,
        setCalendarRef,

        setSelectedTaskId,
        setTaskDetailCopied,
        setIsAddTaskModalOpen,
        setAddTaskTitle,
        setAddTaskEnergy,
        setAddTaskDeadline,
        setAddTaskDesc,
        setAddTaskSubtasks,
        setNewSubtaskText,

        setLocalTaskMeta,
        setSearchTask,
        setIsActionLoading,

        setSelectedTemplateId,
        setNewTemplate,
        setTemplateFilter,
        setTemplateView,
        setTemplatesList,

        // MEMOS
        filteredTasks,
        priorityTaskItems,
        taskCards,
        recentTaskItems,
        emptyRecentTaskMessage,
        cardItems,
        selectedCard,
        completedCount,
        upcomingDeadlineCount,
        overdueCount,

        // HANDLERS
        handleSignOut,
        handleToggleTaskStatus,
        handleStartFocus,
        handleUseCard,
        handleCreateTask

  }= useDashboard();

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: COLOR.surface, color: COLOR.text, fontFamily: "inherit" }}>
    
    {/* ═══════════════════════════════════
          SIDEBAR
      ═══════════════════════════════════════*/}
      
    <Sidebar dashboardStates={dashboardStates}/>

    
      {/* ═══════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════ */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* ── Top Bar  (Top Header )── */}
        <TopHeader dashboardStates={dashboardStates} />

        {/* ── Scrollable Content ── (the Content ) */}
        <div style={{ flex: 1, padding: "26px 32px 38px", overflowY: "auto", overflowX: "hidden" }}>
          {notice && (
            <div
              style={{
                backgroundColor: "#f0fdf4",
                color: "#166534",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: 600,
                marginBottom: "16px",
                border: "1px solid #bbf7d0",
              }}
            >
              {notice}
            </div>
          )}

          {/* Welcome + Time Range + Focus Timer */}
          {(activeMenu === "dashboard" || (activeMenu === "template" && templateView === "list") || (activeMenu === "task" && !selectedTaskId)) && (
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "100%", marginBottom: "32px", gap: "24px" }}>
              <div>
                <h2 style={{ fontSize: "26px", fontWeight: 700, color: COLOR.text, margin: "0 0 6px", lineHeight: 1.15 }}>
                  Welcome, {displayName}
                </h2>
                <p style={{ fontSize: "12px", color: COLOR.text, margin: 0, lineHeight: 1.4 }}>
                  Here&apos;s what&apos;s happening with your workspace today.
                </p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                {/* Toggle Buttons */}
                <div
                  style={{
                    display: "flex",
                    borderRadius: "3px",
                    backgroundColor: "#F1F1F1",
                    padding: "2px",
                    overflow: "hidden",
                  }}
                >
                  {activeMenu === "dashboard" ? (
                    (["Daily", "Weekly", "Monthly", "Yearly"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTimeRange(t)}
                        style={{
                          width: "64px",
                          height: "32px",
                          fontSize: "11px",
                          fontWeight: timeRange === t ? 600 : 400,
                          fontFamily: "inherit",
                          color: COLOR.text,
                          backgroundColor: timeRange === t ? COLOR.surface : "transparent",
                          border: "none",
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
                          width: "64px",
                          height: "32px",
                          fontSize: "11px",
                          fontWeight: templateFilter === t ? 600 : 400,
                          fontFamily: "inherit",
                          color: COLOR.text,
                          backgroundColor: templateFilter === t ? COLOR.surface : "transparent",
                          border: "none",
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
                  onClick={() => {
                    if (activeMenu === "dashboard") {
                      void handleStartFocus(priorityTaskItems[0]?.id);
                    } else if (activeMenu === "task") {
                      setIsAddTaskModalOpen(true);
                    } else if (activeMenu === "template") {
                      setTemplateView("create");
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    minWidth: activeMenu === "dashboard" ? "158px" : "160px",
                    height: "34px",
                    padding: "0 16px",
                    borderRadius: "4px",
                    backgroundColor: COLOR.primary,
                    color: "#ffffff",
                    fontSize: "13px",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background-color 0.15s",
                  }}
                >
                  {activeMenu === "dashboard" ? <PlayIcon /> : <span style={{ fontSize: "16px", fontWeight: "bold", lineHeight: 1 }}>+</span>}
                  {activeMenu === "dashboard" ? "Start Focus Timer" : activeMenu === "task" ? "Task Baru" : "Template Baru"}
                </button>
              </div>
            </div>
          )}

          {/* ── Dashboard View ── */}
          {activeMenu === "dashboard" && (
            <>
              {/* ── Stats Cards ── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: "clamp(16px, 2vw, 32px)",
                  marginBottom: "32px",
                }}
              >
                {/* Task Completed */}
                <div style={{ ...CARD_STYLE_COLOR, width: "100%", minHeight: "136px", padding: "20px clamp(18px, 2.8vw, 32px)", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "14px", color: COLOR.text, fontWeight: 600, lineHeight: 1.1 }}>Task Completed</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <CheckSquareIcon />
                    <span style={{ fontSize: "34px", fontWeight: 700, color: COLOR.text, lineHeight: 1 }}>{completedCount}</span>
                    <TrendBadge value="+10%" up />
                  </div>
                  <div style={{ fontSize: "12px", color: COLOR.muted, lineHeight: 1 }}>from last week</div>
                </div>

                {/* Upcoming Deadlines */}
                <div style={{ ...CARD_STYLE_COLOR, width: "100%", minHeight: "136px", padding: "20px clamp(18px, 2.8vw, 32px)", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "14px", color: COLOR.text, fontWeight: 600, lineHeight: 1.1 }}>Upcoming Deadlines</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <ClockAlertIcon />
                    <span style={{ fontSize: "34px", fontWeight: 700, color: COLOR.text, lineHeight: 1 }}>{upcomingDeadlineCount}</span>
                    <TrendBadge value="+10%" up />
                  </div>
                  <div style={{ fontSize: "12px", color: COLOR.muted, lineHeight: 1 }}>from last week</div>
                </div>

                {/* Overdue Task */}
                <div style={{ ...CARD_STYLE_COLOR, width: "100%", minHeight: "136px", padding: "20px clamp(18px, 2.8vw, 32px)", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "14px", color: COLOR.text, fontWeight: 600, lineHeight: 1.1 }}>Overdue Task</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <AlertTriangleIcon />
                    <span style={{ fontSize: "34px", fontWeight: 700, color: COLOR.text, lineHeight: 1 }}>{overdueCount}</span>
                    <TrendBadge value="-10%" up={false} />
                  </div>
                  <div style={{ fontSize: "12px", color: COLOR.muted, lineHeight: 1 }}>from last week</div>
                </div>

                {/* Energy */}
                <div style={{ ...CARD_STYLE_COLOR, width: "100%", minHeight: "136px", padding: "20px clamp(18px, 2.8vw, 32px)", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ fontSize: "14px", color: COLOR.text, fontWeight: 600, lineHeight: 1.1 }}>Energy</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <BatteryIcon />
                    <span style={{ fontSize: "24px", fontWeight: 700, color: COLOR.text, lineHeight: 1 }}>{energyData.percent}%</span>
                    <span style={{ fontSize: "12px", color: COLOR.muted, fontWeight: 500, marginLeft: "auto" }}>{energyData.current} / {energyData.max} mins</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ width: "100%", height: "8px", backgroundColor: "#E8E8E8", borderRadius: "999px", overflow: "hidden" }}>
                      <div style={{ width: `${energyData.percent}%`, height: "100%", backgroundColor: energyData.isCritical ? COLOR.danger : COLOR.primary, borderRadius: "999px", transition: "width 0.3s ease, background-color 0.3s ease" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: energyData.isCritical ? COLOR.danger : COLOR.primary, fontWeight: 600 }}>
                      <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: energyData.isCritical ? COLOR.danger : COLOR.primary }} />
                      {energyData.current === 0 ? "Depleted" : energyData.isCritical ? "Critical Energy" : "Ready for do Task"}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Priority Task + Productivity Chart Row ── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(340px, 1.2fr) minmax(0, 2.6fr)",
                  gridTemplateRows: "auto auto",
                  gap: "clamp(22px, 2.6vw, 40px)",
                  width: "100%",
                  marginBottom: "32px",
                  alignItems: "stretch",
                }}
              >
                {/* Priority Task Card */}
                <div style={{ ...CARD_STYLE_COLOR, width: "100%", minHeight: "230px", padding: "24px clamp(18px, 2.2vw, 32px)", boxSizing: "border-box", gridColumn: "1" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" }}>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: COLOR.text, lineHeight: 1 }}>Priority Task</span>
                    <span onClick={() => setActiveMenu("task")} style={{ fontSize: "12px", color: COLOR.mutedDark, cursor: "pointer", lineHeight: 1 }}>View all</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {priorityTaskItems.length === 0 ? (
                      <div
                        style={{
                          backgroundColor: "#F1F1F1",
                          borderRadius: "7px",
                          padding: "18px clamp(16px, 1.8vw, 24px)",
                          minHeight: "80px",
                          display: "flex",
                          alignItems: "center",
                          color: COLOR.mutedDark,
                          fontSize: "13px",
                          fontWeight: 600,
                        }}
                      >
                        Belum ada priority task
                      </div>
                    ) : priorityTaskItems.map((task) => (
                      <div
                        key={task.id ?? task.title}
                        style={{
                          backgroundColor: "#F1F1F1",
                          borderRadius: "7px",
                          padding: "18px clamp(16px, 1.8vw, 24px)",
                          minHeight: "80px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "15px", gap: "14px" }}>
                          <span style={{ flex: 1, minWidth: 0, fontSize: "14px", fontWeight: 700, color: COLOR.text, lineHeight: 1.25, whiteSpace: "normal", wordBreak: "normal", overflowWrap: "break-word" }}>{task.title}</span>
                          <PriorityBadge level={task.level} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: COLOR.text, lineHeight: 1 }}>
                            <SubtaskIcon /> {task.subtask}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "11px", color: COLOR.text, lineHeight: 1 }}>
                            <CalendarSmIcon /> {task.date}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Productivity Overview Chart */}
                <div style={{ ...CARD_STYLE_COLOR, padding: "24px clamp(18px, 2vw, 32px)", gridColumn: "2", gridRow: "1 / span 2", minHeight: "386px", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: COLOR.text, lineHeight: 1 }}>Productivity Overview</span>
                    <div style={{ position: "relative" }}>
                      <button
                        onClick={() => setChartDropdownOpen(!chartDropdownOpen)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          height: "28px",
                          padding: "0 12px",
                          borderRadius: "4px",
                          border: `1px solid ${COLOR.border}`,
                          backgroundColor: COLOR.surface,
                          fontSize: "11px",
                          color: COLOR.text,
                          cursor: "pointer",
                          fontFamily: "inherit",
                          transition: "border-color 0.2s, box-shadow 0.2s",
                          borderColor: chartDropdownOpen ? COLOR.primary : COLOR.border,
                          boxShadow: chartDropdownOpen ? `0 0 0 2px ${COLOR.primaryPale}` : "none",
                        }}
                      >
                        <CalendarSmIcon />
                        {chartRange === "week" ? "This Week" : chartRange === "month" ? "This Month" : "This Year"}
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                          style={{ transition: "transform 0.2s", transform: chartDropdownOpen ? "rotate(180deg)" : "rotate(0)" }}>
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {chartDropdownOpen && (
                        <div style={{
                          position: "absolute", top: "34px", right: 0, zIndex: 30,
                          backgroundColor: COLOR.surface, border: `1px solid ${COLOR.border}`,
                          borderRadius: "6px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                          overflow: "hidden", minWidth: "130px",
                          animation: "fadeSlideDown 0.18s ease",
                        }}>
                          {(["week", "month", "year"] as ChartRange[]).map((r) => (
                            <button
                              key={r}
                              onClick={() => { setChartRange(r); setChartDropdownOpen(false); }}
                              style={{
                                display: "flex", alignItems: "center", gap: "8px",
                                width: "100%", padding: "9px 14px", border: "none",
                                backgroundColor: chartRange === r ? COLOR.primaryPale : "transparent",
                                color: chartRange === r ? COLOR.primary : COLOR.text,
                                fontSize: "12px", fontWeight: chartRange === r ? 600 : 400,
                                cursor: "pointer", fontFamily: "inherit",
                                transition: "background-color 0.15s",
                              }}
                              onMouseEnter={(e) => { if (chartRange !== r) e.currentTarget.style.backgroundColor = "#f9f9f9"; }}
                              onMouseLeave={(e) => { if (chartRange !== r) e.currentTarget.style.backgroundColor = "transparent"; }}
                            >
                              {chartRange === r && <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: COLOR.primary }} />}
                              {r === "week" ? "This Week" : r === "month" ? "This Month" : "This Year"}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ width: "100%", flex: 1, minHeight: "300px" }} key={chartRange}>
                    <ProductivityChart range={chartRange} />
                  </div>
                </div>

                {/* Dynamic Calendar */}
                {(() => {
                  const today = new Date();
                  const weekDates = getCalendarWeek(calendarRef);
                  const displayMonth = MONTH_NAMES[calendarRef.getMonth()];
                  const displayYear = calendarRef.getFullYear();

                  const deadlineDates = apiTasks
                    .filter((t) => t.deadline && t.status !== "done")
                    .map((t) => new Date(t.deadline!));

                  return (
                    <div style={{ ...CARD_STYLE_COLOR, width: "100%", padding: "12px 14px", minHeight: "86px", boxSizing: "border-box", gridColumn: "1" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "9px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: COLOR.text }}>Calendar</span>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <button
                            onClick={() => {
                              const prev = new Date(calendarRef);
                              prev.setDate(prev.getDate() - 7);
                              setCalendarRef(prev);
                            }}
                            style={{ ...buttonReset, color: COLOR.text, display: "flex", padding: "2px", borderRadius: "4px", transition: "background-color 0.15s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = COLOR.panel; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                          >
                            <ChevronLeftIcon />
                          </button>
                          <button
                            onClick={() => setCalendarRef(new Date())}
                            style={{ ...buttonReset, fontSize: "11px", fontWeight: 600, color: COLOR.text, padding: "2px 4px", borderRadius: "4px", transition: "color 0.15s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.color = COLOR.primary; }}
                            onMouseLeave={(e) => { e.currentTarget.style.color = COLOR.text; }}
                          >
                            {displayMonth} {displayYear}
                          </button>
                          <button
                            onClick={() => {
                              const next = new Date(calendarRef);
                              next.setDate(next.getDate() + 7);
                              setCalendarRef(next);
                            }}
                            style={{ ...buttonReset, color: COLOR.text, display: "flex", padding: "2px", borderRadius: "4px", transition: "background-color 0.15s" }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = COLOR.panel; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                          >
                            <ChevronRightIcon />
                          </button>
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", marginBottom: "5px" }}>
                        {DAY_HEADERS.map((d) => (
                          <span key={d} style={{ fontSize: "8px", fontWeight: 600, color: COLOR.muted }}>{d}</span>
                        ))}
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", gap: "3px" }}>
                        {weekDates.map((dateObj, i) => {
                          const isToday = isSameDay(dateObj, today);
                          const hasDot = deadlineDates.some((dl) => isSameDay(dl, dateObj));
                          return (
                            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                              <div
                                onClick={() => {
                                  const formatted = formatDate(dateObj.toISOString());
                                  setSearchTask(searchTask === formatted ? "" : formatted);
                                  document.getElementById("recent-tasks-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                                }}
                                style={{
                                  width: "19px",
                                  height: "19px",
                                  borderRadius: "50%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "10px",
                                  fontWeight: isToday ? 700 : 500,
                                  color: isToday ? COLOR.primary : COLOR.text,
                                  backgroundColor: isToday ? COLOR.primarySoft : "transparent",
                                  cursor: "pointer",
                                  transition: "all 0.15s",
                                }}
                              >
                                {dateObj.getDate()}
                              </div>
                              {hasDot && (
                                <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: COLOR.primary }} />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* ── Recent Tasks Table ── */}
              <div id="recent-tasks-section" style={{ ...CARD_STYLE_COLOR, width: "100%", padding: 0, marginBottom: "32px", overflow: "hidden" }}>
                <div style={{ height: "78px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px" }}>
                  <span style={{ fontSize: "16px", fontWeight: 700, color: COLOR.text, lineHeight: 1 }}>Recent Tasks</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {/* Search in table */}
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: COLOR.muted, display: "flex" }}>
                        <SearchIcon />
                      </span>
                      <input
                        type="text"
                        placeholder="Search task"
                        value={searchTask}
                        onChange={(e) => setSearchTask(e.target.value)}
                        style={{
                          width: "255px",
                          height: "28px",
                          borderRadius: "7px",
                          border: "none",
                          paddingLeft: "40px",
                          paddingRight: "14px",
                          fontSize: "12px",
                          color: COLOR.text,
                          backgroundColor: "#F1F1F1",
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
                        justifyContent: "center",
                        gap: "7px",
                        width: "78px",
                        height: "32px",
                        padding: 0,
                        borderRadius: "7px",
                        border: `1px solid ${COLOR.border}`,
                        background: COLOR.surface,
                        fontSize: "12px",
                        fontWeight: 600,
                        color: COLOR.text,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      <FilterIcon /> Filter
                    </button>
                  </div>
                </div>

                {/* Table */}
                <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                  <colgroup>
                    <col style={{ width: "33%" }} />
                    <col style={{ width: "16%" }} />
                    <col style={{ width: "17%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "14%" }} />
                  </colgroup>
                  <thead>
                    <tr style={{ height: "52px", backgroundColor: COLOR.panel, borderTop: `1px solid ${COLOR.border}`, borderBottom: `1px solid ${COLOR.border}` }}>
                      {["TASK ↕", "TASK LEVEL ↕", "SUBTASK ↕", "DUE DATE ↕", "VIEW DETAIL ↕"].map((h) => (
                        <th
                          key={h}
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: COLOR.mutedDark,
                            textAlign: "center",
                            padding: "0 16px",
                            letterSpacing: "0.02em",
                            whiteSpace: "nowrap",
                            verticalAlign: "middle",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recentTaskItems.length === 0 ? (
                      <tr style={{ height: "78px", borderBottom: `1px solid ${COLOR.borderSoft}` }}>
                        <td
                          colSpan={5}
                          style={{
                            padding: "0 16px",
                            textAlign: "center",
                            verticalAlign: "middle",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: COLOR.mutedDark,
                          }}
                        >
                          {emptyRecentTaskMessage}
                        </td>
                      </tr>
                    ) : recentTaskItems.map((task) => (
                      <tr key={task.id ?? task.title} style={{ height: "78px", borderBottom: `1px solid ${COLOR.borderSoft}` }}>
                        <td style={{ padding: "0 16px 0 clamp(58px, 4.5vw, 80px)", verticalAlign: "middle" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "46px", minWidth: 0 }}>
                            <input
                              type="checkbox"
                              checked={!!task.done}
                              disabled={isActionLoading}
                              onChange={(e) => {
                                void handleToggleTaskStatus(task, e.target.checked);
                              }}
                              style={{
                                width: "16px",
                                height: "16px",
                                accentColor: COLOR.primary,
                                borderRadius: "4px",
                                cursor: "pointer",
                                flexShrink: 0,
                              }}
                            />
                            <span style={{ fontSize: "13px", fontWeight: 700, color: COLOR.text, lineHeight: 1.2, overflowWrap: "break-word" }}>{task.title}</span>
                          </div>
                        </td>
                        <td style={{ padding: "0 16px", verticalAlign: "middle", textAlign: "center" }}>
                          <PriorityBadge level={task.level} />
                        </td>
                        <td style={{ padding: "0 16px", fontSize: "13px", color: COLOR.text, verticalAlign: "middle", textAlign: "center" }}>
                          {task.subtask}
                        </td>
                        <td style={{ padding: "0 16px", fontSize: "13px", color: COLOR.text, fontWeight: 700, verticalAlign: "middle", textAlign: "center" }}>
                          {task.date}
                        </td>
                        <td style={{ padding: "0 16px", verticalAlign: "middle" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "34px" }}>
                            <button style={{ ...buttonReset, color: COLOR.text, display: "flex" }}>
                              <MoreDotsIcon />
                            </button>
                            <button
                              disabled={isActionLoading}
                              onClick={() => {
                                void handleStartFocus(task.id);
                              }}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: "6px 16px",
                                minWidth: "110px",
                                borderRadius: "8px",
                                border: "1px solid #d1d5db",
                                backgroundColor: "#ffffff",
                                fontSize: "12px",
                                fontWeight: 600,
                                color: "#111827",
                                cursor: "pointer",
                                fontFamily: "inherit",
                                whiteSpace: "nowrap",
                                transition: "all 0.15s"
                              }}
                              onMouseEnter={(e) => {
                                if (!isActionLoading) {
                                  e.currentTarget.style.backgroundColor = "#f9fafb";
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isActionLoading) {
                                  e.currentTarget.style.backgroundColor = "#ffffff";
                                }
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
          {(activeMenu === "template" || (activeMenu === "task" && !selectedTaskId)) && templateView === "list" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(28px, 3vw, 44px)", alignItems: "start" }}>
                {cardItems
                  .filter((item) => item.type.includes(templateFilter))
                  .map((item) => (
                    <div key={item.id} style={{
                      width: "100%",
                      minHeight: "258px",
                      backgroundColor: COLOR.surface,
                      borderRadius: "7px",
                      border: `1px solid ${COLOR.border}`,
                      padding: "24px",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column"
                    }}>
                      {/* Icon & Badge */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
                        <div style={{
                          width: "44px", height: "44px", borderRadius: "7px", backgroundColor: "#E5DEFF",
                          display: "flex", alignItems: "center", justifyContent: "center"
                        }}>
                          <CompassIcon />
                        </div>
                        <span style={{
                          display: "inline-block", fontSize: "11px", fontWeight: 700,
                          color: COLOR.mutedDark, backgroundColor: "#F1F1F1", borderRadius: "999px", padding: "4px 13px",
                        }}>
                          {item.level}
                        </span>
                      </div>

                      {/* Title & Desc */}
                      <h3 style={{ fontSize: "16px", fontWeight: 700, color: COLOR.text, marginBottom: "10px", marginTop: 0, lineHeight: 1.25 }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: "14px", color: "#4B4B4B", lineHeight: 1.45, marginBottom: "22px" }}>
                        {item.desc}
                      </p>

                      {/* Tags */}
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px", flexWrap: "wrap" }}>
                        <span style={{
                          display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: COLOR.text,
                          backgroundColor: "#F1F1F1", padding: "6px 10px", borderRadius: "5px", fontWeight: 500
                        }}>
                          <SubtaskIcon /> {item.subtasks} Subtasks
                        </span>
                        <span style={{
                          display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: COLOR.text,
                          backgroundColor: "#F1F1F1", padding: "6px 10px", borderRadius: "5px", fontWeight: 500
                        }}>
                          <CalendarSmIcon /> No due date
                        </span>
                      </div>

                      {/* Buttons */}
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}>
                        <button
                          onClick={() => {
                            void handleUseCard(item);
                          }}
                          style={{
                            flex: 1, height: "40px", borderRadius: "7px", backgroundColor: COLOR.primary, color: "#ffffff",
                            fontSize: "13px", fontWeight: 600, border: "none", cursor: "pointer", fontFamily: "inherit",
                            transition: "background-color 0.15s"
                          }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = COLOR.primaryHover; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = COLOR.primary; }}
                        >
                          {activeMenu === "task" ? "Mulai Fokus" : "Use Template"}
                        </button>
                        <button
                          onClick={() => {
                            if (activeMenu === "template") {
                              setSelectedTemplateId(item.id);
                              setTemplateView("detail");
                            } else if (activeMenu === "task" && item.taskId) {
                              setSelectedTaskId(item.taskId);
                            }
                          }}
                          style={{
                            width: "40px", height: "40px", borderRadius: "7px", border: `1px solid ${COLOR.border}`, backgroundColor: COLOR.surface,
                            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color 0.15s"
                          }}>
                          <EyeOutlineIcon />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Pagination */}
              <div style={{ display: "none", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
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
                display: "none",
                backgroundColor: "#dcfce7", color: "#166534", padding: "16px 24px",
                borderRadius: "8px", fontSize: "13px", fontWeight: 600,
                textAlign: "center", marginTop: "16px"
              }}>
                Tips : Use templates to speed up your task planning. You can still edit them after use.
              </div>
            </div>
          )}

          {/* ── Detail Task View ── */}
          {activeMenu === "task" && selectedTaskId && (() => {
            const task = apiTasks.find(t => t.id === selectedTaskId);
            if (!task) return null;
            const energyLevel = mapEnergyToLevel(task.energy_weight);
            const energyColor = task.energy_weight === "Berat" ? "#DC2626" : task.energy_weight === "Sedang" ? "#F59E0B" : COLOR.primary;
            const statusLabel = task.status === "done" ? "Selesai" : task.status === "in_progress" ? "In Progress" : "Pending";
            const statusColor = task.status === "done" ? COLOR.primary : task.status === "in_progress" ? "#3B82F6" : "#F59E0B";
            const fmtDateTime = (v: string | null) => {
              if (!v) return "—";
              return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(v));
            };
            const meta = localTaskMeta[task.id];
            const taskDescription = meta?.description || "";
            const taskSubtasks = meta?.subtasks || [];
            const doneSubtaskCount = taskSubtasks.filter(s => s.done).length;
            return (
              <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden", marginBottom: "32px" }}>
                {/* Header / Modal-like top bar */}
                <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: 0 }}>Task Detail</h2>
                  <button onClick={() => setSelectedTaskId(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>

                {/* Body 2 columns */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: "500px" }}>
                  {/* Left Column */}
                  <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
                    
                    {/* Title */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", fontSize: "14px", fontWeight: 600, color: "#4b5563" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                        Title
                      </div>
                      <div style={{ padding: "16px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "20px", fontWeight: 700, color: "#111827" }}>
                        {task.title}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px", fontSize: "14px", fontWeight: 600, color: "#4b5563" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        Description
                      </div>
                      <div style={{ padding: "16px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "14px", color: "#4b5563", minHeight: "100px", whiteSpace: "pre-wrap" }}>
                        {taskDescription || "No description provided."}
                      </div>
                    </div>

                    {/* Subtasks */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 600, color: "#4b5563" }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                          Subtasks
                        </div>
                        <div style={{ backgroundColor: "#f3f4f6", padding: "4px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, color: "#4b5563" }}>
                          {doneSubtaskCount}/{taskSubtasks.length} Done
                        </div>
                      </div>

                      <div style={{ borderRadius: "8px", border: "1px solid #e5e7eb", padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
                        {taskSubtasks.map((st, idx) => (
                          <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <div style={{ width: "20px", height: "20px", borderRadius: "4px", backgroundColor: st.done ? "#6366f1" : "#ffffff", border: st.done ? "none" : "1px solid #d1d5db", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }} onClick={() => {
                              const newSubs = [...taskSubtasks];
                              newSubs[idx] = { ...newSubs[idx], done: !newSubs[idx].done };
                              setLocalTaskMeta(prev => ({...prev, [task.id]: { description: taskDescription, subtasks: newSubs }}));
                            }}>
                              {st.done && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                            </div>
                            <span style={{ fontSize: "14px", color: st.done ? "#9ca3af" : "#4b5563", textDecoration: st.done ? "line-through" : "none" }}>{st.text}</span>
                          </div>
                        ))}
                        
                        <button style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", color: "#6366f1", fontSize: "14px", fontWeight: 600, padding: 0, marginTop: "8px" }} onClick={() => setNotice("Adding subtasks after creation needs backend support.")}>
                          <span style={{ fontSize: "18px", fontWeight: 400 }}>+</span> Add subtask
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Right Column */}
                  <div style={{ borderLeft: "1px solid #e5e7eb", padding: "32px 24px", display: "flex", flexDirection: "column", gap: "32px" }}>
                    
                    {/* Priority */}
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", marginBottom: "12px" }}>PRIORITY</div>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: energyLevel === "HIGH" ? "#16a34a" : energyLevel === "MEDIUM" ? "#f59e0b" : "#6b7280", color: "#ffffff", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 600 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
                        {energyLevel === "HIGH" ? "High Priority" : energyLevel === "MEDIUM" ? "Medium Priority" : "Low Priority"}
                      </div>
                    </div>

                    {/* Due Date */}
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", marginBottom: "12px" }}>DUE DATE</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", fontWeight: 600, color: task.deadline && new Date(task.deadline) < new Date() ? "#dc2626" : "#4b5563" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        {task.deadline ? new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(task.deadline)) : "No due date"}
                        {task.deadline && new Date(task.deadline) < new Date() && " (Overdue)"}
                      </div>
                    </div>

                    {/* Task Level */}
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#6b7280", letterSpacing: "0.05em", marginBottom: "12px" }}>TASK LEVEL</div>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 700, color: "#16a34a" }}>
                        {task.energy_weight}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>

                    <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: 0 }} />

                    {/* Created */}
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280" }}>
                      Created {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(task.created_at))}
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "8px" }}>
                      <button onClick={() => setNotice("Fitur edit task perlu endpoint backend tambahan.")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", color: "#4b5563", fontSize: "13px", fontWeight: 600, padding: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.21l-3.25-1.95"/></svg>
                        Update Task
                      </button>
                      <button onClick={() => setNotice("Fitur hapus task perlu endpoint backend tambahan.")} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", color: "#4b5563", fontSize: "13px", fontWeight: 600, padding: 0 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        Delete Task
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })()}

          {/* ── Detail Template View ── */}
          {activeMenu === "template" && templateView === "detail" && selectedCard && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <button
                onClick={() => {
                  setSelectedTemplateId(null);
                  setTemplateView("list");
                }}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#111827", fontSize: "14px", fontWeight: 500, fontFamily: "inherit", alignSelf: "flex-start"
                }}
              >
                <ArrowLeftIcon /> Back
              </button>

              <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" }}>
                {/* Left Side: Detail & Tasks */}
                <div style={{ flex: 1, minWidth: "400px", display: "flex", flexDirection: "column", gap: "24px" }}>

                  {/* Top Card */}
                  <div style={{
                    backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0",
                    padding: "32px", position: "relative"
                  }}>
                    <button style={{
                      position: "absolute", top: "24px", right: "24px",
                      width: "36px", height: "36px", borderRadius: "8px",
                      border: "1px solid #e5e7eb", backgroundColor: "#ffffff",
                      display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#111827"
                    }}>
                      <ShareIcon />
                    </button>

                    <div style={{ display: "flex", gap: "20px" }}>
                      <div style={{
                        width: "80px", height: "80px", borderRadius: "12px", backgroundColor: "#e0e7ff",
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                      }}>
                        <UsersIcon />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", margin: 0 }}>{selectedCard.title}</h2>
                          <span style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", backgroundColor: "#f3f4f6", padding: "4px 10px", borderRadius: "999px", letterSpacing: "0.04em" }}>{selectedCard.level}</span>
                          <span style={{ fontSize: "10px", fontWeight: 700, color: "#4f46e5", backgroundColor: "#e0e7ff", padding: "4px 10px", borderRadius: "999px", letterSpacing: "0.04em" }}>WORK</span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4b5563", backgroundColor: "#f3f4f6", padding: "6px 12px", borderRadius: "6px", fontWeight: 500 }}>
                            <SubtaskIcon /> {selectedCard.subtasks} Subtasks
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4b5563", backgroundColor: "#f3f4f6", padding: "6px 12px", borderRadius: "6px", fontWeight: 500 }}>
                            <CalendarSmIcon /> No due date
                          </span>
                        </div>

                        <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, margin: 0, maxWidth: "340px" }}>
                          {selectedCard.desc}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tasks List Card */}
                  <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: "0 0 24px" }}>Preview Daftar Task</h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                      {(selectedCard.previewItems?.map((item) => item.title) ?? ["Belum ada preview task"]).map((task, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <div style={{
                            width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#16a34a",
                            color: "#ffffff", fontSize: "12px", fontWeight: 700,
                            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                          }}>
                            {idx + 1}
                          </div>
                          <span style={{ fontSize: "14px", color: "#374151", fontWeight: 500 }}>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Template Information */}
                <div style={{ width: "320px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: "0 0 32px" }}>Template Information</h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "40px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#111827" }}>
                        <WrenchIcon />
                        <span style={{ fontSize: "13px", fontWeight: 500, color: "#6b7280" }}>Made by</span>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>BenToDo Official</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#111827" }}>
                        <MailIcon />
                        <span style={{ fontSize: "13px", fontWeight: 500, color: "#6b7280" }}>Category</span>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>Work</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#111827" }}>
                        <UsersUpIcon />
                        <span style={{ fontSize: "13px", fontWeight: 500, color: "#6b7280" }}>Used</span>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>{selectedCard.subtasks} tasks</span>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#111827" }}>
                        <DownloadSquareIcon />
                        <span style={{ fontSize: "13px", fontWeight: 500, color: "#6b7280" }}>Last updated</span>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>Backend API</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <button
                      onClick={() => {
                        void handleUseCard(selectedCard);
                      }}
                      style={{
                        width: "100%", height: "40px", borderRadius: "8px", backgroundColor: "#16a34a",
                        color: "#ffffff", fontSize: "13px", fontWeight: 600, border: "none",
                        cursor: "pointer", fontFamily: "inherit", transition: "background-color 0.15s"
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#15803d"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#16a34a"; }}
                    >
                      Use Template
                    </button>
                    <button
                      onClick={() => setNotice("Fitur private custom template perlu endpoint backend tambahan.")}
                      style={{
                        width: "100%", height: "40px", borderRadius: "8px", backgroundColor: "#ffffff",
                        color: "#111827", fontSize: "13px", fontWeight: 600, border: "1px solid #e5e7eb",
                        cursor: "pointer", fontFamily: "inherit", transition: "background-color 0.15s"
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f9fafb"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#ffffff"; }}
                    >
                      Save Template to Private
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* ── Create Template View ── */}
          {activeMenu === "template" && templateView === "create" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <button
                onClick={() => setTemplateView("list")}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#111827", fontSize: "14px", fontWeight: 500, fontFamily: "inherit", alignSelf: "flex-start"
                }}
              >
                <ArrowLeftIcon /> Back
              </button>

              <div style={{
                backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0",
                padding: "32px", position: "relative", maxWidth: "800px"
              }}>
                <button style={{
                  position: "absolute", top: "24px", right: "24px",
                  width: "36px", height: "36px", borderRadius: "8px",
                  border: "1px solid #e5e7eb", backgroundColor: "#ffffff",
                  display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#111827"
                }}>
                  <ShareIcon />
                </button>

                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>Create Template</h2>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 32px" }}>Create a template according to your needs</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {/* Name Task */}
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "8px" }}>Name Task</label>
                    <input
                      type="text"
                      value={newTemplate.title}
                      onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                      placeholder="Jadwal Kuliah"
                      style={{ width: "100%", height: "40px", borderRadius: "8px", border: "1px solid #e5e7eb", padding: "0 16px", fontSize: "13px", fontFamily: "inherit", outline: "none" }}
                    />
                  </div>

                  {/* Deskripsi */}
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "8px" }}>Deskripsi</label>
                    <input
                      type="text"
                      value={newTemplate.desc}
                      onChange={(e) => setNewTemplate({ ...newTemplate, desc: e.target.value })}
                      placeholder="Checklist jadwal kuliah tahun 2024/2025"
                      style={{ width: "100%", height: "40px", borderRadius: "8px", border: "1px solid #e5e7eb", padding: "0 16px", fontSize: "13px", fontFamily: "inherit", outline: "none" }}
                    />
                  </div>

                  {/* Deadline */}
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "8px" }}>Deadline (Opsional)</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        value={newTemplate.deadline}
                        onChange={(e) => setNewTemplate({ ...newTemplate, deadline: e.target.value })}
                        placeholder="22 Juni 2025"
                        style={{ width: "100%", height: "40px", borderRadius: "8px", border: "1px solid #e5e7eb", padding: "0 16px", fontSize: "13px", fontFamily: "inherit", outline: "none" }}
                      />
                      <span style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "#6b7280", display: "flex" }}>
                        <CalendarLineIcon />
                      </span>
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "12px" }}>Category</label>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {["WORK", "DAILY", "HEALTH", "SHOPPING", "FINANCE", "GOALS"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setNewTemplate({ ...newTemplate, category: cat })}
                          style={{
                            padding: "6px 16px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.04em", cursor: "pointer", border: "none",
                            backgroundColor: newTemplate.category === cat ? "#818cf8" : "#e0e7ff",
                            color: newTemplate.category === cat ? "#ffffff" : "#6366f1"
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "12px" }}>Priority</label>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {["HIGH", "MIDLE", "LOW"].map((pri) => (
                        <button
                          key={pri}
                          onClick={() => setNewTemplate({ ...newTemplate, priority: pri })}
                          style={{
                            padding: "6px 16px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.04em", cursor: "pointer", border: "none",
                            backgroundColor: newTemplate.priority === pri ? "#e5e7eb" : "#f3f4f6",
                            color: newTemplate.priority === pri ? "#111827" : "#4b5563"
                          }}
                        >
                          {pri}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "12px" }}>Status</label>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {[
                        { id: "TO DO", bg: "#fecdd3", color: "#be123c", activeBg: "#fb7185", activeColor: "#fff" },
                        { id: "DONE", bg: "#bbf7d0", color: "#166534", activeBg: "#4ade80", activeColor: "#fff" },
                        { id: "IN PROGRES", bg: "#e0e7ff", color: "#4338ca", activeBg: "#818cf8", activeColor: "#fff" }
                      ].map((st) => (
                        <button
                          key={st.id}
                          onClick={() => setNewTemplate({ ...newTemplate, status: st.id })}
                          style={{
                            padding: "6px 16px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.04em", cursor: "pointer", border: "none",
                            backgroundColor: newTemplate.status === st.id ? st.activeBg : st.bg,
                            color: newTemplate.status === st.id ? st.activeColor : st.color
                          }}
                        >
                          {st.id}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Label */}
                  <div>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: "#111827", marginBottom: "12px" }}>Label</label>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {[
                        { id: "PUBLIC", bg: "#e5e7eb", color: "#4b5563", activeBg: "#9ca3af", activeColor: "#fff" },
                        { id: "PRIVATE", bg: "#dcfce7", color: "#166534", activeBg: "#16a34a", activeColor: "#fff" }
                      ].map((lbl) => (
                        <button
                          key={lbl.id}
                          onClick={() => setNewTemplate({ ...newTemplate, label: lbl.id })}
                          style={{
                            padding: "6px 16px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.04em", cursor: "pointer", border: "none",
                            backgroundColor: newTemplate.label === lbl.id ? lbl.activeBg : lbl.bg,
                            color: newTemplate.label === lbl.id ? lbl.activeColor : lbl.color
                          }}
                        >
                          {lbl.id}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
                    <button
                      onClick={() => setTemplateView("list")}
                      style={{
                        padding: "10px 32px", borderRadius: "8px", backgroundColor: "#ffffff",
                        color: "#111827", fontSize: "13px", fontWeight: 600, border: "1px solid #e5e7eb",
                        cursor: "pointer", fontFamily: "inherit"
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const newTask: ViewCard = {
                          id: templatesList.length + 1,
                          title: newTemplate.title || "Untitled",
                          desc: newTemplate.desc || "No description",
                          level: newTemplate.priority,
                          subtasks: 6,
                          type: newTemplate.label === "PRIVATE" ? ["All", "Private"] : ["All", "Public"]
                        };
                        setTemplatesList([newTask, ...templatesList]);
                        setTemplateView("success");
                      }}
                      style={{
                        padding: "10px 32px", borderRadius: "8px", backgroundColor: "#16a34a",
                        color: "#ffffff", fontSize: "13px", fontWeight: 600, border: "none",
                        cursor: "pointer", fontFamily: "inherit"
                      }}
                    >
                      Add Template
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Success View ── */}
          {activeMenu === "template" && templateView === "success" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <button
                onClick={() => setTemplateView("list")}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#111827", fontSize: "14px", fontWeight: 500, fontFamily: "inherit", alignSelf: "flex-start"
                }}
              >
                <ArrowLeftIcon /> Back
              </button>

              <div style={{
                backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0",
                padding: "48px 32px", maxWidth: "800px", display: "flex", flexDirection: "column", alignItems: "center"
              }}>
                <SuccessCheckIcon />

                <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", margin: "24px 0 8px" }}>Template berhasil ditambahkan!</h2>
                <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 32px" }}>all tasks have been added to your task list</p>

                <div style={{
                  width: "100%", maxWidth: "600px", border: "1px solid #e5e7eb", borderRadius: "8px",
                  padding: "24px", position: "relative", backgroundColor: "#fafafa"
                }}>
                  <span style={{
                    position: "absolute", top: "24px", right: "24px",
                    fontSize: "10px", fontWeight: 700, color: "#be123c", backgroundColor: "#fecdd3",
                    padding: "4px 10px", borderRadius: "999px"
                  }}>
                    {newTemplate.status}
                  </span>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
                    <CheckCircleSolidIcon />
                    <span style={{ fontSize: "20px", fontWeight: 600, color: "#111827" }}>{newTemplate.title || "Untitled"}</span>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginLeft: "40px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <PlusCircleIcon />
                      <span style={{ fontSize: "13px", color: "#374151" }}>Subtask : 6 tasks added</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <PlusCircleIcon />
                      <span style={{ fontSize: "13px", color: "#374151" }}>Deadline : {newTemplate.deadline || "None"}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <PlusCircleIcon />
                      <span style={{ fontSize: "13px", color: "#374151" }}>Prioritas : {newTemplate.priority}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <PlusCircleIcon />
                      <span style={{ fontSize: "13px", color: "#374151", display: "flex", alignItems: "center", gap: "8px" }}>
                        Label : {newTemplate.label === "PRIVATE" ? "Private" : "Public"}
                        <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: newTemplate.label === "PRIVATE" ? "#16a34a" : "#9ca3af" }} />
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ width: "100%", maxWidth: "600px", display: "flex", justifyContent: "flex-end", marginTop: "32px" }}>
                  <button
                    onClick={() => {
                      setTemplateFilter(newTemplate.label === "PRIVATE" ? "Private" : "Public");
                      setTemplateView("list");
                    }}
                    style={{
                      padding: "10px 32px", borderRadius: "8px", backgroundColor: "#16a34a",
                      color: "#ffffff", fontSize: "13px", fontWeight: 600, border: "none",
                      cursor: "pointer", fontFamily: "inherit"
                    }}
                  >
                    See Template
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Add Task Modal ── */}
          {isAddTaskModalOpen && (
            <div style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 100, padding: "20px"
            }}>
              <div style={{
                backgroundColor: "#ffffff", borderRadius: "12px",
                width: "100%", maxWidth: "640px", padding: "32px",
                position: "relative", maxHeight: "90vh", overflowY: "auto",
              }}>
                <button
                  onClick={() => setIsAddTaskModalOpen(false)}
                  style={{
                    position: "absolute", top: "24px", right: "24px",
                    background: "none", border: "none", cursor: "pointer",
                    color: COLOR.text, padding: "4px"
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <h2 style={{ fontSize: "24px", fontWeight: 700, margin: "0 0 8px", color: COLOR.text }}>Add Task</h2>
                <p style={{ fontSize: "14px", color: COLOR.mutedDark, margin: "0 0 28px" }}>Buat tugas baru yang sesuai dengan keperluanmu.</p>

                {/* Nama Tugas */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLOR.text, marginBottom: "8px" }}>Nama Tugas</label>
                  <input
                    type="text"
                    value={addTaskTitle}
                    onChange={(e) => setAddTaskTitle(e.target.value)}
                    placeholder="Contoh : Membuat Power Point"
                    style={{
                      width: "100%", height: "48px", borderRadius: "8px", border: `1px solid ${COLOR.border}`,
                      padding: "0 16px", fontSize: "14px", color: COLOR.text, outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>

                {/* Deskripsi */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLOR.text, marginBottom: "8px" }}>Deskripsi (Opsional)</label>
                  <textarea
                    value={addTaskDesc}
                    onChange={(e) => setAddTaskDesc(e.target.value)}
                    placeholder="Jelaskan detail tugas Anda..."
                    rows={3}
                    style={{
                      width: "100%", borderRadius: "8px", border: `1px solid ${COLOR.border}`,
                      padding: "12px 16px", fontSize: "14px", color: COLOR.text, outline: "none",
                      boxSizing: "border-box", fontFamily: "inherit", resize: "vertical", minHeight: "80px"
                    }}
                  />
                </div>

                {/* Subtasks */}
                <div style={{ marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: COLOR.text }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                      Subtasks
                    </label>
                    {addTaskSubtasks.length > 0 && (
                      <span style={{ fontSize: "12px", fontWeight: 600, color: COLOR.muted }}>{addTaskSubtasks.length} item</span>
                    )}
                  </div>
                  {addTaskSubtasks.length > 0 && (
                    <div style={{ border: `1px solid ${COLOR.border}`, borderRadius: "8px", overflow: "hidden", marginBottom: "10px" }}>
                      {addTaskSubtasks.map((sub, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 16px", borderBottom: idx < addTaskSubtasks.length - 1 ? `1px solid ${COLOR.borderSoft}` : "none" }}>
                          <span style={{ flex: 1, fontSize: "14px", color: COLOR.text }}>{sub.text}</span>
                          <button
                            onClick={() => setAddTaskSubtasks(prev => prev.filter((_, i) => i !== idx))}
                            style={{ ...buttonReset, color: "#9ca3af", padding: "2px", display: "flex" }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      value={newSubtaskText}
                      onChange={(e) => setNewSubtaskText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newSubtaskText.trim()) {
                          setAddTaskSubtasks(prev => [...prev, { text: newSubtaskText.trim(), done: false }]);
                          setNewSubtaskText("");
                        }
                      }}
                      placeholder="Tulis subtask dan tekan Enter..."
                      style={{
                        flex: 1, height: "40px", borderRadius: "8px", border: `1px solid ${COLOR.border}`,
                        padding: "0 14px", fontSize: "13px", color: COLOR.text, outline: "none",
                        boxSizing: "border-box", fontFamily: "inherit"
                      }}
                    />
                    <button
                      onClick={() => {
                        if (newSubtaskText.trim()) {
                          setAddTaskSubtasks(prev => [...prev, { text: newSubtaskText.trim(), done: false }]);
                          setNewSubtaskText("");
                        }
                      }}
                      style={{
                        display: "flex", alignItems: "center", gap: "4px",
                        padding: "0 14px", height: "40px", borderRadius: "8px",
                        border: "none", backgroundColor: COLOR.primaryPale, color: COLOR.primary,
                        fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                        whiteSpace: "nowrap"
                      }}
                    >
                      <span style={{ fontSize: "16px", lineHeight: 1 }}>+</span> Add subtask
                    </button>
                  </div>
                </div>

                {/* Beban Energi */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLOR.text, marginBottom: "8px" }}>Beban Energi</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                    {[
                      { id: "Ringan", label: "Ringan", desc: "Tugas ringan", color: "#16a34a" },
                      { id: "Sedang", label: "Sedang", desc: "Tugas sedang", color: "#f59e0b" },
                      { id: "Berat", label: "Berat", desc: "Tugas berat", color: "#ef4444" },
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setAddTaskEnergy(item.id as EnergyWeight)}
                        style={{
                          border: `1px solid ${addTaskEnergy === item.id ? COLOR.primary : COLOR.border}`,
                          borderRadius: "8px", padding: "16px", cursor: "pointer",
                          backgroundColor: addTaskEnergy === item.id ? COLOR.primaryPale : "#ffffff",
                          display: "flex", alignItems: "center", gap: "12px",
                          transition: "all 0.2s"
                        }}
                      >
                        <div style={{ width: "16px", height: "16px", borderRadius: "50%", backgroundColor: item.color }} />
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: 700, color: COLOR.text }}>{item.label}</div>
                          <div style={{ fontSize: "12px", color: COLOR.mutedDark }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deadline */}
                <div style={{ marginBottom: "28px" }}>
                  <label style={{ display: "block", fontSize: "14px", fontWeight: 600, color: COLOR.text, marginBottom: "8px" }}>Deadline (Opsional)</label>
                  <input
                    type="date"
                    value={addTaskDeadline}
                    onChange={(e) => setAddTaskDeadline(e.target.value)}
                    style={{
                      width: "100%", height: "48px", borderRadius: "8px", border: `1px solid ${COLOR.border}`,
                      padding: "0 16px", fontSize: "14px", color: COLOR.text, outline: "none",
                      boxSizing: "border-box", fontFamily: "inherit"
                    }}
                  />
                </div>

                {/* Submit */}
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => void handleCreateTask()}
                    disabled={isActionLoading}
                    style={{
                      height: "44px", padding: "0 32px", borderRadius: "8px",
                      backgroundColor: COLOR.primary, color: "#ffffff",
                      fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer",
                      opacity: isActionLoading ? 0.7 : 1, transition: "opacity 0.2s"
                    }}
                  >
                    {isActionLoading ? "Menyimpan..." : "Buat Task"}
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
