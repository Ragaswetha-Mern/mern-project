import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable"; // for table support
import html2canvas from "html2canvas";

const InvoicePreview = ({
  invoiceData = {},
  settings = {},
  disabled = false,
  disableMsg = "Complete required fields & at least one line item to export",
  invoiceValid = true,
}) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const htmlExportRef = useRef(null);

  const handleCollapse = () => setOpen(!open);
  const fmt = (val) => {
    if (val == null) return "—";
    return typeof val === "number" ? val.toFixed(2) : val;
  };

  // HTML export with html2canvas
  const handleExportHTMLPDF = async () => {
    setLoading(true);
    try {
      const element = htmlExportRef.current;
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Draw border rectangle (leave 7mm margin)
      const margin = 7;
      pdf.setLineWidth(1.5);
      pdf.setDrawColor(99, 102, 241); // Indigo
      pdf.rect(
        margin,
        margin,
        pdfWidth - margin * 2,
        pdf.internal.pageSize.getHeight() - margin * 2
      );

      // Shrink image to fit inside border
      const imgX = margin;
      const imgY = margin;
      const imgW = pdfWidth - margin * 2;
      const maxImgH = pdf.internal.pageSize.getHeight() - margin * 2;
      const imgH = pdfHeight > maxImgH ? maxImgH : pdfHeight;
      pdf.addImage(imgData, "PNG", imgX, imgY, imgW, imgH);
      pdf.save("invoice-html.pdf");
    } catch (err) {
      console.error("Error exporting HTML PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="card invoice-preview super-preview"
      style={{
        boxShadow: "0 6px 32px rgba(67,56,202,0.10)",
        borderRadius: "18px",
        border: "1.5px solid #6366f1",
        background: "#fff",
        padding: "0",
        overflow: "hidden",
        minHeight: "400px", // static reasonable min height
        position: "relative",
      }}
    >
      {/* Header styled like InvoiceSettings */}
      <div
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
            <rect x="3" y="7" width="18" height="12" rx="3" />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
          </svg>
          Invoice Preview
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "1em" }}>
          <button
            disabled={disabled || !invoiceValid}
            title={disabled ? disableMsg : "Export PDF"}
            onClick={handleExportHTMLPDF}
            type="button"
            style={{
              background: "#fff",
              color: "#6366f1",
              border: "1.5px solid #6366f1",
              borderRadius: "8px",
              padding: "0.5em 1.2em",
              fontWeight: 600,
              fontSize: "1em",
              boxShadow: "0 2px 8px rgba(67,56,202,0.10)",
              display: "flex",
              alignItems: "center",
              gap: "0.6em",
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.6 : 1,
              transition: "opacity 0.2s",
            }}
          >
            <i
              className="fa-solid fa-file-pdf"
              style={{ fontSize: "1.1em" }}
            ></i>
            Export PDF
          </button>
          <button
            type="button"
            onClick={handleCollapse}
            title={open ? "Collapse" : "Expand"}
            style={{ background: "none", border: "none", padding: 0 }}
            aria-expanded={open}
            aria-label={open ? "Collapse section" : "Expand section"}
            className="chevron-btn"
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
      </div>

      {/* Collapsible body */}
      {open && (
        <div
          ref={htmlExportRef}
          className="card-body preview-body"
          style={{ padding: "2.2rem" }}
        >
          {/* Client Info & Logo */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "1.2em" }}
            >
              {(settings.logoData ||
                (invoiceData.settings && invoiceData.settings.logoData)) && (
                <img
                  src={
                    settings.logoData ||
                    (invoiceData.settings && invoiceData.settings.logoData)
                  }
                  alt="Logo"
                  style={{
                    height: "80px",
                    width: "auto",
                    objectFit: "contain",
                    borderRadius: "12px",
                    boxShadow: "0 2px 12px rgba(67,56,202,0.12)",
                  }}
                />
              )}
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.15rem" }}>
                  {invoiceData.name || "Client Name"}
                </div>
                <div style={{ color: "#555" }}>
                  {invoiceData.address || "Client Address"}
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div>Invoice #</div>
              <div style={{ fontWeight: 600 }}>
                {invoiceData.invoiceNumber || "—"}
              </div>
              <div>Date</div>
              <div style={{ fontWeight: 600 }}>{invoiceData.date || "—"}</div>
            </div>
          </div>

          {/* Items Table */}
          <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: "0",
                background: "#fff",
                border: "2px solid #6366f1",
                boxShadow: "0 2px 8px rgba(67,56,202,0.07)",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <thead>
                <tr style={{ background: "#6366f1", color: "#fff" }}>
                  <th
                    style={{
                      padding: "0.85em",
                      borderBottom: "1.5px solid #334155",
                      borderRight: "1px solid #fff",
                      background: "#334155",
                      color: "#fff",
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "0.85em",
                      borderBottom: "1.5px solid #334155",
                      borderRight: "1px solid #fff",
                      background: "#334155",
                      color: "#fff",
                    }}
                  >
                    Qty
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "0.85em",
                      borderBottom: "1.5px solid #334155",
                      borderRight: "1px solid #fff",
                      background: "#334155",
                      color: "#fff",
                    }}
                  >
                    Unit Rate
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "0.85em",
                      borderBottom: "1.5px solid #334155",
                      borderRight: "none",
                      background: "#334155",
                      color: "#fff",
                    }}
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {(invoiceData.items || []).length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      style={{ textAlign: "center", padding: "1.5em" }}
                    >
                      No items added yet.
                    </td>
                  </tr>
                ) : (
                  (invoiceData.items || []).map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.description}</td>
                      <td style={{ textAlign: "right" }}>{item.quantity}</td>
                      <td style={{ textAlign: "right" }}>{item.unitRate}</td>
                      <td style={{ textAlign: "right", fontWeight: 600 }}>
                        {item.amount}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div style={{ maxWidth: 340, marginLeft: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Subtotal</span>
              <span>{fmt(invoiceData.subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Tax</span>
              <span>{fmt(invoiceData.tax)}</span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <strong>Total</strong>
              <strong>{fmt(invoiceData.total)}</strong>
            </div>
          </div>

          {(settings.notes ||
            (invoiceData.settings && invoiceData.settings.notes)) && (
            <div style={{ marginTop: 24 }}>
              <strong>Notes:</strong>{" "}
              {settings.notes ||
                (invoiceData.settings && invoiceData.settings.notes)}
            </div>
          )}
          {(settings.terms ||
            (invoiceData.settings && invoiceData.settings.terms)) && (
            <div style={{ marginTop: 24 }}>
              <strong>Terms & Conditions:</strong>{" "}
              {settings.terms ||
                (invoiceData.settings && invoiceData.settings.terms)}
            </div>
          )}

          <div style={{ marginTop: 36, textAlign: "center", color: "#6366f1" }}>
            Thank you for your business.
          </div>
        </div>
      )}

      {/* Loader */}
      {loading && (
        <div
          className="export-loader"
          data-html2canvas-ignore="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255,255,255,0.7)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              border: "4px solid #6366f1",
              borderTop: "4px solid #e0e7ff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              marginBottom: "1em",
            }}
          />
          <span
            style={{ color: "#6366f1", fontWeight: 600, fontSize: "1.1em" }}
          >
            Exporting PDF...
          </span>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      )}
    </div>
  );
};

export default InvoicePreview;
