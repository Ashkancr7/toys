// components/blog/BlogGrid.jsx
"use client";

import { useState } from "react";
import BlogCard from "@/components/blog/BlogCard";
import { RefreshCw } from "lucide-react";

const INITIAL_COUNT = 9;
const STEP = 9;

export default function BlogGrid({ posts }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 bg-white/60 rounded-3xl border-2 border-dashed border-inkSoft/20">
        <span className="text-5xl mb-3">📚</span>
        <p className="text-inkSoft font-medium">
          به‌زودی مقالات جذاب اینجا منتشر می‌شن!
        </p>
      </div>
    );
  }

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {visiblePosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-10 md:mt-14">
          <button
            onClick={() => setVisibleCount((prev) => prev + STEP)}
            className="btn-pop group relative inline-flex items-center gap-2 rounded-full bg-white border-2 border-sunny px-8 py-3.5 text-sm md:text-base font-extrabold text-ink hover:bg-sunny transition-colors duration-300"
          >
            <span>مقالات بیشتر</span>
            <RefreshCw className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
          </button>
        </div>
      )}
    </>
  );
}