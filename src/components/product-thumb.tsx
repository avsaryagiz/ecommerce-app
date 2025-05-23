import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { cn, formatCurrency } from "@/lib/utils";
import type { Product } from "../../sanity.types";
import { ROUTES } from "@/constants/app-routes";

export default function ProductThumb({ product }: { product: Product }) {
  // Check if the product is out of stock (stock defined and zero or less)
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    // Link to product detail page with accessibility label
    <Link
      href={ROUTES.PRODUCT(product.slug?.current ?? "")}
      aria-label={`View details for ${product.name}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
        // Dim and disable interaction if out of stock
        isOutOfStock && "pointer-events-none opacity-50",
      )}
    >
      <div className="relative aspect-square h-full w-full overflow-hidden">
        {/* Product image with hover zoom effect */}
        <Image
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          src={urlFor(product.image!).url()}
          alt={product.name || "Unnamed product image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Show "Out of Stock" overlay if product is not available */}
        {isOutOfStock && (
          <>
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <span className="text-lg font-bold text-white">Out of Stock</span>
            </div>
            <span className="absolute top-2 left-2 z-10 rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow">
              Out of Stock
            </span>
          </>
        )}
      </div>
      <div className="p-4">
        {/* Product name */}
        <h2 className="truncate text-lg font-semibold text-gray-800">
          {product.name}
        </h2>
        {/* Product description extracted from block content */}
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {product.description
            ?.map((block) =>
              block._type === "block"
                ? block.children?.map((child) => child.text).join("")
                : "",
            )
            .join("") || "No description available."}
        </p>
        {/* Product price formatted as currency, fallback to zero */}
        <p className="mt-2 text-lg font-bold text-gray-900">
          {product.price ? formatCurrency(product.price) : "₺0,00"}
        </p>
      </div>
    </Link>
  );
}
