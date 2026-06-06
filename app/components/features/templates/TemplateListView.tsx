// ─── SIDEBAR COMPONENT ────────────────────────────────────────────────────────
import {COLOR} from "../../ui/color";
import { CompassIcon,SubtaskIcon,CalendarSmIcon,EyeOutlineIcon } from "../../ui/icons";
import { MenuOption, TemplateViewOption, TemplateFilterOption } from "../../../dashboard/typesAndMaps";



// 1. Define exactly what this component needs from the outside world
interface TemplateListViewProps {
  
  
  // Values
    activeMenu: MenuOption;
    cardItems: Array<{
      id: number;
      title: string;
      desc: string;
      level: string;
      subtasks: number;
      type?: string;
      taskId?: string;
    }>; 

    templateFilter: TemplateFilterOption;

    //Handlers
    handleUseCard: (item: any) => void;



  // Setters
    setTemplateView: (view: TemplateViewOption) => void;
    setSelectedTemplateId: (id: number | null) => void;
    setSelectedTaskId: (id: string | null) => void;
  
}

// const cardConfig = { // common style for all Statcards
//     ...CARD_STYLE_COLOR,
//   width: "100%", 
//   minHeight: "136px", 
//   padding: "20px clamp(18px, 2.8vw, 32px)", 
//   boxSizing: "border-box", 
//   display: "flex", 
//   flexDirection: "column", 
//   justifyContent: "space-between" 
// } as const;

// 2. Accept those needs as parameters (props)
export function TemplateListView({dashboardStates}: {dashboardStates: any}) {

const {
    activeMenu,
    cardItems,
    templateFilter,
    handleUseCard,
    setSelectedTemplateId,
    setTemplateView,
    setSelectedTaskId,

} = dashboardStates;

    return (
<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(28px, 3vw, 44px)", alignItems: "start" }}>
                {cardItems
                  .filter((item: any) => item?.type?.includes(templateFilter))
                  .map((item: any) => (
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
    );
}
