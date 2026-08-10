"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { ChevronLeft, RefreshCw } from "lucide-react";

const INITIAL_COUNT = 8;
const STEP = 8;

export default function ProductsGrid({ products }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 bg-white/60 rounded-3xl border-2 border-dashed border-inkSoft/20">
        <span className="text-5xl mb-3">🧸</span>
        <p className="text-inkSoft font-medium">
          به‌زودی محصولات جذاب جدید اینجا نمایش داده می‌شن!
        </p>
      </div>
    );
  }

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + STEP);
  };

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-8">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-10 md:mt-14">
        {hasMore ? (
          <button
            onClick={handleLoadMore}
            className="btn-pop group relative inline-flex items-center gap-2 rounded-full bg-white border-2 border-sunny px-8 py-3.5 text-sm md:text-base font-extrabold text-ink hover:bg-sunny transition-colors duration-300"
          >
            <span>نمایش محصولات بیشتر</span>
            <RefreshCw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
          </button>
        ) : (
          <Link
            href="/shop"
            className="btn-pop group relative inline-flex items-center gap-2 rounded-full bg-bubblegum text-white px-8 py-3.5 text-sm md:text-base font-extrabold hover:bg-[#ff5c82] transition-colors duration-300"
          >
            <span>مشاهده همه محصولات</span>
            <ChevronLeft className="h-4 w-4 transition-all duration-300 group-hover:-translate-x-1" />
          </Link>
        )}
      </div>
    </>
  );
}