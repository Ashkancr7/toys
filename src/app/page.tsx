import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";
import { ChevronLeft, Truck, ShieldCheck, Headphones, Star, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

const COLLECTIONS = [
  { id: 1, title: "عروسک و پولیشی", image: "/cat1.webp", href: "/shop" },
  { id: 2, title: "بازی‌های فکری", image: "/cat3.webp", href: "/shop" },
  { id: 3, title: "ماشین و ربات", image: "/cat2.webp", href: "/shop" },
  { id: 4, title: "خلاقیت و هنر", image: "/cat4.webp", href: "/shop" },
];

const TRUST_BADGES = [
  {
    icon: Truck,
    title: "ارسال سریع",
    desc: "تحویل به سراسر کشور",
    color: "text-sky bg-sky/15",
  },
  {
    icon: ShieldCheck,
    title: "ضمانت اصالت",
    desc: "کالای اورجینال و باکیفیت",
    color: "text-grass bg-grass/15",
  },
  {
    icon: Headphones,
    title: "پشتیبانی همیشگی",
    desc: "پاسخگویی سریع به سوالات",
    color: "text-bubblegum bg-bubblegum/15",
  },
  {
    icon: Star,
    title: "رضایت مشتری",
    desc: "بیش از هزاران خانواده راضی",
    color: "text-sunny bg-sunny/25",
  },
];

export default async function HomePage() {
  const products = await getProducts();
  const featured = products ? products.slice(0, 4) : [];

  return (
    <main className="overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] md:min-h-[95vh] flex items-center justify-center text-center bg-gradient-to-b from-sky/25 via-cream to-cream overflow-hidden">
        {/* بلاب‌های رنگی شناور - عنصر امضای طراحی */}
        <div className="blob-decor w-40 h-40 md:w-64 md:h-64 bg-sunny/50 top-10 -left-10 animate-float-slow" />
        <div className="blob-decor w-32 h-32 md:w-52 md:h-52 bg-bubblegum/40 bottom-16 -right-10 animate-float" />
        <div className="blob-decor w-24 h-24 md:w-36 md:h-36 bg-grass/40 top-1/3 right-10 hidden md:block animate-float-slow" />

        <span className="absolute top-16 left-[15%] text-4xl md:text-6xl animate-float hidden sm:block">🎈</span>
        <span className="absolute bottom-24 right-[12%] text-4xl md:text-5xl animate-wiggle hidden sm:block">⭐</span>
        <span className="absolute top-1/4 right-[20%] text-3xl md:text-4xl animate-float-slow hidden md:block">🧩</span>

        <div className="relative z-10 flex flex-col items-center px-5 max-w-4xl pt-10">
          <span className="inline-flex items-center gap-2 bg-white text-bubblegum font-display font-bold text-sm md:text-base px-5 py-2 rounded-full shadow-popSm mb-6 -rotate-2">
            <Sparkles className="h-4 w-4" />
            دنیای بازی منتظرته!
          </span>

          <h1 className="text-6xl md:text-8xl font-display font-extrabold tracking-tight text-ink mb-4 drop-shadow-sm">
            Vel<span className="text-bubblegum">o</span>ura
          </h1>

          <div className="w-16 md:w-64 h-1.5 bg-sunny rounded-full mb-6 md:mb-8"></div>

          <p className="text-base md:text-xl text-inkSoft mb-4 leading-relaxed px-4 font-medium">
            هزاران اسباب‌بازی رنگی، بامزه و پر از خنده!<br className="hidden md:block" />
            هر چیزی که بچه‌های شما آرزوشو دارن، اینجاست.
          </p>

          {/* نشانه اعتماد کوچک زیر متن هیرو */}
          <div className="flex items-center gap-1.5 mb-8 text-sm text-inkSoft font-medium">
            <div className="flex -space-x-1">
              {[1, 2, 3].map((s) => (
                <Star key={s} className="h-4 w-4 fill-sunny text-sunny" />
              ))}
            </div>
            <span>محبوب هزاران خانواده در سراسر ایران</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/shop"
              className="btn-pop group relative rounded-full inline-flex items-center justify-center gap-2 px-10 py-4 md:px-14 md:py-5 bg-bubblegum text-white font-display font-bold overflow-hidden hover:bg-[#ff5c82] transition-colors"
            >
              <span className="relative z-10 text-base md:text-lg">
                بریم بازی کنیم!
              </span>
              <span className="relative z-10 text-xl group-hover:animate-wiggle">🚀</span>
            </Link>

          
          </div>
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

      {/* TRUST BADGES SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-2 md:-mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {TRUST_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-4 bg-white rounded-3xl p-4 md:p-5 shadow-card text-center md:text-right"
              >
                <div className={`shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-2xl flex items-center justify-center ${badge.color}`}>
                  <Icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-ink text-sm md:text-base">
                    {badge.title}
                  </h3>
                  <p className="text-inkSoft text-xs md:text-sm mt-0.5 hidden md:block">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* COLLECTIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="text-center mb-8 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-display font-extrabold text-ink">
            دسته‌بندی <span className="text-sky">بازی‌ها</span> 🎲
          </h2>
          <p className="text-inkSoft text-sm md:text-base mt-2 max-w-md mx-auto">
            هر چی که ذهنش رو بخوای، توی یکی از این دسته‌ها پیدا می‌شه
          </p>
          <div className="w-16 md:w-40 h-1.5 bg-sky/60 mx-auto mt-3 md:mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-5 md:gap-12">
          {COLLECTIONS.map((collection, i) => (
            <Link
              key={collection.id}
              href={collection.href}
              className={`group relative w-36 h-36 md:w-64 md:h-64 overflow-hidden block rounded-full shadow-card hover:shadow-product transition-all duration-300 hover:-translate-y-2 ${
                i % 2 === 0 ? "hover:rotate-3" : "hover:-rotate-3"
              }`}
            >
              <Image
                src={collection.image}
                alt={`دسته ${collection.title}`}
                fill
                sizes="(max-width: 768px) 150px, 250px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ink/25 transition-all duration-300 group-hover:bg-ink/35" />

              <div className="absolute inset-0 p-4 flex items-center justify-center text-center">
                <h3 className="text-white text-lg md:text-2xl font-display font-bold drop-shadow-md">
                  {collection.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-8 md:mb-14 gap-6">
          <div>
            <h2 className="text-2xl md:text-4xl font-display font-extrabold text-ink">
              محبوب‌ترین <span className="text-bubblegum">بازی‌ها</span> 🌟
            </h2>
            <div className="w-16 md:w-40 h-1.5 bg-bubblegum/60 mt-2 md:mt-3 rounded-full"></div>
          </div>

          <Link
            href="/shop"
            className="btn-pop group relative inline-flex items-center gap-2 rounded-full bg-white border-2 border-sunny px-6 py-3 text-sm font-extrabold text-ink hover:bg-sunny transition-colors duration-300"
          >
            <span>همه بازی‌ها رو ببین</span>
            <ChevronLeft className="h-4 w-4 transition-all duration-300 group-hover:-translate-x-1" />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16 bg-white/60 rounded-3xl border-2 border-dashed border-inkSoft/20">
            <span className="text-5xl mb-3">🧸</span>
            <p className="text-inkSoft font-medium">
              به‌زودی محصولات جذاب جدید اینجا نمایش داده می‌شن!
            </p>
          </div>
        )}
      </section>

      {/* BRAND STORY SECTION */}
      <section className="relative bg-sky/15 py-14 md:py-24 overflow-hidden">
        <div className="blob-decor w-48 h-48 bg-grass/30 -bottom-10 -left-10 animate-float-slow hidden md:block" />
        <div className="blob-decor w-32 h-32 bg-bubblegum/20 top-0 -right-6 animate-float hidden md:block" />
        <div className="max-w-3xl mx-auto text-center px-5 md:px-6 relative z-10">
          <span className="text-5xl mb-4 inline-block animate-wiggle">🧸</span>
          <h2 className="text-2xl md:text-4xl font-display font-extrabold text-ink mb-2">
            چرا بچه‌ها <span className="text-grass">Veloura</span> رو دوست دارن؟
          </h2>
          <div className="w-16 md:w-40 h-1.5 bg-grass/60 mx-auto mb-6 md:mb-8 rounded-full"></div>
          <p className="text-inkSoft leading-relaxed md:leading-loose text-sm md:text-lg font-medium mb-8">
            هر اسباب‌بازی توی Veloura با دقت و عشق انتخاب شده تا هم امن باشه، هم بادوام و هم پر از خنده.
            ما باور داریم بازی کردن مهم‌ترین قسمت بزرگ شدنه!
          </p>

          <Link
            href="/shop"
            className="btn-pop inline-flex items-center gap-2 rounded-full bg-grass text-white font-display font-bold px-8 py-3.5 hover:bg-grass/90 transition-colors"
          >
            شروع خرید
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}