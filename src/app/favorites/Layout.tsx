// src/app/favorites/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seçdiklərim | Bolbol.az",
  description: "Seçdiyiniz elanları burada tapa bilərsiniz",
  keywords: ["seçdiklərim", "favorites", "elanlar", "bolbol"],
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
