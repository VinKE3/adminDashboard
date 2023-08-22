import ProductForm from "@/components/ProductForm";
import Layout from "@/components/Layout";

export default function NewProduct() {
  return (
    <Layout>
      <h1 className="font-bold uppercase">Nuevo Producto</h1>
      <ProductForm />
    </Layout>
  );
}
