import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/ProductDetail";

interface ListingPageProps {
  params: {
    id: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ListingPageProps): Promise<Metadata> {
  const listingId = params.id;

  // Mock data for metadata - same product for all IDs for now
  const listing = {
    title: "Apple iPhone 11 Pro Max Space Gray 256GB/4GB",
    description:
      "Yüksək keyfiyyətli iPhone 11 Pro Max, 256GB yaddaş və premium vəziyyətdə. Çatdırılma və barter mümkündür.",
    price: 1655,
    currency: "₼",
    location: "Bakı",
    images: ["/assets/images/example/carousel1.png"],
  };

  return {
    title: `${listing.title} - ${listing.price}${listing.currency} | Bolbol.az`,
    description: listing.description,
    keywords: [
      "elan",
      "satış",
      "alış",
      "Bolbol",
      "Azərbaycan",
      "Bakı",
      "iPhone",
      "mobil telefon",
    ].join(", "),
    openGraph: {
      title: listing.title,
      description: listing.description,
      images: [
        {
          url: listing.images[0],
          width: 600,
          height: 400,
          alt: listing.title,
        },
      ],
      type: "website",
      siteName: "Bolbol.az",
      locale: "az_AZ",
    },
    twitter: {
      card: "summary_large_image",
      title: listing.title,
      description: listing.description,
      images: [listing.images[0]],
    },
    alternates: {
      canonical: `/listings/${listingId}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

// Generate static params for popular listings (optional for SSG)
export async function generateStaticParams() {
  // Return some sample IDs for development
  return [
    { id: "1234567890" },
    { id: "1234567891" },
    { id: "1234567892" },
    { id: "1234567893" },
    { id: "1234567894" },
    { id: "sample-iphone-11" },
    { id: "test-product-1" },
  ];
}

const ListingDetailPage: React.FC<ListingPageProps> = async ({
  params,
  searchParams,
}) => {
  const listingId = params.id;

  // Basic validation
  if (!listingId) {
    notFound();
  }

  // Validate listing ID format (allow alphanumeric, hyphens, underscores)
  const isValidId = /^[a-zA-Z0-9_-]+$/.test(listingId);
  if (!isValidId) {
    notFound();
  }

  // For now, show the same product for all valid IDs
  // In production, this would fetch real data:
  // try {
  //   const listing = await getListingById(listingId);
  //   if (!listing) {
  //     notFound();
  //   }
  // } catch (error) {
  //   console.error('Error fetching listing:', error);
  //   throw error;
  // }

  return (
    <main>
      <ProductDetailPage productId={listingId} />
    </main>
  );
};

export default ListingDetailPage;
