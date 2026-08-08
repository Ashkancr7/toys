// file: lib/api.ts

import { Product } from '@/types/api'; // تایپ‌ها رو از فایلی که ساختی ایمپورت کن

const API_BASE_URL = 'https://toys.theveloura.ir/api'; // آدرس بک‌اند جنگوی شما

// یک تابع کمکی برای fetch کردن دیتا
async function fetchAPI<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
       cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch API: ${response.statusText}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("API Fetch Error:", error);
    // در دنیای واقعی اینجا رو باید بهتر مدیریت کنی، مثلا با نمایش یک پیام خطا به کاربر
    throw error;
  }
}

// توابعی برای گرفتن دیتاهای مختلف
export async function getProducts(): Promise<Product[]> {
  return fetchAPI<Product[]>('/products/');
}

export async function getProductBySlug(slug: string): Promise<Product> {
  return fetchAPI<Product>(`/products/${slug}/`);
}

// اضافه کردن تایپ دسته‌بندی در صورت نیاز، یا استفاده از any
export async function getCategories(): Promise<{id: number | string, name: string}[]> {
  return fetchAPI<{id: number | string, name: string}[]>('/categories/'); // آدرس API جنگو برای دسته‌بندی
}

