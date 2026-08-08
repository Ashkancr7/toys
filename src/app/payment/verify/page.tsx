'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function VerifyPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      const authority = searchParams.get('Authority') || searchParams.get('authority');
      const status = searchParams.get('Status') || searchParams.get('status');
      const orderId = searchParams.get('order_id');

      console.log("وضعیت برگشتی از زرین‌پال:", status);

      if (status !== 'OK' && status !== 'ok') {
        router.push('/payment/failed?error=پرداخت توسط شما لغو شد');
        return;
      }

      if (!authority) {
        router.push('/payment/failed?error=اطلاعات پرداخت ناقص است');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/orders/verify/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            authority: authority,
            order_id: orderId,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          router.push(`/payment/success?refId=${data.ref_id || 'ثبت شد'}`);
        } else {
          router.push(`/payment/failed?error=${data.error || 'خطا در تایید نهایی پرداخت'}`);
        }
      } catch (err) {
        console.error('Error verifying payment:', err);
        router.push('/payment/failed?error=خطای ارتباط با سرور');
      }
    };

    verifyPayment();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-8 border-sunny/30 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-bubblegum border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-display font-extrabold text-ink">در حال بررسی پرداخت... 🔍</h2>
      </div>
    </div>
  );
}
