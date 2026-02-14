

// app/home/category/[slug]/page.tsx
"use client";

import { useParams } from "next/navigation";

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Category Page</h1>
      <p>
        Slug:{" "}
        <span className="font-mono text-blue-600">
          {slug ? decodeURIComponent(slug) : "אין slug"}
        </span>
      </p>
    </div>
  );
}
