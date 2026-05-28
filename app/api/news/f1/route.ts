import { NextResponse } from "next/server";
import Parser from "rss-parser";

type FeedItem = {
  title?: string;
  link?: string;
  isoDate?: string;
};

const parser = new Parser<FeedItem>();
const F1_RSS_URL = "https://www.motorsport.com/rss/f1/news/"; // public RSS [web:525]

export async function GET() {
  try {
    const feed = await parser.parseURL(F1_RSS_URL);

    const items =
      feed.items?.slice(0, 10).map((item, index) => ({
        id: item.link || `f1-${index}`,
        title: item.title || "Untitled",
        source: "Motorsport.com",
        url: item.link || "https://www.motorsport.com/f1/news/",
        published: item.isoDate || "",
      })) || [];

    return NextResponse.json({
      success: true,
      items,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch F1 news feed.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}