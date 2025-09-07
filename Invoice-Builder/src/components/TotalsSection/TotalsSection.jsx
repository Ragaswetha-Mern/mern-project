import React, { useState } from "react";
import "./TotalsSection.css";
const TotalsSection = ({ subtotal, tax, total, onTaxRateChange }) => {
  const [localRate, setLocalRate] = useState(10);
  const [open, setOpen] = useState(true);

  const handleRateChange = (e) => {
    const val = Number(e.target.value) || 0;
    setLocalRate(val);
    onTaxRateChange && onTaxRateChange(val);
  };

  return (
    <div className="card totals-card" data-collapsed={!open}>
      <div
        className="card-header totals-header"
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
            display: "flex",
            alignItems: "center",
          }}
        >
          <span className="icon-wrap">
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
              <path d="M12 2v20" />
              <path d="M2 12h20" />
            </svg>
          </span>
          Totals
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
        <div className="card-body fade-slide">
          <div className="totals-stack">
            <div className="totals-row">
              <span className="totals-label">Subtotal</span>
              <span className="totals-value">${subtotal.toFixed(2)}</span>
            </div>
            <div
              className="totals-row"
              style={{ alignItems: "center", gap: ".7rem" }}
            >
              <span className="totals-label">Tax ({localRate}%)</span>
              <div
                style={{ display: "flex", alignItems: "center", gap: ".7rem" }}
              >
                <input
                  type="number"
                  value={localRate}
                  min={0}
                  onChange={handleRateChange}
                  className="totals-input"
                  style={{
                    width: "70px",
                    borderRadius: "8px",
                    border: "1px solid #f59e42",
                    padding: ".4rem .5rem",
                    fontWeight: 500,
                    fontSize: "1rem",
                  }}
                />
                <span className="totals-value">${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="totals-row grand">
              <span className="totals-label grand">Grand Total</span>
              <span className="totals-value grand">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalsSection;
