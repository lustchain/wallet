import React from "react";
import ScreenCard from "../components/ScreenCard";
import SectionTitle from "../components/SectionTitle";
import StatusPill from "../components/StatusPill";

export default function SwapScreen({
  theme = "dark",
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
          title="Swap"
          subtitle="Swap interface reserved for future LUST integrations."
          theme={theme}
        />
        <div className="wallet-action-row">
          <StatusPill theme={theme} tone="primary">LUST</StatusPill>
          <StatusPill theme={theme}>Coming soon</StatusPill>
        </div>
      </ScreenCard>

      <ScreenCard theme={theme}>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ color: isLight ? "#10131a" : "#ffffff", fontSize: 24, fontWeight: 900 }}>
            Swap module cleaned for LUST
          </div>
          <div className="wallet-ui-subtle" style={{ color: isLight ? "#475569" : "#cbd5e1" }}>
            The old chain-specific swap flow is not active here. You can later connect the real LUST routing and liquidity logic.
          </div>
        </div>
      </ScreenCard>
    </div>
  );
}
