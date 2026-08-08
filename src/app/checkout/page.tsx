// app/checkout/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import { MapPin, ShoppingBag, ArrowRight, CreditCard, Loader2 } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { items } = useCartStore();

  const total = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);

  const { shippingAddress, setShippingAddress } = useCheckoutStore();

  const [formData, setFormData] = useState({
    fullName: shippingAddress?.fullName || "",
    phone: shippingAddress?.phone || "",
    province: shippingAddress?.province || "",
    city: shippingAddress?.city || "",
    address: shippingAddress?.address || "",
    postalCode: shippingAddress?.postalCode || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsMounted(true);
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  if (!isMounted) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "نام و نام خانوادگی الزامی است";
    if (!formData.phone.trim()) newErrors.phone = "شماره تماس الزامی است";
    else if (!/^09\d{9}$/.test(formData.phone)) newErrors.phone = "شماره موبایل معتبر نیست";
    if (!formData.province.trim()) newErrors.province = "استان الزامی است";
    if (!formData.city.trim()) newErrors.city = "شهر الزامی است";
    if (!formData.address.trim()) newErrors.address = "آدرس الزامی است";
    if (!formData.postalCode.trim()) newErrors.postalCode = "کد پستی الزامی است";
    else if (!/^\d{10}$/.test(formData.postalCode)) newErrors.postalCode = "کد پستی باید ۱۰ رقم باشه";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setShippingAddress(formData);
    setIsLoading(true);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        alert("لطفاً ابتدا وارد حساب کاربری خود شوید.");
        setIsLoading(false);
        return;
      }

      const response = await fetch("https://api.theveloura.ir/api/orders/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          phone: formData.phone,
          city: formData.city,
          address: `استان ${formData.province}، ${formData.address}`,
          postal_code: formData.postalCode,
          items: items.map((item) => ({
             variant_id: item.id,
             quantity: item.quantity
          }))
        }),
      });


      const data = await response.json();

      if (response.ok && data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        alert("خطا در اتصال به درگاه: " + (data.detail || "مشکلی پیش آمد"));
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("خطا در ارتباط با سرور");
    } finally {
      setIsLoading(false);
    }
  };

  const shippingCost = total > 500000 ? 0 : 40000;
  const finalTotal = total + shippingCost;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-display font-extrabold mb-8 sm:mb-10 flex items-center gap-3 text-ink">
        <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-bubblegum" />
        بگو کجا بفرستیم؟ 📦
      </h1>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* فرم آدرس */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-2 border-sunny/20 rounded-[1.75rem] p-5 sm:p-8 bg-white shadow-card">
              <h2 className="text-lg sm:text-xl font-display font-extrabold mb-5 sm:mb-6 flex items-center gap-2 text-ink">
                <MapPin size={20} className="text-bubblegum" />
                اطلاعات گیرنده
              </h2>

              <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-ink">نام و نام خانوادگی *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 border-2 rounded-2xl focus:ring-2 focus:ring-sunny/30 focus:border-bubblegum outline-none transition bg-cream focus:bg-white text-sm sm:text-base ${
                      errors.fullName ? "border-red-400" : "border-sunny/20"
                    }`}
                    placeholder="علی احمدی"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-ink">شماره تماس *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 border-2 rounded-2xl focus:ring-2 focus:ring-sunny/30 focus:border-bubblegum outline-none transition bg-cream focus:bg-white text-sm sm:text-base ${
                      errors.phone ? "border-red-400" : "border-sunny/20"
                    }`}
                    placeholder="09123456789"
                    dir="ltr"
                  />
                  {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-ink">استان *</label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 border-2 rounded-2xl focus:ring-2 focus:ring-sunny/30 focus:border-bubblegum outline-none transition bg-cream focus:bg-white text-sm sm:text-base ${
                      errors.province ? "border-red-400" : "border-sunny/20"
                    }`}
                    placeholder="تهران"
                  />
                  {errors.province && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.province}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-ink">شهر *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 border-2 rounded-2xl focus:ring-2 focus:ring-sunny/30 focus:border-bubblegum outline-none transition bg-cream focus:bg-white text-sm sm:text-base ${
                      errors.city ? "border-red-400" : "border-sunny/20"
                    }`}
                    placeholder="تهران"
                  />
                  {errors.city && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.city}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2 text-ink">کد پستی (۱۰ رقم بدون خط تیره) *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    disabled={isLoading}
                    maxLength={10}
                    className={`w-full px-4 py-3 border-2 rounded-2xl focus:ring-2 focus:ring-sunny/30 focus:border-bubblegum outline-none transition bg-cream focus:bg-white text-sm sm:text-base ${
                      errors.postalCode ? "border-red-400" : "border-sunny/20"
                    }`}
                    placeholder="1234567890"
                    dir="ltr"
                  />
                  {errors.postalCode && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.postalCode}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold mb-2 text-ink">آدرس کامل *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={isLoading}
                    rows={3}
                    className={`w-full px-4 py-3 border-2 rounded-2xl focus:ring-2 focus:ring-sunny/30 focus:border-bubblegum outline-none transition resize-none bg-cream focus:bg-white text-sm sm:text-base ${
                      errors.address ? "border-red-400" : "border-sunny/20"
                    }`}
                    placeholder="خیابان، کوچه، پلاک، واحد"
                  />
                  {errors.address && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.address}</p>}
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 border-2 border-sunny/30 rounded-2xl hover:bg-sunny/10 transition flex items-center justify-center gap-2 font-bold text-sm sm:text-base disabled:opacity-50 text-ink"
              >
                <ArrowRight size={18} />
                بازگشت
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-pop w-full sm:flex-1 bg-bubblegum text-white py-3.5 sm:py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#ff5c82] transition-colors duration-300 font-extrabold text-sm sm:text-base disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    در حال انتقال به درگاه...
                  </>
                ) : (
                  <>
                    ادامه و پرداخت
                    <CreditCard size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* خلاصه سفارش */}
        <div className="lg:col-span-1">
          <div className="border-2 border-sunny/20 rounded-[1.75rem] p-5 sm:p-6 bg-white shadow-card sticky top-24">
            <h2 className="text-base sm:text-lg font-display font-extrabold mb-5 sm:mb-6 flex items-center gap-2 border-b-2 border-sunny/10 pb-4 text-ink">
              <ShoppingBag size={20} className="text-bubblegum" />
              خلاصه بازی‌ها
            </h2>

            <div className="space-y-4 mb-5 sm:mb-6 max-h-[40vh] overflow-y-auto pr-1">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-sunny/10 rounded-xl overflow-hidden shrink-0 border-2 border-sunny/10">
                    <Image
                      src={item.image || "/images/placeholder.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold line-clamp-1 mb-1 text-xs sm:text-sm text-ink">{item.name}</p>

                    <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs text-inkSoft mb-1">
                      {item.size && <span>سایز: {item.size}</span>}
                      {item.size && item.color && <span className="w-1 h-1 rounded-full bg-inkSoft" />}
                      {item.color && (
                        <div className="flex items-center gap-1">
                          <span>رنگ:</span>
                          <span
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-sunny/20"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                      )}
                    </div>

                    <p className="text-inkSoft text-[11px] sm:text-xs font-bold">
                       {item.quantity.toLocaleString("fa-IR")} عدد × {Number(item.price).toLocaleString("fa-IR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm border-t-2 border-sunny/10 pt-5 sm:pt-6">
              <div className="flex justify-between text-inkSoft">
                <span>جمع بازی‌ها</span>
                <span>{total.toLocaleString("fa-IR")} تومان</span>
              </div>
              <div className="flex justify-between text-inkSoft">
                <span>هزینه ارسال</span>
                <span className={shippingCost === 0 ? "text-[#3f8a4c] font-bold" : ""}>
                  {shippingCost === 0
                    ? "رایگان 🎉"
                    : `${shippingCost.toLocaleString("fa-IR")} تومان`}
                </span>
              </div>
              {total < 500000 && (
                <p className="text-[11px] sm:text-xs text-center text-bubblegum bg-bubblegum/10 p-2.5 rounded-xl leading-relaxed">
                  با خرید {(500000 - total).toLocaleString("fa-IR")} تومان دیگه، ارسال رایگون میشه!
                </p>
              )}
              <div className="flex justify-between border-t-2 border-sunny/10 pt-4 text-sm sm:text-base font-bold">
                <span className="text-ink">مبلغ قابل پرداخت</span>
                <span className="font-display text-bubblegum">
                  {finalTotal.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
