// app/blog/page.tsx

import Link from "next/link";
import { getBlogPosts } from "@/lib/api";
import BlogGrid from "@/components/blog/BlogGrid";
import { BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "مجله ولورا | مقالات بازی و راهنمای والدین",
  description:
    "مقالاتی درباره‌ی بازی کودکان، رشد ذهنی و راهنمای خرید اسباب‌بازی مناسب هر سن.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative py-16 md:py-24 text-center bg-gradient-to-b from-sky/25 via-cream to-cream overflow-hidden">
        <div className="blob-decor w-32 h-32 md:w-52 md:h-52 bg-sunny/40 top-6 -left-8 animate-float-slow" />
        <div className="blob-decor w-24 h-24 md:w-40 md:h-40 bg-bubblegum/30 bottom-6 -right-8 animate-float" />

        <div className="relative z-10 max-w-2xl mx-auto px-5">
          <span className="inline-flex items-center gap-2 bg-white text-sky font-display font-bold text-sm px-5 py-2 rounded-full shadow-popSm mb-5 -rotate-1">
            <BookOpen className="h-4 w-4" />
            مجله ولورا
          </span>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-ink mb-4">
            دنیای <span className="text-sky">بازی</span> و بزرگ‌شدن 🧸
          </h1>

          <p className="text-inkSoft text-sm md:text-lg leading-relaxed font-medium">
            راهنماها، ایده‌های بازی و نکاتی برای والدینی که می‌خوان دوران
            کودکی فرزندشون پر از یادگیری و خنده باشه.
          </p>
        </div>

        <div className="wave-divider absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path
              d="M0,32 C240,80 480,0 720,24 C960,48 1200,72 1440,24 L1440,60 L0,60 Z"
              fill="#FFF8EC"
            />
          </svg>
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <BlogGrid posts={posts} />
      </section>

      {/* CTA */}
      <section className="relative bg-bubblegum/10 py-12 md:py-20 overflow-hidden">
        <div className="max-w-2xl mx-auto text-center px-5 relative z-10">
          <span className="text-5xl mb-4 inline-block animate-wiggle">
            ✨
          </span>

          <h2 className="text-xl md:text-3xl font-display font-extrabold text-ink mb-3">
            آماده‌ی یه بازی جدید هستید؟
          </h2>

          <p className="text-inkSoft text-sm md:text-base mb-6">
            بعد از خوندن این مقالات، سری هم به اسباب‌بازی‌های ولورا بزنید!
          </p>

          <Link
            href="/shop"
            className="btn-pop inline-flex items-center gap-2 rounded-full bg-bubblegum text-white font-display font-bold px-8 py-3.5 hover:bg-[#ff5c82] transition-colors"
          >
            مشاهده فروشگاه
          </Link>
        </div>
      </section>
    </main>
  );
}