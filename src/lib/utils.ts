import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names intelligently using clsx and merges Tailwind classes to avoid conflicts.
 * @param inputs - Array of class names or conditional class values
 * @returns A single merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as a localized currency string using Intl.NumberFormat.
 * Defaults to Turkish Lira (TRY) if no currency code is provided.
 * If formatting fails, returns a fallback string with currency code and amount.
 * @param amount - The numeric value to format
 * @param currencyCode - The ISO currency code (default "TRY")
 * @returns Formatted currency string (e.g., "₺1,000.00")
 */
export function formatCurrency(
  amount: number,
  currencyCode: string = "TRY",
): string {
  try {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: currencyCode.toUpperCase(),
    }).format(amount);
  } catch (error) {
    console.error("Error formatting currency:", error);
    // Fallback: currency code + fixed decimal number
    return `${currencyCode.toLocaleUpperCase()}${amount.toFixed(2)}`;
  }
}

/**
 * Converts a slug string (e.g. "smart-phones") into a human-readable title (e.g. "Smart Phones").
 * Capitalizes the first letter of each word and replaces dashes with spaces.
 * @param slug - The slug string to format
 * @returns A nicely formatted title string
 */
export function formatSlugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
