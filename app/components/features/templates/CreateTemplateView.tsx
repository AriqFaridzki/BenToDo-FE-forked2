// ─── CreateTemplateView COMPONENT ────────────────────────────────────────────────────────
import { TemplateViewOption } from "@/app/dashboard/typesAndMaps";
import { 
    ArrowLeftIcon, 
    ShareIcon,
    CalendarLineIcon
 } from "../../ui/icons";

import { ViewCard, NewTemplateOption } from "../../../dashboard/typesAndMaps";



// 1. Define exactly what this component needs from the outside world

interface CreateTemplateViewProps {
    //Setters
    setTemplateView: (view: TemplateViewOption) => void;
    setTemplatesList: (list: ViewCard[]) => void;
    
    //Values
    templatesList: ViewCard[];
    newTemplate: typeof NewTemplateOption;
}

// 2. Accept those needs as parameters (props)
export function CreateTemplateView({dashboardStates}: {dashboardStates: any}) {

const {
    
    setTemplateView,
    setTemplatesList,

    newTemplate,
    setNewTemplate,
    templatesList,


} = dashboardStates;

    return (
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
    );
}
