// ─── ProductivityChartsView COMPONENT ────────────────────────────────────────────────────────
import {COLOR, CARD_STYLE_COLOR} from "../../ui/color";
import { CalendarSmIcon } from "../../ui/icons";
import { ChartRangeOption} from "../../../dashboard/typesAndMaps";
import { ProductivityChart } from "./ProductivityCharts";

// 1. Define exactly what this component needs from the outside world
interface ProductivityChartsViewProps {
  
  
  // Values
  chartRange: ChartRangeOption;
  chartDropdownOpen: boolean;

  // Setters
  setChartRange: (range: ChartRangeOption) => void;
  setChartDropdownOpen: (open: boolean) => void;

}


// 2. Accept those needs as parameters (props)
export function ProductivityChartsView({dashboardStates}: {dashboardStates: any}) {

const {
    setChartDropdownOpen,
    setChartRange,
    chartDropdownOpen,
    chartRange


} = dashboardStates;

    return (
         <div style={{ ...CARD_STYLE_COLOR, padding: "24px clamp(18px, 2vw, 32px)", gridColumn: "2", gridRow: "1 / span 2", minHeight: "386px", display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
                           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                             <span style={{ fontSize: "16px", fontWeight: 700, color: COLOR.text, lineHeight: 1 }}>Productivity Overview</span>
                             <div style={{ position: "relative" }}>
                               <button
                                 onClick={() => setChartDropdownOpen(!chartDropdownOpen)}
                                 style={{
                                   display: "flex",
                                   alignItems: "center",
                                   gap: "5px",
                                   height: "28px",
                                   padding: "0 12px",
                                   borderRadius: "4px",
                                   border: `1px solid ${COLOR.border}`,
                                   backgroundColor: COLOR.surface,
                                   fontSize: "11px",
                                   color: COLOR.text,
                                   cursor: "pointer",
                                   fontFamily: "inherit",
                                   transition: "border-color 0.2s, box-shadow 0.2s",
                                   borderColor: chartDropdownOpen ? COLOR.primary : COLOR.border,
                                   boxShadow: chartDropdownOpen ? `0 0 0 2px ${COLOR.primaryPale}` : "none",
                                 }}
                               >
                                 <CalendarSmIcon />
                                 {chartRange === "week" ? "This Week" : chartRange === "month" ? "This Month" : "This Year"}
                                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                                   style={{ transition: "transform 0.2s", transform: chartDropdownOpen ? "rotate(180deg)" : "rotate(0)" }}>
                                   <polyline points="6 9 12 15 18 9" />
                                 </svg>
                               </button>
                               {chartDropdownOpen && (
                                 <div style={{
                                   position: "absolute", top: "34px", right: 0, zIndex: 30,
                                   backgroundColor: COLOR.surface, border: `1px solid ${COLOR.border}`,
                                   borderRadius: "6px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                                   overflow: "hidden", minWidth: "130px",
                                   animation: "fadeSlideDown 0.18s ease",
                                 }}>
                                   {(["week", "month", "year"] as ChartRangeOption[]).map((r) => (
                                     <button
                                       key={r}
                                       onClick={() => { setChartRange(r); setChartDropdownOpen(false); }}
                                       style={{
                                         display: "flex", alignItems: "center", gap: "8px",
                                         width: "100%", padding: "9px 14px", border: "none",
                                         backgroundColor: chartRange === r ? COLOR.primaryPale : "transparent",
                                         color: chartRange === r ? COLOR.primary : COLOR.text,
                                         fontSize: "12px", fontWeight: chartRange === r ? 600 : 400,
                                         cursor: "pointer", fontFamily: "inherit",
                                         transition: "background-color 0.15s",
                                       }}
                                       onMouseEnter={(e) => { if (chartRange !== r) e.currentTarget.style.backgroundColor = "#f9f9f9"; }}
                                       onMouseLeave={(e) => { if (chartRange !== r) e.currentTarget.style.backgroundColor = "transparent"; }}
                                     >
                                       {chartRange === r && <span style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: COLOR.primary }} />}
                                       {r === "week" ? "This Week" : r === "month" ? "This Month" : "This Year"}
                                     </button>
                                   ))}
                                 </div>
                               )}
                             </div>
                           </div>
                           <div style={{ width: "100%", flex: 1, minHeight: "300px" }} key={chartRange}>
                             <ProductivityChart range={chartRange} />
                           </div>
                         </div>
    );
}
