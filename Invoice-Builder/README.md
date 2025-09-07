# Invoice Builder

A modern React-based invoice builder app with PDF export, validation, modular CSS, and a professional UI.

## Tech Stack & Key Concepts

- **React**: UI library for building interactive interfaces.
- **useState**: React hook for managing component state.
- **useEffect**: React hook for side effects (e.g., measuring DOM, syncing data).
- **useRef**: React hook for referencing DOM elements (e.g., for PDF export).
- **jsPDF & html2canvas**: Libraries for exporting invoice preview as PDF.
- **FontAwesome**: Icon library for modern UI icons.
- **Modular CSS**: Scoped styles for each component.

## Components

- **App.jsx**: Main layout, state management, and data flow between components.
- **InvoiceForm.jsx**: Client info form with validation and modern UI.
- **LineItemsTable.jsx**: Table for adding/editing/removing invoice line items.
- **TotalsSection.jsx**: Displays subtotal, tax, and total with collapsible UI.
- **InvoicePreview.jsx**: Live invoice preview and PDF export logic.
- **InvoiceSettings.jsx**: Settings panel for currency, notes, terms, and logo upload.

## How to Run

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm run dev
   ```
3. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in terminal).

## How to Initialize

- Clone the repository:
  ```sh
  git clone <repo-url>
  cd Invoice-Builder
  ```
- Install dependencies and start as above.

---

For any issues, check Node.js version and ensure all dependencies are installed.
