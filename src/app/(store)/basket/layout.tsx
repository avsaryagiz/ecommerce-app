import React from "react";
import { Metadata } from "next";

export default function BasketLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: "Your Basket",
  description: "Review your selected items before proceeding to checkout.",
};
