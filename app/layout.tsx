import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Noisr. - A simple noise texture generator",
  metadataBase: new URL('https://noisr.gergo.cc'),
  description: "Genrate noise texture with custom size, density and color, and download it as PNG. For your design projects, UI, or just for fun.",
  openGraph: {
    title: "Noisr. - A simple noise texture generator",
    description: "Genrate noise texture with custom size, density and color, and download it as PNG. For your design projects, UI, or just for fun.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1380,
        height: 934,
        alt: "Noisr. - A simple noise texture generator",
      },
    ]
  },
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <Header/>
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
