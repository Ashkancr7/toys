"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface User {
  first_name: string;
  email: string;
  username: string;
}

interface Order {
  id: number;
  created_at: string;
  total_amount: number | string;
  total_items_count: number;
  status: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.theveloura.ir";

  const handleLogout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  }, [router]);

  const fetchWithAuth = useCallback(async (url: string) => {
    let token = localStorage.getItem("accessToken");

    let res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          const refreshRes = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (refreshRes.ok) {
            const data = await refreshRes.json();
            localStorage.setItem("accessToken", data.access);
            token = data.access;

            res = await fetch(url, {
              headers: { Authorization: `Bearer ${token}` },
            });
          } else {
            handleLogout();
          }
        } catch (err) {
          handleLogout();
        }
      } else {
        handleLogout();
      }
    }
    return res;
  }, [API_BASE_URL, handleLogout]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          router.push("/login");
          return;
        }

        const [userRes, ordersRes] = await Promise.all([
          fetchWithAuth(`${API_BASE_URL}/api/users/me/`),
          fetchWithAuth(`${API_BASE_URL}/api/orders/my-orders/`),
        ]);

        if (!userRes.ok) {
           if (userRes.status === 401) return;
           throw new Error("خطا در دریافت اطلاعات پروفایل");
        }

        const userData = await userRes.json();
        setUser(userData);

        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData);
        }
      } catch (err) {
        console.error(err);
        setError("مشکلی در بارگذاری اطلاعات پیش آمد. لطفا دوباره تلاش کنید.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [router, fetchWithAuth]);

  const formatJalaliDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(dateString));
    } catch {
      return "تاریخ نامشخص";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'پرداخت شده ✅';
      case 'pending': return 'در انتظار پرداخت ⏳';
      case 'failed': return 'ناموفق ❌';
      case 'canceled': return 'لغو شده';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-pulse font-display font-bold text-bubblegum">در حال بارگذاری... 🧸</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 text-red-500 font-bold">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 " dir="rtl">
      {/* هدر پروفایل */}
      <section className="bg-white p-6 md:p-8 rounded-[2rem] shadow-card border-2 border-sunny/20 mb-8 relative">
        <button
          onClick={handleLogout}
          className="absolute top-6 left-6 text-sm text-bubblegum hover:text-white hover:bg-bubblegum px-4 py-2 rounded-full transition-all border-2 border-bubblegum/30 font-bold"
        >
          خروج
        </button>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-ink mb-2">
          سلام، {user?.first_name || "کاربر گرامی"} 👋
        </h1>
        <p className="text-inkSoft" dir="ltr">{user?.email}</p>
        <p className="text-sm text-inkSoft/70 mt-1">نام کاربری: {user?.username}</p>
      </section>

      {/* بخش سفارشات */}
      <section>
        <h2 className="text-xl font-display font-extrabold text-ink mb-6">سفارش‌های من 📦</h2>

        {orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-5 rounded-[1.5rem] shadow-card border-2 border-sunny/10 hover:shadow-product transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-bold text-ink">
                    کد: VEL-{order.id}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                    order.status === 'paid' ? 'bg-grass/20 text-[#3f8a4c]' :
                    order.status === 'pending' ? 'bg-sunny/25 text-[#8a6d1e]' :
                    'bg-bubblegum/20 text-bubblegum'
                  }`}>
                    {getStatusText(order.status)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm text-inkSoft mb-4">
                  <span>{formatJalaliDate(order.created_at)}</span>
                  <span>{order.total_items_count} کالا</span>
                </div>

                <div className="font-display text-bubblegum font-extrabold text-lg border-t-2 border-sunny/10 pt-3 text-left">
                  {Number(order.total_amount).toLocaleString("fa-IR")} تومان
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-[1.75rem] border-2 border-dashed border-sunny/30">
            <p className="text-inkSoft">هنوز سفارشی ثبت نکرده‌ای. بریم یکی بخریم؟ 🛒</p>
          </div>
        )}
      </section>
    </div>
  );
}
