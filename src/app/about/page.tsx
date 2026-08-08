import { Heart, ShieldCheck, Sparkles } from "lucide-react";

const FEATURES = [
  {
    id: 1,
    title: "کیفیت بی‌نظیر",
    description: "استفاده از بهترین متریال‌ها و دقت در جزئیات، تعهد ما برای ساخت اسباب‌بازی‌هایی ماندگاره.",
    icon: Sparkles,
    color: "sunny",
  },
  {
    id: 2,
    title: "پر از خلاقیت",
    description: "هر بازی داستان خودشو داره و با عشق برای کنجکاوی و تخیل بچه‌ها انتخاب شده.",
    icon: Heart,
    color: "bubblegum",
  },
  {
    id: 3,
    title: "ایمنی تضمینی",
    description: "امنیت کوچولوهای شما اولویت ماست؛ همه محصولات استاندارد و بی‌خطرن.",
    icon: ShieldCheck,
    color: "grass",
  },
];

const colorMap: Record<string, string> = {
  sunny: "bg-sunny/20 text-[#8a6d1e]",
  bubblegum: "bg-bubblegum/15 text-bubblegum",
  grass: "bg-grass/20 text-[#3f8a4c]",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Hero Section */}
      <section className="bg-white py-20 text-center border-b-2 border-sunny/20">
        <div className="max-w-3xl mx-auto px-6">
          <span className="text-5xl mb-4 inline-block animate-wiggle">🎪</span>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-ink mb-6">
            داستان <span className="text-bubblegum">ولورا</span>
          </h1>
          <p className="text-inkSoft leading-relaxed md:text-lg">
            ما در ولورا (Veloura) معتقدیم بازی کردن مهم‌ترین قسمت بزرگ شدنه.
            هدف ما اینه که با هر اسباب‌بازی، یه لبخند بزرگ رو صورت یه بچه بشونیم
            و حس کنجکاوی و خلاقیتشو شعله‌ور کنیم.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-[2rem] shadow-card border-2 border-sunny/10 text-center hover:shadow-product transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1"
            >
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
    </div>
  );
}
