// src/app/favorites/layout.tsx
import type { Metadata } from "next";

// SEO Metadata for favorites page
export const metadata: Metadata = {
  title: "Seçdiklərim | Bolbol.az",
  description:
    "Seçdiyiniz elanları burada görə bilərsiniz. Bəyəndiyiniz elanları asanlıqla idarə edin.",
  keywords: [
    "seçdiklər",
    "favorilər",
    "bəyəndiklərim",
    "saxlanılanlar",
    "elanlar",
  ],
  openGraph: {
    title: "Seçdiklərim | Bolbol.az",
    description:
      "Seçdiyiniz elanları burada görə bilərsiniz. Bəyəndiyiniz elanları asanlıqla idarə edin.",
    type: "website",
    locale: "az_AZ",
  },
  twitter: {
    card: "summary",
    title: "Seçdiklərim | Bolbol.az",
    description: "Seçdiyiniz elanları burada görə bilərsiniz.",
  },
  robots: {
    index: false, // Don't index favorites pages as they're user-specific
    follow: true,
  },
};

// Layout component for favorites section
export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
