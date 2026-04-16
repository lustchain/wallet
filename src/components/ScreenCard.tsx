import React from "react";

export default function ScreenCard({
  theme = "dark",
  children,
  padding = 16,
  className = "",
  style,
}: {
  theme?: "dark" | "light";
  children: React.ReactNode;
  padding?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const isLight = theme === "light";
  return (
    <section
      className={`wallet-ui-card ${className}`.trim()}
      style={{
        background: isLight ? "#ffffff" : "#09090f",
        borderColor: isLight ? "#f3d7e6" : "#2a0f20",
        padding,
        ...style,
      }}
    >
      {children}
    </section>
  );
}
