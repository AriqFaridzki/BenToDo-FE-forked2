// ─── TemplateDetailView COMPONENT ────────────────────────────────────────────────────────
import { TemplateViewOption } from "@/app/dashboard/typesAndMaps";
import { 
    ArrowLeftIcon, 
    CalendarSmIcon, 
    DownloadSquareIcon, 
    MailIcon, 
    ShareIcon, 
    SubtaskIcon, 
    UsersIcon, 
    UsersUpIcon, 
    WrenchIcon } from "../../ui/icons";

import { ViewCard } from "../../../dashboard/typesAndMaps";
    


// 1. Define exactly what this component needs from the outside world

interface TemplateDetailViewProps {
    //Setters
    setSelectedTemplateId: (id: number | null) => void;
    setTemplateView: (view: TemplateViewOption) => void;
    
    //Values
    selectedCard: ViewCard; // Ideally, you would define a proper type/interface for this
    handleUseCard: (card: ViewCard) => Promise<void>;
    setNotice: (message: string) => void;

}

// 2. Accept those needs as parameters (props)
export function TemplateDetailView({dashboardStates}: {dashboardStates: any}) {

const {
    
    setSelectedTemplateId,
    setTemplateView,

    selectedCard,
    handleUseCard,
    setNotice

} = dashboardStates;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                      <button
                        onClick={() => {
                          setSelectedTemplateId(null);
                          setTemplateView("list");
                        }}
                        style={{
                          display: "flex", alignItems: "center", gap: "8px",
                          background: "none", border: "none", cursor: "pointer",
                          color: "#111827", fontSize: "14px", fontWeight: 500, fontFamily: "inherit", alignSelf: "flex-start"
                        }}
                      >
                        <ArrowLeftIcon /> Back
                      </button>
        
                      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", flexWrap: "wrap" }}>
                        {/* Left Side: Detail & Tasks */}
                        <div style={{ flex: 1, minWidth: "400px", display: "flex", flexDirection: "column", gap: "24px" }}>
        
                          {/* Top Card */}
                          <div style={{
                            backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0",
                            padding: "32px", position: "relative"
                          }}>
                            <button style={{
                              position: "absolute", top: "24px", right: "24px",
                              width: "36px", height: "36px", borderRadius: "8px",
                              border: "1px solid #e5e7eb", backgroundColor: "#ffffff",
                              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#111827"
                            }}>
                              <ShareIcon />
                            </button>
        
                            <div style={{ display: "flex", gap: "20px" }}>
                              <div style={{
                                width: "80px", height: "80px", borderRadius: "12px", backgroundColor: "#e0e7ff",
                                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                              }}>
                                <UsersIcon />
                              </div>
        
                              <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                                  <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#111827", margin: 0 }}>{selectedCard.title}</h2>
                                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#6b7280", backgroundColor: "#f3f4f6", padding: "4px 10px", borderRadius: "999px", letterSpacing: "0.04em" }}>{selectedCard.level}</span>
                                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#4f46e5", backgroundColor: "#e0e7ff", padding: "4px 10px", borderRadius: "999px", letterSpacing: "0.04em" }}>WORK</span>
                                </div>
        
                                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4b5563", backgroundColor: "#f3f4f6", padding: "6px 12px", borderRadius: "6px", fontWeight: 500 }}>
                                    <SubtaskIcon /> {selectedCard.subtasks} Subtasks
                                  </span>
                                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#4b5563", backgroundColor: "#f3f4f6", padding: "6px 12px", borderRadius: "6px", fontWeight: 500 }}>
                                    <CalendarSmIcon /> No due date
                                  </span>
                                </div>
        
                                <p style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.6, margin: 0, maxWidth: "340px" }}>
                                  {selectedCard.desc}
                                </p>
                              </div>
                            </div>
                          </div>
        
                          {/* Tasks List Card */}
                          <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: "0 0 24px" }}>Preview Daftar Task</h3>
        
                            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

                                
                              {(selectedCard.previewItems?.map((item: ViewCard) => item.title) ?? ["Belum ada preview task"]).map((task: string, index:number) => ( 

                                <div key={index} style={{ display: "flex", alignItems: "center", gap: "16px" }}>

                                  <div style={{
                                    width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#16a34a",
                                    color: "#ffffff", fontSize: "12px", fontWeight: 700,
                                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                                  }}>

                                    {index + 1}
                                  </div>
                                  <span style={{ fontSize: "14px", color: "#374151", fontWeight: 500 }}>{task}</span>
                                </div>
                              ))}

                            </div>
                          </div>
                        </div>
        
                        {/* Right Side: Template Information */}
                        <div style={{ width: "320px", backgroundColor: "#ffffff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px" }}>
                          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#111827", margin: "0 0 32px" }}>Template Information</h3>
        
                          <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "40px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#111827" }}>
                                <WrenchIcon />
                                <span style={{ fontSize: "13px", fontWeight: 500, color: "#6b7280" }}>Made by</span>
                              </div>
                              <span style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>BenToDo Official</span>
                            </div>
        
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#111827" }}>
                                <MailIcon />
                                <span style={{ fontSize: "13px", fontWeight: 500, color: "#6b7280" }}>Category</span>
                              </div>
                              <span style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>Work</span>
                            </div>
        
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#111827" }}>
                                <UsersUpIcon />
                                <span style={{ fontSize: "13px", fontWeight: 500, color: "#6b7280" }}>Used</span>
                              </div>
                              <span style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>{selectedCard.subtasks} tasks</span>
                            </div>
        
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#111827" }}>
                                <DownloadSquareIcon />
                                <span style={{ fontSize: "13px", fontWeight: 500, color: "#6b7280" }}>Last updated</span>
                              </div>
                              <span style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}>Backend API</span>
                            </div>
                          </div>
        
                          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <button
                              onClick={() => {
                                void handleUseCard(selectedCard);
                              }}
                              style={{
                                width: "100%", height: "40px", borderRadius: "8px", backgroundColor: "#16a34a",
                                color: "#ffffff", fontSize: "13px", fontWeight: 600, border: "none",
                                cursor: "pointer", fontFamily: "inherit", transition: "background-color 0.15s"
                              }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#15803d"; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#16a34a"; }}
                            >
                              Use Template
                            </button>
                            <button
                              onClick={() => setNotice("Fitur private custom template perlu endpoint backend tambahan.")}
                              style={{
                                width: "100%", height: "40px", borderRadius: "8px", backgroundColor: "#ffffff",
                                color: "#111827", fontSize: "13px", fontWeight: 600, border: "1px solid #e5e7eb",
                                cursor: "pointer", fontFamily: "inherit", transition: "background-color 0.15s"
                              }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f9fafb"; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#ffffff"; }}
                            >
                              Save Template to Private
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
    );
}
