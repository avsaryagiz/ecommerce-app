import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import AddToBasketButton from "@/components/add-to-basket-button";
import { getProductBySlug } from "@/sanity/lib/products";
import { cn, formatCurrency } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

// Enable static site generation with hourly revalidation
export const dynamic = "force-static";
export const revalidate = 3600; // 1 hour
// @todo: use SSG for product pages later

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch product data by slug
  const product = await getProductBySlug(slug);

  // Show 404 page if product is not found
  if (!product) {
    return notFound();
  }

  // Determine if product is out of stock
  const isOutOfStock =
    product.stock !== undefined && product.stock !== null && product.stock <= 0;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Image Section */}
        <div
          className={cn(
            "relative aspect-square overflow-hidden rounded-lg shadow-lg",
            isOutOfStock && "opacity-50",
          )}
        >
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product.name ?? "Product Image"}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          )}

          {/* Show overlay if out of stock */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-lg font-bold text-white">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
            <div className="mb-4 text-xl font-semibold">
              {product.price && (formatCurrency(product.price) ?? "₺0,00")}
            </div>
            <div className="prose mb-6 max-w-none">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>
          <AddToBasketButton product={product} disabled={isOutOfStock} />
        </div>
      </div>
    </main>
  );
}
