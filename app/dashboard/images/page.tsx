"use client"

import { useState } from "react";

export default function ImageUrlPreview() {
  const [url, setUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleShowImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() !== "") {
      setPreviewUrl(url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <form
        onSubmit={handleShowImage}
        className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
          הצג תמונה לפי כתובת URL
        </h2>

        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="הדבק כאן את כתובת התמונה..."
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          type="submit"
          className="w-full bg-orange-500 text-white rounded-lg py-2 hover:bg-orange-600 transition"
        >
          הצג תמונה
        </button>
      </form>

      {previewUrl && (
        <div className="mt-6">
          <img
            src={previewUrl}
            alt="תצוגה מקדימה"
            className="rounded-xl shadow-md max-w-sm"
            onError={() => setPreviewUrl(null)}
          />
        </div>
      )}
    </div>
  );
}
