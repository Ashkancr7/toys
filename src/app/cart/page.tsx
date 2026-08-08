// app/cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const total = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <span className="text-7xl sm:text-8xl mb-6 inline-block animate-wiggle">🧸</span>
        <h1 className="text-xl sm:text-2xl font-display font-extrabold mb-4 text-ink">سبد بازی‌هات خالیه!</h1>
        <p className="text-inkSoft mb-8 text-sm sm:text-base">بریم یه چیز باحال براش پیدا کنیم؟</p>
        <button
          onClick={() => router.push("/shop")}
          className="btn-pop px-8 py-3.5 sm:px-10 bg-bubblegum text-white rounded-full font-extrabold hover:bg-[#ff5c82] transition text-sm sm:text-base"
        >
          بریم فروشگاه 🚀
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-display font-extrabold mb-8 sm:mb-10 flex items-center gap-3 text-ink">
        <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-bubblegum" />
        سبد بازی ({totalItems} محصول) 🛍️
      </h1>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size || 'no-size'}-${item.color || 'no-color'}`}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 border-2 border-sunny/20 rounded-[1.75rem] p-4 sm:p-6 bg-white hover:shadow-card transition"
            >
              <div className="flex gap-4 sm:contents">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-sunny/10 rounded-2xl overflow-hidden shrink-0 border-2 border-sunny/10">
                  <Image
                    src={item.image || "/images/placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 sm:hidden">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-bold line-clamp-2 text-ink">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id, item.size, item.color)}
                      className="text-bubblegum hover:scale-110 transition p-1"
                      aria-label="حذف محصول"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="hidden sm:flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-ink">{item.name}</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      {item.size && (
                        <span className="inline-block px-3 py-1 bg-sky/15 rounded-full text-sm font-bold text-ink">
                          سایز {item.size}
                        </span>
                      )}
                      {item.color && (
                        <div className="flex items-center gap-2 text-sm text-inkSoft">
                          <span>رنگ:</span>
                          <span
                            className="w-4 h-4 rounded-full border-2 border-sunny/20 shadow-sm"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="text-bubblegum hover:scale-110 transition"
                    aria-label="حذف محصول"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="sm:hidden flex flex-wrap items-center gap-2 mb-4">
                  {item.size && (
                    <span className="inline-block px-2 py-1 bg-sky/15 rounded-full text-xs font-bold text-ink">
                      سایز {item.size}
                    </span>
                  )}
                  {item.color && (
                    <div className="flex items-center gap-1 text-xs text-inkSoft">
                      <span>رنگ:</span>
                      <span
                        className="w-3 h-3 rounded-full border-2 border-sunny/20 shadow-sm"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                  <div className="text-left">
                    <p className="text-lg sm:text-xl font-display font-extrabold text-bubblegum">
                      {(Number(item.price) * Number(item.quantity)).toLocaleString("fa-IR")} تومان
                    </p>

                    {item.quantity > 1 && (
                      <p className="text-xs sm:text-sm text-inkSoft mt-1">
                        {Number(item.price).toLocaleString("fa-IR")} × {item.quantity.toLocaleString("fa-IR")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* سایدبار خلاصه سفارش */}
        <div className="lg:col-span-1 mt-4 lg:mt-0">
          <div className="border-2 border-sunny/20 rounded-[1.75rem] p-5 sm:p-6 bg-white sticky top-24 shadow-card">
            <h2 className="text-lg font-display font-extrabold mb-5 sm:mb-6 text-ink">خلاصه بازی‌ها 🎁</h2>

            <div className="space-y-3 text-sm mb-5 sm:mb-6 pb-5 sm:pb-6 border-b-2 border-sunny/10">
              <div className="flex justify-between">
                <span className="text-inkSoft">تعداد کل بازی‌ها</span>
                <span className="font-bold text-ink">{totalItems.toLocaleString("fa-IR")} عدد</span>
              </div>
              <div className="flex justify-between">
                <span className="text-inkSoft">جمع کل</span>
                <span className="font-bold text-ink">{total.toLocaleString("fa-IR")} تومان</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-lg font-bold">
                <span className="text-base sm:text-lg text-ink">مبلغ قابل پرداخت</span>
                <span className="font-display text-bubblegum">
                  {total.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="btn-pop w-full bg-bubblegum text-white py-3.5 sm:py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#ff5c82] transition-colors duration-300 font-extrabold text-sm sm:text-base"
            >
              بریم برای تحویل! 
              <ArrowLeft size={18} />
            </button>

            <p className="text-[11px] sm:text-xs text-inkSoft text-center mt-4">
              با تکمیل خرید، قوانین و مقررات رو می‌پذیری ✅
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
