// ─── TopHeader COMPONENT ────────────────────────────────────────────────────────
import {COLOR} from "../ui/color";
import { BellIcon, SearchIcon } from "../ui/icons";
import { MenuOption, TemplateViewOption } from "../../dashboard/typesAndMaps";


// 1. Define exactly what this component needs from the outside world
interface TopHeaderProps {
  activeMenu: MenuOption;
  
  // Values
  displayName: (menu: MenuOption) => void;
  selectedTaskId: (id: string | null) => void;
  templateView: (view: TemplateViewOption) => void;
  searchTask: string;

  // Setters
  setSearchTask: (task: string) => void;}

// 2. Accept those needs as parameters (props)
export function TopHeader({dashboardStates}: {dashboardStates: any}) {

const {
  activeMenu,
  displayName,
  selectedTaskId,
  templateView,
  searchTask,
  setSearchTask,

} = dashboardStates;

    return (
        <header
            style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
            padding: "0 32px",
            backgroundColor: COLOR.surface,
            borderBottom: `1px solid ${COLOR.borderSoft}`,
            position: "sticky",
            top: 0,
            zIndex: 20,
            }}
        >
            <h1 style={{ fontSize: "18px", fontWeight: 400, color: COLOR.text, margin: 0 }}>
            {activeMenu === "dashboard" ? "Dashboard" :
                activeMenu === "task" ? (selectedTaskId ? "Detail Task" : "Task") :
                templateView === "create" ? "Create Template" :
                    templateView === "success" ? "Create Template" :
                    templateView === "detail" ? "Detail Template" : "Template"}
            </h1>

            {/* Search + Notification + Profile */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* Search */}
            <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: COLOR.muted, display: "flex" }}>
                <SearchIcon />
                </span>
                <input
                type="text"
                placeholder={activeMenu === "template" ? "Search template" : "Search task"}
                value={searchTask}
                onChange={(e) => setSearchTask(e.target.value)}
                style={{
                    width: "260px",
                    height: "32px",
                    borderRadius: "3px",
                    border: `1px solid ${COLOR.border}`,
                    paddingLeft: "36px",
                    paddingRight: "12px",
                    fontSize: "12px",
                    color: COLOR.text,
                    backgroundColor: COLOR.surface,
                    outline: "none",
                    fontFamily: "inherit",
                }}
                />
            </div>

            {/* Notification */}
            <button
                style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "32px",
                height: "32px",
                borderRadius: "3px",
                border: `1px solid ${COLOR.border}`,
                background: "none",
                color: COLOR.mutedDark,
                cursor: "pointer",
                }}
            >
                <BellIcon />
            </button>

            {/* User Avatar + Name */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingLeft: "12px", borderLeft: `1px solid ${COLOR.borderSoft}` }}>
                <div
                style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #6EE7F9 0%, #0F766E 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#ffffff",
                }}
                >
                {displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: COLOR.text, lineHeight: 1.15 }}>
                    {displayName}
                </div>
                <div style={{ fontSize: "9px", color: COLOR.text, lineHeight: 1.2 }}>My Workspace</div>
                </div>
            </div>
            </div>
        </header>
    );
}
