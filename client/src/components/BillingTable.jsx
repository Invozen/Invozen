import { useEffect, useState } from "react";

// Sample employee details
const employees = [
  { employeeNo: "EMP001", employeeName: "Ravi" },
  { employeeNo: "EMP002", employeeName: "Kumar" },
  { employeeNo: "EMP003", employeeName: "Priya" },
];

function BillingTable({ onSubtotalChange }) {
  const createEmptyRow = () => ({
    id: crypto.randomUUID(),
    employeeNo: "",
    productNo: "",
    productName: "",
    unitPrice: "",
    qty: 1,
    discountPercent: 0,
    discountAmount: 0,
  });

  const [items, setItems] = useState([createEmptyRow()]);

  useEffect(() => {
    const subtotal = items.reduce((total, item) => {
      const grossAmount =
        (Number(item.unitPrice) || 0) * (Number(item.qty) || 0);
      const discountAmount = Math.min(
        grossAmount,
        Math.max(0, Number(item.discountAmount) || 0)
      );

      return total + grossAmount - discountAmount;
    }, 0);

    onSubtotalChange(subtotal);
  }, [items, onSubtotalChange]);

  function updateItem(id, field, value) {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) return item;

        const updatedItem = { ...item, [field]: value };

        const grossAmount =
          (Number(updatedItem.unitPrice) || 0) *
          (Number(updatedItem.qty) || 0);

        if (field === "discountPercent") {
          const percent = Math.min(
            100,
            Math.max(0, Number(value) || 0)
          );

          updatedItem.discountPercent = percent;
          updatedItem.discountAmount = Number(
            (grossAmount * percent / 100).toFixed(2)
          );
        }

        if (field === "discountAmount") {
          const amount = Math.min(
            grossAmount,
            Math.max(0, Number(value) || 0)
          );

          updatedItem.discountAmount = amount;
          updatedItem.discountPercent =
            grossAmount > 0
              ? Number((amount / grossAmount * 100).toFixed(2))
              : 0;
        }

        if (field === "unitPrice" || field === "qty") {
          const percent = Math.min(
            100,
            Math.max(0, Number(updatedItem.discountPercent) || 0)
          );

          updatedItem.discountPercent = percent;
          updatedItem.discountAmount = Number(
            (grossAmount * percent / 100).toFixed(2)
          );
        }

        return updatedItem;
      })
    );
  }

  function addRow() {
    setItems((currentItems) => [
      ...currentItems,
      createEmptyRow(),
    ]);
  }

  function handleLastInputKeyDown(event, index) {
    if (
      event.key === "Tab" &&
      !event.shiftKey &&
      index === items.length - 1
    ) {
      event.preventDefault();
      addRow();
    }
  }

  return (
    <section className="panel billing-table-panel">
      <h2>Billing Items</h2>

      <div className="table-wrap">
        <table className="billing-table">
          <thead>
            <tr>
              <th>Sl.</th>
              <th>Employee No.</th>
              <th>Product No.</th>
              <th>Product Name</th>
              <th>Unit Price (₹)</th>
              <th>Discount (%)</th>
              <th>Discount (₹)</th>
              <th>Qty</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => {
              const price = Number(item.unitPrice) || 0;
              const qty = Number(item.qty) || 0;
              const grossAmount = price * qty;

              const discountAmount = Math.min(
                grossAmount,
                Math.max(0, Number(item.discountAmount) || 0)
              );

              const amount = grossAmount - discountAmount;

              return (
                <tr key={item.id}>
                  <td>{index + 1}</td>

                  <td>
                    <input
                      type="text"
                      value={item.employeeNo}
                      onChange={(event) =>
                        updateItem(
                          item.id,
                          "employeeNo",
                          event.target.value
                        )
                      }
                      placeholder="EMP001"
                      aria-label={`Row ${index + 1} employee number`}
                    />
                  </td>

                  <td>
                    <input
                      value={item.productNo}
                      onChange={(event) =>
                        updateItem(item.id, "productNo", event.target.value)
                      }
                      placeholder="PR001"
                      aria-label={`Row ${index + 1} product number`}
                    />
                  </td>

                  <td>
                    <input
                      value={item.productName}
                      onChange={(event) =>
                        updateItem(item.id, "productName", event.target.value)
                      }
                      placeholder="Product name"
                      aria-label={`Row ${index + 1} product name`}
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(event) =>
                        updateItem(item.id, "unitPrice", event.target.value)
                      }
                      placeholder="0.00"
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={item.discountPercent}
                      onChange={(event) =>
                        updateItem(
                          item.id,
                          "discountPercent",
                          event.target.value
                        )
                      }
                      onKeyDown={(event) =>
                        handleLastInputKeyDown(event, index)
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      max={grossAmount}
                      step="0.01"
                      value={item.discountAmount}
                      onChange={(event) =>
                        updateItem(
                          item.id,
                          "discountAmount",
                          event.target.value
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={item.qty}
                      onChange={(event) =>
                        updateItem(item.id, "qty", event.target.value)
                      }
                    />
                  </td>

                  <td>₹{amount.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="secondary-button"
        onClick={addRow}
      >
        + Add Item
      </button>

      {/* Employee List */}
      <h2>Employee List</h2>

      <div className="table-wrap">
        <table className="billing-table">
          <thead>
            <tr>
              <th>Employee No.</th>
              <th>Employee Name</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.employeeNo}>
                <td>{employee.employeeNo}</td>
                <td>{employee.employeeName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default BillingTable;