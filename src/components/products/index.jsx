import { useEffect, useState } from "react";
import ProductList from "./ui";

export default function Productlist() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const json = await response.json();
        setProducts(json.products);
      } catch (error) {
        console.warn("error2", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (error) {
    return <span>Error: {error?.message} </span>;
  }

  console.log(products);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>
        <ProductList products={products} title="tom" />
      </div>
    </div>
  );
}
