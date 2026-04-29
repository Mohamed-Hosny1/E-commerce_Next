import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/navbar";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/provider/auth-provider";
import CartContextProvider from "@/provider/cart-provider";
import { ThemeProvider } from "next-themes";
import WishListContextProvider from "@/provider/wishlist-provider";
import Footer from "@/components/common/footer";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopMart",
  description: "Discover the latest technology, fashion, and lifestyle products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <CartContextProvider>
            <WishListContextProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>

                <NextTopLoader
                  color="#7c3aed"
                  initialPosition={0.08}
                  crawlSpeed={200}
                  height={3}
                  crawl={true}
                  showSpinner={false}
                  easing="ease"
                  speed={200}
                  shadow="0 0 10px #7c3aed, 0 0 5px #a78bfa"
                />

                <Navbar />
                <div className="pt-5">{children}</div>
                <Footer />
                <Toaster richColors />

              </ThemeProvider>
            </WishListContextProvider>
          </CartContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}