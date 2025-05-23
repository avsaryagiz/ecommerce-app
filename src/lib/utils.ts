import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
    return `${currencyCode.toLocaleUpperCase()}${amount.toFixed(2)}`;
  }
}
