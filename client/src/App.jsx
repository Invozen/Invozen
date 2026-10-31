
import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import CustomerDetails from "./components/CustomerDetails";
import BillingTable from "./components/BillingTable";
import ProductList from "./components/ProductList";
import DiscountGST from "./components/DiscountGST";

function App() {
  const [theme, setTheme] = useState("light");
  const [subtotal, setSubtotal] = useState(0);

  return (
    <div className="app" data-theme={theme}>
      <Header
        theme={theme}
        onToggleTheme={() =>
          setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light"
          )
        }
      />

      <div className="billing-layout">
        <div className="billing-left">
          <CustomerDetails />

          <BillingTable onSubtotalChange={setSubtotal} />

          <DiscountGST subtotal={subtotal} />
        </div>

        <ProductList />
      </div>
    </div>
  );
}

export default App;
