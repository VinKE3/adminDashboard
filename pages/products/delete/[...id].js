import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);
  function goBack() {
    router.push("/products");
  }
  async function deleteProduct() {
    await axios.delete("/api/products?id=" + id);
    goBack();
  }
  return (
    <Layout>
      <h1 className="text-center">
        Desea Eliminar el siguiente Producto: &nbsp;{productInfo?.title}?
      </h1>
      <Image
        src={productInfo?.images[0]}
        width={300}
        height={300}
        className="mx-auto"
        alt="imagen-producto"
      />
      <div className="flex gap-2 justify-center">
        <button
          onClick={deleteProduct}
          className="bg-red-600 text-white rounded-lg px-2 py-1 whitespace-nowrap hover:bg-red-700 w-12"
        >
          Si
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
