import React from "react";

type Tone = "success" | "primary" | "warning" | "danger" | "neutral";

export default function StatusPill({
  children,
  tone = "neutral",
  theme = "dark",
}: {
  children: React.ReactNode;
  tone?: Tone;
  theme?: "dark" | "light";
}) {
  const isLight = theme === "light";

  const styles: Record<Tone, React.CSSProperties> = {
    success: { background: isLight ? "#fff0f7" : "rgba(215,46,126,.12)", color: "rgb(215,46,126)", border: "1px solid rgba(215,46,126,.28)" },
    primary: { background: isLight ? "rgb(215,46,126)" : "rgb(215,46,126)", color: "#ffffff", border: "1px solid rgba(215,46,126,.30)" },
    warning: { background: isLight ? "#fff0f7" : "rgba(215,46,126,.12)", color: "rgb(215,46,126)", border: "1px solid rgba(215,46,126,.28)" },
    danger: { background: isLight ? "#fff0f7" : "rgba(215,46,126,.12)", color: "rgb(215,46,126)", border: "1px solid rgba(215,46,126,.28)" },
    neutral: { background: isLight ? "#fff7fb" : "#0a0a0f", color: isLight ? "#10131a" : "#ffffff", border: "1px solid rgba(215,46,126,.18)" },
  };

  return (
    <span className="wallet-status-pill" style={{ ...styles[tone], fontWeight: 800 }}>
      {children}
    </span>
  );
}
