import React from "react";
import ScreenCard from "../components/ScreenCard";
import SectionTitle from "../components/SectionTitle";
import StatusPill from "../components/StatusPill";

export default function WalletConnectScreen({
  theme = "dark",
}: {
  theme?: "dark" | "light";
  lang?: string;
}) {
  const isLight = theme === "light";

  return (
    <div className="wallet-screen-stack wallet-screen-mobile-tight">
      <ScreenCard theme={theme}>
        <SectionTitle
          title="WalletConnect"
          subtitle="Pairing and session management for Lust Wallet."
          theme={theme}
        />
        <div className="wallet-action-row">
          <StatusPill theme={theme} tone="primary">WalletConnect</StatusPill>
          <StatusPill theme={theme}>LUST</StatusPill>
        </div>
      </ScreenCard>

      <ScreenCard theme={theme}>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ color: isLight ? "#10131a" : "#ffffff", fontSize: 24, fontWeight: 900 }}>
            WalletConnect screen ready
          </div>
          <div className="wallet-ui-subtle" style={{ color: isLight ? "#475569" : "#cbd5e1" }}>
            Pairing, QR flow and session management can be expanded here while keeping the wallet shell stable.
          </div>
        </div>
      </ScreenCard>
    </div>
  );
}
