// components/product/ProductDetail.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import Toast from "@/components/Toast";
import type { Product } from "@/types/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Swal from "sweetalert2";

interface ProductDetailProps {
  product: Product;
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
      (currentImageIndex - 1 + product.images.length) %
      product.images.length;

    setCurrentImageIndex(prev);
    setSelectedImage(product.images[prev].image);
  };

  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0]?.image || product.image || "/placeholder.png"
  );

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

  // 🔥 پیدا کردن تنوع انتخاب شده در همون لحظه
  const currentVariant = useMemo(() => {
    if (!selectedColorId || !selectedSizeId || !product?.variants) return null;
    return product.variants.find(
      (v) => v.color.id === selectedColorId && v.size.id === selectedSizeId
    );
  }, [selectedColorId, selectedSizeId, product]);

  // وقتی سایز یا رنگ عوض شد، تعداد رو برگردون رو ۱ که باگ نخوره
  useEffect(() => {
    setQuantity(1);
  }, [selectedColorId, selectedSizeId]);

  useEffect(() => {
    setSelectedImage(
      product.images?.[0]?.image || product.image || "/placeholder.png"
    );
  }, [product]);

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

    const colorObj = availableColors.find(c => c.id === selectedColorId);
    const sizeObj = availableSizes.find(s => s.id === selectedSizeId);

    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...product,
        size: sizeObj?.name,
        color: colorObj?.color_code,
        variantId: currentVariant.id
      });
    }

    setShowToast(true);
  };

  // 🔥 محدود کردن افزایش تعداد به اندازه موجودی انبار
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

  const selectedColorName = availableColors.find(c => c.id === selectedColorId)?.name || "";

  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex flex-col gap-5">

            {/* عکس اصلی */}
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-sunny/10 border-4 border-white shadow-product">

              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-cover transition duration-500"
              />

              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md rounded-full w-11 h-11 flex items-center justify-center shadow-popSm hover:bg-white hover:scale-110 transition-all"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md rounded-full w-11 h-11 flex items-center justify-center shadow-popSm hover:bg-white hover:scale-110 transition-all"
              >
                <ChevronRight size={20} />
              </button>

            </div>

            {/* گالری تصاویر */}
            {product.images.length > 1 && (
              <div className="flex justify-center gap-4 flex-wrap">
                {product.images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img.image)}
                    className={`relative w-24 h-24 rounded-2xl overflow-hidden border-3 transition-all duration-300
          ${selectedImage === img.image
                        ? "border-bubblegum shadow-popSm scale-105"
                        : "border-sunny/20 hover:border-sunny hover:scale-105"
                      }`}
                  >
                    <Image
                      src={img.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-display font-extrabold mb-3 text-ink">{product.name}</h1>

            <p className="text-2xl font-display text-bubblegum font-extrabold mb-6">
              {Number(product.price).toLocaleString("fa-IR")} تومان
            </p>

            <p className="text-inkSoft leading-7 mb-8">
              {product.description || "این بازی با بهترین متریال و کلی عشق طراحی شده تا هم امن باشه، هم بادوام و هم پر از خنده!"}
            </p>

            {/* Product Specifications */}
            {(product.brand || product.material || product.age_range_display || product.category) && (
              <div className="mb-8 bg-sunny/5 rounded-2xl p-5 border border-sunny/20">
                <h3 className="mb-4 text-sm font-bold text-ink">ویژگی‌های محصول</h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
                  {product.category && (
                    <>
                      <span className="text-inkSoft">دسته‌بندی</span>
                      <span className="font-bold text-ink">{product.category.name}</span>
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
                      <span className="font-bold text-ink">{product.material}</span>
                    </>
                  )}

                  {product.age_range_display && (
                    <>
                      <span className="text-inkSoft">رده سنی</span>
                      <span className="font-bold text-ink">{product.age_range_display}</span>
                    </>
                  )}

                  <span className="text-inkSoft">استاندارد ایمنی</span>
                  <span
                    className={`font-bold flex items-center gap-1 ${product.safety_certified ? "text-[#3f8a4c]" : "text-inkSoft"
                      }`}
                  >
                    {product.safety_certified ? "دارد ✅" : "ندارد"}
                  </span>

                  <span className="text-inkSoft">موجودی کل</span>
                  <span className="font-bold text-ink">
                    {product.stock > 0 ? `${product.stock.toLocaleString("fa-IR")} عدد` : "ناموجود"}
                  </span>
                </div>
              </div>
            )}

            {/* Color Selector */}
            {availableColors.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-bold text-ink">رنگ: <span className="text-inkSoft font-normal">{selectedColorName}</span></h3>
                <div className="flex gap-3">
                  {availableColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColorId(color.id)}
                      title={color.name}
                      className={`w-9 h-9 rounded-full border-2 transition-all duration-200 
                      ${selectedColorId === color.id
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
                <div className="flex gap-3">
                  {availableSizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSizeId(size.id)}
                      className={`px-5 py-2 border-2 text-sm font-bold transition-all duration-200 rounded-xl
                      ${selectedSizeId === size.id
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
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${currentVariant && currentVariant.stock > 0
                    ? 'bg-grass/20 text-[#3f8a4c]'
                    : 'bg-bubblegum/20 text-bubblegum'
                    }`}>
                    {currentVariant
                      ? currentVariant.stock > 0
                        ? `موجودی: ${currentVariant.stock.toLocaleString("fa-IR")} عدد`
                        : "ناموجود در این رنگ و سایز"
                      : "ناموجود در این رنگ و سایز "}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseQty}
                  className="w-10 h-10 border-2 border-sunny/30 rounded-xl hover:border-bubblegum transition-colors flex items-center justify-center text-lg font-bold"
                >
                  −
                </button>
                <span className="w-12 text-center font-display font-bold text-lg">{quantity.toLocaleString("fa-IR")}</span>
                <button
                  onClick={increaseQty}
                  className="w-10 h-10 border-2 border-sunny/30 rounded-xl hover:border-bubblegum transition-colors flex items-center justify-center text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={currentVariant?.stock === 0}
              className={`btn-pop w-full py-4 text-sm font-extrabold transition-colors duration-200 mt-auto rounded-2xl
                ${currentVariant?.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                  : 'bg-bubblegum text-white hover:bg-[#ff5c82]'
                }`}
            >
              {currentVariant?.stock === 0 ? 'ناموجود 😢' : 'افزودن به سبد خرید 🛒'}
            </button>
          </div>
        </div>
      </main>

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
