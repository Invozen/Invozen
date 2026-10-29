
import { useState } from "react";

function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");

  // Temporary sample products
  const products = [
    { productNo: "PR001", productName: "T-Shirt" },
    { productNo: "PR002", productName: "Jeans" },
    { productNo: "PR003", productName: "Shirt" },
    { productNo: "PR004", productName: "Kurti" },
    { productNo: "PR005", productName: "Trousers" },
  ];

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase();

    return (
      product.productNo.toLowerCase().includes(search) ||
      product.productName.toLowerCase().includes(search)
    );
  });

  return (
    <section className="panel product-list-panel">
      <h2>Product List</h2>

      <input
        type="text"
        placeholder="Search product no. or name"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <table className="product-list-table">
        <thead>
          <tr>
            <th>Product No.</th>
            <th>Product Name</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.productNo}>
                <td>{product.productNo}</td>
                <td>{product.productName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No products found</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default ProductList;
