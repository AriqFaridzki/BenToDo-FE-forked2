// ─── SIDEBAR COMPONENT ────────────────────────────────────────────────────────
import {COLOR, CARD_STYLE_COLOR} from "../../ui/color";
import { CheckSquareIcon } from "../../ui/icons";
import { EnergyData } from "../../../dashboard/typesAndMaps";
import { ClockAlertIcon, AlertTriangleIcon, BatteryIcon } from "../../ui/icons";
import { TrendBadge } from "../../ui/badge";


// 1. Define exactly what this component needs from the outside world
interface statCardsProps {
  
  
  // Values
    completedCount: number;
    upcomingDeadlineCount: number;
    overdueCount: number;
    energyData: EnergyData;


  // Setters
  
}

const cardConfig = { // common style for all Statcards
    ...CARD_STYLE_COLOR,
  width: "100%", 
  minHeight: "136px", 
  padding: "20px clamp(18px, 2.8vw, 32px)", 
  boxSizing: "border-box", 
  display: "flex", 
  flexDirection: "column", 
  justifyContent: "space-between" 
} as const;

// 2. Accept those needs as parameters (props)
export function StatCards({dashboardStates}: {dashboardStates: any}) {

const {
    completedCount,
    upcomingDeadlineCount,
    overdueCount,
    energyData,

} = dashboardStates;

    return (
 
         <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "clamp(16px, 2vw, 32px)",
            marginBottom: "32px"}}
            >
                      
                   
            {/* Task Completed */}
            <div style={{...cardConfig}}>
                <div style={{ fontSize: "14px", color: COLOR.text, fontWeight: 600, lineHeight: 1.1 }}>Task Completed</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <CheckSquareIcon />
                <span style={{ fontSize: "34px", fontWeight: 700, color: COLOR.text, lineHeight: 1 }}>{completedCount}</span>
                <TrendBadge value="+10%" up />
                </div>
                <div style={{ fontSize: "12px", color: COLOR.muted, lineHeight: 1 }}>from last week</div>
            </div>

            {/* Upcoming Deadlines */}
            <div style={{...cardConfig}}>
                <div style={{ fontSize: "14px", color: COLOR.text, fontWeight: 600, lineHeight: 1.1 }}>Upcoming Deadlines</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ClockAlertIcon />
                <span style={{ fontSize: "34px", fontWeight: 700, color: COLOR.text, lineHeight: 1 }}>{upcomingDeadlineCount}</span>
                <TrendBadge value="+10%" up />
                </div>
                <div style={{ fontSize: "12px", color: COLOR.muted, lineHeight: 1 }}>from last week</div>
            </div>

            {/* Overdue Task */}
            <div style={{...cardConfig }}>
                <div style={{ fontSize: "14px", color: COLOR.text, fontWeight: 600, lineHeight: 1.1 }}>Overdue Task</div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <AlertTriangleIcon />
                <span style={{ fontSize: "34px", fontWeight: 700, color: COLOR.text, lineHeight: 1 }}>{overdueCount}</span>
                <TrendBadge value="-10%" up={false} />
                </div>
                <div style={{ fontSize: "12px", color: COLOR.muted, lineHeight: 1 }}>from last week</div>
            </div>

            {/* Energy */}
            <div style={{...cardConfig}}>
                <div style={{ fontSize: "14px", color: COLOR.text, fontWeight: 600, lineHeight: 1.1 }}>Energy</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

                <BatteryIcon />

                <span style={{ fontSize: "24px", fontWeight: 700, color: COLOR.text, lineHeight: 1 }}>{energyData.percent}%</span>
                <span style={{ fontSize: "12px", color: COLOR.muted, fontWeight: 500, marginLeft: "auto" }}>{energyData.current} / {energyData.max} mins</span>
                
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ width: "100%", height: "8px", backgroundColor: "#E8E8E8", borderRadius: "999px", overflow: "hidden" }}>
                    <div style={{ width: `${energyData.percent}%`, height: "100%", backgroundColor: energyData.isCritical ? COLOR.danger : COLOR.primary, borderRadius: "999px", transition: "width 0.3s ease, background-color 0.3s ease" }} />
                </div>


                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: energyData.isCritical ? COLOR.danger : COLOR.primary, fontWeight: 600 }}>
                   
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: energyData.isCritical ? COLOR.danger : COLOR.primary }} />
                    {energyData.current === 0 ? "Depleted" : energyData.isCritical ? "Critical Energy" : "Ready for do Task"}
                </div>


                </div>
            </div>
        </div>
    );
}
