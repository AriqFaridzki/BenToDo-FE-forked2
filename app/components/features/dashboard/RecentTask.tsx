// ─── RecentTask COMPONENT ────────────────────────────────────────────────────────
import {COLOR, CARD_STYLE_COLOR, buttonReset} from "../../ui/color";
import { SearchIcon, FilterIcon, MoreDotsIcon } from "../../ui/icons";
import { PriorityBadge } from "../../ui/badge";
import { ViewTask } from "../../../dashboard/typesAndMaps";


// 1. Define exactly what this component needs from the outside world

interface RecentTaskProps {
    
    // Values
    searchTask: string;
    recentTaskItems: ViewTask[];
    emptyRecentTaskMessage: string;
    isActionLoading: boolean;


    // Setters
    setSearchTask: (searchTask: string) => void;
    handleToggleTaskStatus: (taskId: string) => void;
    handleStartFocus: (taskId: string) => void;
}

// 2. Accept those needs as parameters (props)
export function RecentTask({dashboardStates}: {dashboardStates: any}) {

const {
  searchTask,
  recentTaskItems,
  emptyRecentTaskMessage,
  isActionLoading,
  
  setSearchTask,

  handleToggleTaskStatus,
  handleStartFocus


} = dashboardStates;

    return (
        <div id="recent-tasks-section" style={{ ...CARD_STYLE_COLOR, width: "100%", padding: 0, marginBottom: "32px", overflow: "hidden" }}>
                        <div style={{ height: "78px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 30px" }}>
                          <span style={{ fontSize: "16px", fontWeight: 700, color: COLOR.text, lineHeight: 1 }}>Recent Tasks</span>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

                            {/* Search in table */}
                            <div style={{ position: "relative" }}>
                              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: COLOR.muted, display: "flex" }}>
                                <SearchIcon />
                              </span>
                              <input
                                type="text"
                                placeholder="Search task"
                                value={searchTask}
                                onChange={(e) => setSearchTask(e.target.value)}
                                style={{
                                  width: "255px",
                                  height: "28px",
                                  borderRadius: "7px",
                                  border: "none",
                                  paddingLeft: "40px",
                                  paddingRight: "14px",
                                  fontSize: "12px",
                                  color: COLOR.text,
                                  backgroundColor: "#F1F1F1",
                                  fontFamily: "inherit",
                                  outline: "none",
                                }}
                              />
                            </div>

                            {/* Filter Button */}
                            <button
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "7px",
                                width: "78px",
                                height: "32px",
                                padding: 0,
                                borderRadius: "7px",
                                border: `1px solid ${COLOR.border}`,
                                background: COLOR.surface,
                                fontSize: "12px",
                                fontWeight: 600,
                                color: COLOR.text,
                                cursor: "pointer",
                                fontFamily: "inherit",
                              }}
                            >
                              <FilterIcon /> Filter
                            </button>
                          </div>
                        </div>
        
                        {/* Recent Tasks Table */}
                        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
                          <colgroup>
                            <col style={{ width: "33%" }} />
                            <col style={{ width: "16%" }} />
                            <col style={{ width: "17%" }} />
                            <col style={{ width: "20%" }} />
                          </colgroup>
                          <thead>
                            <tr style={{ height: "52px", backgroundColor: COLOR.panel, borderTop: `1px solid ${COLOR.border}`, borderBottom: `1px solid ${COLOR.border}` }}>
                              <th style={{
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    color: COLOR.mutedDark,
                                    textAlign: "left",
                                    padding: "0 80px 0",
                                    letterSpacing: "0.02em",
                                    whiteSpace: "nowrap",
                                    verticalAlign: "middle",
                                  }}>
                                TASK TITLE
                              </th>
                              {["TASK LEVEL ", "DUE DATE ", "ACTIONS"].map((h) => (
                                <th
                                  key={h}
                                  style={{
                                    fontSize: "12px",
                                    fontWeight: 700,
                                    color: COLOR.mutedDark,
                                    textAlign: "center",
                                    padding: "0 16px",
                                    letterSpacing: "0.02em",
                                    whiteSpace: "nowrap",
                                    verticalAlign: "middle",
                                  }}
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {recentTaskItems.length === 0 ? (
                              <tr style={{ height: "78px", borderBottom: `1px solid ${COLOR.borderSoft}` }}>
                                <td
                                  colSpan={4}
                                  style={{
                                    padding: "0 16px",
                                    textAlign: "center",
                                    verticalAlign: "middle",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: COLOR.mutedDark,
                                  }}
                                >
                                  {emptyRecentTaskMessage}
                                </td>
                              </tr>
                            ) : recentTaskItems.map((task: ViewTask) => (
                              <tr key={task.id ?? task.title} style={{ height: "78px", borderBottom: `1px solid ${COLOR.borderSoft}` }}>
                                <td style={{ padding: "0 16px 0 clamp(58px, 4.5vw, 80px)", verticalAlign: "middle" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: "46px", minWidth: 0 }}>
                                    
                                    {/* Removed by votes of the group */}
                                    
                                    {/* <input 
                                      type="checkbox"
                                      checked={!!task.done}
                                      disabled={isActionLoading}
                                      onChange={(e) => {
                                        void handleToggleTaskStatus(task, e.target.checked);
                                      }}
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        accentColor: COLOR.primary,
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        flexShrink: 0,
                                      }}
                                    /> */}
                                    <span style={{ fontSize: "13px", fontWeight: 700, color: COLOR.text, lineHeight: 1.2, overflowWrap: "break-word" }}>{task.title}</span>
                                  </div>
                                </td>

                                {/* Energy Weight that will be consumed */}
                                <td style={{ padding: "0 16px", verticalAlign: "middle", textAlign: "center" }}>
                                  <PriorityBadge level={task.level} />
                                </td>

                                {/* Due Dates */}
                                <td style={{ padding: "0 16px", fontSize: "13px", color: COLOR.text, fontWeight: 700, verticalAlign: "middle", textAlign: "center" }}>
                                  {task.date}

                                {/* Actions Buttons for Focus */}
                                </td>
                                <td style={{ padding: "0 16px", verticalAlign: "middle" }}>
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "34px" }}>
                                    <button style={{ ...buttonReset, color: COLOR.text, display: "flex" }}>
                                      <MoreDotsIcon />
                                    </button>
                                    <button
                                      disabled={isActionLoading}
                                      onClick={() => {
                                        void handleStartFocus(task.id);
                                      }}
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        padding: "6px 16px",
                                        minWidth: "110px",
                                        borderRadius: "8px",
                                        border: "1px solid #d1d5db",
                                        backgroundColor: "#ffffff",
                                        fontSize: "12px",
                                        fontWeight: 600,
                                        color: "#111827",
                                        cursor: "pointer",
                                        fontFamily: "inherit",
                                        whiteSpace: "nowrap",
                                        transition: "all 0.15s"
                                      }}
                                      onMouseEnter={(e) => {
                                        if (!isActionLoading) {
                                          e.currentTarget.style.backgroundColor = "#f9fafb";
                                        }
                                      }}
                                      onMouseLeave={(e) => {
                                        if (!isActionLoading) {
                                          e.currentTarget.style.backgroundColor = "#ffffff";
                                        }
                                      }}
                                    >
                                      Mulai Fokus
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
    );
}
