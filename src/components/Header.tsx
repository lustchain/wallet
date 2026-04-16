import React, { useEffect, useState } from "react";
import { getStoredNetwork, saveStoredNetwork, getAllNetworks, type NetworkItem } from "../lib/network";
import LogoImage from "./LogoImage";

const BASE = import.meta.env.BASE_URL || "/";

export default function Header({
  walletName,
  theme = "dark",
  onOpenSettings,
}: {
  walletName: string;
  theme?: "dark" | "light";
  lang?: string;
  onOpenSettings?: () => void;
}) {
  const isLight = theme === "light";
  const [network, setNetwork] = useState<NetworkItem>(getStoredNetwork());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setNetwork(getStoredNetwork());
    window.addEventListener("wallet-network-updated", sync as EventListener);
    return () => window.removeEventListener("wallet-network-updated", sync as EventListener);
  }, []);

  return (
    <header
      className="wallet-header-shell"
      style={{
        borderBottom: `1px solid ${isLight ? "#f3d7e6" : "#2a0f20"}`,
        background: isLight ? "#fff7fb" : "#05050a",
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        <img
          src={`${BASE}brand-inri.png`}
          alt="Lust Wallet"
          style={{ width: 34, height: 34, objectFit: "contain", flexShrink: 0 }}
        />
        <div style={{ minWidth: 0 }}>
          <div style={{ color: isLight ? "#10131a" : "#ffffff", fontWeight: 900, fontSize: 18, lineHeight: 1.05 }}>
            Lust Wallet
          </div>
          <div className="wallet-ui-subtle" style={{ color: isLight ? "#475569" : "#cbd5e1", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {walletName || "LUST ecosystem wallet"}
          </div>
        </div>
      </div>

      <div className="wallet-header-actions" style={{ position: "relative" }}>
        <button
          className="wallet-network-trigger"
          onClick={() => setOpen((v) => !v)}
          type="button"
          style={{
            background: isLight ? "#fff0f7" : "rgba(215,46,126,.12)",
            border: "1px solid rgba(215,46,126,.35)",
            color: isLight ? "#10131a" : "#ffffff",
            maxWidth: 260,
          }}
        >
          <LogoImage src={network.logo} alt={network.name} kind="network" label={network.name} symbol={network.symbol} size={18} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {network.name} · {network.chainId}
          </span>
        </button>

        <button
          className="wallet-icon-btn"
          onClick={onOpenSettings}
          type="button"
          style={{
            background: isLight ? "#fff7fb" : "#0a0a0f",
            border: "1px solid rgba(215,46,126,.25)",
            color: isLight ? "#10131a" : "#ffffff",
          }}
        >
          ⚙
        </button>

        {open ? (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 10px)",
              right: 0,
              width: 260,
              borderRadius: 20,
              border: "1px solid rgba(215,46,126,.28)",
              background: isLight ? "#fff7fb" : "#09090f",
              boxShadow: "0 18px 40px rgba(0,0,0,.28)",
              padding: 12,
              zIndex: 20,
              display: "grid",
              gap: 8,
            }}
          >
            {getAllNetworks().map((item) => (
              <button
                key={String(item.chainId)}
                type="button"
                onClick={() => {
                  saveStoredNetwork(item);
                  setNetwork(item);
                  setOpen(false);
                  window.dispatchEvent(new Event("wallet-network-updated"));
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 14,
                  border: "1px solid rgba(215,46,126,.16)",
                  background: Number(item.chainId) === Number(network.chainId) ? "rgba(215,46,126,.14)" : "transparent",
                  color: isLight ? "#10131a" : "#ffffff",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <LogoImage src={item.logo} alt={item.name} kind="network" label={item.name} symbol={item.symbol} size={20} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 800 }}>{item.name}</div>
                  <div className="wallet-ui-subtle" style={{ color: isLight ? "#475569" : "#cbd5e1" }}>
                    Chain ID {item.chainId}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}
