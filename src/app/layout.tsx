// src/app/layout.tsx
import "./globals.scss";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import { Providers } from "@/providers";

export const metadata = {
  title: "Bolbol - Azərbaycanın ən böyük elan platforması",
  description:
    "Bolbol-da istədiyiniz hər şeyi tapın və ya satın. Avtomobil, ev, elektronika və daha çox.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
