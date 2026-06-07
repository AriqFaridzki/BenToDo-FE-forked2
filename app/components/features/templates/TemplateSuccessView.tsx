// ─── CreateTemplateView COMPONENT ────────────────────────────────────────────────────────
import { TemplateFilterOption, TemplateViewOption } from "@/app/dashboard/typesAndMaps";
import { 
    ArrowLeftIcon, 
    SuccessCheckIcon,
    CheckCircleSolidIcon,
    PlusCircleIcon

 } from "../../ui/icons";

import { ViewCard, NewTemplateOption } from "../../../dashboard/typesAndMaps";



// 1. Define exactly what this component needs from the outside world

interface TemplateSuccessViewProps { 
    //Setters
    setTemplateView: (view: TemplateViewOption) => void;
    setTemplateFilter: (filter: TemplateFilterOption) => void;
    
    
    //Values
    templatesList: ViewCard[];
    newTemplate: typeof NewTemplateOption;
}

// 2. Accept those needs as parameters (props)
export function TemplateSuccessView({dashboardStates}: {dashboardStates: any}) {

const {
    
    setTemplateView,
    setTemplateFilter,

    newTemplate,


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
    );
}
