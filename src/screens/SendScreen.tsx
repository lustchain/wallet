import React from "react";
import ScreenCard from "../components/ScreenCard";
import SectionTitle from "../components/SectionTitle";
import StatusPill from "../components/StatusPill";

export default function SendScreen({
  theme = "dark",
  address = "",
}: {
  theme?: "dark" | "light";
  lang?: string;
  address?: string;
  privateKey?: string;
}) {
  const isLight = theme === "light";

  return (
    <div className="wallet-screen-stack wallet-screen-mobile-tight">
      <ScreenCard theme={theme}>
        <SectionTitle
          title="Send"
          subtitle="Send flow for LST and future supported assets."
          theme={theme}
        />
        <div className="wallet-action-row">
          <StatusPill theme={theme} tone="primary">LUST</StatusPill>
          <StatusPill theme={theme}>Wallet</StatusPill>
        </div>
      </ScreenCard>

      <ScreenCard theme={theme}>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ color: isLight ? "#10131a" : "#ffffff", fontSize: 24, fontWeight: 900, lineHeight: 1.08 }}>
            Send module ready for Lust Wallet.
          </div>
          <div className="wallet-ui-subtle" style={{ color: isLight ? "#475569" : "#cbd5e1" }}>
            This screen is now a clean LUST placeholder. You can later connect the full send logic for LST, wLST, and supported tokens.
          </div>
          <div style={{ padding: 14, borderRadius: 18, border: `1px solid ${isLight ? "#f3d7e6" : "#3a1630"}`, background: isLight ? "#fff7fb" : "#0a0a0f", color: "rgb(215,46,126)", fontWeight: 800 }}>
            Active wallet: {address || "No wallet unlocked"}
          </div>
        </div>
      </ScreenCard>
    </div>
  );
}
