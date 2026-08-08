export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-cream">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-8 border-sunny/30 rounded-full"></div>
        <div className="absolute inset-0 border-8 border-bubblegum border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="font-display font-bold text-ink animate-wiggle">در حال آماده‌سازی بازی... 🧸</p>
    </div>
  );
}
