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
import { AddTaskModal } from "../components/features/tasks/AddTaskModal";

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
            <AddTaskModal dashboardStates={dashboardStates} />
          )}
        </div>
      </main>
    </div>
  );
}
