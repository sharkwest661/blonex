// src/app/layout.tsx
// ... (imports)
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer"; // Correct path to Footer

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
