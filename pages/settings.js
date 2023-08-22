import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { withSwal } from "react-sweetalert2";

function SettingsPage({ swal }) {
  const [products, setProducts] = useState([]);
  const [featuredProductId, setFeaturedProductId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shippingFee, setShippingFee] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchAll().then(() => {
      setIsLoading(false);
    });
  }, []);

  async function fetchAll() {
    setIsLoading(true);
    await axios.get("/api/products").then((res) => {
      setProducts(res.data);
    });
    const featuredProductResponse = await axios.get(
      "/api/settings?name=featuredProductId"
    );
    if (featuredProductResponse && featuredProductResponse.data) {
      setFeaturedProductId(featuredProductResponse.data.value);
    }
    const shippingFeeResponse = await axios.get(
      "/api/settings?name=shippingFee"
    );
    if (shippingFeeResponse && shippingFeeResponse.data) {
      setShippingFee(shippingFeeResponse.data.value);
    }
    setIsLoading(false);
  }

  async function saveSettings() {
    setIsLoading(true);
    await axios.put("/api/settings", {
      name: "featuredProductId",
      value: featuredProductId,
    });
    await axios.put("/api/settings", {
      name: "shippingFee",
      value: shippingFee,
    });
    setIsLoading(false);
    await swal.fire({
      title: "Settings saved!",
      icon: "success",
    });
  }

  return (
    <Layout>
      <h1 className="uppercase font-bold">Configuración</h1>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <label className="font-bold">Producto Principal</label>
          <select
            value={featuredProductId}
            onChange={(ev) => setFeaturedProductId(ev.target.value)}
          >
            {products.length > 0 &&
              products.map((product, index) => (
                <option key={index} value={product._id}>
                  {product.title}
                </option>
              ))}
          </select>
          <label className="font-bold">Precio de Venta (ARS)</label>
          <input
            type="number"
            value={shippingFee}
            onChange={(ev) => setShippingFee(ev.target.value)}
          />
          <div>
            <button
              onClick={saveSettings}
              className="
             bg-black text-white rounded-sm px-2 py-1 whitespace-nowrap hover:bg-slate-600
            "
            >
              Guardar Cambios
            </button>
          </div>
        </>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }) => <SettingsPage swal={swal} />);
