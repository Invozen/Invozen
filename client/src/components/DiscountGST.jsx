
import { useState } from "react";

function DiscountGST() {
  const [discountPercent, setDiscountPercent] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [gstType, setGstType] = useState("intra");

  return (
    <section className="panel discount-gst-panel">
      <h2>Discount & GST</h2>

      <label>
        Discount (%)
        <input
          type="number"
          min="0"
          max="100"
          value={discountPercent}
          onChange={(event) =>
            setDiscountPercent(event.target.value)
          }
        />
      </label>

      <label>
        Discount Amount (₹)
        <input
          type="number"
          min="0"
          value={discountAmount}
          onChange={(event) =>
            setDiscountAmount(event.target.value)
          }
        />
      </label>

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
        <p>Taxable Amount: ₹0.00</p>
        <p>CGST: ₹0.00</p>
        <p>SGST: ₹0.00</p>
        <p>IGST: ₹0.00</p>
      </div>
    </section>
  );
}

export default DiscountGST;
