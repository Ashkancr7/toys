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
}