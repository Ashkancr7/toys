import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * این تابع به شما اجازه می‌دهد کلاس‌های Tailwind را به راحتی با هم ترکیب کنید
 * و تداخل‌های احتمالی آن‌ها را (مثل padding یا رنگ) به صورت هوشمند مدیریت می‌کند.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}