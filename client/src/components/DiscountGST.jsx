import { useState } from "react";

const GST_RATE = 0.05;

function DiscountGST({ subtotal }) {
  const [discountPercent, setDiscountPercent] = useState(0);
  const [gstType, setGstType] = useState("intra");
  const [tenderAmount, setTenderAmount] = useState(0);

  const safeSubtotal = Math.max(0, subtotal);
  const discountAmount = Number(
    (safeSubtotal * discountPercent / 100).toFixed(2)
  );
  const taxableAmount = Number(
    Math.max(0, safeSubtotal - discountAmount).toFixed(2)
  );
  const gstAmount = Number((taxableAmount * GST_RATE).toFixed(2));
  const cgstAmount =
    gstType === "intra" ? Number((gstAmount / 2).toFixed(2)) : 0;
  const sgstAmount = gstType === "intra" ? gstAmount - cgstAmount : 0;
  const igstAmount = gstType === "inter" ? gstAmount : 0;
  const totalAmount = Number((taxableAmount + gstAmount).toFixed(2));
  const balanceAmount = Number(
    Math.max(0, totalAmount - tenderAmount).toFixed(2)
  );

  function updateDiscountAmount(value) {
    const amount = Math.min(safeSubtotal, Math.max(0, Number(value) || 0));
    setDiscountPercent(
      safeSubtotal > 0 ? Number((amount / safeSubtotal * 100).toFixed(2)) : 0
    );
  }

  return (
    <div className="billing-summary-grid">
      <section className="panel discount-gst-panel">
        <h2>GST</h2>

        <label>
          GST Type
          <select
            value={gstType}
            onChange={(event) => setGstType(event.target.value)}
          >
            <option value="intra">CGST + SGST</option>
            <option value="inter">IGST</option>
          </select>
        </label>

        <div className="tax-summary">
          <p>Taxable Amount: ₹{taxableAmount.toFixed(2)}</p>
          <p>CGST: ₹{cgstAmount.toFixed(2)}</p>
          <p>SGST: ₹{sgstAmount.toFixed(2)}</p>
          <p>IGST: ₹{igstAmount.toFixed(2)}</p>
        </div>
      </section>

      <section className="panel total-amount-panel">
        <h2>Total Amount</h2>

        <div className="amount-summary">
          <p>
            <span>Subtotal</span>
            <strong>₹{safeSubtotal.toFixed(2)}</strong>
          </p>

          <label>
            Discount (%)
            <input
              type="number"
              min="0"
              max="100"
              value={discountPercent}
              onChange={(event) =>
                setDiscountPercent(
                  Math.min(100, Math.max(0, Number(event.target.value) || 0))
                )
              }
            />
          </label>

          <label>
            Discount Amount (₹)
            <input
              type="number"
              min="0"
              max={safeSubtotal}
              step="0.01"
              value={discountAmount}
              onChange={(event) => updateDiscountAmount(event.target.value)}
            />
          </label>

          <p>
            <span>GST (5%)</span>
            <strong>₹{gstAmount.toFixed(2)}</strong>
          </p>
        </div>

        <p className="grand-total">
          <span>Total</span>
          <strong>₹{totalAmount.toFixed(2)}</strong>
        </p>

        <label className="tender-field">
          Tender Amount (₹)
          <input
            type="number"
            min="0"
            step="0.01"
            value={tenderAmount}
            onChange={(event) =>
              setTenderAmount(Math.max(0, Number(event.target.value) || 0))
            }
          />
        </label>

        <p className="balance-amount">
          <span>Balance</span>
          <strong>₹{balanceAmount.toFixed(2)}</strong>
        </p>
      </section>
    </div>
  );
}

export default DiscountGST;
