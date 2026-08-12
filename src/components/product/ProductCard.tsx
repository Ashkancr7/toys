"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/types/api";

// چون old_price و rating فعلاً توی تایپ اصلی Product تعریف نشدن،
// اینجا به‌صورت اختیاری اضافه‌شون می‌کنیم تا اگه در آینده به بک‌اند اضافه شدن،
// بدون ارور خودکار پشتیبانی بشن.
type ProductWithExtras = Product & {
  old_price?: string | number | null;
  rating?: string | number | null;
};

interface Props {
  product: ProductWithExtras;
}

export default function ProductCard({ product }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  const firstImage =
    product.images?.length > 0
      ? product.images[0].image
      : product.image;

  const imageSrc =
    firstImage?.startsWith("http") || firstImage?.startsWith("/")
      ? firstImage
      : `/${firstImage || "placeholder.png"}`;

  const price = Number(product.price);
  const oldPrice = product.old_price ? Number(product.old_price) : null;
  const hasDiscount = !!oldPrice && oldPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((oldPrice! - price) / oldPrice!) * 100)
    : null;

  const rating = product.rating ? Number(product.rating) : null;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite((prev) => !prev);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO: اتصال به منطق افزودن به سبد خرید
  };

  return (
    <div className="group relative bg-white border-2 border-transparent rounded-[1.75rem] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[0.5deg] hover:border-sunny/60 shadow-card hover:shadow-product">

      {/* بج‌های بالای کارت */}
      <div className="absolute top-3 right-3 left-3 z-10 flex items-start justify-between">
        <span className="badge-sticker bg-bubblegum text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-popSm">
          😍 محبوب
        </span>

        {discountPercent && (
          <span className="badge-sticker bg-grass text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-popSm">
            {discountPercent}%- تخفیف
          </span>
        )}
      </div>

      {/* دکمه علاقه‌مندی */}
      <button
        onClick={handleToggleFavorite}
        aria-label="افزودن به علاقه‌مندی‌ها"
        className="absolute top-14 left-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-popSm transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        <Heart
          className={`h-4.5 w-4.5 transition-colors ${
            isFavorite ? "fill-bubblegum text-bubblegum" : "text-inkSoft"
          }`}
        />
      </button>

      <Link href={`/product/${product.slug}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-sunny/10 relative">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
          />
        </div>
      </Link>

      <div className="p-5 text-right">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-base font-bold mb-1.5 text-ink group-hover:text-bubblegum transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {rating && (
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={`text-xs ${
                  s <= Math.round(rating) ? "text-sunny" : "text-inkSoft/25"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-xs text-inkSoft font-medium mr-1">
              ({rating.toFixed(1)})
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="font-display text-bubblegum font-bold text-base">
              {price.toLocaleString("fa-IR")} تومان
            </p>
            {hasDiscount && (
              <p className="text-xs text-inkSoft/60 line-through">
                {oldPrice!.toLocaleString("fa-IR")} تومان
              </p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            aria-label="افزودن به سبد خرید"
            className="btn-pop shrink-0 w-11 h-11 rounded-2xl bg-bubblegum text-white flex items-center justify-center hover:bg-[#ff5c82] active:scale-90 transition-all duration-200"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}