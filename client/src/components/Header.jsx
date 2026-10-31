function Header({ theme, onToggleTheme }) {
  const billNumber = "BILL-0001";
  const billDate = new Date().toISOString().slice(0, 10);

  return (
    <header className="header">
      <h1>Clothing Store</h1>

      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        aria-pressed={theme === "dark"}
      >
        {theme === "light" ? "Dark mode" : "Light mode"}
      </button>

      <div className="bill-info">
        <p>Bill No: {billNumber}</p>
        <p>Date: {billDate}</p>
      </div>
    </header>
  );
}

export default Header;