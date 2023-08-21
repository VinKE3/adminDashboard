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
      <Link
        className="
        bg-black text-white px-4 py-2 rounded-md mb-2 font-bold hover:bg-gray-900
      "
        href={"/products/new"}
      >
        Agregar producto
      </Link>
      <select
        className="
       mt-4  bg-white text-black px-4 py-2 rounded-md mb-2 font-bold 
      "
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Todas las Categorias</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <table className="basic mt-2 font-bold uppercase">
        <thead>
          <tr>
            <td>Nombre del Producto</td>
            <td>Acciones</td>
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
                  className="
                   bg-blue-500 text-white px-4 py-2 rounded-md mb-2 font-bold hover:bg-blue-700
                  "
                  href={"/products/edit/" + product._id}
                >
                  Editar
                </Link>
                <Link
                  className="
                   bg-red-500 text-white px-4 py-2 rounded-md mb-2 font-bold hover:bg-red-700"
                  href={"/products/delete/" + product._id}
                >
                  Eliminar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
