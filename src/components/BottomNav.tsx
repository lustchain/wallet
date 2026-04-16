import React from "react";
import { tr } from "../i18n/translations";
import { MORE_TABS, type Tab } from "../lib/navigation";

export default function BottomNav({
  tab,
  setTab,
  theme = "dark",
  lang = "en",
}: {
  tab: Tab;
  setTab: (tab: Tab) => void;
  theme?: "dark" | "light";
  lang?: string;
}) {
  const isLight = theme === "light";

  const items: { id: Tab; label: string; icon: string; active?: boolean }[] = [
    { id: "dashboard", label: tr(lang, "nav_home"), icon: "⌂" },
    { id: "tokens", label: tr(lang, "nav_tokens"), icon: "◈" },
    { id: "activity", label: tr(lang, "nav_activity"), icon: "↻" },
    { id: "more", label: "More", icon: "⋯", active: MORE_TABS.includes(tab) },
  ];

  return (
    <nav
      className="wallet-bottom-nav"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 35,
        padding: "10px 12px calc(env(safe-area-inset-bottom, 0px) + 10px)",
        background: "transparent",
        borderTop: "none",
      }}
    >
      <div
        className="wallet-bottom-nav-inner"
        style={{
          maxWidth: 980,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 8,
          padding: 8,
          borderRadius: 22,
          background: isLight ? "rgba(255,255,255,.96)" : "rgba(10,10,15,.96)",
          border: `1px solid ${isLight ? "rgba(215,46,126,.16)" : "rgba(215,46,126,.18)"}`,
          boxShadow: "0 16px 40px rgba(0,0,0,.28)",
          backdropFilter: "blur(16px)",
        }}
      >
        {items.map((item) => {
          const active = item.active ?? tab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              title={item.label}
              className={`wallet-bottom-nav-item ${active ? "active" : ""}`}
              style={{
                display: "grid",
                gap: 4,
                justifyItems: "center",
                alignContent: "center",
                minHeight: 58,
                borderRadius: 16,
                border: active
                  ? "1px solid rgba(215,46,126,.28)"
                  : "1px solid transparent",
                background: active
                  ? isLight
                    ? "#fff0f7"
                    : "rgba(215,46,126,.12)"
                  : "transparent",
                color: active ? "rgb(215,46,126)" : isLight ? "#5b6578" : "#93a1b7",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 16, lineHeight: 1 }}>{item.icon}</span>
              <span style={{ fontSize: 12, fontWeight: 800 }}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
