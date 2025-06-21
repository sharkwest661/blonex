import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.scss";
import Header from "@/components/Header/Header"; // <-- Import the new Header
import Footer from "@/components/Footer/Footer"; // <-- Keep your footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bolbol",
  description: "Classified ads website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body className={inter.className}>
        <Header /> {/* <-- Use the Header component here */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
