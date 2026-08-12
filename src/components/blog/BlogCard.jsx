// components/blog/BlogCard.jsx
import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";

export default function BlogCard({ post }) {
  const imageSrc =
    post.cover_image?.startsWith("http") || post.cover_image?.startsWith("/")
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
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-[1.75rem] overflow-hidden shadow-card hover:shadow-product transition-all duration-300 hover:-translate-y-1.5"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-sky/10">
        <Image
          src={imageSrc}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {post.category && (
          <span className="absolute top-3 right-3 bg-sky text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-popSm">
            {post.category}
          </span>
        )}
      </div>

      <div className="p-5 text-right">
        <h3 className="text-base md:text-lg font-bold text-ink mb-2 line-clamp-2 group-hover:text-bubblegum transition-colors">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-sm text-inkSoft leading-6 line-clamp-2 mb-4">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-inkSoft font-medium">
          {formattedDate && <span>{formattedDate}</span>}
          {post.read_time && (
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.read_time.toLocaleString("fa-IR")} دقیقه مطالعه
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}