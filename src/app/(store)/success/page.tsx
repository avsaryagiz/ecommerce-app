"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckmarkIcon } from "@sanity/icons";
import { Button } from "@/components/ui";
import useBasketStore from "@/stores/basket-store";

export default function SuccessPage() {
  const searchParams = useSearchParams();

  // Get the order number from the URL query parameters
  const orderNumber = searchParams.get("orderNumber");

  // Access the clearBasket function from the basket store
  const clearBasket = useBasketStore((state) => state.clearBasket);

  // Clear the basket only once the orderNumber is confirmed (on success page load)
  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="mx-4 flex w-full max-w-2xl flex-col items-center rounded-xl bg-white p-12 shadow-lg">
        <CheckmarkIcon className="mb-6 size-16 rounded-full bg-green-100 text-green-600" />
        <h1 className="mb-6 text-center text-4xl font-bold capitalize">
          Thank you for your order!
        </h1>

        {/* Order summary */}
        <div className="mb-6 border-t border-b border-gray-200 py-6">
          <p className="mb-4 text-lg text-gray-700">
            Your order has been confirmed and will be shipped shortly.
          </p>

          {/* Show order number if available */}
          <div className="space-y-2">
            {orderNumber && (
              <p className="flex items-center space-x-5 text-gray-600">
                <span className="font-semibold">Order Number:</span>
                <span className="font-mono text-sm text-green-600">
                  {orderNumber}
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="space-y-4">
          <p className="text-gray-600">
            A confirmation email has been sent to your registered email address.
          </p>

          {/* Action buttons for order and continue shopping */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/orders">View Order Details</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
