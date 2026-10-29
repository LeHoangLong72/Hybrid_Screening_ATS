import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency or number
 */
export function formatCurrency(amount: number, currency: string = "VND"): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format month count into readable string
 */
export function formatExperience(months: number): string {
  if (months < 12) {
    return `${months} tháng`;
  }
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  if (remainingMonths === 0) {
    return `${years} năm`;
  }
  return `${years} năm ${remainingMonths} tháng`;
}
