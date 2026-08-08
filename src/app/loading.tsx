export default function Loading() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen gap-6 bg-cream overflow-hidden">
      {/* آسمون شب‌نمای شهر کارتونی در پس‌زمینه */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 opacity-40">
        <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="w-full h-full">
          <rect x="10" y="40" width="30" height="60" fill="#8FCDEB" />
          <rect x="50" y="20" width="24" height="80" fill="#8FD3A6" />
          <rect x="85" y="55" width="28" height="45" fill="#8FCDEB" />
          <rect x="130" y="10" width="26" height="90" fill="#FFD24C" />
          <rect x="170" y="35" width="30" height="65" fill="#8FD3A6" />
          <rect x="215" y="50" width="24" height="50" fill="#8FCDEB" />
          <rect x="250" y="15" width="28" height="85" fill="#FF6FA1" />
          <rect x="290" y="45" width="26" height="55" fill="#8FCDEB" />
          <rect x="330" y="25" width="30" height="75" fill="#8FD3A6" />
          <rect x="370" y="55" width="22" height="45" fill="#8FCDEB" />
        </svg>
      </div>

      {/* ابرها */}
      <span className="absolute top-[12%] left-[10%] text-3xl opacity-70 animate-heroCloud">☁️</span>
      <span className="absolute top-[20%] right-[14%] text-2xl opacity-60 animate-heroCloudSlow">☁️</span>

      {/* خط کمند / طناب پرشی */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M -5 30 Q 50 -10 105 30"
          stroke="#FF6FA1"
          strokeWidth="0.6"
          strokeDasharray="2 2"
          fill="none"
          className="animate-heroRopeFade"
        />
      </svg>

      {/* ابرقهرمان در حال پرش روی صفحه */}
      <div className="absolute top-1/3 animate-heroRun">
        <div className="animate-heroArc">
          <svg width="90" height="90" viewBox="0 0 140 140" className="drop-shadow-lg -scale-x-100">
            {/* شنل */}
            <path
              d="M 55 45 Q 20 70 30 115 Q 55 100 65 85 Z"
              fill="#3AA6D8"
              className="animate-heroCape"
              style={{ transformOrigin: "55px 45px" }}
            />

            {/* پا عقب */}
            <rect x="70" y="95" width="14" height="30" rx="6" fill="#2B2550" />
            {/* پا جلو */}
            <rect x="50" y="98" width="14" height="34" rx="6" transform="rotate(20 57 98)" fill="#2B2550" />

            {/* بدن */}
            <rect x="52" y="55" width="38" height="48" rx="16" fill="#FF6FA1" />
            {/* نماد سینه */}
            <path d="M 71 68 L 77 78 L 71 88 L 65 78 Z" fill="#FFD24C" />

            {/* بازوی عقب */}
            <rect x="82" y="58" width="12" height="28" rx="6" transform="rotate(30 82 58)" fill="#FF6FA1" />
            {/* بازوی جلو، مشت بالا */}
            <rect x="45" y="35" width="12" height="30" rx="6" transform="rotate(-35 45 35)" fill="#FF6FA1" />
            <circle cx="38" cy="30" r="8" fill="#F3D9BC" />

            {/* سر */}
            <circle cx="70" cy="40" r="20" fill="#F3D9BC" />
            {/* ماسک */}
            <path d="M 50 30 Q 70 15 90 30 Q 90 42 70 46 Q 50 42 50 30 Z" fill="#2B2550" />
            {/* چشم‌ها */}
            <path d="M 58 30 Q 63 26 68 30 Q 63 33 58 30 Z" fill="white" />
            <path d="M 72 30 Q 77 26 82 30 Q 77 33 72 30 Z" fill="white" />
          </svg>
        </div>
      </div>

      {/* متن با نقطه‌های متحرک */}
      <div className="relative z-10 flex items-center gap-1.5 mt-24">
        <p className="font-display font-bold text-ink text-base md:text-lg">
          در حال آماده‌سازی بازی
        </p>
        <span className="flex gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-bubblegum animate-heroDot [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-sunny animate-heroDot [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-sky animate-heroDot [animation-delay:300ms]" />
        </span>
      </div>

      <style>{`
        @keyframes heroRun {
          0% { left: -12%; }
          100% { left: 108%; }
        }
        @keyframes heroArc {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          25% { transform: translateY(-50px) rotate(4deg); }
          50% { transform: translateY(0) rotate(-6deg); }
          75% { transform: translateY(-50px) rotate(4deg); }
        }
        @keyframes heroCape {
          0%, 100% { transform: rotate(-6deg) scaleX(1); }
          50% { transform: rotate(10deg) scaleX(1.15); }
        }
        @keyframes heroCloud {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(14px); }
        }
        @keyframes heroCloudSlow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-10px); }
        }
        @keyframes heroRopeFade {
          0%, 100% { opacity: 0; }
          25%, 75% { opacity: 0.5; }
          50% { opacity: 0; }
        }
        @keyframes heroDot {
          0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-4px); }
        }
        .animate-heroRun { animation: heroRun 4.5s linear infinite; }
        .animate-heroArc { animation: heroArc 4.5s ease-in-out infinite; }
        .animate-heroCape { animation: heroCape 1.1s ease-in-out infinite; }
        .animate-heroCloud { animation: heroCloud 6s ease-in-out infinite; }
        .animate-heroCloudSlow { animation: heroCloudSlow 8s ease-in-out infinite; }
        .animate-heroRopeFade { animation: heroRopeFade 4.5s ease-in-out infinite; }
        .animate-heroDot { animation: heroDot 1.2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
