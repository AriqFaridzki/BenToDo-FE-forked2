"use client";

import { useRouter } from "next/navigation";
import { useDashboard } from "./useDashboard"
import { 
  ChartRangeOption,
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
import { WelcomeBanner } from "../components/features/dashboard/WelcomeBanner";

import { StatCards } from "../components/features/dashboard/StatCards";
import { TemplateListView } from "../components/features/templates/TemplateListView";
import { PriorityTask } from "../components/features/dashboard/PriorityTask";
import { ProductivityChartsView } from "../components/features/dashboard/ProductivityChartsView";
import { DynamicCalendar } from "../components/features/dashboard/DynamicCalendar";
import { RecentTask } from "../components/features/dashboard/RecentTask";
import { TaskDetailView } from "../components/features/tasks/TaskDetailView";
import { TemplateDetailView } from "../components/features/templates/TemplateDetailView";

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
          {
          (
          dashboardStates.activeMenu === "dashboard"     ||

          (dashboardStates.activeMenu === "template" && dashboardStates.templateView === "list")       || 

          (dashboardStates.activeMenu === "task" && !dashboardStates.selectedTaskId)
        ) && 
          
          (
            <WelcomeBanner dashboardStates={dashboardStates} />
        
          )}

          {/* ── Dashboard View ── */}
          {activeMenu === "dashboard" && (
            <> 
              {/* StatCards */}
              <StatCards dashboardStates={dashboardStates}/>
        
              {/* ── Priority Task + Productivity Chart + Dynamic Calendar Row ── */}
              {/* Row Style Config */}
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
                <PriorityTask dashboardStates={dashboardStates} />

                {/* Productivity Overview Chart */}
                <ProductivityChartsView dashboardStates={dashboardStates} />

                {/* Dynamic Calendar */}
                <DynamicCalendar dashboardStates={dashboardStates} />
              </div>
                
                
              {/* ── Recent Tasks Table ── */}
              <RecentTask dashboardStates={dashboardStates} />
            </>
          )}

          {/* ── Template / Task View ── */}
          {(activeMenu === "template" || 
          (activeMenu === "task" && !selectedTaskId)) && 
          templateView === "list" && (

            <TemplateListView dashboardStates={dashboardStates}/> 
          )}

          {/* ── Detail Task View ── */}
          {activeMenu === "task" && selectedTaskId && (() => {
            <TaskDetailView dashboardStates={dashboardStates} />
            
          })()}

          {/* ── Detail Template View ── */}
          {activeMenu === "template" && templateView === "detail" && selectedCard && (
            <TemplateDetailView dashboardStates={dashboardStates} />
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
