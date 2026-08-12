"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    q: "زمان ارسال سفارش چقدر طول می‌کشه؟",
    a: "سفارش‌ها معمولاً بین ۲ تا ۴ روز کاری به دست شما می‌رسن. برای شهرهای بزرگ این زمان می‌تونه کمتر باشه.",
  },
  {
    q: "آیا امکان مرجوعی کالا وجود دارد؟",
    a: "بله، تا ۷ روز بعد از تحویل کالا در صورتی که کالا استفاده نشده و در بسته‌بندی اصلی باشه، امکان مرجوعی وجود داره.",
  },
  {
    q: "روش‌های پرداخت چیست؟",
    a: "پرداخت به‌صورت آنلاین از طریق درگاه بانکی و همچنین پرداخت در محل (برای برخی شهرها) امکان‌پذیره.",
  },
  {
    q: "آیا اسباب‌بازی‌ها استاندارد و ایمن هستند؟",
    a: "تمام محصولات Veloura دارای استانداردهای ایمنی کودک هستن و قبل از عرضه، کیفیت‌شون بررسی می‌شه.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-20">
      <div className="text-center mb-8 md:mb-14">
        <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-bubblegum mb-2">
          <HelpCircle className="h-4 w-4" />
          سؤالات پرتکرار
        </span>
        <h2 className="text-2xl md:text-4xl font-display font-extrabold text-ink">
          پاسخ به <span className="text-bubblegum">سؤالات</span> شما 💬
        </h2>
        <div className="w-16 md:w-40 h-1.5 bg-bubblegum/60 mx-auto mt-3 md:mt-4 rounded-full"></div>
      </div>

      <div className="flex flex-col gap-3 md:gap-4">
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`rounded-2xl md:rounded-3xl bg-white shadow-card overflow-hidden transition-all duration-300 ${
                isOpen ? "shadow-product" : ""
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between gap-3 text-right px-5 md:px-7 py-4 md:py-5"
              >
                <span className="font-display font-bold text-ink text-sm md:text-base">
                  {item.q}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-bubblegum transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-5 md:px-7 pb-4 md:pb-6 text-inkSoft text-sm md:text-base leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}