import React from "react";
import { tr } from "../i18n/translations";
import { MORE_TABS, type Tab } from "../lib/navigation";

export default function BottomNav({ tab, setTab, theme = "dark", lang = "en" }: { tab: Tab; setTab: (tab: Tab) => void; theme?: "dark" | "light"; lang?: string; }) {
  const isLight = theme === "light";
  const items: { id: Tab; label: string; icon: string; active?: boolean }[] = [
    { id: "dashboard", label: tr(lang, "nav_home"), icon: "⌂" },
    { id: "tokens", label: tr(lang, "nav_tokens"), icon: "◈" },
    { id: "activity", label: tr(lang, "nav_activity"), icon: "↻" },
    { id: "more", label: "More", icon: "⋯", active: MORE_TABS.includes(tab) },
  ];

  return (
    <nav className="wallet-bottom-nav" style={{ background: "transparent", borderTop: "none" }}>
      <div className="wallet-bottom-nav-inner" style={{ background: isLight ? "#ffffff" : "#07070c", border: `1px solid ${isLight ? "#f3d7e6" : "rgba(215,46,126,.18)"}`, boxShadow: "0 16px 36px rgba(0,0,0,.32)" }}>
        {items.map((item) => {
          const active = item.active ?? tab === item.id;
          return (
            <button key={item.id} onClick={() => setTab(item.id)} title={item.label} className={`wallet-bottom-nav-item ${active ? "active" : ""}`} style={{ color: active ? "rgb(215,46,126)" : isLight ? "#5b6578" : "#93a1b7", background: active ? (isLight ? "#fff0f7" : "rgba(215,46,126,.12)") : "transparent" }}>
              <span className="wallet-bottom-nav-icon-wrap" style={{ background: active ? "rgba(215,46,126,.14)" : (isLight ? "#fff0f7" : "rgba(255,255,255,.03)") }}>
                <span className="wallet-bottom-nav-icon">{item.icon}</span>
              </span>
              <span className="wallet-bottom-nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
