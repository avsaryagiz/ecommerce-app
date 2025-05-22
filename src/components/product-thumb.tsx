import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "../../sanity.types";

export default function ProductThumb({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;
  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md",
        isOutOfStock && "pointer-events-none opacity-50",
      )}
    >
      <div className="relative aspect-square h-full w-full overflow-hidden">
        <Image
          className="object-contain transition-transform duration-300 group-hover:scale-105"
          src={urlFor(product.image!).url()}
          alt={product.name || "Product Image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="text-lg font-bold text-white">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="truncate text-lg font-semibold text-gray-800">
          {product.name}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {product.description
            ?.map((block) =>
              block._type === "block"
                ? block.children?.map((child) => child.text).join("")
                : "",
            )
            .join("") || "No description available."}
        </p>
        <p className="mt-2 text-lg font-bold text-gray-900">
          {product.price ? formatPrice(product.price) : "₺0,00"}
        </p>
      </div>
    </Link>
  );
}
