import React from "react";
import "./InvoiceSettings.css";
const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "INR", symbol: "₹" },
  { code: "JPY", symbol: "¥" },
];

const InvoiceSettings = ({ settings, onChange, onLogoChange }) => {
  const [open, setOpen] = React.useState(true);

  const handleInput = (e) => {
    const { name, value } = e.target;
    onChange({ ...settings, [name]: value });
  };

  const handleLogo = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      onLogoChange(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="card invoice-settings config-panel" data-collapsed={!open}>
      <div
        className="config-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(90deg,#6366f1 0%,#4f46e5 100%)",
          color: "#fff",
          padding: "1.1rem 1.7rem",
          borderRadius: "14px 14px 0 0",
          boxShadow: "0 2px 8px rgba(67,56,202,0.07)",
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: "1.18rem",
            letterSpacing: "0.02em",
            fontFamily: "Poppins,Segoe UI,Roboto,Arial,sans-serif",
          }}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "0.7em", verticalAlign: "middle" }}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          Invoice Settings
        </span>
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Collapse section" : "Expand section"}
          onClick={() => setOpen((o) => !o)}
          className="chevron-btn"
          style={{ background: "none", border: "none", padding: 0 }}
        >
          {open ? (
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          ) : (
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 15 12 9 18 15" />
            </svg>
          )}
        </button>
      </div>
      {open && (
        <div
          className="config-body fade-slide"
          style={{ padding: "2rem 2rem 1.5rem 2rem" }}
        >
          <div className="config-grid">
            <div className="config-field">
              <label
                className="config-label"
                style={{ display: "flex", alignItems: "center", gap: "0.5em" }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ verticalAlign: "middle" }}
                >
                  <circle cx="10" cy="10" r="8" />
                  <text
                    x="10"
                    y="14"
                    textAnchor="middle"
                    fontSize="10"
                    fill="#6366f1"
                  >
                    {settings.currencyCode}
                  </text>
                </svg>
                Currency
              </label>
              <select
                name="currencyCode"
                value={settings.currencyCode}
                onChange={handleInput}
                className="config-select"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
            <div className="config-field">
              <label
                className="config-label"
                style={{ display: "flex", alignItems: "center", gap: "0.5em" }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ verticalAlign: "middle" }}
                >
                  <rect x="3" y="5" width="14" height="12" rx="2" />
                  <circle cx="10" cy="11" r="3" />
                </svg>
                Logo (PNG/JPG)
              </label>
              <label
                htmlFor="logo-upload"
                className="icon-upload-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4em",
                  background: "#6366f1",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.5em 1em",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontFamily: "Poppins,Segoe UI,Roboto,Arial,sans-serif",
                  marginBottom: "0.5em",
                  boxShadow: "0 2px 8px rgba(67,56,202,0.07)",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ verticalAlign: "middle" }}
                >
                  <path d="M16 8v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8" />
                  <rect x="8" y="2" width="8" height="4" rx="1" />
                  <path d="M12 12v2" />
                </svg>
                Upload Image
                <input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogo}
                  style={{ display: "none" }}
                />
              </label>
              {settings.logoData && (
                <img
                  src={settings.logoData}
                  alt="Logo"
                  style={{
                    height: "56px",
                    marginTop: ".35rem",
                    objectFit: "contain",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(67,56,202,0.07)",
                  }}
                />
              )}
            </div>
            <div className="config-field config-span">
              <label
                className="config-label"
                style={{ display: "flex", alignItems: "center", gap: "0.5em" }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ verticalAlign: "middle" }}
                >
                  <rect x="4" y="4" width="12" height="12" rx="2" />
                  <path d="M8 8h8" />
                  <path d="M8 12h8" />
                </svg>
                Notes
              </label>
              <textarea
                name="notes"
                value={settings.notes}
                onChange={handleInput}
                className="config-textarea"
                rows={3}
                placeholder="Additional notes for the client"
              />
            </div>
            <div className="config-field config-span">
              <label
                className="config-label"
                style={{ display: "flex", alignItems: "center", gap: "0.5em" }}
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ verticalAlign: "middle" }}
                >
                  <rect x="4" y="4" width="12" height="12" rx="2" />
                  <path d="M8 8h8" />
                  <path d="M8 12h8" />
                  <path d="M8 16h8" />
                </svg>
                Terms & Conditions
              </label>
              <textarea
                name="terms"
                value={settings.terms}
                onChange={handleInput}
                className="config-textarea"
                rows={3}
                placeholder="Payment due in 15 days..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceSettings;
