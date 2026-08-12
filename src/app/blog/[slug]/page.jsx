// app/blog/[slug]/page.jsx

import { getBlogPostBySlug, getBlogPosts } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ChevronRight } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | مجله ولورا`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getBlogPosts();

  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const imageSrc =
    post.cover_image?.startsWith("http") ||
    post.cover_image?.startsWith("/")
      ? post.cover_image
      : `/${post.cover_image || "blog/placeholder.webp"}`;

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <main className="overflow-x-hidden">
      <article className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-bold text-inkSoft hover:text-bubblegum mb-6 transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
          بازگشت به مقالات
        </Link>

        {/* Category */}
        {post.category && (
          <span className="inline-block bg-sky/15 text-sky text-xs font-extrabold px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>
        )}

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-display font-extrabold text-ink mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs md:text-sm text-inkSoft font-medium mb-8">
          {formattedDate && <span>{formattedDate}</span>}

          {post.read_time && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.read_time.toLocaleString("fa-IR")} دقیقه مطالعه
            </span>
          )}
        </div>

        {/* Cover */}
        <div className="relative aspect-[16/9] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-4 border-white shadow-product mb-8 md:mb-10">
          <Image
            src={imageSrc}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div
          dir="rtl"
          className="
            prose
            prose-sm
            md:prose-base
            max-w-none
            text-inkSoft
            leading-8
            text-right
            [&_h2]:font-display
            [&_h2]:text-ink
            [&_h2]:font-extrabold
            [&_h2]:mt-8
            [&_h2]:mb-3
            [&_h3]:font-display
            [&_h3]:text-ink
            [&_h3]:font-bold
            [&_p]:mb-4
            [&_p]:leading-8
            [&_img]:rounded-2xl
            [&_strong]:text-ink
          "
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-sky/10 py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 md:px-6">
            <h2 className="text-xl md:text-2xl font-display font-extrabold text-ink mb-8 text-center">
              مقالات مرتبط
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}