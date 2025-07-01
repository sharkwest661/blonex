// src/app/layout.tsx
import { Footer, Header } from "@/components/layout";
import "./globals.scss";

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
