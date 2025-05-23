import { Metadata } from "next";
import ProductsView from "@/components/products-view";
import { formatSlugToTitle } from "@/lib/utils";
import { getAllCategories, getProductsByCategory } from "@/sanity/lib/products";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch products under the current category
  const products = await getProductsByCategory(slug);

  // Fetch all categories for filtering
  const categories = await getAllCategories();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-100 p-4">
      <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          {/* Convert slug to readable title case (e.g., "smart-phones" → "Smart Phones") */}
          {formatSlugToTitle(slug)} Collection
        </h1>
        <ProductsView categories={categories} products={products} />
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map((category) => ({
    slug: category.slug?.current ?? "",
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find((cat) => cat.slug?.current === slug);
  const title = category?.title || "Category not found";
  const description = category?.description || "Explore our collection";

  return {
    title: `${title}`,
    description,
  };
}
