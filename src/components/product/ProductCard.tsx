"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/api";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const firstImage =
    product.images?.length > 0
      ? product.images[0].image
      : product.image;

  const imageSrc =
    firstImage?.startsWith("http") || firstImage?.startsWith("/")
      ? firstImage
      : `/${firstImage || "placeholder.png"}`;

  return (
    <div className="group relative bg-white border-2 border-transparent rounded-[1.75rem] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:rotate-[0.5deg] hover:border-sunny/60 shadow-card hover:shadow-product">

      {/* بج استیکری - می‌تونه "جدید" یا هر متن دیگه باشه */}
      <span className="badge-sticker absolute top-3 right-3 z-10 bg-bubblegum text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-popSm">
        😍 محبوب
      </span>

      <Link href={`/product/${product.slug}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-sunny/10 relative">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
          />

          <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-bouncy">
            <button
              className="btn-pop w-full bg-bubblegum text-white py-2.5 rounded-2xl text-sm font-extrabold hover:bg-[#ff5c82] transition-colors"
            >
              افزودن به سبد 🛒
            </button>
          </div>
        </div>
      </Link>

      <div className="p-5 text-right">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-base font-bold mb-2 text-ink group-hover:text-bubblegum transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="font-display text-bubblegum font-bold text-base">
          {Number(product.price).toLocaleString("fa-IR")} تومان
        </p>
      </div>
    </div>
  );
}
