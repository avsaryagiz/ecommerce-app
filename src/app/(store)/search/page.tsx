import ProductGrid from "@/components/product-grid";
import { searchProductsByName } from "@/sanity/lib/products";
import Link from "next/link";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
  }>;
}) {
  const { query } = await searchParams;
  if (!query) {
    return <div>No search query provided</div>;
  }
  const products = await searchProductsByName(query);
  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100 p-4">
        <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md">
          <h1 className="mb-6 text-center text-3xl font-bold">
            No products found for <span className="text-red-600">{query}</span>
          </h1>
          <p className="text-center text-gray-600">
            Try searching for something else or check out our{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              homepage
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-start bg-gray-100 p-4">
      <div className="w-full max-w-4xl rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Search Results for <span className="text-red-600">{query}</span>
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
