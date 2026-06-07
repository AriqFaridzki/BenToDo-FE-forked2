import { COLOR } from "../../ui/color";

export function BackgroundConfig() {
    return (
        <div style={
            { 
            display: "flex", 
            minHeight: "100vh", 
            backgroundColor: 
            COLOR.surface, 
            color: COLOR.text, 
            fontFamily: "inherit" }}>

        </div>
    )
}