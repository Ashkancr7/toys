import { MapPin, Phone, Mail, Clock } from "lucide-react";

const CONTACT_DETAILS = [
  {
    id: 1,
    icon: MapPin,
    title: "آدرس فروشگاه",
    value: "ما آنلاین شاپیم، آدرس ما توی قلب کوچولوهای شماست 💛",
  },
  {
    id: 2,
    icon: Phone,
    title: "تلفن",
    value: "+98 991 061 6048",
    isDirLtr: true,
  },
  {
    id: 3,
    icon: Mail,
    title: "ایمیل",
    value: "support@veloura.com",
    isDirLtr: true,
  },
  {
    id: 4,
    icon: Clock,
    title: "ساعات کاری",
    value: "شنبه تا پنجشنبه: ۱۰ صبح تا ۹ شب",
  },
];

const INPUT_CLASSES = "w-full px-4 py-3 rounded-2xl border-2 border-sunny/20 focus:border-bubblegum focus:ring-2 focus:ring-sunny/20 outline-none transition-all bg-cream focus:bg-white";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <span className="text-5xl mb-4 inline-block animate-wiggle">💌</span>
          <h1 className="text-3xl md:text-4xl font-display font-extrabold text-ink mb-4">
            بیا <span className="text-bubblegum">حرف بزنیم</span>
          </h1>
          <p className="text-inkSoft max-w-xl mx-auto">
            سوالی داری یا نیاز به راهنمایی هست؟ فرم زیر رو پر کن یا از راه‌های دیگه بهمون پیام بده.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-white rounded-[2.5rem] shadow-product border-2 border-sunny/20 overflow-hidden">

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 bg-ink text-white p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-display font-extrabold mb-8 text-sunny">اطلاعات تماس</h2>
              <div className="space-y-8">
                {CONTACT_DETAILS.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <item.icon className="text-sunny" size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className={`text-gray-300 text-sm leading-relaxed ${item.isDirLtr ? 'ltr' : ''}`} dir={item.isDirLtr ? 'ltr' : undefined}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 p-10 md:p-12">
            <h2 className="text-2xl font-display font-extrabold text-ink mb-8">ارسال پیام 📩</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-ink">نام و نام خانوادگی</label>
                  <input type="text" id="name" className={INPUT_CLASSES} placeholder="مثال: علی رضایی" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-ink">ایمیل</label>
                  <input type="email" id="email" className={`${INPUT_CLASSES} ltr`} placeholder="example@mail.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-ink">موضوع پیام</label>
                <input type="text" id="subject" className={INPUT_CLASSES} placeholder="درباره چه چیزی می‌خوای صحبت کنی؟" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-ink">متن پیام</label>
                <textarea id="message" rows={5} className={`${INPUT_CLASSES} resize-none`} placeholder="پیامتو اینجا بنویس..." required></textarea>
              </div>

              <button
                type="submit"
                className="btn-pop w-full md:w-auto px-8 py-3 bg-bubblegum hover:bg-[#ff5c82] text-white rounded-2xl font-extrabold transition-colors duration-300"
              >
                ارسال پیام 🚀
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
