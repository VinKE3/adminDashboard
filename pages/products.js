import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    setIsLoading(true);
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
      setIsLoading(false);
    });
  }

  const filteredProducts = products.filter((product) => {
    if (!selectedCategory) {
      return true;
    }
    return product.category === selectedCategory;
  });

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <Layout>
      <Link className="btn-primary" href={"/products/new"}>
        Add new product
      </Link>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Product name</td>
            <td>Options</td>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={2}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          )}
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>
                <Link
                  className="btn-default"
                  href={"/products/edit/" + product._id}
                >
                  Edit
                </Link>
                <Link
                  className="btn-red"
                  href={"/products/delete/" + product._id}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
