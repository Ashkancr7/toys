"use client";

import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types/api';
import { getProducts, getCategories } from '@/lib/api';
import { SearchX, RotateCcw } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string | number, name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);

        setProducts(productsData);
        setCategories(categoriesData);

      } catch (error) {
        console.error("خطا در دریافت اطلاعات:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product: Product) => {
      if (activeCategory === "All") return true;
      return product.category?.name === activeCategory;
    });

    if (sortBy === "price-asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [activeCategory, sortBy, products]);

  const resetFilters = () => {
    setActiveCategory("All");
    setSortBy("default");
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-7 w-52 rounded-full bg-sunny/20" />
            <div className="h-4 w-28 rounded-full bg-sky/20" />
          </div>

          <div className="h-10 w-36 rounded-2xl bg-bubblegum/20" />
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-[1.75rem] border-2 border-sunny/10 bg-white p-2.5 sm:p-4"
            >
              <div className="relative w-full h-40 sm:h-64 rounded-2xl bg-sky/10 overflow-hidden">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>

              <div className="mt-3 space-y-2">
                <div className="h-3 w-14 rounded-full bg-sky/10" />
                <div className="h-4 w-full rounded-full bg-sky/10" />
                <div className="h-4 w-3/4 rounded-full bg-sky/10" />

                <div className="mt-4 flex items-center justify-between border-t border-sky/10 pt-3">
                  <div className="h-5 w-24 rounded-full bg-sky/10" />
                  <div className="h-8 w-8 rounded-full bg-sky/10" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const hasActiveFilters = activeCategory !== "All" || sortBy !== "default";

  return (
    <div className="container mx-auto p-4 max-w-7xl pt-8 pb-16">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-extrabold text-right text-ink">
          فروشگاه <span className="text-bubblegum">ولورا</span> 🧸
        </h1>
        <p className="text-inkSoft text-sm mt-1 font-medium">
          هزاران اسباب‌بازی رنگی و بامزه رو اینجا پیدا کن
        </p>
      </div>

      {/* کانتینر اصلی: سایدبار + گرید محصولات */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* ===================== سایدبار دسته‌بندی‌ها ===================== */}
        <aside className="w-full lg:w-1/4 xl:w-1/5 shrink-0">
          <div className="lg:sticky lg:top-24 bg-white p-4 lg:p-6 rounded-[1.75rem] shadow-card border-2 border-sunny/20">
            <div className="hidden lg:flex items-center justify-between mb-4 border-b-2 border-sunny/20 pb-3">
              <h3 className="font-display font-extrabold text-lg text-ink">
                🎲 دسته‌بندی‌ها
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs font-bold text-bubblegum hover:text-[#ff5c82] transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  حذف فیلتر
                </button>
              )}
            </div>

            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar">
              <button
                onClick={() => setActiveCategory("All")}
                className={`text-right px-5 py-3 rounded-2xl transition-all font-bold whitespace-nowrap lg:whitespace-normal flex items-center justify-between ${activeCategory === "All"
                  ? "bg-bubblegum text-white shadow-popSm"
                  : "bg-cream text-ink hover:bg-sunny/20"
                  }`}
              >
                <span>همه بازی‌ها</span>
                {activeCategory === "All" && <span className="hidden lg:block w-2 h-2 rounded-full bg-white"></span>}
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`text-right px-5 py-3 rounded-2xl transition-all font-bold whitespace-nowrap lg:whitespace-normal flex items-center justify-between ${activeCategory === cat.name
                    ? "bg-bubblegum text-white shadow-popSm"
                    : "bg-cream text-ink hover:bg-sunny/20"
                    }`}
                >
                  <span>{cat.name}</span>
                  {activeCategory === cat.name && <span className="hidden lg:block w-2 h-2 rounded-full bg-white"></span>}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ===================== بخش اصلی محتوا ===================== */}
        <main className="flex-1 w-full">

          <div className="flex flex-row justify-between items-center mb-6 bg-white p-3 lg:p-4 rounded-[1.75rem] shadow-card border-2 border-sunny/20">
            <p className="text-inkSoft text-xs sm:text-sm font-bold">
              نمایش <span className="text-bubblegum font-display">{filteredAndSortedProducts.length}</span> بازی
              {activeCategory !== "All" && (
                <span className="text-inkSoft font-medium"> در «{activeCategory}»</span>
              )}
            </p>

            <div className="w-auto sm:w-auto flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-64 p-2.5 border-2 border-sky/20 rounded-2xl outline-none focus:border-sky bg-cream text-ink cursor-pointer transition-all text-sm font-bold"
              >
                <option value="default">مرتب‌سازی پیش‌فرض</option>
                <option value="price-asc">ارزان‌ترین به گران‌ترین</option>
                <option value="price-desc">گران‌ترین به ارزان‌ترین</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="lg:hidden shrink-0 p-2.5 rounded-2xl bg-cream border-2 border-sky/20 text-inkSoft hover:text-bubblegum hover:border-bubblegum/40 transition-colors"
                  aria-label="حذف فیلتر"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-white rounded-[1.75rem] border-2 border-dashed border-sunny/30">
              <SearchX className="h-12 w-12 text-inkSoft/40 mb-3" />
              <p className="text-ink font-display font-bold text-lg mb-1">
                بازی‌ای پیدا نشد!
              </p>
              <p className="text-inkSoft text-sm mb-5">
                در این دسته‌بندی فعلاً محصولی موجود نیست.
              </p>
              <button
                onClick={resetFilters}
                className="btn-pop inline-flex items-center gap-2 rounded-full bg-bubblegum text-white font-display font-bold px-6 py-3 hover:bg-[#ff5c82] transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
                نمایش همه بازی‌ها
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}