import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from "next-intl";
import { PostHogClientProvider } from "@/components/PostHogProvider";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "FundMeUp",
  description: "AI-powered investment learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <PostHogClientProvider>
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </PostHogClientProvider>
        </AuthProvider>
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
