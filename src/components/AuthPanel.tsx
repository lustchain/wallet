import React from "react";
import { shortAddress } from "../lib/inri";

export type AuthMode = "unlock" | "create" | "import";

export type AuthTexts = {
  authSubtitle: string;
  unlock: string;
  create: string;
  import: string;
  password: string;
  passwordCreate: string;
  walletName: string;
  generatedSeed: string;
  generateSeed: string;
  createWallet: string;
  importWallet: string;
  pasteSeed: string;
  noWalletsYet: string;
  processing: string;
  seedBackupConfirm: string;
};

type WalletOption = {
  id: string;
  name: string;
  address: string;
};

export default function AuthPanel({
  theme,
  baseUrl,
  mode,
  setMode,
  texts,
  wallets,
  selectedWalletId,
  setSelectedWalletId,
  unlockPassword,
  setUnlockPassword,
  createName,
  setCreateName,
  createPassword,
  setCreatePassword,
  generatedSeed,
  confirmSeedSaved,
  setConfirmSeedSaved,
  importName,
  setImportName,
  importPassword,
  setImportPassword,
  importSeed,
  setImportSeed,
  loading,
  message,
  onGenerateSeed,
  onUnlock,
  onCreate,
  onImport,
}: {
  theme: "dark" | "light";
  baseUrl: string;
  mode: AuthMode;
  setMode: (mode: AuthMode) => void;
  texts: AuthTexts;
  wallets: WalletOption[];
  selectedWalletId: string;
  setSelectedWalletId: (value: string) => void;
  unlockPassword: string;
  setUnlockPassword: (value: string) => void;
  createName: string;
  setCreateName: (value: string) => void;
  createPassword: string;
  setCreatePassword: (value: string) => void;
  generatedSeed: string;
  confirmSeedSaved: boolean;
  setConfirmSeedSaved: (value: boolean) => void;
  importName: string;
  setImportName: (value: string) => void;
  importPassword: string;
  setImportPassword: (value: string) => void;
  importSeed: string;
  setImportSeed: (value: string) => void;
  loading: boolean;
  message: string;
  onGenerateSeed: () => void;
  onUnlock: () => void;
  onCreate: () => void;
  onImport: () => void;
}) {
  const isLight = theme === "light";

  return (
    <div
      className="wallet-auth-shell"
      style={{
        color: isLight ? "#10131a" : "#ffffff",
        background: isLight ? "#fff7fb" : "#000000",
      }}
    >
      <div className="wallet-auth-wrap wallet-auth-layout">
        <div
          className="wallet-auth-hero"
          style={{
            display: "grid",
            justifyItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <img
            src={baseUrl + "brand-lust.png"}
            alt="LUST"
            className="wallet-auth-logo"
            style={{
              width: "min(250px, 68vw)",
              maxWidth: 250,
              height: "auto",
              objectFit: "contain",
              filter: isLight
                ? "drop-shadow(0 14px 34px rgba(215,46,126,.18))"
                : "drop-shadow(0 14px 34px rgba(215,46,126,.28))",
              marginBottom: 4,
            }}
          />

          <div
            className="wallet-auth-title"
            style={{
              fontSize: 30,
              fontWeight: 900,
              lineHeight: 1.04,
              color: isLight ? "#10131a" : "#ffffff",
              textAlign: "center",
            }}
          >
            Lust Wallet
          </div>

          <div
            className="wallet-auth-subtitle"
            style={{
              color: isLight ? "#5b6578" : "#97a0b3",
              textAlign: "center",
              maxWidth: 420,
              fontSize: 15,
              lineHeight: 1.5,
            }}
          >
            {texts.authSubtitle}
          </div>
        </div>

        <div
          className="wallet-surface wallet-auth-card"
          style={{
            background: isLight ? "rgba(255,255,255,.96)" : "rgba(10,10,15,.96)",
            border: `1px solid ${isLight ? "rgba(215,46,126,.18)" : "rgba(215,46,126,.26)"}`,
            borderRadius: 28,
            padding: 18,
            boxShadow: isLight
              ? "0 16px 36px rgba(215,46,126,.10)"
              : "0 16px 40px rgba(0,0,0,.35)",
          }}
        >
          <div
            className="wallet-auth-tabs"
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 14,
            }}
          >
            <button onClick={() => setMode("unlock")} style={tabButtonStyle(mode === "unlock", theme)}>
              {texts.unlock}
            </button>
            <button onClick={() => setMode("create")} style={tabButtonStyle(mode === "create", theme)}>
              {texts.create}
            </button>
            <button onClick={() => setMode("import")} style={tabButtonStyle(mode === "import", theme)}>
              {texts.import}
            </button>
          </div>

          {mode === "unlock" ? (
            <div style={{ display: "grid", gap: 12 }}>
              <select
                value={selectedWalletId}
                onChange={(e) => setSelectedWalletId(e.target.value)}
                style={inputStyle(theme)}
              >
                {wallets.length === 0 ? (
                  <option value="">{texts.noWalletsYet}</option>
                ) : (
                  wallets.map((wallet) => (
                    <option key={wallet.id} value={wallet.id}>
                      {wallet.name} — {shortAddress(wallet.address)}
                    </option>
                  ))
                )}
              </select>

              <input
                type="password"
                value={unlockPassword}
                onChange={(e) => setUnlockPassword(e.target.value)}
                placeholder={texts.password}
                style={inputStyle(theme)}
              />

              <button onClick={onUnlock} style={primaryButtonStyle()} disabled={loading || wallets.length === 0}>
                {loading ? texts.processing : texts.unlock}
              </button>
            </div>
          ) : null}

          {mode === "create" ? (
            <div style={{ display: "grid", gap: 12 }}>
              <input
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
                placeholder={texts.walletName}
                style={inputStyle(theme)}
              />

              <textarea
                value={generatedSeed}
                readOnly
                placeholder={texts.generatedSeed}
                style={textareaStyle(theme)}
              />

              <button onClick={onGenerateSeed} style={secondaryButtonStyle(theme)}>
                {texts.generateSeed}
              </button>

              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 13,
                  color: isLight ? "#42506a" : "#a7b0c4",
                  lineHeight: 1.45,
                }}
              >
                <input
                  type="checkbox"
                  checked={confirmSeedSaved}
                  onChange={(e) => setConfirmSeedSaved(e.target.checked)}
                  style={{ marginTop: 2 }}
                />
                <span>{texts.seedBackupConfirm}</span>
              </label>

              <input
                type="password"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
                placeholder={texts.passwordCreate}
                style={inputStyle(theme)}
              />

              <button onClick={onCreate} style={primaryButtonStyle()} disabled={loading}>
                {loading ? texts.processing : texts.createWallet}
              </button>
            </div>
          ) : null}

          {mode === "import" ? (
            <div style={{ display: "grid", gap: 12 }}>
              <input
                value={importName}
                onChange={(e) => setImportName(e.target.value)}
                placeholder={texts.walletName}
                style={inputStyle(theme)}
              />

              <textarea
                value={importSeed}
                onChange={(e) => setImportSeed(e.target.value)}
                placeholder={texts.pasteSeed}
                style={textareaStyle(theme)}
              />

              <input
                type="password"
                value={importPassword}
                onChange={(e) => setImportPassword(e.target.value)}
                placeholder={texts.passwordCreate}
                style={inputStyle(theme)}
              />

              <button onClick={onImport} style={primaryButtonStyle()} disabled={loading}>
                {loading ? texts.processing : texts.importWallet}
              </button>
            </div>
          ) : null}

          {message ? <div className="wallet-inline-feedback">{message}</div> : null}
        </div>
      </div>
    </div>
  );
}

function tabButtonStyle(active: boolean, theme: "dark" | "light"): React.CSSProperties {
  return {
    padding: "10px 14px",
    borderRadius: 14,
    border: active
      ? "1px solid rgba(215,46,126,.42)"
      : `1px solid ${theme === "light" ? "#f3d7e6" : "#2a0f20"}`,
    background: active ? "rgb(215,46,126)" : theme === "light" ? "#fff7fb" : "#0a0a0f",
    color: active ? "#fff" : theme === "light" ? "#10131a" : "#ffffff",
    cursor: "pointer",
    fontWeight: 800,
  };
}

function inputStyle(theme: "dark" | "light"): React.CSSProperties {
  return {
    width: "100%",
    padding: 14,
    borderRadius: 16,
    border: `1px solid ${theme === "light" ? "#ead3e0" : "rgba(215,46,126,.18)"}`,
    background: theme === "light" ? "#fff7fb" : "#05050a",
    color: theme === "light" ? "#10131a" : "#ffffff",
    outline: "none",
    boxSizing: "border-box",
  };
}

function textareaStyle(theme: "dark" | "light"): React.CSSProperties {
  return {
    width: "100%",
    minHeight: 110,
    padding: 14,
    borderRadius: 16,
    border: `1px solid ${theme === "light" ? "#ead3e0" : "rgba(215,46,126,.18)"}`,
    background: theme === "light" ? "#fff7fb" : "#05050a",
    color: theme === "light" ? "#10131a" : "#ffffff",
    outline: "none",
    resize: "vertical",
    boxSizing: "border-box",
  };
}

function primaryButtonStyle(): React.CSSProperties {
  return {
    width: "100%",
    padding: "15px 16px",
    borderRadius: 16,
    border: "none",
    background: "rgb(215,46,126)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 900,
    fontSize: 17,
  };
}

function secondaryButtonStyle(theme: "dark" | "light"): React.CSSProperties {
  return {
    padding: "10px 14px",
    borderRadius: 14,
    border: `1px solid ${theme === "light" ? "#ead3e0" : "rgba(215,46,126,.18)"}`,
    background: theme === "light" ? "#ffffff" : "#0a0a0f",
    color: theme === "light" ? "#10131a" : "#fff",
    cursor: "pointer",
    fontWeight: 700,
  };
}
