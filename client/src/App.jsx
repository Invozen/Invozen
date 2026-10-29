
import "./App.css";

import Header from "./components/Header";
import CustomerDetails from "./components/CustomerDetails";
import BillingTable from "./components/BillingTable";
import ProductList from "./components/ProductList";
import DiscountGST from "./components/DiscountGST";

function App() {
  return (
    <div className="app">
      <Header />

      <div className="billing-layout">
        <div className="billing-left">
          <CustomerDetails />

          <BillingTable />

          <DiscountGST />
        </div>

        <ProductList />
      </div>
    </div>
  );
}

export default App;
