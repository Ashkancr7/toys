// file: types/api.ts

export interface Color {
  id: number;
  name: string;
  color_code: string;
}

export interface Size {
  id: number;
  name: string;
}

export interface ProductVariant {
  id: number;
  color: Color;
  size: Size;
  stock: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

// تصاویر محصول
export interface ProductImage {
  id: number;
  image: string;
}

// رده‌های سنی ممکن (باید با AGE_RANGE_CHOICES بک‌اند هماهنگ باشه)
export type AgeRange = "0-2" | "3-5" | "6-8" | "9-12" | "12+";

export interface Product {
  id: number;
  category: Category;
  name: string;
  slug: string;
  description: string;
  price: string; // DecimalField در DRF به صورت string برمی‌گردد

  // عکس قدیمی (برای سازگاری)
  image?: string;

  // عکس‌های جدید
  images: ProductImage[];

  created_at: string;
  variants: ProductVariant[];

  // موجودی کل محصول (جدا از موجودی هر variant)
  stock: number;

  // ===== ویژگی‌های اختصاصی اسباب‌بازی =====
  brand?: string | null;
  material?: string | null;
  age_range?: AgeRange | null;
  age_range_display?: string | null;
  safety_certified: boolean;
}