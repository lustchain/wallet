import React from "react";
import ScreenCard from "../components/ScreenCard";
import SectionTitle from "../components/SectionTitle";
import StatusPill from "../components/StatusPill";

export default function NFTsScreen({
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
          title="NFTs"
          subtitle="NFT and creator assets for the future LUST ecosystem."
          theme={theme}
        />
        <div className="wallet-action-row">
          <StatusPill theme={theme} tone="primary">LUST</StatusPill>
          <StatusPill theme={theme}>Creator Economy</StatusPill>
        </div>
      </ScreenCard>

      <ScreenCard theme={theme}>
        <div style={{ display: "grid", gap: 12 }}>
          <div style={{ color: isLight ? "#10131a" : "#ffffff", fontSize: 24, fontWeight: 900 }}>
            NFT area reserved for future LUST marketplace integrations
          </div>
          <div className="wallet-ui-subtle" style={{ color: isLight ? "#475569" : "#cbd5e1" }}>
            This screen is intentionally clean so you can later plug collections, media, creator assets and access passes.
          </div>
        </div>
      </ScreenCard>
    </div>
  );
}
