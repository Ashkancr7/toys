// components/product/ProductDetail.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import Toast from "@/components/Toast";
import type { Product } from "@/types/api";
import { ChevronLeft, ChevronRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";

import Swal from "sweetalert2";

// فیلدهای اختیاری که فعلاً توی API نیستن ولی اگه بعداً اضافه شدن خودکار پشتیبانی میشن
type ProductWithExtras = Product & {
  old_price?: string | number | null;
};

interface ProductDetailProps {
  product: ProductWithExtras;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    if (!product.images.length) return;
    const next = (currentImageIndex + 1) % product.images.length;
    setCurrentImageIndex(next);
    setSelectedImage(product.images[next].image);
  };

  const prevImage = () => {
    if (!product.images.length) return;
    const prev =
      (currentImageIndex - 1 + product.images.length) % product.images.length;
    setCurrentImageIndex(prev);
    setSelectedImage(product.images[prev].image);
  };

  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0]?.image || product.image || "/placeholder.png"
  );

  const handleSelectThumbnail = (img: { id: number; image: string }, index: number) => {
    setSelectedImage(img.image);
    setCurrentImageIndex(index);
  };

  // استخراج رنگ‌های یکتا
  const availableColors = useMemo(() => {
    if (!product?.variants) return [];
    const colorsMap = new Map();
    product.variants.forEach((v) => colorsMap.set(v.color.id, v.color));
    return Array.from(colorsMap.values());
  }, [product]);

  // استخراج سایزهای یکتا
  const availableSizes = useMemo(() => {
    if (!product?.variants) return [];
    const sizesMap = new Map();
    product.variants.forEach((v) => sizesMap.set(v.size.id, v.size));
    return Array.from(sizesMap.values());
  }, [product]);

  // پیدا کردن تنوع انتخاب شده در همون لحظه
  const currentVariant = useMemo(() => {
    if (!selectedColorId || !selectedSizeId || !product?.variants) return null;
    return product.variants.find(
      (v) => v.color.id === selectedColorId && v.size.id === selectedSizeId
    );
  }, [selectedColorId, selectedSizeId, product]);

  useEffect(() => {
    setQuantity(1);
  }, [selectedColorId, selectedSizeId]);

  useEffect(() => {
    setSelectedImage(
      product.images?.[0]?.image || product.image || "/placeholder.png"
    );
    setCurrentImageIndex(0);
  }, [product]);

  const price = Number(product.price);
  const oldPrice = product.old_price ? Number(product.old_price) : null;
  const hasDiscount = !!oldPrice && oldPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((oldPrice! - price) / oldPrice!) * 100)
    : null;

  const handleAddToCart = () => {
    if (!selectedSizeId || !selectedColorId) {
      Swal.fire({
        icon: "warning",
        title: "یه لحظه صبر کن! 🙋",
        text: "لطفاً رنگ و سایز بازی رو انتخاب کن.",
        confirmButtonText: "باشه، انتخاب می‌کنم",
        confirmButtonColor: "#FF6F91",
      });
      return;
    }

    if (!currentVariant || currentVariant.stock < quantity) {
      Swal.fire({
        icon: "error",
        title: "موجودی کافی نیست 😢",
        text: "متاسفانه از این ترکیب رنگ و سایز به تعداد کافی موجود نیست.",
        confirmButtonText: "باشه",
        confirmButtonColor: "#FF6F91",
      });
      return;
    }

    const colorObj = availableColors.find((c) => c.id === selectedColorId);
    const sizeObj = availableSizes.find((s) => s.id === selectedSizeId);

    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        size: sizeObj?.name,
        color: colorObj?.color_code,
        variantId: currentVariant.id,
      });
    }

    setShowToast(true);
  };

  const increaseQty = () => {
    if (!selectedColorId || !selectedSizeId) {
      Swal.fire({
        icon: "info",
        title: "یه لحظه! 🙋",
        text: "اول رنگ و سایز رو انتخاب کن.",
        confirmButtonText: "باشه",
        confirmButtonColor: "#FF6F91",
      });
      return;
    }
    if (currentVariant && quantity < currentVariant.stock) {
      setQuantity((q) => q + 1);
    } else {
      Swal.fire({
        icon: "warning",
        title: "همینقدر داریم! 📦",
        text: "امکان افزایش تعداد بیشتر از موجودی انبار وجود نداره.",
        confirmButtonText: "متوجه شدم",
        confirmButtonColor: "#FF6F91",
      });
    }
  };

  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const selectedColorName =
    availableColors.find((c) => c.id === selectedColorId)?.name || "";

  const isOutOfStock = currentVariant?.stock === 0;
  const canAddToCart = !(selectedColorId && selectedSizeId && isOutOfStock);

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-16 pb-28 md:pb-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Product Image */}
          <div className="flex flex-col gap-4 md:gap-5">
            {/* عکس اصلی */}
            <div className="relative aspect-square rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-sunny/10 border-4 border-white shadow-product">
              {hasDiscount && (
                <span className="badge-sticker absolute top-3 right-3 z-10 bg-grass text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-popSm">
                  {discountPercent}%- تخفیف
                </span>
              )}

              <Image
                src={selectedImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition duration-500"
                priority
              />

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    aria-label="عکس قبلی"
                    className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md rounded-full w-9 h-9 md:w-11 md:h-11 flex items-center justify-center shadow-popSm hover:bg-white hover:scale-110 active:scale-95 transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <button
                    onClick={nextImage}
                    aria-label="عکس بعدی"
                    className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md rounded-full w-9 h-9 md:w-11 md:h-11 flex items-center justify-center shadow-popSm hover:bg-white hover:scale-110 active:scale-95 transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* شمارنده عکس - مخصوص موبایل */}
                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-ink/60 text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm md:hidden">
                    {(currentImageIndex + 1).toLocaleString("fa-IR")} /{" "}
                    {product.images.length.toLocaleString("fa-IR")}
                  </span>
                </>
              )}
            </div>

            {/* گالری تصاویر - اسکرول افقی، هیچ‌وقت به هم نمی‌ریزه */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1 px-0.5 scrollbar-hide snap-x snap-mandatory">
                {product.images.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => handleSelectThumbnail(img, index)}
                    className={`relative shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all duration-300 snap-start
                      ${
                        selectedImage === img.image
                          ? "border-bubblegum shadow-popSm scale-105"
                          : "border-sunny/20 hover:border-sunny"
                      }`}
                  >
                    <Image
                      src={img.image}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* نوار اعتماد کوچک */}
            <div className="hidden md:grid grid-cols-3 gap-3 mt-2">
              <div className="flex items-center gap-2 bg-white rounded-2xl p-3 shadow-card">
                <Truck className="h-4 w-4 text-sky shrink-0" />
                <span className="text-xs font-bold text-inkSoft">ارسال سریع</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-2xl p-3 shadow-card">
                <ShieldCheck className="h-4 w-4 text-grass shrink-0" />
                <span className="text-xs font-bold text-inkSoft">ضمانت اصالت</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-2xl p-3 shadow-card">
                <RotateCcw className="h-4 w-4 text-bubblegum shrink-0" />
                <span className="text-xs font-bold text-inkSoft">امکان مرجوعی</span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-2xl md:text-3xl font-display font-extrabold mb-3 text-ink">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <p className="text-xl md:text-2xl font-display text-bubblegum font-extrabold">
                {price.toLocaleString("fa-IR")} تومان
              </p>
              {hasDiscount && (
                <p className="text-sm text-inkSoft/60 line-through">
                  {oldPrice!.toLocaleString("fa-IR")} تومان
                </p>
              )}
            </div>

            <p className="text-inkSoft leading-7 mb-8 text-sm md:text-base">
              {product.description ||
                "این بازی با بهترین متریال و کلی عشق طراحی شده تا هم امن باشه، هم بادوام و هم پر از خنده!"}
            </p>

            {/* Product Specifications */}
            {(product.brand ||
              product.material ||
              product.age_range_display ||
              product.category) && (
              <div className="mb-8 bg-sunny/5 rounded-2xl p-5 border border-sunny/20">
                <h3 className="mb-4 text-sm font-bold text-ink">
                  ویژگی‌های محصول
                </h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                  {product.category && (
                    <>
                      <span className="text-inkSoft">دسته‌بندی</span>
                      <span className="font-bold text-ink">
                        {product.category.name}
                      </span>
                    </>
                  )}

                  {product.brand && (
                    <>
                      <span className="text-inkSoft">برند</span>
                      <span className="font-bold text-ink">{product.brand}</span>
                    </>
                  )}

                  {product.material && (
                    <>
                      <span className="text-inkSoft">جنس</span>
                      <span className="font-bold text-ink">
                        {product.material}
                      </span>
                    </>
                  )}

                  {product.age_range_display && (
                    <>
                      <span className="text-inkSoft">رده سنی</span>
                      <span className="font-bold text-ink">
                        {product.age_range_display}
                      </span>
                    </>
                  )}

                  <span className="text-inkSoft">استاندارد ایمنی</span>
                  <span
                    className={`font-bold flex items-center gap-1 ${
                      product.safety_certified
                        ? "text-[#3f8a4c]"
                        : "text-inkSoft"
                    }`}
                  >
                    {product.safety_certified ? "دارد ✅" : "ندارد"}
                  </span>

                  <span className="text-inkSoft">موجودی کل</span>
                  <span className="font-bold text-ink">
                    {product.stock > 0
                      ? `${product.stock.toLocaleString("fa-IR")} عدد`
                      : "ناموجود"}
                  </span>
                </div>
              </div>
            )}

            {/* Color Selector */}
            {availableColors.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-bold text-ink">
                  رنگ:{" "}
                  <span className="text-inkSoft font-normal">
                    {selectedColorName}
                  </span>
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {availableColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColorId(color.id)}
                      title={color.name}
                      className={`w-9 h-9 rounded-full border-2 transition-all duration-200 
                      ${
                        selectedColorId === color.id
                          ? "ring-2 ring-offset-2 ring-bubblegum border-transparent scale-110"
                          : "border-sunny/30 hover:border-sunny hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.color_code }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {availableSizes.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-bold text-ink">انتخاب سایز</h3>
                <div className="flex gap-3 flex-wrap">
                  {availableSizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSizeId(size.id)}
                      className={`px-5 py-2 border-2 text-sm font-bold transition-all duration-200 rounded-xl
                      ${
                        selectedSizeId === size.id
                          ? "border-bubblegum text-bubblegum bg-bubblegum/10"
                          : "border-sunny/30 text-ink hover:border-sunny"
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Stock Info */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-3">
                <h3 className="text-sm font-bold text-ink">تعداد</h3>
                {selectedColorId && selectedSizeId && (
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold ${
                      currentVariant && currentVariant.stock > 0
                        ? "bg-grass/20 text-[#3f8a4c]"
                        : "bg-bubblegum/20 text-bubblegum"
                    }`}
                  >
                    {currentVariant
                      ? currentVariant.stock > 0
                        ? `موجودی: ${currentVariant.stock.toLocaleString(
                            "fa-IR"
                          )} عدد`
                        : "ناموجود در این رنگ و سایز"
                      : "ناموجود در این رنگ و سایز "}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseQty}
                  className="w-10 h-10 border-2 border-sunny/30 rounded-xl hover:border-bubblegum transition-colors flex items-center justify-center text-lg font-bold active:scale-90"
                >
                  −
                </button>
                <span className="w-12 text-center font-display font-bold text-lg">
                  {quantity.toLocaleString("fa-IR")}
                </span>
                <button
                  onClick={increaseQty}
                  className="w-10 h-10 border-2 border-sunny/30 rounded-xl hover:border-bubblegum transition-colors flex items-center justify-center text-lg font-bold active:scale-90"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button - دسکتاپ */}
            <button
              onClick={handleAddToCart}
              disabled={!canAddToCart}
              className={`btn-pop hidden md:block w-full py-4 text-sm font-extrabold transition-colors duration-200 mt-auto rounded-2xl
                ${
                  !canAddToCart
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                    : "bg-bubblegum text-white hover:bg-[#ff5c82]"
                }`}
            >
              {!canAddToCart ? "ناموجود 😢" : "افزودن به سبد خرید 🛒"}
            </button>

            {/* نوار اعتماد کوچک - موبایل */}
            <div className="grid md:hidden grid-cols-3 gap-2 mt-2">
              <div className="flex flex-col items-center gap-1 bg-white rounded-2xl p-2.5 shadow-card text-center">
                <Truck className="h-4 w-4 text-sky" />
                <span className="text-[10px] font-bold text-inkSoft">
                  ارسال سریع
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-white rounded-2xl p-2.5 shadow-card text-center">
                <ShieldCheck className="h-4 w-4 text-grass" />
                <span className="text-[10px] font-bold text-inkSoft">
                  ضمانت اصالت
                </span>
              </div>
              <div className="flex flex-col items-center gap-1 bg-white rounded-2xl p-2.5 shadow-card text-center">
                <RotateCcw className="h-4 w-4 text-bubblegum" />
                <span className="text-[10px] font-bold text-inkSoft">
                  امکان مرجوعی
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* نوار چسبیده به پایین - فقط موبایل */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-sunny/20 px-4 py-3 flex items-center gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="shrink-0">
          <p className="text-[11px] text-inkSoft font-medium">قیمت</p>
          <p className="text-base font-display font-extrabold text-bubblegum">
            {price.toLocaleString("fa-IR")} تومان
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={!canAddToCart}
          className={`btn-pop flex-1 py-3.5 text-sm font-extrabold rounded-2xl transition-colors duration-200
            ${
              !canAddToCart
                ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                : "bg-bubblegum text-white hover:bg-[#ff5c82]"
            }`}
        >
          {!canAddToCart ? "ناموجود 😢" : "افزودن به سبد 🛒"}
        </button>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="اضافه شد! حالا وقت بازیه 🎉"
          productName={product.name}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}