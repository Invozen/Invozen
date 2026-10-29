function Header() {
  const billNumber = "BILL-0001";
  const billDate = new Date().toISOString().slice(0, 10);

  return (
    <header className="app-header">
      <h1>Clothing Store</h1>

      <div className="bill-info">
        <p>Bill No: {billNumber}</p>
        <p>Date: {billDate}</p>
      </div>
    </header>
  );
}

export default Header;