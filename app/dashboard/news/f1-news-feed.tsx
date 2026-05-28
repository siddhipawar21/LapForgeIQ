"use client";

import { useEffect, useState } from "react";

type NewsItem = {
  id: string;
  title: string;
  source: string;
  url: string;
  published: string;
};

type NewsResponse = {
  success: boolean;
  items?: NewsItem[];
  message?: string;
};

export default function F1NewsFeed() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNews = async () => {
    setError("");

    try {
      const res = await fetch("/api/news/f1");
      const json: NewsResponse = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.message || "News fetch failed.");
      }

      setItems(json.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected news error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();

    const interval = setInterval(fetchNews, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
        <p className="text-sm theme-text-muted">Loading F1 headlines...</p>
      </div>
    );
  }

  if (error) {
    return
      <div className="rounded-[28px] border border-red-500/20 bg-red-500/10 p-6 text-red-300">
        {error}
      </div>;
  }

  if (!items.length) {
    return (
      <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
        <p className="text-sm theme-text-muted">
          No news items available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-red-400">
            Live Feed
          </p>
          <h2 className="mt-2 text-3xl font-semibold theme-text">
            Latest F1 Headlines
          </h2>
        </div>

        <div className="rounded-full border theme-border px-3 py-1 text-xs theme-text-muted">
          Auto-refresh every 60 seconds
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="theme-panel-soft block rounded-2xl border p-4 transition hover:bg-white/10"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold theme-text">
                  {item.title}
                </p>
                <p className="mt-1 text-xs theme-text-muted">
                  {item.source}
                </p>
              </div>
              <p className="text-xs theme-text-faint">{item.published}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}