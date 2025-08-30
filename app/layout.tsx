// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono,Josefin_Sans ,Poppins  } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/shared/Footer";
import "@fontsource/noto-sans-old-south-arabian";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const titanOne = Josefin_Sans({ variable: "--font-titan-one", subsets: ["latin"], weight: "400" });
const poppins= Poppins({ variable: "--font-mansalva", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Hamzah Amir portfolio",
  description: "This my full portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${titanOne.variable} ${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"         // يستخدم كلاس "light"/"dark"
          defaultTheme="light"      // ديفولت لايت
          forcedTheme="light"       // يثبّت اللايت مهما كان المخزن
          enableSystem={false}      // تجاهل وضع النظام مؤقتًا
          enableColorScheme
          disableTransitionOnChange
        >
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
