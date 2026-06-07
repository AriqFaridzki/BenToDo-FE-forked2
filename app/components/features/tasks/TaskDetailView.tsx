// ─── TaskDetailView COMPONENT ────────────────────────────────────────────────────────
import {COLOR} from "../../ui/color";
import { mapEnergyToLevel } from "../../../dashboard/typesAndMaps";
import { Task } from "@/app/lib/api";



// 1. Define exactly what this component needs from the outside world

interface TaskDetailViewProps {
    selectedTaskId: string | null;
    apiTasks: Task[];
    localTaskMeta: { [key: string]: { 
                            description: string; 
                            subtasks: 
                                { text: string; 
                                  done: boolean }[] }};


    setSelectedTaskId: (id: string | null) => void;
    setLocalTaskMeta: (meta: { description: string; subtasks: { text: string; done: boolean }[] }) => void;
    setNotice: (notice: string) => void;
}

// 2. Accept those needs as parameters (props)
export function TaskDetailView({dashboardStates}: {dashboardStates: any}) {

    

const {
    selectedTaskId,
    apiTasks,
    localTaskMeta,
    
    setSelectedTaskId,
    setLocalTaskMeta,
    setNotice



} = dashboardStates;


const task = apiTasks.find((task: Task) => task.id === selectedTaskId); // Find task details by selectedTaskId

                   if (!task) return null; //return null if task model is not found

                   // Color Mapping for energy level and status
                   const energyLevel = mapEnergyToLevel(task.energy_weight);
                   const energyColor = task.energy_weight === "Berat" ? "#DC2626" : task.energy_weight === "Sedang" ? "#F59E0B" : COLOR.primary;
                   const statusLabel = task.status === "done" ? "Selesai" : task.status === "in_progress" ? "In Progress" : "Pending";
                   const statusColor = task.status === "done" ? COLOR.primary : task.status === "in_progress" ? "#3B82F6" : "#F59E0B";

                    // Format DateTime ( bIndonesia )
                   const formatDateTime = (dateInString: string | null) => {
                     if (!dateInString) return "—"; 
                     return new Intl.DateTimeFormat( 
                        "id-ID", //
                            { day: "numeric", 
                              month: "long", 
                              year: "numeric", 
                              hour: "2-digit", 
                              minute: "2-digit" }).format(new Date(dateInString))
                   };

                    // Ambil Data dari task ID 
                    const meta = localTaskMeta[task.id];

                    const taskDescription = meta?.description || "";
                    const taskSubtasks = meta?.subtasks || [];
                    const doneSubtaskCount = taskSubtasks.filter((subtask: { done: boolean }) => subtask.done === true).length;
                   

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
                {taskSubtasks.map((subtask: { done: boolean; text: string }, index: number) => (

                    <div key={index} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "4px", backgroundColor: subtask.done ? "#6366f1" : "#ffffff", border: subtask.done ? "none" : "1px solid #d1d5db", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }} onClick={() => {
                        
                        const newSubs = [...taskSubtasks];
                        newSubs[index] = { ...newSubs[index], done: !newSubs[index].done };

                        // Set local state untuk subtasks yang sudah di toggle done/undone secara local
                        setLocalTaskMeta((prev: { [key: string]: any }) => ({...prev, [task.id]: { description: taskDescription, subtasks: newSubs }}));
                    }}>
                        {subtask.done && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                    <span style={{ fontSize: "14px", color: subtask.done ? "#9ca3af" : "#4b5563", textDecoration: subtask.done ? "line-through" : "none" }}>{subtask.text}</span>
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
}
