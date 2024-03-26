import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductListPage() {
  // The state variable `products` is currently an empty array [],
  // but you should use it to store the response from the Fake Store API (the list of products).
  const [products, setProducts] = useState([]);

  // To fetch the list of products, set up an effect with the `useEffect` hook:
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((response) => {
      console.log(response);
      setProducts(response.data);
    });
  });

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div className="ProductListPage">
      {products &&
        products.map((oneProduct) => {
          return (
            <Link to={`/product/details/${oneProduct.id}`} key={oneProduct.id}>
              <div className="card">
                <img
                  src={oneProduct.image}
                  alt={oneProduct.name}
                  style={{ height: "100px" }}
                />
                <div className="card-content">
                  <p className="font-bold">{oneProduct.title}</p>
                  <p className="product-cat">{oneProduct.category}</p>
                  <p className="product-price">${oneProduct.price}</p>
                  <p className="product-descri">
                    {truncateDescription(oneProduct.description, 50)}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default ProductListPage;
