import "./globals.css";
import type { Metadata } from "next";
import AuthProvider from "@/components/auth/auth-provider";

export const metadata: Metadata = {
  title: "ApexIQ",
  description: "AI-powered motorsport intelligence platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}