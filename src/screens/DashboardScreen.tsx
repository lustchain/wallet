import React, { useEffect, useMemo, useState } from "react";
import { getDefaultTokensForNetwork, loadAllBalances, type TokenItem } from "../lib/inri";
import { getStoredNetwork, type NetworkItem } from "../lib/network";
import { tr } from "../i18n/translations";
import ScreenCard from "../components/ScreenCard";
import SectionTitle from "../components/SectionTitle";
import ActionButton from "../components/ActionButton";
import EmptyState from "../components/EmptyState";
import StatusPill from "../components/StatusPill";
import LogoImage from "../components/LogoImage";

type DashboardToken = TokenItem & { balance: string };
type CustomToken = DashboardToken & { networkKey?: string };
const CUSTOM_TOKENS_KEY = "wallet_custom_tokens";

function readCustomTokens() {
  try {
    const saved = localStorage.getItem(CUSTOM_TOKENS_KEY);
    if (!saved) return [] as CustomToken[];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as CustomToken[]) : [];
  } catch {
    return [] as CustomToken[];
  }
}

export default function DashboardScreen({ setTab, theme = "dark", lang = "en", address = "" }: { setTab: (tab: any) => void; theme?: "dark" | "light"; lang?: string; address?: string; }) {
  const [balance, setBalance] = useState("0.000000");
  const [network, setNetwork] = useState<NetworkItem>(getStoredNetwork());
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({});
  const isLight = theme === "light";

  const homeTokens = useMemo(() => {
    const defaults = getDefaultTokensForNetwork(network.key);
    const custom = readCustomTokens().filter((item) => !item.networkKey || item.networkKey === network.key);
    const merged = [...defaults, ...custom] as DashboardToken[];
    return merged.map((token) => ({ ...token, balance: tokenBalances[token.symbol] || "0.000000" }));
  }, [network.key, tokenBalances]);

  useEffect(() => {
    let active = true;
    async function loadHomeData() {
      try {
        const balances = await loadAllBalances(address || "", homeTokens, network.key);
        if (!active) return;
        setBalance(balances[network.symbol] || balances[homeTokens[0]?.symbol || ""] || "0.000000");
        setTokenBalances(balances);
      } catch {
        if (!active) return;
        setBalance("0.000000");
        setTokenBalances({});
      }
    }
    loadHomeData();
    const timer = setInterval(loadHomeData, 8000);
    const sync = () => setNetwork(getStoredNetwork());
    window.addEventListener("storage", sync);
    window.addEventListener("wallet-network-updated", sync as EventListener);
    return () => {
      active = false;
      clearInterval(timer);
      window.removeEventListener("storage", sync);
      window.removeEventListener("wallet-network-updated", sync as EventListener);
    };
  }, [address, network.key, homeTokens.length, network.symbol]);

  return (
    <div className="wallet-screen-stack wallet-screen-mobile-tight">
      <ScreenCard theme={theme} className="wallet-home-hero" style={{ background: isLight ? "#fff7fb" : "#09090f", borderColor: isLight ? "#f3d7e6" : "#2a0f20" }}>
        <SectionTitle
          title={tr(lang, "dashboard_total_balance")}
          subtitle={address ? address : "Wallet not available yet"}
          theme={theme}
          compact
          actions={<StatusPill theme={theme} tone="primary">{network.symbol}</StatusPill>}
        />

        <div style={{ fontSize: 42, fontWeight: 900, color: isLight ? "#10131a" : "#ffffff", lineHeight: 1.02, wordBreak: "break-word" }}>
          {balance} {network.symbol}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 999, border: "1px solid rgba(215,46,126,.25)", background: isLight ? "#fff0f7" : "rgba(215,46,126,.10)", color: isLight ? "#10131a" : "#ffffff", fontWeight: 800, fontSize: 13 }}>
            <LogoImage src={network.logo} alt={network.name} kind="network" label={network.name} symbol={network.symbol} size={18} />
            <span>{network.name}</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span>{network.chainId}</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginTop: 18 }}>
          <ActionButton onClick={() => setTab("send")} theme={theme} tone="primary" compact>{tr(lang, "dashboard_send")}</ActionButton>
          <ActionButton onClick={() => setTab("receive")} theme={theme} compact>{tr(lang, "dashboard_receive")}</ActionButton>
          <ActionButton onClick={() => setTab("staking")} theme={theme} compact>Staking</ActionButton>
          <ActionButton onClick={() => setTab("activity")} theme={theme} tone="ghost" compact>Activity</ActionButton>
        </div>
      </ScreenCard>

      <ScreenCard theme={theme} style={{ background: isLight ? "#fff7fb" : "#09090f", borderColor: isLight ? "#f3d7e6" : "#2a0f20" }}>
        <SectionTitle title={tr(lang, "nav_tokens")} subtitle={network.name} theme={theme} actions={<ActionButton onClick={() => setTab("tokens")} theme={theme} compact>{tr(lang, "nav_tokens")}</ActionButton>} />

        {!homeTokens.length ? (
          <EmptyState theme={theme} title="No tokens yet" description="Add custom assets or switch network to populate your portfolio." />
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {homeTokens.slice(0, 6).map((token) => (
              <div key={token.symbol + (token.address || "native")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: 14, borderRadius: 18, border: `1px solid ${isLight ? "#f3d7e6" : "#2a0f20"}`, background: isLight ? "#ffffff" : "#05050a" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                  <LogoImage src={token.logo} alt={token.symbol} kind="token" label={token.symbol} symbol={token.symbol} size={42} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 900, color: isLight ? "#10131a" : "#ffffff", fontSize: 16 }}>{token.symbol}</div>
                    <div className="wallet-ui-subtle" style={{ color: isLight ? "#6b7280" : "#aeb4c2" }}>{token.subtitle}</div>
                  </div>
                </div>
                <div style={{ fontWeight: 900, color: isLight ? "#10131a" : "#ffffff", fontSize: 16 }}>{token.balance}</div>
              </div>
            ))}
          </div>
        )}
      </ScreenCard>
    </div>
  );
}
