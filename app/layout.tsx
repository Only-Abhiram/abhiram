import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import PageLoader from '@/lib/components/loader'
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});


export const metadata: Metadata = {
  title: "Abhiram Goud",
  description: "A Backend   Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${space.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <PageLoader >
          {children}
          </PageLoader >
      </body>
    </html>
  );
}
