// ─── Priority Task COMPONENT ────────────────────────────────────────────────────────
import {COLOR, CARD_STYLE_COLOR} from "../../ui/color";
import { SubtaskIcon,CalendarSmIcon } from "../../ui/icons";
import { MenuOption, TemplateViewOption,  } from "../../../dashboard/typesAndMaps";
import { PriorityBadge } from "../../ui/badge";
import { Task } from "../../../lib/api";

// 1. Define exactly what this component needs from the outside world
interface PriorityTaskProps {
  
  
  // Values
    activeMenu: MenuOption;
    priorityTaskItems: any[]; // replace with actual type of task items
   
  
}
// 2. Accept those needs as parameters (props)
export function PriorityTask({dashboardStates}: {dashboardStates: any}) {

const {
    setActiveMenu,
    priorityTaskItems,
    

} = dashboardStates;

    return (
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
                    ) : priorityTaskItems.map((task: any) => (
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
    );
}
