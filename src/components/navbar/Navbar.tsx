"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, User, Home, Store } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "خونه" },
  { href: "/shop", label: "فروشگاه" },
  { href: "/new-arrivals", label: "تازه‌ها" },
  { href: "/collections", label: "پکیج‌های بازی" },
  { href: "/about", label: "ما کی هستیم" },
  { href: "/contact", label: "حرف بزنیم" },
];

// رنگ‌های چرخشی برای تب‌های ناوبری موبایل
const TAB_COLORS: Record<string, string> = {
  "/": "bg-sunny/20 text-ink",
  "/shop": "bg-sky/20 text-ink",
  "/cart": "bg-bubblegum/20 text-ink",
  "/profile": "bg-grass/20 text-ink",
};

export default function Navbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300 bg-cream",
          isScrolled
            ? "shadow-[0_4px_0_0_rgba(58,51,88,0.06)] border-b-2 border-sunny/40"
            : "border-b-2 border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between md:justify-between justify-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-transform hover:-rotate-2 hover:scale-105">
            <Image
              src="/logo1.png"
              alt="Veloura Logo"
              width={140}
              height={56}
              className="object-contain"
              priority
            />
            <span className="hidden md:inline text-2xl">🧸</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 text-sm">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2.5 rounded-full font-bold transition-all duration-200",
                    isActive
                      ? "bg-bubblegum text-white shadow-popSm -rotate-1"
                      : "text-ink hover:bg-sunny/25 hover:-rotate-1"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions (Desktop Only) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="w-11 h-11 flex items-center justify-center rounded-full bg-sky/20 text-ink hover:bg-sky/40 transition-all hover:scale-110"
              aria-label="جستجو"
            >
              <Search size={20} strokeWidth={2} />
            </button>

            <Link
              href="/profile"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-grass/20 text-ink hover:bg-grass/40 transition-all hover:scale-110"
              aria-label="پروفایل"
            >
              <User size={20} strokeWidth={2} />
            </Link>

            <Link
              href="/cart"
              className="relative w-11 h-11 flex items-center justify-center rounded-full bg-bubblegum text-white shadow-popSm hover:scale-110 transition-all"
              aria-label="سبد خرید"
            >
              <ShoppingBag size={20} strokeWidth={2} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-sunny text-ink text-[11px] w-5 h-5 flex items-center justify-center rounded-full font-extrabold border-2 border-cream animate-popIn">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* ===== Bottom Navigation (Mobile) ===== */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50">
        <nav className="bg-white/95 backdrop-blur-xl border-t-2 border-sunny/30 shadow-[0_-8px_30px_rgb(58,51,88,0.10)] rounded-t-3xl px-6 h-[80px] pb-2 pt-2 flex items-center justify-between w-full">

          <Link href="/" className="relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300">
            <span className={cn("flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300", pathname === "/" ? cn(TAB_COLORS["/"], "scale-110 -rotate-3") : "text-inkSoft")}>
              <Home size={20} strokeWidth={pathname === "/" ? 2.5 : 2} />
            </span>
            <span className={cn("text-[10px] mt-1 transition-all", pathname === "/" ? "text-ink font-extrabold" : "text-inkSoft")}>
              خونه
            </span>
          </Link>

          <Link href="/shop" className="relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300">
            <span className={cn("flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300", pathname === "/shop" ? cn(TAB_COLORS["/shop"], "scale-110 rotate-3") : "text-inkSoft")}>
              <Store size={20} strokeWidth={pathname === "/shop" ? 2.5 : 2} />
            </span>
            <span className={cn("text-[10px] mt-1 transition-all", pathname === "/shop" ? "text-ink font-extrabold" : "text-inkSoft")}>
              فروشگاه
            </span>
          </Link>

          <Link href="/cart" className="relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300">
            <span className={cn("relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300", pathname === "/cart" ? cn(TAB_COLORS["/cart"], "scale-110 -rotate-3") : "text-inkSoft")}>
              <ShoppingBag size={20} strokeWidth={pathname === "/cart" ? 2.5 : 2} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-bubblegum text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-extrabold">
                  {cartItems.length}
                </span>
              )}
            </span>
            <span className={cn("text-[10px] mt-1 transition-all", pathname === "/cart" ? "text-ink font-extrabold" : "text-inkSoft")}>
              سبد
            </span>
          </Link>

          <Link href="/profile" className="relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300">
            <span className={cn("flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300", pathname === "/profile" ? cn(TAB_COLORS["/profile"], "scale-110 rotate-3") : "text-inkSoft")}>
              <User size={20} strokeWidth={pathname === "/profile" ? 2.5 : 2} />
            </span>
            <span className={cn("text-[10px] mt-1 transition-all", pathname === "/profile" ? "text-ink font-extrabold" : "text-inkSoft")}>
              پروفایل
            </span>
          </Link>

        </nav>
      </div>
    </>
  );
}
