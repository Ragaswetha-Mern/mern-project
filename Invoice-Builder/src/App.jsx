import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import InvoiceForm from "./components/InvoiceForm/InvoiceForm.jsx";
import LineItemsTable from "./components/LineItemsTable/LineItemsTable.jsx";
import TotalsSection from "./components/TotalsSection/TotalsSection.jsx";
import InvoicePreview from "./components/InvoicePreview/InvoicePreview.jsx";
import InvoiceSettings from "./components/InvoiceSettings/InvoiceSettings.jsx";

function App() {
  const [clientInfo, setClientInfo] = useState({
    name: "",
    address: "",
    invoiceNumber: "INV-1001",
    date: new Date().toISOString().substring(0, 10),
  });
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [taxRate, setTaxRate] = useState(10); // percent
  const [settings, setSettings] = useState({
    currencyCode: "USD",
    logoData: "",
    notes: "",
    terms: "",
  });
  const [settingsHeight, setSettingsHeight] = useState(null);
  const settingsRef = useRef(null);

  useEffect(() => {
    if (!settingsRef.current) return;
    const el = settingsRef.current;
    const measure = () => {
      setSettingsHeight(el.getBoundingClientRect().height);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + Number(it.amount || 0), 0),
    [items]
  );
  const tax = useMemo(() => (subtotal * taxRate) / 100, [subtotal, taxRate]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const invoiceValid = useMemo(() => {
    const requiredClient = [
      clientInfo.name,
      clientInfo.address,
      clientInfo.invoiceNumber,
      clientInfo.date,
    ].every((v) => v && String(v).trim() !== "");
    const itemsValid =
      items.length > 0 &&
      items.every(
        (it) => it.description && it.quantity > 0 && it.unitRate >= 0
      );
    return requiredClient && itemsValid;
  }, [clientInfo, items]);

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClientInfo((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = (item) => {
    if (editingIndex !== null) {
      setItems((prev) =>
        prev.map((it, idx) => (idx === editingIndex ? item : it))
      );
      setEditingIndex(null);
    } else {
      setItems((prev) => [...prev, item]);
    }
  };

  const startEditItem = (idx) => {
    setEditingIndex(idx);
  };

  const deleteItem = (idx) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
    if (editingIndex === idx) setEditingIndex(null);
  };

  const handleTaxRateChange = useCallback((rate) => setTaxRate(rate), []);

  const invoiceData = useMemo(
    () => ({
      ...clientInfo,
      items,
      subtotal,
      tax,
      total,
      taxRate,
      settings,
    }),
    [clientInfo, items, subtotal, tax, total, taxRate, settings]
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-900/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
            <span className="inline-block w-8 h-8 rounded-md bg-white/10 backdrop-blur-sm flex items-center justify-center text-sm font-bold">
              IB
            </span>
            <span>Invoice Builder</span>
          </h1>
          <span className="text-indigo-100 text-sm font-medium tracking-wide">
            Create • Manage • Export
          </span>
        </div>
      </header>

      <main className="w-full px-2 md:px-8 py-8 space-y-6">
        <div className="flex flex-col md:flex-row gap-8 items-stretch w-full">
          <div className="flex-1 min-w-0 bg-white rounded-xl shadow p-6">
            <InvoiceForm
              clientInfo={clientInfo}
              onChange={handleClientChange}
            />
          </div>
          <div className="flex-1 min-w-0 bg-white rounded-xl shadow p-6">
            <LineItemsTable
              items={items}
              onAdd={addItem}
              onEdit={startEditItem}
              onDelete={deleteItem}
              editingIndex={editingIndex}
            />
          </div>
          <div className="flex-1 min-w-0 bg-white rounded-xl shadow p-6">
            <TotalsSection
              subtotal={subtotal}
              tax={tax}
              total={total}
              onTaxRateChange={handleTaxRateChange}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-stretch w-full min-h-[400px]">
          <div className="flex-1 min-w-0 bg-white rounded-xl shadow p-6">
            <InvoicePreview
              invoiceData={invoiceData}
              forcedHeight={settingsHeight}
              invoiceValid={invoiceValid}
            />
          </div>
          <div
            className="flex-[0.8] min-w-[280px] w-full md:w-[310px] bg-white rounded-xl shadow p-6 shrink-0"
            ref={settingsRef}
          >
            <InvoiceSettings
              settings={settings}
              onChange={setSettings}
              onLogoChange={(logoData) =>
                setSettings((s) => ({ ...s, logoData }))
              }
            />
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-slate-500 py-6">
        © {new Date().getFullYear()} Invoice Builder
      </footer>
    </div>
  );
}

export default App;
