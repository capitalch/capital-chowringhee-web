import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatINR(value: number): string {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export function discountPercent(mrp: number, offerPrice?: number): number | null {
  if (!offerPrice || offerPrice >= mrp) return null;
  return Math.round(((mrp - offerPrice) / mrp) * 100);
}
