// ─── DynamicCalendar COMPONENT ────────────────────────────────────────────────────────
import {COLOR, CARD_STYLE_COLOR, buttonReset} from "../../ui/color";
import { ChartRangeOption} from "../../../dashboard/typesAndMaps";
import { getCalendarWeek, isSameDay, formatDate } from "../../../lib/utils";
import { DAY_HEADERS, MONTH_NAMES } from "../../../dashboard/typesAndMaps";
import { ChevronLeftIcon, ChevronRightIcon } from "../../ui/icons";
import { Task } from "../../../lib/api";

// 1. Define exactly what this component needs from the outside world
interface DynamicCalendarProps {
  
  
  // Values
  apiTasks: Task[];
  searchTask: string;
  calendarRef: Date;

  // Setters
  setCalendarRef: (date: Date) => void;
  setSearchTask: (query: string) => void;

}


// 2. Accept those needs as parameters (props)
export function DynamicCalendar({dashboardStates}: {dashboardStates: any}) {

const {
    calendarRef,
    apiTasks,
    searchTask,
    
    setCalendarRef,
    setSearchTask,


} = dashboardStates;


    const today = new Date();
    const weekDates = getCalendarWeek(calendarRef);
    const displayMonth = MONTH_NAMES[calendarRef.getMonth()];
    const displayYear = calendarRef.getFullYear();

    const deadlineDates = apiTasks
    .filter((task: Task) => task.deadline && task.status !== "done") // filter only tasks that have deadlines and are not done
    .map((task: Task) => new Date(task.deadline!)); // extract deadline dates as Date objects for easier comparison with calendar dates


    return (

        <div style={{ ...CARD_STYLE_COLOR, width: "100%", padding: "12px 14px", minHeight: "86px", boxSizing: "border-box", gridColumn: "1" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "9px" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: COLOR.text }}>Calendar</span>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>

                {/* // Navigation Buttons - Left */}
                <button
                onClick={() => {
                    const prev = new Date(calendarRef); //get current calendarRef value
                    prev.setDate(prev.getDate() - 7); //go back 7 days
                    setCalendarRef(prev); //update calendarRef to trigger re-render with new week with every click
                }}

                style={{ ...buttonReset, color: COLOR.text, display: "flex", padding: "2px", borderRadius: "4px", transition: "background-color 0.15s" }}
                onMouseEnter={(mouseEvent) => { mouseEvent.currentTarget.style.backgroundColor = COLOR.panel; }}
                onMouseLeave={(mouseEvent) => { mouseEvent.currentTarget.style.backgroundColor = "transparent"; }}
                >
                <ChevronLeftIcon />
                </button>
                
                {/* // Navigation Buttons - Month & Year Display (Clickable to reset to current week) */}
                <button
                onClick={() => setCalendarRef(new Date())}
                style={{ ...buttonReset, fontSize: "11px", fontWeight: 600, color: COLOR.text, padding: "2px 4px", borderRadius: "4px", transition: "color 0.15s" }}
                onMouseEnter={(mouseEvent) => { mouseEvent.currentTarget.style.color = COLOR.primary; }}
                onMouseLeave={(mouseEvent) => { mouseEvent.currentTarget.style.color = COLOR.text; }}
                >
                {displayMonth} {displayYear}
                </button>

                {/* // Navigation Buttons - Right */}
                <button
                onClick={() => {
                    const next = new Date(calendarRef);
                    next.setDate(next.getDate() + 7);
                    setCalendarRef(next);
                }}
                style={{ ...buttonReset, color: COLOR.text, display: "flex", padding: "2px", borderRadius: "4px", transition: "background-color 0.15s" }}
                onMouseEnter={(mouseEvent) => { mouseEvent.currentTarget.style.backgroundColor = COLOR.panel; }}
                onMouseLeave={(mouseEvent) => { mouseEvent.currentTarget.style.backgroundColor = "transparent"; }}
                >
                <ChevronRightIcon />
                </button>
            </div>
            </div>

            {/* // Show Day Header and Dates */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", marginBottom: "5px" }}>
            {DAY_HEADERS.map((d) => ( 
                <span key={d} style={{ fontSize: "8px", fontWeight: 600, color: COLOR.muted }}>{d}</span>
            ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", textAlign: "center", gap: "3px" }}>


            {weekDates.map((dateObj, keyIterations) => {
                const isToday = isSameDay(dateObj, today); // helper to check if this date is today for styling purposes
                const hasDot = deadlineDates.some((deadline: Date) => isSameDay(deadline, dateObj)); // helper to check if this date has a deadline   
                return (
                <div key={keyIterations} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                    <div
                    onClick={() => {
                        const formatted = formatDate(dateObj.toISOString());
                        setSearchTask(searchTask === formatted ? "" : formatted);
                        document.getElementById("recent-tasks-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    style={{
                        width: "19px",
                        height: "19px",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        fontWeight: isToday ? 700 : 500,
                        color: isToday ? COLOR.primary : COLOR.text,
                        backgroundColor: isToday ? COLOR.primarySoft : "transparent",
                        cursor: "pointer",
                        transition: "all 0.15s",
                    }}
                    >
                    {dateObj.getDate()}
                    </div>
                    {hasDot && (
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", backgroundColor: COLOR.primary }} />
                    )}
                </div>
                );
            })}
            </div>
        </div>
        );

}
