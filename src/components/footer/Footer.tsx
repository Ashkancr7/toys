import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-white mt-20">
      {/* جداکننده موجی - عنصر امضای طراحی */}
      <div className="wave-divider -mt-[59px] rotate-180">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path
            d="M0,32 C240,80 480,0 720,24 C960,48 1200,72 1440,24 L1440,60 L0,60 Z"
            fill="#3A3358"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-12">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:-rotate-2">
            <Image
              src="/logo1.png"
              alt="Veloura Logo"
              width={140}
              height={56}
              className="object-contain"
              priority
            />
            <span className="text-2xl">🎈</span>
          </Link>
          <div className="w-20 h-1.5 bg-sunny rounded-full mt-4 mb-5"></div>
          <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
            دنیایی پر از رنگ، بازی و خنده! هر اسباب‌بازی اینجا با عشق و برای شاد کردن کوچولوهای شما انتخاب شده.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="mb-5 text-sm font-extrabold tracking-wide text-sunny">🧸 فروشگاه</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><Link href="/shop" className="hover:text-sunny transition-colors duration-300">همه اسباب‌بازی‌ها</Link></li>
            <li><Link href="/shop" className="hover:text-sunny transition-colors duration-300">بازی‌های فکری</Link></li>
            <li><Link href="/shop" className="hover:text-sunny transition-colors duration-300">پکیج‌های ویژه</Link></li>
            <li><Link href="/new-arrivals" className="hover:text-sunny transition-colors duration-300">تازه از راه رسیده‌ها</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-5 text-sm font-extrabold tracking-wide text-sky">💬 پشتیبانی</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li><Link href="/contact" className="hover:text-sky transition-colors duration-300">حرف بزنیم</Link></li>
            <li><Link href="#" className="hover:text-sky transition-colors duration-300">سوالات پرتکرار</Link></li>
            <li><Link href="#" className="hover:text-sky transition-colors duration-300">قوانین و مقررات</Link></li>
            <li><Link href="#" className="hover:text-sky transition-colors duration-300">رهگیری سفارش</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="mb-5 text-sm font-extrabold tracking-wide text-bubblegum">📱 دنبال‌مون کن</h3>
          <div className="flex flex-col gap-4 text-sm text-gray-300">
            <a
              href="https://www.instagram.com/veloura_shop13"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 hover:text-bubblegum transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-125 group-hover:rotate-12 transition-transform">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              اینستاگرام
            </a>

            <a
              href="https://t.me/veloura_shop13"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 hover:text-sky transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-125 group-hover:rotate-12 transition-transform">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
              تلگرام
            </a>

            <a
              href="https://wa.me/9910616048"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 hover:text-grass transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-125 group-hover:rotate-12 transition-transform">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              واتس‌اپ
            </a>
          </div>
        </div>

        {/* Trust & Payment */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="mb-5 text-sm font-extrabold tracking-wide text-grass">✅ اعتماد و پرداخت</h3>
          <div className="flex flex-wrap gap-3">
            <div className="w-16 h-16 bg-white/10 rounded-2xl border-2 border-white/10 hover:border-sunny/60 hover:-rotate-3 transition-all flex items-center justify-center cursor-pointer">
              <span className="text-[10px] text-gray-300 text-center leading-tight">اینماد</span>
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl border-2 border-white/10 hover:border-sunny/60 hover:rotate-3 transition-all flex items-center justify-center cursor-pointer">
              <span className="text-[10px] text-gray-300 text-center leading-tight">زرین‌پال</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#2E2A47]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center text-gray-400 text-xs tracking-wider">
          <p>© {new Date().getFullYear()} Veloura — ساخته شده با 💛 برای کوچولوها</p>
          <div className="flex gap-4 text-[11px] text-gray-400">
            <span className="hover:text-sunny cursor-pointer transition-colors">اینماد</span>
            <span className="hover:text-sunny cursor-pointer transition-colors">زرین‌پال</span>
            <span className="hover:text-sunny cursor-pointer transition-colors">نکست‌پی</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
