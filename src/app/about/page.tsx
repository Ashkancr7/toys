import Link from "next/link";
import { Heart, ShieldCheck, Sparkles, ChevronLeft } from "lucide-react";

const FEATURES = [
  {
    id: 1,
    title: "کیفیت بی‌نظیر",
    description: "استفاده از بهترین متریال‌ها و دقت در جزئیات، تعهد ما برای ساخت اسباب‌بازی‌هایی ماندگاره.",
    icon: Sparkles,
    color: "sunny",
    emoji: "✨",
  },
  {
    id: 2,
    title: "پر از خلاقیت",
    description: "هر بازی داستان خودشو داره و با عشق برای کنجکاوی و تخیل بچه‌ها انتخاب شده.",
    icon: Heart,
    color: "bubblegum",
    emoji: "💖",
  },
  {
    id: 3,
    title: "ایمنی تضمینی",
    description: "امنیت کوچولوهای شما اولویت ماست؛ همه محصولات استاندارد و بی‌خطرن.",
    icon: ShieldCheck,
    color: "grass",
    emoji: "🛡️",
  },
];

const STATS = [
  { id: 1, value: "+۱۰,۰۰۰", label: "کوچولوی خوشحال", emoji: "😄" },
  { id: 2, value: "+۵۰۰", label: "بازی و اسباب‌بازی", emoji: "🧸" },
  { id: 3, value: "+۵", label: "سال تجربه شادکردن", emoji: "🎈" },
];

const colorMap: Record<string, string> = {
  sunny: "bg-sunny/20 text-[#8a6d1e]",
  bubblegum: "bg-bubblegum/15 text-bubblegum",
  grass: "bg-grass/20 text-[#3f8a4c]",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-sky/20 via-white to-white py-20 md:py-28 text-center border-b-2 border-sunny/20 overflow-hidden">
        {/* بلاب‌ها و ایموجی‌های شناور - هماهنگ با هیرو صفحه اصلی */}
        <div className="blob-decor w-32 h-32 md:w-48 md:h-48 bg-sunny/40 top-6 -left-6 animate-float-slow" />
        <div className="blob-decor w-28 h-28 md:w-40 md:h-40 bg-bubblegum/30 bottom-0 -right-6 animate-float" />
        <span className="absolute top-10 left-[12%] text-3xl md:text-5xl animate-float hidden sm:block">🎨</span>
        <span className="absolute bottom-12 right-[14%] text-3xl md:text-4xl animate-wiggle hidden sm:block">🎠</span>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <span className="text-5xl mb-4 inline-block animate-wiggle">🎪</span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-ink mb-6">
            داستان <span className="text-bubblegum">ولورا</span>
          </h1>
          <p className="text-inkSoft leading-relaxed md:text-lg font-medium">
            ما در ولورا (Veloura) معتقدیم بازی کردن مهم‌ترین قسمت بزرگ شدنه.
            هدف ما اینه که با هر اسباب‌بازی، یه لبخند بزرگ رو صورت یه بچه بشونیم
            و حس کنجکاوی و خلاقیتشو شعله‌ور کنیم.
          </p>
        </div>

        {/* جداکننده موجی زیر هیرو */}
        <div className="wave-divider absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path
              d="M0,32 C240,80 480,0 720,24 C960,48 1200,72 1440,24 L1440,60 L0,60 Z"
              fill="#FFF8EC"
            />
          </svg>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-5xl mx-auto px-6 -mt-2 md:mt-0 py-14 md:py-16">
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {STATS.map((stat) => (
            <div
              key={stat.id}
              className="bg-white rounded-[1.75rem] md:rounded-[2rem] p-4 md:p-8 text-center shadow-card border-2 border-sunny/10 hover:-translate-y-1 transition-transform"
            >
              <span className="text-2xl md:text-4xl inline-block mb-2">{stat.emoji}</span>
              <p className="text-xl md:text-4xl font-display font-extrabold text-bubblegum">
                {stat.value}
              </p>
              <p className="text-inkSoft text-xs md:text-sm font-bold mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-6 py-10 md:py-20">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-display font-extrabold text-ink">
            چرا <span className="text-bubblegum">ولورا</span>؟ 🌈
          </h2>
          <div className="w-16 md:w-40 h-1.5 bg-sunny/60 mx-auto mt-3 md:mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="group relative bg-white p-8 rounded-[2rem] shadow-card border-2 border-sunny/10 text-center hover:shadow-product transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1"
            >
              <span className="absolute top-5 left-6 text-2xl opacity-0 group-hover:opacity-100 group-hover:animate-wiggle transition-opacity">
                {feature.emoji}
              </span>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${colorMap[feature.color]}`}>
                <feature.icon size={30} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-display font-extrabold text-ink mb-3">{feature.title}</h3>
              <p className="text-inkSoft text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="max-w-3xl mx-auto px-6 text-center pt-6 md:pt-10">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-card border-2 border-bubblegum/15">
          <span className="text-4xl mb-3 inline-block animate-float">🎁</span>
          <h2 className="text-xl md:text-3xl font-display font-extrabold text-ink mb-3">
            آماده‌ای یه دنیای بازی جدید کشف کنی؟
          </h2>
          <p className="text-inkSoft text-sm md:text-base mb-7">
            بریم با هم بهترین اسباب‌بازی رو برای کوچولوت پیدا کنیم!
          </p>
          <Link
            href="/shop"
            className="btn-pop group relative inline-flex items-center gap-2 rounded-full px-8 py-4 bg-bubblegum text-white font-display font-bold hover:bg-[#ff5c82] transition-colors"
          >
            <span>بریم فروشگاه</span>
            <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}