"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://api.theveloura.ir/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
          first_name: name
        }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.username ? "این نام کاربری قبلاً ثبت شده است." : "خطایی در ثبت‌نام رخ داد.");
      }
    } catch (err) {
      setError("خطا در ارتباط با سرور!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4">
      <div className="relative bg-white p-8 rounded-[2rem] shadow-product border-2 border-sunny/20 w-full max-w-md">
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl animate-wiggle">🎈</span>
        <h1 className="text-2xl font-display font-extrabold text-center text-ink mb-6 mt-4">بیا عضو خانواده ولورا شو!</h1>

        {error && <p className="text-red-500 text-sm text-center mb-4 bg-red-50 rounded-xl py-2">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-ink mb-1">نام و نام خانوادگی</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-sunny/20 rounded-2xl focus:outline-none focus:border-bubblegum focus:ring-2 focus:ring-sunny/20 bg-cream focus:bg-white transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-ink mb-1">نام کاربری (شماره تلفن)</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-sunny/20 rounded-2xl focus:outline-none focus:border-bubblegum focus:ring-2 focus:ring-sunny/20 bg-cream focus:bg-white transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-ink mb-1">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-sunny/20 rounded-2xl focus:outline-none focus:border-bubblegum focus:ring-2 focus:ring-sunny/20 bg-cream focus:bg-white transition"
              required
            />
          </div>
          <button
            type="submit"
            className="btn-pop w-full bg-bubblegum text-white py-3 rounded-2xl hover:bg-[#ff5c82] transition-colors font-extrabold"
          >
            عضویت 🎉
          </button>
        </form>

        <p className="text-center text-sm text-inkSoft mt-6">
          قبلاً ثبت‌نام کرده‌ای؟{" "}
          <Link href="/login" className="text-bubblegum font-bold hover:underline">
            وارد شو
          </Link>
        </p>
      </div>
    </div>
  );
}
