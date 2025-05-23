"use client";

import Link from "next/link";
import Form from "next/form";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { PackageIcon, SearchIcon, TrolleyIcon } from "@sanity/icons";
import { InputWithAddon } from "../input-with-addon";
import { Button, buttonVariants } from "../ui";
import useBasketStore from "@/stores/basket-store";
import { cn } from "@/lib/utils";

export default function Header() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Mobile Top Part: Logo + Search */}
        <div className="flex flex-col items-center gap-3 sm:flex-1 sm:flex-row sm:items-center sm:justify-start sm:gap-6">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Go to homepage"
            className="text-2xl font-bold text-blue-500 hover:opacity-80 focus:ring-2 focus:ring-blue-500 focus:outline-none sm:mr-4 sm:text-3xl"
          >
            <span className="font-brand block text-center font-bold sm:text-left">
              Zera
            </span>
          </Link>

          {/* Search Form */}
          <Form action="/search" role="search" className="flex w-full max-w-lg">
            <InputWithAddon
              placeholder="Search for products..."
              name="query"
              rightAddon={
                <Button
                  variant="ghost"
                  type="submit"
                  className="cursor-pointer"
                >
                  <SearchIcon className="size-5" />
                  Search
                </Button>
              }
            />
          </Form>
        </div>

        {/* Mobile Bottom Part: Actions */}
        <div className="xs:justify-center mt-2 flex justify-between gap-4 sm:mt-0 sm:flex-nowrap sm:justify-end sm:gap-4">
          {/* Basket */}
          <Link
            href="/basket"
            className={cn(
              "relative",
              buttonVariants({ variant: "default", size: "sm" }),
            )}
          >
            <TrolleyIcon className="size-5 max-sm:hidden" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {itemCount}
              </span>
            )}
            <span className="ml-1">My Basket</span>
          </Link>

          {/* Orders */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                <PackageIcon className="size-5 max-sm:hidden" />
                <span className="ml-1">My Orders</span>
              </Link>
            </SignedIn>

            {/* User */}
            {user ? (
              <div className="flex items-center gap-2">
                <UserButton />
                <div className="text-xs">
                  <p className="text-gray-400">Welcome</p>
                  <p className="font-semibold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button size="sm" className="cursor-pointer">Sign In</Button>
              </SignInButton>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}
