"use client";

import { useState } from "react";

export default function DictionaryWidget() {
  const [word, setWord] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;
    const url = `https://dictionary.cambridge.org/dictionary/english/${encodeURIComponent(word)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="h-screen bg-zinc-900 text-white flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-semibold mb-6">Tra từ điển Cambridge</h2>
      <form onSubmit={handleSubmit} className="flex gap-4 w-full max-w-md">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Nhập từ..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition"
        >
          Tra
        </button>
      </form>
    </div>
  );
}