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
import { CreateTemplateView } from "../components/features/templates/CreateTemplateView";
import { TemplateSuccessView } from "../components/features/templates/TemplateSuccessView";

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
            <CreateTemplateView dashboardStates={dashboardStates} />
          )}

          {/* ── Success View ── */}
          {activeMenu === "template" && templateView === "success" && (
            <TemplateSuccessView dashboardStates={dashboardStates} />
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
