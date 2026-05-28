// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // Example: protect /dashboard routes
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    // add auth logic or just pass through for now
  }
  return NextResponse.next();
}