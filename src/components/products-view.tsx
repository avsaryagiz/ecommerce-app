import ProductGrid from "./product-grid";
import { Separator } from "./ui";
import type { Category, Product } from "../../sanity.types";
import CategorySelector from "./category-selector";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

export default function ProductsView({
  products,
  categories,
}: ProductsViewProps) {
  console.log("Products", products);
  return (
    <div className="flex flex-col">
      {/* Categories */}
      <div className="w-full sm:w-[200px]">
        <CategorySelector categories={categories} />
      </div>

      {/* Products */}
      <div className="flex-1">
        <div>
          <ProductGrid products={products} />
          <Separator className="w-1/2 sm:w-3/4" />
        </div>
      </div>
    </div>
  );
}
