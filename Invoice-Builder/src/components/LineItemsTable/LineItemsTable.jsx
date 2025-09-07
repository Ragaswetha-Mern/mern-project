import React from "react";
import "./LineItemsTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListUl,
  faBoxOpen,
  faHashtag,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

const LineItemsTable = ({ items, onAdd, onEdit, onDelete, editingIndex }) => {
  const [newItem, setNewItem] = React.useState({
    description: "",
    quantity: 1,
    unitRate: 0,
  });
  const [open, setOpen] = React.useState(true);
  const [touched, setTouched] = React.useState({});
  const markTouched = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };
  const lineErrors = {};
  if (!newItem.description.trim() || newItem.description.trim().length < 3)
    lineErrors.description = "Description must be at least 3 characters";
  if (!(newItem.quantity > 0))
    lineErrors.quantity = "Quantity must be greater than 0";
  if (newItem.unitRate === "" || newItem.unitRate < 0)
    lineErrors.unitRate = "Unit rate must be >= 0";

  React.useEffect(() => {
    if (editingIndex !== null && items[editingIndex]) {
      const it = items[editingIndex];
      setNewItem({
        description: it.description,
        quantity: it.quantity,
        unitRate: it.unitRate,
      });
    }
  }, [editingIndex, items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let v = value;
    if (name === "quantity" || name === "unitRate") {
      v = value === "" ? "" : Number(value);
    }
    setNewItem((prev) => ({ ...prev, [name]: v }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (newItem.description && newItem.quantity > 0 && newItem.unitRate >= 0) {
      const qty = Number(newItem.quantity);
      const rate = Number(newItem.unitRate);
      onAdd({ ...newItem, quantity: qty, unitRate: rate, amount: qty * rate });
      setNewItem({ description: "", quantity: 1, unitRate: 0 });
      setTouched({});
    } else {
      setTouched({ description: true, quantity: true, unitRate: true });
    }
  };

  const cancelEdit = () => {
    setNewItem({ description: "", quantity: 1, unitRate: 0 });
    setTouched({});
    onEdit(null);
  };

  return (
    <div
      className="card"
      style={{
        background: "rgba(255,255,255,0.7)",
        boxShadow: "0 8px 32px 0 rgba(31,38,135,0.15)",
        backdropFilter: "blur(8px)",
        borderRadius: "18px",
        border: "1.5px solid rgba(16,185,129,0.18)",
        padding: "2.2em 2em 1.5em 2em",
        margin: "2em auto",
        maxWidth: "650px",
        transition: "box-shadow 0.3s",
      }}
    >
      <div
        className="card-header"
        style={{
          background: "linear-gradient(90deg,#10b981 0%,#22d3ee 100%)",
          color: "#fff",
          fontFamily: "Poppins, sans-serif",
          display: "flex",
          alignItems: "center",
          gap: "1.1rem",
          fontWeight: 700,
          fontSize: "1.35rem",
          letterSpacing: "0.02em",
          borderRadius: "14px",
          padding: "1.1em 1.6em",
          boxShadow: "0 4px 16px rgba(16,185,129,0.13)",
          border: "2.5px solid #10b981",
          position: "relative",
        }}
      >
        <span className="icon-wrap">
          <FontAwesomeIcon
            icon={faListUl}
            style={{
              marginRight: "0.7em",
              verticalAlign: "middle",
              fontSize: "1.7em",
              filter: "drop-shadow(0 2px 6px #10b981)",
            }}
          />
        </span>
        Line Items
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Collapse section" : "Expand section"}
          onClick={() => setOpen((o) => !o)}
          className="chevron-btn"
          style={{
            background: "none",
            border: "none",
            padding: 0,
            marginLeft: "auto",
            color: "#fff",
            cursor: "pointer",
            transition: "transform 0.2s",
            transform: open ? "rotate(0deg)" : "rotate(180deg)",
          }}
        >
          {open ? (
            <svg
              width="26"
              height="26"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: "drop-shadow(0 1px 4px #10b981)",
              }}
            >
              <polyline points="6 9 13 16 20 9" />
            </svg>
          ) : (
            <svg
              width="26"
              height="26"
              fill="none"
              stroke="#fff"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: "drop-shadow(0 1px 4px #10b981)",
              }}
            >
              <polyline points="6 16 13 9 20 16" />
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
            <form
              className="flex flex-wrap gap-3 mb-5 items-end"
              onSubmit={handleAdd}
            >
              <div
                className="form-field flex-1 min-w-[180px]"
                style={{ marginBottom: "1.5em" }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7em",
                    fontWeight: 600,
                    fontSize: "1.08em",
                    color: "#10b981",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faBoxOpen}
                    style={{
                      verticalAlign: "middle",
                      fontSize: "1.2em",
                      color: "#10b981",
                    }}
                  />
                  Description
                </label>
                <input
                  className={`form-input ${
                    touched.description && lineErrors.description
                      ? "invalid"
                      : ""
                  }`}
                  onBlur={markTouched}
                  type="text"
                  name="description"
                  value={newItem.description}
                  onChange={handleChange}
                  placeholder="Service or item"
                  style={{
                    fontSize: "1.12rem",
                    padding: "1.1rem",
                    borderRadius: "12px",
                    border:
                      touched.description && lineErrors.description
                        ? "2.5px solid #dc2626"
                        : "2px solid #e5e7eb",
                    background: "rgba(16,185,129,0.07)",
                    fontFamily: "Poppins,Segoe UI,Roboto,Arial,sans-serif",
                    boxShadow: "0 1px 6px rgba(16,185,129,0.09)",
                    transition: "border 0.2s, box-shadow 0.2s",
                  }}
                />
                {touched.description && lineErrors.description && (
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
                    {lineErrors.description}
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
              <div
                className="form-field w-24"
                style={{ marginBottom: "1.5em" }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7em",
                    fontWeight: 600,
                    fontSize: "1.08em",
                    color: "#10b981",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faHashtag}
                    style={{
                      verticalAlign: "middle",
                      fontSize: "1.2em",
                      color: "#10b981",
                    }}
                  />
                  Qty
                </label>
                <input
                  className={`form-input ${
                    touched.quantity && lineErrors.quantity ? "invalid" : ""
                  }`}
                  onBlur={markTouched}
                  type="number"
                  name="quantity"
                  value={newItem.quantity}
                  onChange={handleChange}
                  min={1}
                  style={{
                    fontSize: "1.12rem",
                    padding: "1.1rem",
                    borderRadius: "12px",
                    border:
                      touched.quantity && lineErrors.quantity
                        ? "2.5px solid #dc2626"
                        : "2px solid #e5e7eb",
                    background: "rgba(16,185,129,0.07)",
                    fontFamily: "Poppins,Segoe UI,Roboto,Arial,sans-serif",
                    boxShadow: "0 1px 6px rgba(16,185,129,0.09)",
                    transition: "border 0.2s, box-shadow 0.2s",
                  }}
                />
                {touched.quantity && lineErrors.quantity && (
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
                    {lineErrors.quantity}
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
              <div
                className="form-field w-32"
                style={{ marginBottom: "1.5em" }}
              >
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.7em",
                    fontWeight: 600,
                    fontSize: "1.08em",
                    color: "#10b981",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    style={{
                      verticalAlign: "middle",
                      fontSize: "1.2em",
                      color: "#10b981",
                    }}
                  />
                  Unit Rate
                </label>
                <input
                  className={`form-input ${
                    touched.unitRate && lineErrors.unitRate ? "invalid" : ""
                  }`}
                  onBlur={markTouched}
                  type="number"
                  name="unitRate"
                  value={newItem.unitRate}
                  onChange={handleChange}
                  min={0}
                  style={{
                    fontSize: "1.12rem",
                    padding: "1.1rem",
                    borderRadius: "12px",
                    border:
                      touched.unitRate && lineErrors.unitRate
                        ? "2.5px solid #dc2626"
                        : "2px solid #e5e7eb",
                    background: "rgba(16,185,129,0.07)",
                    fontFamily: "Poppins,Segoe UI,Roboto,Arial,sans-serif",
                    boxShadow: "0 1px 6px rgba(16,185,129,0.09)",
                    transition: "border 0.2s, box-shadow 0.2s",
                  }}
                />
                {touched.unitRate && lineErrors.unitRate && (
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
                    {lineErrors.unitRate}
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
              {editingIndex !== null ? (
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={Object.keys(lineErrors).length > 0}
                    className="btn success"
                    style={{
                      opacity: Object.keys(lineErrors).length > 0 ? 0.6 : 1,
                    }}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="btn neutral"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={Object.keys(lineErrors).length > 0}
                  className="btn"
                  style={{
                    opacity: Object.keys(lineErrors).length > 0 ? 0.6 : 1,
                  }}
                >
                  + Add
                </button>
              )}
            </form>
            <div className="table-wrap">
              <table className="mod-table zebra">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Unit Rate</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          textAlign: "center",
                          padding: "2.2rem 1rem",
                          fontStyle: "italic",
                          color: "var(--c-text-soft)",
                        }}
                      >
                        No items yet. Add your first line item above.
                      </td>
                    </tr>
                  )}
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.description}</td>
                      <td style={{ textAlign: "right" }}>{item.quantity}</td>
                      <td style={{ textAlign: "right" }}>${item.unitRate}</td>
                      <td style={{ textAlign: "right", fontWeight: 600 }}>
                        ${item.amount}
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: ".4rem",
                          }}
                        >
                          <button
                            className="btn outline"
                            type="button"
                            onClick={() => onEdit(idx)}
                            style={{ padding: ".4rem .65rem" }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn danger"
                            type="button"
                            onClick={() => onDelete(idx)}
                            style={{ padding: ".4rem .65rem" }}
                          >
                            Del
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineItemsTable;
