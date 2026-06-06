import { useState, useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";



// API AND FUNCTIONS CALL
import {
  applyTemplate,
  clearAuthSession,
  getDashboardZen,
  getEnergySummary,
  getStoredUser,
  getTasks,
  getTemplates,
  hasActiveSession,
  isGuestSession,
  startFocusSession,
  updateTask,
  createTask,
} from "../lib/api";

// CUSTOM DATA TYPES
import type { EnergyWeight, Task, TaskStatus, TaskTemplate } from "../lib/api";


//ICONS AND SVG ASSETS
import { 
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

  import { LOGO_SRC } from "../lib/assets"; // logo

// COLOR
import { COLOR, GUEST_ENERGY_SUMMARY, CARD_STYLE_COLOR, buttonReset} from "../components/ui/color"; 

//badges
import { TrendBadge, PriorityBadge } from "../components/ui/badge";

//helper or utils
import { getCalendarWeek } from "../lib/utils";
import { MONTH_NAMES, DAY_HEADERS } from "../lib/utils";
import { isSameDay } from "../lib/utils";

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

// ─── Template Data (Dummy) ────────────────────────────────────────────────────────────

const templatesData = [
  { id: 1, title: "Weekly Design Sprint", desc: "A collaborative 5-day process for answering critical business questions through design, prototyping, and testing.", level: "HIGH", subtasks: 2, type: ["All", "Public"] },
  { id: 2, title: "Proyek Kelompok", desc: "A collaborative 5-day process for answering critical business questions through design, prototyping, and testing.", level: "MEDIUM", subtasks: 4, type: ["All", "Private"] },
  { id: 3, title: "Rencana Belajar Semester", desc: "A collaborative 5-day process for answering critical business questions through design, prototyping, and testing.", level: "LOW", subtasks: 3, type: ["All", "Public"] },
  { id: 4, title: "Menulis Skripsi", desc: "A collaborative 5-day process for answering critical business questions through design, prototyping, and testing.", level: "HIGH", subtasks: 4, type: ["All", "Private"] },
  { id: 5, title: "Persiapan Ujian", desc: "A collaborative 5-day process for answering critical business questions through design, prototyping, and testing.", level: "LOW", subtasks: 2, type: ["All"] },
  { id: 6, title: "Persiapan Presentasi", desc: "A collaborative 5-day process for answering critical business questions through design, prototyping, and testing.", level: "MEDIUM", subtasks: 5, type: ["All", "Public", "Private"] },
  { id: 7, title: "Project PKM Mahasiswa", desc: "A collaborative 5-day process for answering critical business questions through design, prototyping, and testing.", level: "HIGH", subtasks: 4, type: ["Private"] },
];

// ─── Main Dashboard ───────────────────────────────────────────────────────────

type PriorityLevel = "HIGH" | "MEDIUM" | "LOW";

type ViewTask = {
  id?: string;
  title: string;
  level: PriorityLevel;
  subtask: string;
  date: string;
  done?: boolean;
  status?: TaskStatus;
};

type ViewCard = {
  id: number;
  backendKey?: string;
  taskId?: string;
  title: string;
  desc: string;
  level: string;
  subtasks: number;
  type: string[];
  previewItems?: TaskTemplate["preview_items"];
};

const mapEnergyToLevel = (energyWeight: EnergyWeight): PriorityLevel => {
  if (energyWeight === "Berat") return "HIGH";
  if (energyWeight === "Sedang") return "MEDIUM";
  return "LOW";
};

const formatDate = (value: string | null) => {
  if (!value) return "No due date";

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const mapTaskToViewTask = (task: Task): ViewTask => ({
  id: task.id,
  title: task.title,
  level: mapEnergyToLevel(task.energy_weight),
  subtask: task.source_template ? `Template: ${task.source_template}` : task.status,
  date: formatDate(task.deadline),
  done: task.status === "done",
  status: task.status,
});

const mapTemplateToCard = (template: TaskTemplate, index: number): ViewCard => ({
  id: index + 1,
  backendKey: template.key,
  title: template.name,
  desc: template.description,
  level: "OFFICIAL",
  subtasks: template.total_items,
  type: ["All", "Public"],
  previewItems: template.preview_items,
});

const mapTaskToCard = (task: Task, index: number): ViewCard => ({
  id: index + 1,
  taskId: task.id,
  title: task.title,
  desc: task.source_template
    ? `Task dari template ${task.source_template}`
    : `Status: ${task.status.replace("_", " ")}`,
  level: mapEnergyToLevel(task.energy_weight),
  subtasks: task.used_timer ? task.timer_duration ?? 0 : 0,
  type: ["All", task.status === "done" ? "Public" : "Private"],
});

const getDisplayName = () => {
  const user = getStoredUser();
  return user?.display_name || user?.email?.split("@")[0] || "User";
};



export function useDashboard() {
    const router = useRouter();

     // Global States (in dashboard)
      const [apiTasks, setApiTasks] = useState<Task[]>([]);
      const [displayName, setDisplayName] = useState("User");
      const [energyData, setEnergyData] = useState({ current: 0, max: 240, percent: 0, isCritical: false });
      const [deadlineStats, setDeadlineStats] = useState({ upcoming: 0, overdue: 0 });
    
      // UI States or Nav states
      const [activeMenu, setActiveMenu] = useState("dashboard"); // set which active menu: dashboard, task, template
      const [templateFilter, setTemplateFilter] = useState<"All" | "Public" | "Private">("All");
      const [templateView, setTemplateView] = useState<"list" | "detail" | "create" | "success">("list");
      const [notice, setNotice] = useState<string | null>(null); // for global notice or alert message
    
      // Line Chart States
      const [chartRange, setChartRange] = useState<ChartRange>("week");
      const [timeRange, setTimeRange] = useState<"Daily" | "Weekly" | "Monthly" | "Yearly">("Weekly");
      const [chartDropdownOpen, setChartDropdownOpen] = useState(false);
      const [calendarRef, setCalendarRef] = useState(() => new Date());
     
      
      //Task Related States
      const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
      const [taskDetailCopied, setTaskDetailCopied] = useState(false); // to show "copied" state when user copy task detail in task detail view
      const [templatesList, setTemplatesList] = useState<ViewCard[]>(templatesData);
      const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
      
      // Create Task Form States
      const [addTaskTitle, setAddTaskTitle] = useState("");
      const [addTaskEnergy, setAddTaskEnergy] = useState<EnergyWeight>("Ringan");
      const [addTaskDeadline, setAddTaskDeadline] = useState("");
      const [addTaskDesc, setAddTaskDesc] = useState("");
      const [addTaskSubtasks, setAddTaskSubtasks] = useState<{ text: string; done: boolean }[]>([]);
      const [newSubtaskText, setNewSubtaskText] = useState("");
    
      const [localTaskMeta, setLocalTaskMeta] = useState<Record<string, { description: string; subtasks: { text: string; done: boolean }[] }>>({});
     
      // utility states
      const [searchTask, setSearchTask] = useState("");
      const [isActionLoading, setIsActionLoading] = useState(false);
    
      //template related states
      const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
      const [newTemplate, setNewTemplate] = useState({
        title: "",
        desc: "",
        deadline: "",
        category: "WORK",
        priority: "MIDLE",
        status: "TO DO",
        label: "PRIVATE"
      });

    // Load API Data for Dashboard
    const loadDashboardData = useCallback(async (silent = false) => { 
    
        // Check Logins session. If not exist, redirect to login page. 
        if (!hasActiveSession()) {
          router.replace("/login");
          return;
        }
    
        if (!silent) setNotice(null); //set notice
    
        // Guest Mode 
    
        try {
          const guest = isGuestSession();
          const [tasksResult, zenResult, templatesResult, energyResult] =
            await Promise.all([
              getTasks(1, 50),
              getDashboardZen(),
              guest ? Promise.resolve({ data: [] }) : getTemplates(),
              guest ? Promise.resolve({ data: GUEST_ENERGY_SUMMARY }) : getEnergySummary(),
            ]);
    
          setDisplayName(getDisplayName());
          setApiTasks(tasksResult.data);
          setTemplatesList(templatesResult.data.map(mapTemplateToCard));
    
          const currentTime = Date.now();
          setDeadlineStats({
            upcoming: tasksResult.data.filter((task) => {
              if (!task.deadline || task.status === "done") return false;
              const deadline = new Date(task.deadline).getTime();
              return deadline >= currentTime && deadline <= currentTime + 7 * 24 * 60 * 60 * 1000;
            }).length,
            overdue: tasksResult.data.filter((task) => {
              return task.deadline &&
                task.status !== "done" &&
                new Date(task.deadline).getTime() < currentTime;
            }).length,
          });
    
          setEnergyData({
            current: energyResult.data.current_energy,
            max: energyResult.data.max_energy,
            percent: Math.round((energyResult.data.current_energy / energyResult.data.max_energy) * 100),
            isCritical: energyResult.data.is_critical_energy,
          });
    
          if (zenResult.hidden_message) {
            setNotice(zenResult.hidden_message);
          }
        } catch (error) {
          setNotice(
            error instanceof Error
              ? error.message
              : "Gagal memuat data dashboard.",
          );
        }
      }, [router]);
    
    
    // Load data on initial render
    useEffect(() => {
    const timer = window.setTimeout(() => {
        void loadDashboardData();
    }, 0);

    return () => window.clearTimeout(timer);
    }, [loadDashboardData]);

    // USE MEMO
     const filteredTasks = useMemo(() => { // Search Task
        const keyword = searchTask.trim().toLowerCase();
        const tasks = apiTasks.map(mapTaskToViewTask);
    
        if (!keyword) return tasks;
    
        return tasks.filter((task) =>
          `${task.title} ${task.subtask} ${task.date}`.toLowerCase().includes(keyword),
        );
      }, [apiTasks, searchTask]);
    
      const priorityTaskItems = useMemo<ViewTask[]>(() => { // Sort Task
        const activeTasks = apiTasks
          .filter((task) => task.status !== "done")
          .sort((a, b) => {
            const aDeadline = a.deadline ? new Date(a.deadline).getTime() : Number.MAX_SAFE_INTEGER;
            const bDeadline = b.deadline ? new Date(b.deadline).getTime() : Number.MAX_SAFE_INTEGER;
    
            return aDeadline - bDeadline;
          })
          .slice(0, 3)
          .map(mapTaskToViewTask);
    
        return activeTasks;
      }, [apiTasks]);

      const taskCards = useMemo(() => {
          return apiTasks.map(mapTaskToCard);
        }, [apiTasks]);

    const recentTaskItems: ViewTask[] = filteredTasks;
    const emptyRecentTaskMessage = searchTask.trim()
    ? "Task tidak ditemukan"
    : "Belum ada task";

    const cardItems = activeMenu === "task" ? taskCards : templatesList;
    const selectedCard = templatesList.find((item) => item.id === selectedTemplateId) ?? null;
    const completedCount = apiTasks.filter((task) => task.status === "done").length;
    const upcomingDeadlineCount = deadlineStats.upcoming;
    const overdueCount = deadlineStats.overdue;
    

    // HANDLERS

    const handleSignOut = () => {
        clearAuthSession();
        router.push("/login");
      };
    
    const handleToggleTaskStatus = async (task: ViewTask, checked: boolean) => {
        if (!task.id) return;
    
        setIsActionLoading(true);
        try {
          await updateTask(task.id, { status: checked ? "done" : "pending" });
          await loadDashboardData(true);
        } catch (error) {
          setNotice(error instanceof Error ? error.message : "Gagal update task.");
        } finally {
          setIsActionLoading(false);
        }
      };
    
      const handleStartFocus = async (taskId?: string) => {
        if (!taskId) {
          router.push("/focus");
          return;
        }
    
        setIsActionLoading(true);
        try {
          await startFocusSession(taskId);
          setNotice("Sesi fokus berhasil dimulai.");
        } catch (error) {
          setNotice(error instanceof Error ? error.message : "Gagal memulai fokus.");
        } finally {
          setIsActionLoading(false);
          router.push("/focus");
        }
      };
    
      const handleUseCard = async (item: ViewCard) => {
        if (activeMenu === "task") {
          await handleStartFocus(item.taskId);
          return;
        }
    
        if (!item.backendKey) {
          setSelectedTemplateId(item.id);
          setTemplateView("detail");
          return;
        }
    
        setIsActionLoading(true);
        try {
          await applyTemplate(item.backendKey);
          setNotice(`Template ${item.title} berhasil diterapkan.`);
          setActiveMenu("task");
          await loadDashboardData(true);
        } catch (error) {
          setNotice(error instanceof Error ? error.message : "Gagal menerapkan template.");
        } finally {
          setIsActionLoading(false);
        }
      };
    
      const handleCreateTask = async () => {
        if (!addTaskTitle.trim()) {
          setNotice("Nama tugas tidak boleh kosong.");
          return;
        }
        setIsActionLoading(true);
        try {
          const result = await createTask({
            title: addTaskTitle,
            energy_weight: addTaskEnergy,
            deadline: addTaskDeadline || null,
          });
          // Store description and subtasks locally
          if (result?.data?.id) {
            setLocalTaskMeta(prev => ({
              ...prev,
              [result.data.id]: {
                description: addTaskDesc,
                subtasks: addTaskSubtasks,
              },
            }));
          }
          setNotice("Tugas berhasil ditambahkan.");
          setIsAddTaskModalOpen(false);
          setAddTaskTitle("");
          setAddTaskEnergy("Ringan");
          setAddTaskDeadline("");
          setAddTaskDesc("");
          setAddTaskSubtasks([]);
          setNewSubtaskText("");
          await loadDashboardData(true);

        } catch (error) {
            setNotice(error instanceof Error ? error.message : "Gagal menambahkan tugas.");
        } finally {
            setIsActionLoading(false);
        }
      };

return {
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
    };
}