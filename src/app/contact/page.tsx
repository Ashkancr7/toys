"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

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
    href: "tel:+989910616048",
  },
  {
    id: 3,
    icon: Mail,
    title: "ایمیل",
    value: "support@veloura.com",
    isDirLtr: true,
    href: "mailto:support@veloura.com",
  },
  {
    id: 4,
    icon: Clock,
    title: "ساعات کاری",
    value: "شنبه تا پنجشنبه: ۱۰ صبح تا ۹ شب",
  },
];

const QUICK_CHANNELS = [
  { id: 1, label: "واتس‌اپ", href: "https://wa.me/9910616048", color: "hover:bg-grass/20 hover:border-grass/40" },
  { id: 2, label: "تلگرام", href: "https://t.me/veloura_shop13", color: "hover:bg-sky/20 hover:border-sky/40" },
  { id: 3, label: "اینستاگرام", href: "https://www.instagram.com/veloura_shop13", color: "hover:bg-bubblegum/20 hover:border-bubblegum/40" },
];

const INPUT_CLASSES = "w-full px-4 py-3 rounded-2xl border-2 border-sunny/20 focus:border-bubblegum focus:ring-2 focus:ring-sunny/20 outline-none transition-all bg-cream focus:bg-white";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    // TODO: اتصال به API واقعی ارسال پیام
    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus("sent");
    (e.target as HTMLFormElement).reset();
  };

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

          {/* راه‌های ارتباطی سریع */}
          <div className="flex items-center justify-center gap-3 mt-7">
            {QUICK_CHANNELS.map((ch) => (
              <a
                key={ch.id}
                href={ch.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2.5 rounded-full bg-white border-2 border-sunny/20 text-sm font-bold text-ink transition-all ${ch.color}`}
              >
                {ch.label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-white rounded-[2.5rem] shadow-product border-2 border-sunny/20 overflow-hidden">

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 bg-ink text-white p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-display font-extrabold mb-8 text-sunny">اطلاعات تماس</h2>
              <div className="space-y-8">
                {CONTACT_DETAILS.map((item) => {
                  const content = (
                    <div className="flex items-start gap-4">
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
                  );

                  return item.href ? (
                    <a key={item.id} href={item.href} className="block hover:opacity-80 transition-opacity">
                      {content}
                    </a>
                  ) : (
                    <div key={item.id}>{content}</div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 p-10 md:p-12">
            <h2 className="text-2xl font-display font-extrabold text-ink mb-8">ارسال پیام 📩</h2>

            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center text-center py-14 px-4">
                <CheckCircle2 className="h-14 w-14 text-grass mb-4" />
                <h3 className="text-xl font-display font-extrabold text-ink mb-2">
                  پیامت با موفقیت رسید! 🎉
                </h3>
                <p className="text-inkSoft text-sm mb-7 max-w-sm">
                  ممنون که باهامون تماس گرفتی. تیم پشتیبانی ولورا در اسرع وقت باهات تماس می‌گیره.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-bubblegum font-bold text-sm underline underline-offset-4 hover:text-[#ff5c82] transition-colors"
                >
                  ارسال پیام دیگه
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                  disabled={status === "sending"}
                  className="btn-pop w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-bubblegum hover:bg-[#ff5c82] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-2xl font-extrabold transition-colors duration-300"
                >
                  {status === "sending" ? (
                    <>در حال ارسال...</>
                  ) : (
                    <>
                      ارسال پیام
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}