"use client";

import AddToBasketButton from "@/components/add-to-basket-button";
import Loader from "@/components/loader";
import { Button } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import useBasketStore from "@/stores/basket-store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  createCheckoutSession,
  Metadata,
} from "../../../../actions/create-checkout-session";

export default function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center p-4">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Your Basket</h1>
        <p className="text-lg font-bold text-gray-600">Your basker is empty.</p>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);
    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0]?.emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Your Basket</h1>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          {groupedItems.map((item) => (
            <div
              key={item.product._id}
              className="mb-4 flex items-center justify-between rounded border p-4"
            >
              <div
                className="flex min-w-0 flex-1 cursor-pointer items-center"
                onClick={() =>
                  router.push(`/product/${item.product.slug?.current}`)
                }
              >
                <div className="mr-4 size-20 shrink-0 sm:size-24">
                  {item.product.image && (
                    <Image
                      src={urlFor(item.product.image).url()}
                      alt={item.product.name ?? "Product image"}
                      width={96}
                      height={96}
                      className="h-full w-full rounded object-cover"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-semibold sm:text-xl">
                    {item.product.name}
                  </h2>
                  <p className="text-sm sm:text-base">
                    Price:{" "}
                    {formatCurrency(
                      item.product.price
                        ? item.product.price * item.quantity
                        : 0,
                    )}
                  </p>
                </div>
              </div>
              <div className="ml-4 flex shrink-0 items-center">
                <AddToBasketButton product={item.product} />
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 left-0 order-first h-fit w-full rounded border bg-white p-6 lg:sticky lg:top-4 lg:left-auto lg:order-last lg:w-80">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          <div className="mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Items:</span>
              <span>
                {groupedItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            </p>
            <p className="flex justify-between border-t pt-2 text-2xl font-bold">
              <span>Total</span>
              <span>
                {formatCurrency(
                  groupedItems.reduce(
                    (total, item) =>
                      total + (item.product.price ? item.product.price : 0),
                    0,
                  ),
                )}
              </span>
            </p>
          </div>

          {isSignedIn ? (
            <Button
              onClick={handleCheckout}
              className="mt-4 w-full cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Checkout"}
            </Button>
          ) : (
            <SignInButton mode="modal">
              <Button className="mt-4 w-full cursor-pointer">
                Sign in to Checkout
              </Button>
            </SignInButton>
          )}
        </div>
        <div className="h-64 lg:h-0" />
      </div>
    </div>
  );
}
