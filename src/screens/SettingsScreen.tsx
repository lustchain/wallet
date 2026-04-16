import React from "react";
import ScreenCard from "../components/ScreenCard";
import SectionTitle from "../components/SectionTitle";
import StatusPill from "../components/StatusPill";

export default function SettingsScreen({
  theme = "dark",
  setTheme,
  lang = "en",
  setLang,
  security,
}: {
  theme?: "dark" | "light";
  setTheme?: (theme: "dark" | "light") => void;
  lang?: string;
  setLang?: (lang: string) => void;
  security?: any;
}) {
  const isLight = theme === "light";

  return (
    <div className="wallet-screen-stack wallet-screen-mobile-tight">
      <ScreenCard theme={theme}>
        <SectionTitle
          title="Settings"
          subtitle="Theme, language and security controls for Lust Wallet."
          theme={theme}
        />
        <div className="wallet-action-row">
          <StatusPill theme={theme} tone="primary">LUST Wallet</StatusPill>
          <StatusPill theme={theme}>{theme}</StatusPill>
        </div>
      </ScreenCard>

      <ScreenCard theme={theme}>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={() => setTheme?.("dark")}
              style={{
                padding: "10px 14px",
                borderRadius: 14,
                border: "1px solid rgba(215,46,126,.35)",
                background: theme === "dark" ? "rgb(215,46,126)" : (isLight ? "#fff7fb" : "#0a0a0f"),
                color: "#fff",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Dark
            </button>
            <button
              onClick={() => setTheme?.("light")}
              style={{
                padding: "10px 14px",
                borderRadius: 14,
                border: "1px solid rgba(215,46,126,.35)",
                background: theme === "light" ? "rgb(215,46,126)" : (isLight ? "#fff7fb" : "#0a0a0f"),
                color: "#fff",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Light
            </button>
            <button
              onClick={() => setLang?.(lang === "en" ? "pt-BR" : "en")}
              style={{
                padding: "10px 14px",
                borderRadius: 14,
                border: "1px solid rgba(215,46,126,.35)",
                background: isLight ? "#fff7fb" : "#0a0a0f",
                color: isLight ? "#10131a" : "#ffffff",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Toggle Language
            </button>
          </div>

          <div className="wallet-ui-subtle" style={{ color: isLight ? "#475569" : "#cbd5e1" }}>
            Current language: {lang}
          </div>

          <div style={{ padding: 14, borderRadius: 18, border: `1px solid ${isLight ? "#f3d7e6" : "#3a1630"}`, background: isLight ? "#fff7fb" : "#0a0a0f" }}>
            <div style={{ color: "rgb(215,46,126)", fontWeight: 900, marginBottom: 8 }}>Security snapshot</div>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap", color: isLight ? "#10131a" : "#ffffff", fontSize: 12 }}>
{JSON.stringify(security || {}, null, 2)}
            </pre>
          </div>
        </div>
      </ScreenCard>
    </div>
  );
}
