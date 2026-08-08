import { getProductBySlug } from "@/lib/api"; // دیتای فیک رو پاک کردیم، تابع API رو آوردیم
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  
  // اینجا مستقیم به بک‌اند درخواست می‌زنیم 🚀
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
