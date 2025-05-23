"use client";

import { useEffect, useState } from "react";
import useBasketStore from "@/stores/basket-store";
import { Button } from "./ui";
import type { Product } from "../../sanity.types";
import { cn } from "@/lib/utils";

interface AddToBasketButtonProps {
  product: Product;
  disabled?: boolean;
}

export default function AddToBasketButton({
  product,
  disabled,
}: AddToBasketButtonProps) {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) {
    return null;
  }
  return (
    <div className="flex items-center justify-center gap-2">
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
      <span className="w-8 text-center font-semibold">{itemCount}</span>
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
