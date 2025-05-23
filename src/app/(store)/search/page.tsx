import ProductGrid from "@/components/product-grid";
import { ROUTES } from "@/constants/app-routes";
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

  // If no query is provided, prompt the user to try again
  if (!query) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-start bg-gray-50 p-4 pt-10 sm:p-6">
        <div className="w-full max-w-5xl text-center">
          <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            No search query provided
          </h1>
          <p className="text-lg text-gray-600">
            Please go back to the{" "}
            <Link
              href={ROUTES.HOME}
              aria-label="Go to homepage"
              className="text-blue-600 hover:underline"
            >
              homepage
            </Link>{" "}
            and try again.
          </p>
        </div>
      </main>
    );
  }

  // Search for products using the provided query
  const products = await searchProductsByName(query);

  // If no products were found, inform the user
  if (!products || products.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-start bg-gray-50 p-4 pt-10 sm:p-6">
        <div className="w-full max-w-5xl text-center">
          <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            No products found for <span className="text-red-600">{query}</span>
          </h1>
          <p className="text-center text-lg text-gray-600">
            Try a different search term or return to the{" "}
            <Link
              href={ROUTES.HOME}
              aria-label="Go to homepage"
              className="text-blue-600 hover:underline"
            >
              homepage
            </Link>
            .
          </p>
        </div>
      </main>
    );
  }

  // Render search results with a product grid
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-50 p-4 pt-10 sm:p-6">
      <div className="w-full max-w-5xl">
        <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Search Results for{" "}
          <span className="break-words text-red-600">{query}</span>
        </h1>
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
