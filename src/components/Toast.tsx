"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
  productName: string;
}

export default function Toast({ message, onClose, productName }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slideUp">
      <div className="bg-ink text-white px-6 py-4 rounded-3xl shadow-pop flex items-center gap-4 min-w-[320px] border-2 border-sunny/40">
        <span className="text-2xl">🎉</span>
        <div className="flex-1">
          <p className="text-sm font-extrabold">{message}</p>
          <p className="text-xs text-gray-300 mt-1">{productName}</p>
        </div>
        <Link
          href="/cart"
          className="text-sunny text-sm font-extrabold hover:text-bubblegum transition-colors whitespace-nowrap"
        >
          مشاهده سبد
        </Link>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors text-xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
}
