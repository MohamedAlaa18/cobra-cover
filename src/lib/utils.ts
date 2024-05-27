import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number, currency: 'EGP' | 'USD') => {
  const formatter = new Intl.NumberFormat(currency === 'EGP' ? 'ar-EG' : 'en-US', {
    style: "currency",
    currency: currency
  });

  return formatter.format(price);
};
