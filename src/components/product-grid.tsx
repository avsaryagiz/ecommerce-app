"use client";

import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./product-thumb";
import type { Product } from "../../sanity.types";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <AnimatePresence key={product._id}>
          <motion.div
            layout
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <ProductThumb product={product} priority={index < 4} />
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  );
}
