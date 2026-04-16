import React, { useEffect, useMemo, useState } from "react";
import {
  getDefaultTokensForNetwork,
  loadAllBalances,
  type TokenItem,
  shortAddress,
} from "../lib/inri";
import { getStoredNetwork, type NetworkItem } from "../lib/network";
import ScreenCard from "../components/ScreenCard";
import SectionTitle from "../components/SectionTitle";
import ActionButton from "../components/ActionButton";
import EmptyState from "../components/EmptyState";
import StatusPill from "../components/StatusPill";
import LogoImage from "../components/LogoImage";
import { tr } from "../i18n/translations";

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

export default function DashboardScreen({
  setTab,
  theme = "dark",
  lang = "en",
  address = "",
}: {
  setTab: (tab: any) => void;
  theme?: "dark" | "light";
  lang?: string;
  address?: string;
}) {
  const [balance, setBalance] = useState("0.000000");
  const [network, setNetwork] = useState<NetworkItem>(getStoredNetwork());
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const isLight = theme === "light";

  const homeTokens = useMemo(() => {
    const defaults = getDefaultTokensForNetwork(network.key);
    const custom = readCustomTokens().filter(
      (item) => !item.networkKey || item.networkKey === network.key
    );
    const merged = [...defaults, ...custom] as DashboardToken[];

    return merged.map((token) => ({
      ...token,
      balance: tokenBalances[token.symbol] || "0.000000",
    }));
  }, [network.key, tokenBalances]);

  useEffect(() => {
    const sync = () => setNetwork(getStoredNetwork());
    window.addEventListener("wallet-network-updated", sync as EventListener);
    return () => window.removeEventListener("wallet-network-updated", sync as EventListener);
  }, []);

  useEffect(() => {
    let active = true;

    async function loadHomeData() {
      try {
        const balances = await loadAllBalances(address || "", homeTokens, network.key);
        if (!active) return;

        setBalance(
          balances[network.symbol] || balances[homeTokens[0]?.symbol || ""] || "0.000000"
        );
        setTokenBalances(balances);
      } catch {
        if (!active) return;
        setBalance("0.000000");
        setTokenBalances({});
      }
    }

    loadHomeData();
    const timer = setInterval(loadHomeData, 8000);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [address, homeTokens.length, network.key, network.symbol]);

  const topTokens = homeTokens.slice(0, 6);

  async function copyAddress() {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <div className="wallet-screen-stack wallet-screen-mobile-tight" style={{ display: "grid", gap: 14 }}>
      <ScreenCard
        theme={theme}
        className="wallet-home-hero"
        style={{
          background: isLight ? "#fff7fb" : "#07070c",
          borderColor: isLight ? "#f3d7e6" : "rgba(215,46,126,.14)",
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: isLight
            ? "0 14px 34px rgba(215,46,126,.08)"
            : "0 16px 42px rgba(0,0,0,.28)",
        }}
      >
        <div style={{ display: "grid", gap: 14 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <SectionTitle
                title="Portfolio balance"
                subtitle={address ? shortAddress(address) : "Wallet not available yet"}
                theme={theme}
                compact
              />
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <StatusPill theme={theme} tone="primary">
                {network.symbol}
              </StatusPill>

              <button
                onClick={copyAddress}
                style={{
                  border: "1px solid rgba(215,46,126,.18)",
                  background: isLight ? "#fff0f7" : "#0d0d12",
                  color: isLight ? "#10131a" : "#ffffff",
                  borderRadius: 999,
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontWeight: 800,
                  fontSize: 12,
                }}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div
            style={{
              fontSize: 46,
              fontWeight: 900,
              color: isLight ? "#10131a" : "#ffffff",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              wordBreak: "break-word",
            }}
          >
            {balance} {network.symbol}
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 14px",
              borderRadius: 999,
              border: "1px solid rgba(215,46,126,.18)",
              background: isLight ? "#fff0f7" : "rgba(215,46,126,.08)",
              color: isLight ? "#10131a" : "#ffffff",
              fontWeight: 800,
              width: "fit-content",
              maxWidth: "100%",
            }}
          >
            <LogoImage
              src={network.logo}
              alt={network.name}
              kind="network"
              label={network.name}
              symbol={network.symbol}
              size={20}
            />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {network.name}
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: 10,
            }}
          >
            <ActionButton onClick={() => setTab("send")} theme={theme} tone="primary" compact>
              Send
            </ActionButton>

            <ActionButton onClick={() => setTab("receive")} theme={theme} compact>
              Receive
            </ActionButton>

            <ActionButton onClick={() => setTab("activity")} theme={theme} compact>
              Rewards
            </ActionButton>

            <ActionButton onClick={() => setTab("staking")} theme={theme} tone="ghost" compact>
              Staking
            </ActionButton>
          </div>
        </div>
      </ScreenCard>

      <ScreenCard
        theme={theme}
        style={{
          background: isLight ? "#fff7fb" : "#07070c",
          borderColor: isLight ? "#f3d7e6" : "rgba(215,46,126,.14)",
          borderRadius: 28,
          boxShadow: isLight
            ? "0 14px 34px rgba(215,46,126,.08)"
            : "0 16px 42px rgba(0,0,0,.28)",
        }}
      >
        <SectionTitle
          title={tr(lang, "nav_tokens")}
          subtitle={network.name}
          theme={theme}
          actions={
            <ActionButton onClick={() => setTab("tokens")} theme={theme} compact>
              Manage
            </ActionButton>
          }
        />

        {!topTokens.length ? (
          <EmptyState
            theme={theme}
            title="No tokens yet"
            description="Add custom assets or switch network to populate your portfolio."
          />
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {topTokens.map((token) => (
              <button
                key={token.symbol + (token.address || "native")}
                onClick={() => setTab("tokens")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  width: "100%",
                  padding: 14,
                  borderRadius: 20,
                  border: `1px solid ${
                    isLight ? "#f3d7e6" : "rgba(215,46,126,.14)"
                  }`,
                  background: isLight ? "#ffffff" : "#05050a",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                  <LogoImage
                    src={token.logo}
                    alt={token.symbol}
                    kind="token"
                    label={token.symbol}
                    symbol={token.symbol}
                    size={44}
                  />

                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 900,
                        color: isLight ? "#10131a" : "#ffffff",
                        fontSize: 18,
                        lineHeight: 1.1,
                      }}
                    >
                      {token.symbol}
                    </div>
                    <div
                      className="wallet-ui-subtle"
                      style={{
                        color: isLight ? "#607086" : "#9eabc0",
                        fontSize: 13,
                        lineHeight: 1.4,
                      }}
                    >
                      {token.subtitle}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    fontWeight: 900,
                    color: isLight ? "#10131a" : "#ffffff",
                    fontSize: 18,
                    lineHeight: 1.1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {token.balance}
                </div>
              </button>
            ))}
          </div>
        )}
      </ScreenCard>
    </div>
  );
}
