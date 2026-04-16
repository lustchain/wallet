import React, { useEffect, useRef, useState } from "react";
import {
  getStoredNetwork,
  saveStoredNetwork,
  getAllNetworks,
  type NetworkItem,
} from "../lib/network";
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
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sync = () => setNetwork(getStoredNetwork());
    window.addEventListener("wallet-network-updated", sync as EventListener);
    return () => window.removeEventListener("wallet-network-updated", sync as EventListener);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header
      className="wallet-header-shell"
      style={{
        borderBottom: `1px solid ${isLight ? "#f3d7e6" : "rgba(215,46,126,.16)"}`,
        background: isLight ? "#fff7fb" : "#05050a",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        <img
          src={`${BASE}brand-lust.png`}
          alt="Lust Wallet"
          style={{ width: 30, height: 30, objectFit: "contain", flexShrink: 0 }}
        />
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              color: isLight ? "#10131a" : "#ffffff",
              fontWeight: 900,
              fontSize: 18,
              lineHeight: 1.05,
            }}
          >
            Lust Wallet
          </div>
          <div
            className="wallet-ui-subtle"
            style={{
              color: isLight ? "#475569" : "#cbd5e1",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {walletName || "LUST ecosystem wallet"}
          </div>
        </div>
      </div>

      <div className="wallet-header-actions" style={{ position: "relative" }} ref={wrapRef}>
        <button
          className="wallet-network-trigger"
          onClick={() => setOpen((v) => !v)}
          type="button"
          style={{
            background: isLight ? "#fff0f7" : "rgba(215,46,126,.10)",
            border: "1px solid rgba(215,46,126,.28)",
            color: isLight ? "#10131a" : "#ffffff",
            maxWidth: 250,
          }}
        >
          <LogoImage
            src={network.logo}
            alt={network.name}
            kind="network"
            label={network.name}
            symbol={network.symbol}
            size={18}
          />
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
            border: "1px solid rgba(215,46,126,.22)",
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
              width: 290,
              maxHeight: 320,
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: 20,
              border: "1px solid rgba(215,46,126,.22)",
              background: isLight ? "#fff7fb" : "#09090f",
              boxShadow: "0 18px 40px rgba(0,0,0,.34)",
              padding: 12,
              zIndex: 60,
              display: "grid",
              gap: 8,
            }}
          >
            {getAllNetworks({ includeHidden: false }).map((item) => (
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
                  border: "1px solid rgba(215,46,126,.12)",
                  background:
                    Number(item.chainId) === Number(network.chainId)
                      ? "rgba(215,46,126,.14)"
                      : "transparent",
                  color: isLight ? "#10131a" : "#ffffff",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <LogoImage
                  src={item.logo}
                  alt={item.name}
                  kind="network"
                  label={item.name}
                  symbol={item.symbol}
                  size={20}
                />
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
