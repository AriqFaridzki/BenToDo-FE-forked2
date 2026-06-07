// ─── CreateTemplateView COMPONENT ────────────────────────────────────────────────────────
import { TemplateFilterOption, TemplateViewOption } from "@/app/dashboard/typesAndMaps";
import { COLOR, buttonReset } from "../../ui/color";
import { EnergyWeight } from "../../../lib/api";

import { ViewCard, NewTemplateOption } from "../../../dashboard/typesAndMaps";



// 1. Define exactly what this component needs from the outside world

interface AddTaskModalProps { 
    //Setters
    setAddTaskTitle: (title: string) => void;
    setAddTaskDesc: (desc: string) => void;
    setAddTaskSubtasks: React.Dispatch<React.SetStateAction<{text: string, done: boolean}[]>>;
    setNewSubtaskText: (text: string) => void;
    setAddTaskEnergy: (energy: EnergyWeight) => void;
    setAddTaskDeadline: (deadline: string) => void;
    setIsAddTaskModalOpen: (isOpen: boolean) => void;
    
    //Values
    addTaskTitle: string;
    addTaskDesc: string;
    addTaskSubtasks: {text: string, done: boolean}[];
    newSubtaskText: string;
    addTaskEnergy: EnergyWeight;
    addTaskDeadline: string;

    //Handler (Function)
    handleCreateTask: () => Promise<void>;
    isActionLoading: boolean;

}

// 2. Accept those needs as parameters (props)
export function AddTaskModal({dashboardStates}: {dashboardStates: AddTaskModalProps}) {

const {

    setAddTaskDesc,
    setIsAddTaskModalOpen,
    setAddTaskTitle,
    setAddTaskSubtasks,
    setNewSubtaskText,
    setAddTaskEnergy,
    setAddTaskDeadline,



    addTaskTitle, 
    addTaskDesc,
    addTaskSubtasks,
    addTaskEnergy,


    newSubtaskText,
    addTaskDeadline,

    handleCreateTask,
    isActionLoading,



} = dashboardStates;

    return (
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
    );
}
