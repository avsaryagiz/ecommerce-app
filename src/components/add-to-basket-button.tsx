"use client";

import { useEffect, useState } from "react";
import useBasketStore from "@/stores/basket-store";
import { cn } from "@/lib/utils";
import { Button } from "./ui";
import type { Product } from "../../sanity.types";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

export default function AddToBasketButton({
  product,
  disabled,
}: AddToBasketButtonProps) {
  // Access basket actions and selectors from the store
  const { addItem, removeItem, getItemCount } = useBasketStore();

  // Get current quantity of this product in the basket
  const itemCount = getItemCount(product._id);

  // Prevent rendering on the server to avoid hydration issues
  const [isClient, setIsClient] = useState(false);

  // Ensure this component only renders on the client side to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className="flex items-center justify-center gap-2">
      {/* Button to decrease item count */}
      <Button
        size="icon"
        onClick={() => removeItem(product._id)}
        variant="outline"
        className={cn(
          "cursor-pointer rounded-full pb-0.5 font-bold transition-transform active:scale-95",
          itemCount === 0 && "cursor-not-allowed bg-gray-100",
        )}
        disabled={itemCount === 0 || disabled}
      >
        –
      </Button>

      {/* Display current item count */}
      <span className="w-8 text-center font-semibold">{itemCount}</span>

      {/* Button to increase item count */}
      <Button
        size="icon"
        onClick={() => addItem(product)}
        variant="default"
        className={cn(
          "cursor-pointer rounded-full pb-0.5 text-xl font-bold transition-transform active:scale-95",
          disabled && "cursor-not-allowed bg-gray-400",
        )}
        disabled={disabled}
      >
        +
      </Button>
    </div>
  );
}
