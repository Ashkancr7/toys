// app/page.jsx
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/api";
import { getBlogPosts } from "@/lib/api";
import ProductsGrid from "@/components/product/ProductsGrid";
import BlogCard from "@/components/blog/BlogCard";
import { Product } from "@/types/api";
import {
  ChevronLeft,
  Truck,
  ShieldCheck,
  Headphones,
  Star,
  Sparkles,
  BookOpen,
} from "lucide-react";

export const dynamic = "force-dynamic";

// TODO: در آینده تعداد محصول هر دسته رو از API واقعی (getCategories) بگیرید
const COLLECTIONS = [
  { id: 1, title: "عروسک و پولیشی", image: "/cat1.webp", href: "/shop?category=dolls", count: 86 },
  { id: 2, title: "بازی‌های فکری", image: "/cat3.webp", href: "/shop?category=puzzles", count: 54 },
  { id: 3, title: "ماشین و ربات", image: "/cat2.webp", href: "/shop?category=cars", count: 71 },
  { id: 4, title: "خلاقیت و هنر", image: "/cat4.webp", href: "/shop?category=art", count: 39 },
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
  const [products, blogPosts] = await Promise.all([
    getProducts(),
    getBlogPosts().catch(() => []),
  ]);

  const allProducts = products || [];
  const newArrivals = allProducts.slice(0, 8);
  const featured = allProducts.slice(0, 24);
  const latestPosts = (blogPosts || []).slice(0, 3);

  return (
    <main className="overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] md:min-h-[95vh] flex items-center justify-center text-center bg-gradient-to-b from-sky/25 via-cream to-cream overflow-hidden">
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

          <div className="flex items-center gap-1.5 mb-8 text-sm text-inkSoft font-medium">
            <div className="flex -space-x-1">
              {[1, 2, 3].map((s) => (
                <Star key={s} className="h-4 w-4 fill-sunny text-sunny" />
              ))}
            </div>
            <span>محبوب هزاران خانواده در سراسر ایران</span>
          </div>

          <Link
            href="/shop"
            className="btn-pop group relative rounded-full inline-flex items-center justify-center gap-2 px-10 py-4 md:px-14 md:py-5 bg-bubblegum text-white font-display font-bold overflow-hidden hover:bg-[#ff5c82] transition-colors"
          >
            <span className="relative z-10 text-base md:text-lg">بریم بازی کنیم!</span>
            <span className="relative z-10 text-xl group-hover:animate-wiggle">🚀</span>
          </Link>
        </div>

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {TRUST_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex items-center gap-3 bg-white rounded-2xl md:rounded-3xl p-3 md:p-5 shadow-card text-right"
              >
                <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center ${badge.color}`}>
                  <Icon className="h-4.5 w-4.5 md:h-6 md:w-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-ink text-xs md:text-base leading-tight">
                    {badge.title}
                  </h3>
                  <p className="text-inkSoft text-[10px] md:text-sm mt-0.5 leading-tight line-clamp-1">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* COLLECTIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">
        <div className="text-center mb-8 md:mb-14">
          <h2 className="text-2xl md:text-4xl font-display font-extrabold text-ink">
            دسته‌بندی <span className="text-sky">بازی‌ها</span> 🎲
          </h2>
          <p className="text-inkSoft text-sm md:text-base mt-2 max-w-md mx-auto">
            هر چی که ذهنش رو بخوای، توی یکی از این دسته‌ها پیدا می‌شه
          </p>
          <div className="w-16 md:w-40 h-1.5 bg-sky/60 mx-auto mt-3 md:mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {COLLECTIONS.map((collection, i) => (
            <Link
              key={collection.id}
              href={collection.href}
              className="group flex flex-col items-center gap-3"
            >
              <div
                className={`relative w-32 h-32 md:w-64 md:h-64 overflow-hidden block rounded-full shadow-card hover:shadow-product transition-all duration-300 hover:-translate-y-2 ${
                  i % 2 === 0 ? "group-hover:rotate-3" : "group-hover:-rotate-3"
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
                  <h3 className="text-white text-base md:text-2xl font-display font-bold drop-shadow-md">
                    {collection.title}
                  </h3>
                </div>
              </div>

              {collection.count && (
                <span className="text-xs md:text-sm font-bold text-inkSoft bg-white px-3 py-1 rounded-full shadow-popSm group-hover:text-bubblegum transition-colors">
                  {collection.count.toLocaleString("fa-IR")} محصول
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS SECTION - جدیدترین‌ها */}
      {newArrivals.length > 0 && (
        <section className="bg-sunny/10 py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-6 md:mb-10">
              <div>
                <h2 className="text-xl md:text-3xl font-display font-extrabold text-ink">
                  تازه از راه رسیده 🆕
                </h2>
                <div className="w-14 md:w-32 h-1.5 bg-sunny mt-2 rounded-full"></div>
              </div>
              <Link
                href="/shop?sort=newest"
                className="text-xs md:text-sm font-bold text-ink hover:text-bubblegum flex items-center gap-1 shrink-0"
              >
                همه جدیدها
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide snap-x snap-mandatory">
              {newArrivals.map((product) => (
                <div key={product.id} className="w-40 md:w-56 shrink-0 snap-start">
                  <ProductCardMini product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">
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
          <ProductsGrid products={featured} />
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
      <section className="relative bg-sky/15 py-12 md:py-24 overflow-hidden">
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

      {/* BLOG TEASER SECTION - مقالات */}
      {latestPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-8 md:mb-14 gap-6">
            <div className="text-center md:text-right">
              <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-sky mb-2">
                <BookOpen className="h-4 w-4" />
                مجله ولورا
              </span>
              <h2 className="text-2xl md:text-4xl font-display font-extrabold text-ink">
                راهنمای <span className="text-sky">والدین</span> و بازی 📖
              </h2>
              <div className="w-16 md:w-40 h-1.5 bg-sky/60 mt-2 md:mt-3 rounded-full mx-auto md:mx-0"></div>
            </div>

            <Link
              href="/blog"
              className="btn-pop group relative inline-flex items-center gap-2 rounded-full bg-white border-2 border-sky px-6 py-3 text-sm font-extrabold text-ink hover:bg-sky/20 transition-colors duration-300"
            >
              <span>همه مقالات</span>
              <ChevronLeft className="h-4 w-4 transition-all duration-300 group-hover:-translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {latestPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

// کارت ساده برای ردیف افقی "تازه از راه رسیده"
// کارت ساده برای ردیف افقی "تازه از راه رسیده"
function ProductCardMini({ product }: { product: Product }) {
  const firstImage =
    product.images?.length > 0 ? product.images[0].image : product.image;

  const imageSrc =
    firstImage?.startsWith("http") || firstImage?.startsWith("/")
      ? firstImage
      : `/${firstImage || "placeholder.png"}`;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-product transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-square bg-sunny/10">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="200px"
          className="object-cover"
        />

        <span className="absolute top-2 right-2 bg-sunny text-ink text-[10px] font-extrabold px-2 py-0.5 rounded-full">
          جدید
        </span>
      </div>

      <div className="p-3">
        <h3 className="text-xs md:text-sm font-bold text-ink line-clamp-1 mb-1">
          {product.name}
        </h3>

        <p className="text-xs md:text-sm font-display text-bubblegum font-bold">
          {Number(product.price).toLocaleString("fa-IR")} تومان
        </p>
      </div>
    </Link>
  );
}