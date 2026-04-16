import React from "react";
import ScreenCard from "../components/ScreenCard";
import SectionTitle from "../components/SectionTitle";
import StatusPill from "../components/StatusPill";

export default function ReceiveScreen({
  theme = "dark",
  address = "",
}: {
  theme?: "dark" | "light";
  lang?: string;
  address?: string;
}) {
  const isLight = theme === "light";

  return (
    <div className="wallet-screen-stack wallet-screen-mobile-tight">
      <ScreenCard theme={theme}>
        <SectionTitle
          title="Receive"
          subtitle="Receive LST and future supported assets."
          theme={theme}
        />
        <div className="wallet-action-row">
          <StatusPill theme={theme} tone="primary">LUST</StatusPill>
          <StatusPill theme={theme}>Address</StatusPill>
        </div>
      </ScreenCard>

      <ScreenCard theme={theme}>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ color: isLight ? "#10131a" : "#ffffff", fontSize: 24, fontWeight: 900, lineHeight: 1.08 }}>
            Your Lust Wallet receive address
          </div>
          <div style={{ padding: 14, borderRadius: 18, border: `1px solid ${isLight ? "#f3d7e6" : "#3a1630"}`, background: isLight ? "#fff7fb" : "#0a0a0f", color: isLight ? "#10131a" : "#ffffff", fontWeight: 700, overflowWrap: "anywhere" }}>
            {address || "No wallet unlocked"}
          </div>
          <div className="wallet-ui-subtle" style={{ color: isLight ? "#475569" : "#cbd5e1" }}>
            QR and share tools can be added later without changing the wallet shell.
          </div>
        </div>
      </ScreenCard>
    </div>
  );
}
