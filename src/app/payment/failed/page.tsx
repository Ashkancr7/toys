import Link from 'next/link';

export default function PaymentFailedPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4">
      <div className="bg-white p-8 rounded-[2rem] shadow-product border-2 border-sunny/20 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-bubblegum/15 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">😢</span>
        </div>

        <h1 className="text-2xl font-display font-extrabold text-ink mb-2">پرداخت ناموفق بود!</h1>
        <p className="text-inkSoft mb-6">
          {searchParams.error ? searchParams.error : 'متأسفانه در فرآیند پرداخت مشکلی پیش اومد یا پرداخت لغو شد.'}
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/cart"
            className="btn-pop w-full bg-bubblegum text-white py-3 rounded-2xl font-extrabold hover:bg-[#ff5c82] transition-colors"
          >
            تلاش مجدد برای پرداخت
          </Link>
          <Link
            href="/"
            className="w-full bg-sunny/15 text-ink py-3 rounded-2xl font-bold hover:bg-sunny/25 transition-colors"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}
