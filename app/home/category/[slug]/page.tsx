

// app/home/category/[slug]/page.tsx
type Props = {
  params: {
    slug?: string | string[];
  };
};

export default function CategoryPage({ params }: Props) {
  const rawSlug = params.slug;

  // אם זה מערך — ניקח את הערך הראשון
  const slug =
    typeof rawSlug === "string"
      ? rawSlug
      : Array.isArray(rawSlug)
      ? rawSlug[0]
      : undefined;

  return (
    <div className="p-10">
      <p>
        Slug:{" "}
        <span className="font-mono text-blue-600">
          {slug ? decodeURIComponent(slug) : "אין slug"}
        </span>
      </p>
    </div>
  );
}
