import React from "react";
import { Metadata } from "next";

export default function SuccessLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: "Order Confirmation",
  description: "Thank you for your order! Your order has been confirmed.",
};
