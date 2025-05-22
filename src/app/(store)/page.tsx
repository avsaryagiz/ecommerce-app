import BlackFridayBanner from "@/components/blackfriday-banner";
import ProductsView from "@/components/products-view";
import { getAllCategories, getAllProducts } from "@/sanity/lib/products";

export default async function HomePage() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  return (
    <div>
      <BlackFridayBanner />
      <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
