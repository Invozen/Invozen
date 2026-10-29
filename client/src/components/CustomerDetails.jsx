function CustomerDetails() {
  return (
    <section className="panel">
      <h2>Customer Details</h2>

      <div className="customer-fields">
        <label>
          Customer Name
          <input
            type="text"
            placeholder="Enter customer name"
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            placeholder="Enter phone number"
          />
        </label>

        <label>
          Address
          <input
            type="text"
            placeholder="Enter customer address"
          />
        </label>
      </div>
    </section>
  );
}

export default CustomerDetails;