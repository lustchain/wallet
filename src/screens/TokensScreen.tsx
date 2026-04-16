import React from "react";
import ScreenCard from "../components/ScreenCard";
import SectionTitle from "../components/SectionTitle";
import StatusPill from "../components/StatusPill";

export default function TokensScreen({
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
          title="Tokens"
          subtitle="LST, wLST and future token management."
          theme={theme}
        />
        <div className="wallet-action-row">
          <StatusPill theme={theme} tone="primary">LST</StatusPill>
          <StatusPill theme={theme}>wLST</StatusPill>
        </div>
      </ScreenCard>

      <ScreenCard theme={theme}>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ color: isLight ? "#10131a" : "#ffffff", fontSize: 24, fontWeight: 900 }}>
            Token portfolio module ready for LUST
          </div>
          <div className="wallet-ui-subtle" style={{ color: isLight ? "#475569" : "#cbd5e1" }}>
            This screen can later show balances, token lists, custom assets, and contract-integrated items for the LUST ecosystem.
          </div>
          <div style={{ padding: 14, borderRadius: 18, border: `1px solid ${isLight ? "#f3d7e6" : "#3a1630"}`, background: isLight ? "#fff7fb" : "#0a0a0f", color: "rgb(215,46,126)", fontWeight: 800 }}>
            Wallet: {address || "No wallet unlocked"}
          </div>
        </div>
      </ScreenCard>
    </div>
  );
}
