export const COLOR = {
  primary: "#008B1F",
  primaryHover: "#007A1B",
  primarySoft: "#9CFFAD",
  primaryPale: "#ECFFF0",
  border: "#D9D9D9",
  borderSoft: "#ECECEC",
  surface: "#FFFFFF",
  panel: "#F5F5F5",
  text: "#1E1E1E",
  muted: "#8A8A8A",
  mutedDark: "#666666",
  danger: "#FF6B76",
  dangerSoft: "#FFCDD2",
};

export const GUEST_ENERGY_SUMMARY = {
  current_energy: 100,
  max_energy: 100,
  is_critical_energy: false,
};

export const CARD_STYLE_COLOR = {
  backgroundColor: COLOR.surface,
  borderRadius: "8px",
  border: `1px solid ${COLOR.border}`,
} as const;

export const buttonReset = {
  border: "none",
  background: "none",
  fontFamily: "inherit",
  cursor: "pointer",
} as const;