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
import { Button, buttonVariants, Input } from "../ui";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="flex flex-wrap items-center justify-between px-4 py-2">
      {/* Top row */}
      <div className="flex w-full flex-wrap items-center justify-between">
        <Link
          href="/"
          className="mx-auto cursor-pointer text-2xl font-bold text-blue-500 hover:opacity-50 sm:mx-0"
        >
          Zera
        </Link>
        <Form
          action="/search"
          className="mt-2 w-full sm:mx-4 sm:mt-0 sm:w-auto sm:flex-1"
        >
          <Input
            type="text"
            name="query"
            placeholder="Search for products"
            className="w-full max-w-4xl"
          />
        </Form>
        <div className="mt-4 flex flex-1 items-center gap-4 sm:mt-0 sm:flex-none">
          <Link
            href="/basket"
            className={buttonVariants({ variant: "default", size: "sm" })}
          >
            <TrolleyIcon className="size-6" />
            {/* Span item count once global state is implemented */}
            <span>My Basket</span>
          </Link>
          {/* User area */}
          <ClerkLoaded>
            <SignedIn>
              <Link
                href="/orders"
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                <PackageIcon className="size-6" />
                <span>My Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center gap-2">
                <UserButton />
                <div className="hidden text-xs sm:block">
                  <p className="text-gray-400">Welcome Back</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
}
