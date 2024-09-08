import React, { useEffect, useState } from "react";
import { retriveProductsOfCategoryById } from "./API/zetoServiceApi";
import { useNavigate, useParams } from "react-router-dom";

export default function ListCategoryComponent() {
  const { id } = useParams();
  const [products, setProducts] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    ListOfProductsOfCategoryWithId();
  }, [id]);

  function backToCategory(){
    navigate('/categories')
  }
  function ListOfProductsOfCategoryWithId() {
    retriveProductsOfCategoryById(id)
      .then((response) => {
        console.log(response);
        console.log(response.data);
        console.log("Logs");
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <div>Products Under the Category:</div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>StockAvailable</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products !== null && products.length > 0  ?(
            // If products is not null, map over the array and render each product
            products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.nameOfProduct}</td>
                <td>{prod.description}</td>
                <td>{prod.stockAvailable}</td>
                <td>{prod.price}</td>
              </tr>
            ))
          ) : (
            // If products is null, display a message indicating no data
            <tr>
              <td colSpan="4">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={backToCategory}>Back to Category</button>
    </div>
  );
}
