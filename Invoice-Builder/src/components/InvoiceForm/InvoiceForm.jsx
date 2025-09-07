import React from "react";
import "./InvoiceForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarkerAlt,
  faFileInvoice,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

const InvoiceForm = ({ clientInfo, onChange }) => {
  const [open, setOpen] = React.useState(true);
  const required = ["name", "address", "invoiceNumber", "date"];
  const [touched, setTouched] = React.useState({});
  const errors = {};
  if (!clientInfo.name || clientInfo.name.trim().length < 3)
    errors.name = "Name must be at least 3 characters";
  if (!clientInfo.address || clientInfo.address.trim().length < 5)
    errors.address = "Address must be at least 5 characters";
  required.forEach((f) => {
    if (!clientInfo[f] || String(clientInfo[f]).trim() === "")
      errors[f] = "Required";
  });

  const markTouched = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  return (
    <div
      className="card"
      style={{
        background: "rgba(255,255,255,0.7)",
        boxShadow: "0 8px 32px 0 rgba(31,38,135,0.15)",
        backdropFilter: "blur(8px)",
        borderRadius: "18px",
        border: "1.5px solid rgba(99,102,241,0.18)",
        padding: "2.2em 2em 1.5em 2em",
        margin: "2em auto",
        maxWidth: "650px",
        transition: "box-shadow 0.3s",
      }}
    >
      <div
        className="card-header"
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
          <FontAwesomeIcon
            icon={faUser}
            style={{
              marginRight: "0.7em",
              verticalAlign: "middle",
              fontSize: "1.7em",
              filter: "drop-shadow(0 2px 6px #4f46e5)",
            }}
          />
          Client Information
          <span
            className="inline-badge"
            style={{
              marginLeft: "1.2em",
              background: "#fff",
              color: "#6366f1",
              padding: "0.28em 0.9em",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "1em",
              boxShadow: "0 1px 6px rgba(99,102,241,0.09)",
            }}
          >
            Required
          </span>
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
      <div
        style={{
          height: open ? "auto" : 0,
          overflow: open ? "visible" : "hidden",
          transition: "height 0.4s cubic-bezier(.4,0,.2,1)",
        }}
      >
        {open && (
          <div className="card-body fade-slide">
            <div className="form-grid cols-2" style={{ gap: "2.2em 2em" }}>
              <div className="form-field" style={{ marginBottom: "1.5em" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7em",
                    fontWeight: 600,
                    fontSize: "1.08em",
                    color: "#4f46e5",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      verticalAlign: "middle",
                      fontSize: "1.2em",
                      color: "#6366f1",
                    }}
                  />
                  Name
                </label>
                <input
                  className={`form-input ${
                    touched.name && errors.name ? "invalid" : ""
                  }`}
                  onBlur={markTouched}
                  type="text"
                  name="name"
                  value={clientInfo.name || ""}
                  onChange={onChange}
                  placeholder="Acme Corp"
                  style={{
                    fontSize: "1.12rem",
                    padding: "1.1rem",
                    borderRadius: "12px",
                    border:
                      touched.name && errors.name
                        ? "2.5px solid #dc2626"
                        : "2px solid #e5e7eb",
                    background: "rgba(99,102,241,0.07)",
                    fontFamily: "Poppins,Segoe UI,Roboto,Arial,sans-serif",
                    boxShadow: "0 1px 6px rgba(99,102,241,0.09)",
                    transition: "border 0.2s, box-shadow 0.2s",
                  }}
                />
                {touched.name && errors.name && (
                  <div
                    className="validation-error"
                    style={{
                      color: "#dc2626",
                      fontWeight: 700,
                      background: "#fee2e2",
                      borderRadius: "7px",
                      padding: "0.5em 1em",
                      marginTop: "0.5em",
                      fontSize: "0.98em",
                      boxShadow: "0 1px 4px #fee2e2",
                    }}
                  >
                    {errors.name}
                  </div>
                )}
                <hr
                  style={{
                    border: "none",
                    borderTop: "1.5px dashed #e5e7eb",
                    margin: "1.2em 0 0.2em 0",
                  }}
                />
              </div>
              <div className="form-field" style={{ marginBottom: "1.5em" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7em",
                    fontWeight: 600,
                    fontSize: "1.08em",
                    color: "#4f46e5",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    style={{
                      verticalAlign: "middle",
                      fontSize: "1.2em",
                      color: "#6366f1",
                    }}
                  />
                  Address
                </label>
                <input
                  className={`form-input ${
                    touched.address && errors.address ? "invalid" : ""
                  }`}
                  onBlur={markTouched}
                  type="text"
                  name="address"
                  value={clientInfo.address || ""}
                  onChange={onChange}
                  placeholder="123 Market Street"
                  style={{
                    fontSize: "1.12rem",
                    padding: "1.1rem",
                    borderRadius: "12px",
                    border:
                      touched.address && errors.address
                        ? "2.5px solid #dc2626"
                        : "2px solid #e5e7eb",
                    background: "rgba(99,102,241,0.07)",
                    fontFamily: "Poppins,Segoe UI,Roboto,Arial,sans-serif",
                    boxShadow: "0 1px 6px rgba(99,102,241,0.09)",
                    transition: "border 0.2s, box-shadow 0.2s",
                  }}
                />
                {touched.address && errors.address && (
                  <div
                    className="validation-error"
                    style={{
                      color: "#dc2626",
                      fontWeight: 700,
                      background: "#fee2e2",
                      borderRadius: "7px",
                      padding: "0.5em 1em",
                      marginTop: "0.5em",
                      fontSize: "0.98em",
                      boxShadow: "0 1px 4px #fee2e2",
                    }}
                  >
                    {errors.address}
                  </div>
                )}
                <hr
                  style={{
                    border: "none",
                    borderTop: "1.5px dashed #e5e7eb",
                    margin: "1.2em 0 0.2em 0",
                  }}
                />
              </div>
              <div className="form-field" style={{ marginBottom: "1.5em" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7em",
                    fontWeight: 600,
                    fontSize: "1.08em",
                    color: "#4f46e5",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFileInvoice}
                    style={{
                      verticalAlign: "middle",
                      fontSize: "1.2em",
                      color: "#6366f1",
                    }}
                  />
                  Invoice Number
                </label>
                <input
                  className={`form-input ${
                    touched.invoiceNumber && errors.invoiceNumber
                      ? "invalid"
                      : ""
                  }`}
                  onBlur={markTouched}
                  type="text"
                  name="invoiceNumber"
                  value={clientInfo.invoiceNumber || ""}
                  onChange={onChange}
                  placeholder="INV-1001"
                  style={{
                    fontSize: "1.12rem",
                    padding: "1.1rem",
                    borderRadius: "12px",
                    border:
                      touched.invoiceNumber && errors.invoiceNumber
                        ? "2.5px solid #dc2626"
                        : "2px solid #e5e7eb",
                    background: "rgba(99,102,241,0.07)",
                    fontFamily: "Poppins,Segoe UI,Roboto,Arial,sans-serif",
                    boxShadow: "0 1px 6px rgba(99,102,241,0.09)",
                    transition: "border 0.2s, box-shadow 0.2s",
                  }}
                />
                {touched.invoiceNumber && errors.invoiceNumber && (
                  <div
                    className="validation-error"
                    style={{
                      color: "#dc2626",
                      fontWeight: 700,
                      background: "#fee2e2",
                      borderRadius: "7px",
                      padding: "0.5em 1em",
                      marginTop: "0.5em",
                      fontSize: "0.98em",
                      boxShadow: "0 1px 4px #fee2e2",
                    }}
                  >
                    {errors.invoiceNumber}
                  </div>
                )}
                <hr
                  style={{
                    border: "none",
                    borderTop: "1.5px dashed #e5e7eb",
                    margin: "1.2em 0 0.2em 0",
                  }}
                />
              </div>
              <div className="form-field" style={{ marginBottom: "1.5em" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7em",
                    fontWeight: 600,
                    fontSize: "1.08em",
                    color: "#4f46e5",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{
                      verticalAlign: "middle",
                      fontSize: "1.2em",
                      color: "#6366f1",
                    }}
                  />
                  Date
                </label>
                <input
                  className={`form-input ${
                    touched.date && errors.date ? "invalid" : ""
                  }`}
                  onBlur={markTouched}
                  type="date"
                  name="date"
                  value={clientInfo.date || ""}
                  onChange={onChange}
                  style={{
                    fontSize: "1.12rem",
                    padding: "1.1rem",
                    borderRadius: "12px",
                    border:
                      touched.date && errors.date
                        ? "2.5px solid #dc2626"
                        : "2px solid #e5e7eb",
                    background: "rgba(99,102,241,0.07)",
                    fontFamily: "Poppins,Segoe UI,Roboto,Arial,sans-serif",
                    boxShadow: "0 1px 6px rgba(99,102,241,0.09)",
                    transition: "border 0.2s, box-shadow 0.2s",
                  }}
                />
                {touched.date && errors.date && (
                  <div
                    className="validation-error"
                    style={{
                      color: "#dc2626",
                      fontWeight: 700,
                      background: "#fee2e2",
                      borderRadius: "7px",
                      padding: "0.5em 1em",
                      marginTop: "0.5em",
                      fontSize: "0.98em",
                      boxShadow: "0 1px 4px #fee2e2",
                    }}
                  >
                    {errors.date}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceForm;
