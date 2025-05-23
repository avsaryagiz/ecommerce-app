"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import {
  createCheckoutSession,
  Metadata as SessionMetadata,
} from "../../../../actions/create-checkout-session";
import AddToBasketButton from "@/components/add-to-basket-button";
import Loader from "@/components/loader";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Separator,
} from "@/components/ui";
import useBasketStore from "@/stores/basket-store";
import { formatCurrency } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

export default function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Ensure client-side rendering to avoid hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loader during SSR or initial load
  if (!isClient) {
    return <Loader />;
  }

  // Display message if basket is empty
  if (groupedItems.length === 0) {
    return (
      <main className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Your Basket
        </h1>
        <p className="text-muted-foreground text-lg">Your basket is empty.</p>
      </main>
    );
  }

  // Trigger checkout session creation and redirect
  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);
    try {
      const metadata: SessionMetadata = {
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
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-50 p-4 pt-10 sm:p-6">
      <div className="w-full max-w-5xl">
        {/* Page title */}
        <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Your Basket
        </h1>
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Basket items */}
          <div className="flex-1 space-y-4">
            {groupedItems.map((item) => (
              <Card key={item.product._id}>
                <CardContent className="flex items-center gap-4 p-4 sm:gap-6">
                  <Link
                    href={`/product/${item.product.slug?.current}`}
                    className="focus-visible:ring-ring group relative aspect-square w-24 shrink-0 overflow-hidden rounded border"
                    aria-label={`View details for ${item.product.name}`}
                  >
                    {item.product.image && (
                      <Image
                        src={urlFor(item.product.image).url()}
                        alt={item.product.name ?? "Product image"}
                        fill
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    )}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link href={`/product/${item.product.slug?.current}`}>
                      <h2 className="text-lg font-medium">
                        {item.product.name}
                      </h2>
                    </Link>
                    <p className="text-muted-foreground text-sm">
                      {item.quantity} ×{" "}
                      {formatCurrency(item.product.price ?? 0)} ={" "}
                      <strong>
                        {formatCurrency(
                          (item.product.price ?? 0) * item.quantity,
                        )}
                      </strong>
                    </p>
                  </div>
                  <div>
                    <AddToBasketButton product={item.product} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order summary and checkout */}
          <div className="fixed bottom-0 left-0 order-first h-fit w-full lg:sticky lg:top-4 lg:left-auto lg:order-last lg:w-80">
            <Card className="w-full max-sm:px-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span>
                    {groupedItems.reduce(
                      (total, item) => total + item.quantity,
                      0,
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>
                    {formatCurrency(
                      groupedItems.reduce(
                        (total, item) =>
                          total + (item.product.price ?? 0) * item.quantity,
                        0,
                      ),
                    )}
                  </span>
                </div>

                {/* Show checkout button if signed in, else sign-in button */}
                {isSignedIn ? (
                  <Button
                    onClick={handleCheckout}
                    className="w-full cursor-pointer"
                    disabled={isLoading}
                    aria-disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Proceed to Checkout"}
                  </Button>
                ) : (
                  <SignInButton mode="modal">
                    <Button className="w-full">Sign in to Checkout</Button>
                  </SignInButton>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
