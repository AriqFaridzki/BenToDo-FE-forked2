// ─── WelcomeBanner COMPONENT ────────────────────────────────────────────────────────
import {COLOR} from "../../ui/color";
import { PlayIcon } from "../../ui/icons";
import { MenuOption} from "../../../dashboard/typesAndMaps";


// 1. Define exactly what this component needs from the outside world
interface WelcomeBannerProps {
    activeMenu: MenuOption;

    // Values
    searchTask: string;
    displayName: (menu: MenuOption) => void
    timeRange: (range: string) => void;
    templateFilter: (filter: string) => void;
    priorityTaskItems: any[];
    templateView: (view: string) => void;

    // Setters
    setTimeRange: (range: string) => void;
    setTemplateFilter: (filter: string) => void;
    handleStartFocus: (taskId?: string) => void;
    setIsAddTaskModalOpen: (isOpen: boolean) => void;   
    setSearchTask: (task: string) => void;}

// 2. Accept those needs as parameters (props)
export function WelcomeBanner({dashboardStates}: {dashboardStates: any}) {

const {
    activeMenu,
    displayName,
    setTimeRange,
    timeRange,
    setTemplateFilter,
    templateFilter,
    handleStartFocus,
    priorityTaskItems,
    setIsAddTaskModalOpen,
    setTemplateView,

} = dashboardStates;

    return (
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "100%", marginBottom: "32px", gap: "24px" }}>
                      <div>
                        <h2 style={{ fontSize: "26px", fontWeight: 700, color: COLOR.text, margin: "0 0 6px", lineHeight: 1.15 }}>
                          Welcome, {displayName}
                        </h2>
                        <p style={{ fontSize: "12px", color: COLOR.text, margin: 0, lineHeight: 1.4 }}>
                          Here's what's happening with your workspace today.
                        </p>
                      </div>
        
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                        {/* Toggle Buttons */}
                        <div
                          style={{
                            display: "flex",
                            borderRadius: "3px",
                            backgroundColor: "#F1F1F1",
                            padding: "2px",
                            overflow: "hidden",
                          }}
                        >
                          {activeMenu === "dashboard" ? (
                            (["Daily", "Weekly", "Monthly", "Yearly"] as const).map((t) => (
                              <button
                                key={t}
                                onClick={() => setTimeRange(t)}
                                style={{
                                  width: "64px",
                                  height: "32px",
                                  fontSize: "11px",
                                  fontWeight: timeRange === t ? 600 : 400,
                                  fontFamily: "inherit",
                                  color: COLOR.text,
                                  backgroundColor: timeRange === t ? COLOR.surface : "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  transition: "all 0.15s",
                                }}
                              >
                                {t}
                              </button>
                            ))
                          ) : (
                            (["All", "Public", "Private"] as const).map((t) => (
                              <button
                                key={t}
                                onClick={() => setTemplateFilter(t)}
                                style={{
                                  width: "64px",
                                  height: "32px",
                                  fontSize: "11px",
                                  fontWeight: templateFilter === t ? 600 : 400,
                                  fontFamily: "inherit",
                                  color: COLOR.text,
                                  backgroundColor: templateFilter === t ? COLOR.surface : "transparent",
                                  border: "none",
                                  cursor: "pointer",
                                  transition: "all 0.15s",
                                }}
                              >
                                {t}
                              </button>
                            ))
                          )}
                        </div>
        
                        {/* Start Focus Timer Button */}
                        <button
                          onClick={() => {
                            if (activeMenu === "dashboard") {
                              void handleStartFocus(priorityTaskItems[0]?.id);
                            } else if (activeMenu === "task") {
                              setIsAddTaskModalOpen(true);
                            } else if (activeMenu === "template") {
                              setTemplateView("create");
                            }
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            minWidth: activeMenu === "dashboard" ? "158px" : "160px",
                            height: "34px",
                            padding: "0 16px",
                            borderRadius: "4px",
                            backgroundColor: COLOR.primary,
                            color: "#ffffff",
                            fontSize: "13px",
                            fontWeight: 600,
                            border: "none",
                            cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "background-color 0.15s",
                          }}
                        >
                          {activeMenu === "dashboard" ? <PlayIcon /> : <span style={{ fontSize: "16px", fontWeight: "bold", lineHeight: 1 }}>+</span>}
                          {activeMenu === "dashboard" ? "Start Focus Timer" : activeMenu === "task" ? "Task Baru" : "Template Baru"}
                        </button>
                      </div>
                    </div>
    );
}
