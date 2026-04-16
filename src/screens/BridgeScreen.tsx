import React from "react";
import ScreenCard from "../components/ScreenCard";
import SectionTitle from "../components/SectionTitle";
import StatusPill from "../components/StatusPill";

export default function BridgeScreen({ theme = "dark" }: { theme?: "dark" | "light"; lang?: string; address?: string; privateKey?: string; setTab?: (tab: any) => void; }) {
  const isLight = theme === "light";
  return (
    <div className="wallet-screen-stack wallet-screen-mobile-tight">
      <ScreenCard theme={theme}>
        <SectionTitle title="Bridge" subtitle="Cross-chain tools will be added to Lust Wallet later." theme={theme} />
        <div className="wallet-action-row">
          <StatusPill theme={theme} tone="primary">LUST</StatusPill>
          <StatusPill theme={theme}>Coming soon</StatusPill>
        </div>
      </ScreenCard>
      <ScreenCard theme={theme}>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ color: isLight ? "#10131a" : "#ffffff", fontSize: 24, fontWeight: 900, lineHeight: 1.08 }}>
            Bridge module ready for future LUST integrations.
          </div>
          <div className="wallet-ui-subtle" style={{ color: isLight ? "#475569" : "#cbd5e1" }}>
            The old chain-specific bridge flow was removed from this stage so you can rebrand the wallet cleanly for LUST. You can connect your own bridge contracts later without rebuilding the wallet shell.
          </div>
          <div style={{ padding: 14, borderRadius: 18, border: `1px solid ${isLight ? "#f3d7e6" : "#3a1630"}`, background: isLight ? "#fff7fb" : "#0a0a0f", color: "rgb(215,46,126)", fontWeight: 800 }}>
            No old bridge logic remains active in this screen.
          </div>
        </div>
      </ScreenCard>
    </div>
  );
}
