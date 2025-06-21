// src/app/layout.tsx
import "./globals.scss"; // Import the consolidated global styles
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import { arimoRegular, arimoBold } from "@/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="az"
      className={`${arimoRegular.variable} ${arimoBold.variable}`}
    >
      <body className={arimoRegular.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
