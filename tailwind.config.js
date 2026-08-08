/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      colors: {
        // پالت بازیگوش فروشگاه اسباب‌بازی
        sunny: "#FFC93C",     // زرد آفتابی - رنگ اصلی/انرژی
        bubblegum: "#FF6F91", // صورتی آدامسی - دکمه‌ها و CTA
        sky: "#4CC9F0",       // آبی آسمونی - ثانویه
        grass: "#6BCB77",     // سبز چمنی - موفقیت/بج‌ها
        cream: "#FFF8EC",     // کرم کاغذی - پس‌زمینه
        ink: "#3A3358",       // بنفش جوهری - متن اصلی
        inkSoft: "#6B6390",   // بنفش کم‌رنگ‌تر برای متن ثانویه

        // نگه‌داشتن alias های قدیمی که هنوز جاهایی استفاده میشن
        primary: "#3A3358",
        gold: "#FF6F91",
        soft: "#FFF8EC",
        muted: "#6B6390",
        border: "#F0E4D0",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["var(--font-baloo)", "sans-serif"],
      },

      maxWidth: {
        container: "1280px",
      },

      borderRadius: {
        blob: "63% 37% 54% 46% / 55% 48% 52% 45%",
        bubbly: "2rem",
      },

      boxShadow: {
        product: "0 10px 25px rgba(58, 51, 88, 0.08)",
        card: "0 4px 15px rgba(58, 51, 88, 0.06)",
        pop: "0 6px 0 0 rgba(58, 51, 88, 0.15)",
        popSm: "0 4px 0 0 rgba(58, 51, 88, 0.15)",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        bouncy: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },

      letterSpacing: {
        brand: "0.15em",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(4deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        popIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        "float-slow": "float 7s ease-in-out infinite",
        wiggle: "wiggle 1.2s ease-in-out infinite",
        popIn: "popIn 0.35s ease-bouncy",
      },
    },
  },

  plugins: [],
};
