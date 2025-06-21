// src/app/layout.tsx
// ... (imports)
import "./globals.scss"; // Make sure this is imported first
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
