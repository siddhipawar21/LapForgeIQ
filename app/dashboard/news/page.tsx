import F1NewsFeed from "@/components/news/f1-news-feed";

export default function NewsPage() {
  return (
    <main className="space-y-6 theme-text">
      <div className="theme-panel rounded-[28px] border p-6 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-red-400">
          F1 Live News
        </p>
        <h1 className="mt-2 text-4xl font-semibold theme-text">
          Live Motorsport Headlines
        </h1>
        <p className="mt-3 max-w-3xl text-sm theme-text-muted">
          Follow the latest race reports, qualifying updates, and strategic
          storylines from F1-related sources through a live-updating feed.
        </p>
      </div>

      <F1NewsFeed />
    </main>
  );
}