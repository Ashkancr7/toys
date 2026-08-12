// file: lib/api.ts

import { Product } from "@/types/api";

const API_BASE_URL = "https://toys.theveloura.ir/api";

// ====================
// Types
// ====================

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  cover_image: string;
  category: string;
  read_time: number;
  published_at: string;
  content: string;
}

// ====================
// Fallback Blog Posts
// ====================

const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "chera-bazi-baraye-koodakan-mohem-ast",
    title: "چرا بازی کردن برای رشد کودکان اینقدر مهمه؟",
    excerpt:
      "بازی فقط سرگرمی نیست؛ پایه‌ی رشد ذهنی، اجتماعی و حرکتی کودکان از دل بازی شکل می‌گیره.",
    cover_image: "/blog/play-importance.webp",
    category: "رشد کودک",
    read_time: 5,
    published_at: "2025-05-10",
    content: "<p>محتوای کامل مقاله اینجا قرار می‌گیره...</p>",
  },
  {
    id: 2,
    slug: "rahnamaye-entekhab-asbabbazi-monaseb-sen",
    title: "راهنمای انتخاب اسباب‌بازی مناسب هر سن",
    excerpt:
      "هر سن یه نوع بازی و اسباب‌بازی خاص خودشو می‌طلبه. اینجا راهنمای کامل انتخاب رو می‌خونید.",
    cover_image: "/blog/age-guide.webp",
    category: "راهنمای خرید",
    read_time: 7,
    published_at: "2025-06-02",
    content: "<p>محتوای کامل مقاله اینجا قرار می‌گیره...</p>",
  },
  {
    id: 3,
    slug: "10-bazi-khalaghane-baraye-khane",
    title: "۱۰ بازی خلاقانه که می‌تونید همین امروز توی خونه انجام بدید",
    excerpt:
      "بدون نیاز به وسایل خاص، این بازی‌های ساده و خلاقانه رو با فرزندتون تجربه کنید.",
    cover_image: "/blog/creative-games.webp",
    category: "ایده بازی",
    read_time: 4,
    published_at: "2025-06-20",
    content: "<p>محتوای کامل مقاله اینجا قرار می‌گیره...</p>",
  },
];

// ====================
// Generic Fetch Helper
// ====================

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch API: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return data as T;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
}

// ====================
// Products
// ====================

export async function getProducts(): Promise<Product[]> {
  return fetchAPI<Product[]>("/products/");
}

export async function getProductBySlug(slug: string): Promise<Product> {
  return fetchAPI<Product>(`/products/${slug}/`);
}

// ====================
// Categories
// ====================

export async function getCategories(): Promise<
  { id: number | string; name: string }[]
> {
  return fetchAPI<{ id: number | string; name: string }[]>("/categories/");
}

// ====================
// Blog
// ====================

export async function getBlogPosts(): Promise<BlogPost[]> {
  return FALLBACK_POSTS;
}

export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  return FALLBACK_POSTS.find((post) => post.slug === slug) || null;
}