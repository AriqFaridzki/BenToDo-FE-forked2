// ─── SIDEBAR COMPONENT ────────────────────────────────────────────────────────
import {COLOR} from "../ui/color";
import { DashboardIcon, TaskIcon, TemplateIcon, SignOutIcon } from "../ui/icons";
import { LOGO_SRC } from "../../lib/assets";


// 1. Define exactly what this component needs from the outside world
interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  setSelectedTemplateId: (id: string | null) => void;
  setTemplateView: (view: string) => void;
  handleSignOut: () => void;
}

// 2. Accept those needs as parameters (props)
export function Sidebar({dashboardStates}: {dashboardStates: any}) {

const {
  activeMenu,
  setActiveMenu,
  setSelectedTemplateId,
  setTemplateView,
  handleSignOut

} = dashboardStates;

    return (
        <aside
            style={{
            width: "210px",
            minHeight: "100vh",
            backgroundColor: COLOR.surface,
            borderRight: `1px solid ${COLOR.borderSoft}`,
            display: "flex",
            flexDirection: "column",
            padding: "24px 0 0",
            position: "sticky",
            top: 0,
            flexShrink: 0,
            }}
        >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 28px", marginBottom: "38px" }}>
            <span
                aria-label="Ben To Do Logo"
                style={{
                width: "32px",
                height: "32px",
                display: "inline-block",
                backgroundColor: COLOR.primary,
                WebkitMask: `url('${LOGO_SRC}') center / contain no-repeat`,
                mask: `url('${LOGO_SRC}') center / contain no-repeat`,
                flexShrink: 0,
                }}
            />
            <div>
                <div style={{ fontSize: "14px", fontWeight: 700, color: COLOR.text, lineHeight: 1.1 }}>Ben To Do</div>
                <div style={{ fontSize: "11px", color: COLOR.text, fontWeight: 400, lineHeight: 1.15 }}>Task Dashboard</div>
            </div>
            </div>

            {/* Menu Label */}
            <div style={{ fontSize: "11px", fontWeight: 600, color: COLOR.text, letterSpacing: "0", padding: "0 28px", marginBottom: "14px" }}>
            MENU
            </div>

            {/* Nav Items */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "0 24px" }}>
            {[
                { key: "dashboard", label: "DashBoard", icon: <DashboardIcon /> },
                { key: "task", label: "Task", icon: <TaskIcon /> },
                { key: "template", label: "Template", icon: <TemplateIcon /> },
            ].map(({ key, label, icon }) => (
                
                <button
                key={key}
                onClick={() => {
                    setActiveMenu(key);
                    setSelectedTemplateId(null);
                    setTemplateView("list");
                }}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "11px",
                    height: "42px",
                    padding: "0 14px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "13px",
                    fontWeight: activeMenu === key ? 600 : 400,
                    color: activeMenu === key ? COLOR.primary : COLOR.mutedDark,
                    backgroundColor: activeMenu === key ? COLOR.primarySoft : "transparent",
                    transition: "all 0.15s",
                    width: "100%",
                    textAlign: "left",
                }}
                >
                <span style={{ display: "flex", color: activeMenu === key ? COLOR.primary : COLOR.mutedDark }}>
                    {icon}
                </span>
                {label}
                </button>
            ))}
            </nav>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Sign Out */}
            <div style={{ padding: "22px 24px", borderTop: `1px solid ${COLOR.borderSoft}` }}>
            <button
                onClick={handleSignOut}
                style={{
                display: "flex",
                alignItems: "center",
                gap: "11px",
                height: "36px",
                padding: "0 12px",
                borderRadius: "3px",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "13px",
                fontWeight: 400,
                color: COLOR.mutedDark,
                backgroundColor: "transparent",
                transition: "all 0.15s",
                width: "100%",
                textAlign: "left",
                }}
            >
                <SignOutIcon />
                Sign Out
            </button>
            </div>
        </aside>
    );
}
