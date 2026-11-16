import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/inter";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/noto-sans-myanmar/500.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";


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
      <body>
        <Preloader />
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
