import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono, Noto_Sans_Myanmar } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

const display = Bricolage_Grotesque({ variable: "--font-display", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const myanmar = Noto_Sans_Myanmar({ variable: "--font-myanmar", subsets: ["myanmar"], weight: ["500"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://william35-f.github.io"),
  title: "Hein Htet Aung · AI Engineer in the making",
  description:
    "Portfolio of Hein Htet Aung (William), Applied AI & Analytics student at Singapore Polytechnic. RAG systems, LLM tools, deep learning and data analytics projects.",
  openGraph: {
    title: "Hein Htet Aung · Portfolio",
    description: "Applied AI & Analytics student at Singapore Polytechnic building end-to-end AI applications.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${mono.variable} ${myanmar.variable}`}>
        <Preloader />
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
