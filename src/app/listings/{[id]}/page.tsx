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

  // In a real app, you would fetch product data here for metadata
  // const listing = await getListingById(listingId);

  // Mock data for example - replace with actual API call
  const listing = {
    title: "Apple iPhone 11 Pro Max Space Gray 256GB/4GB",
    description:
      "Yüksək keyfiyyətli iPhone 11 Pro Max, 256GB yaddaş və premium vəziyyətdə",
    price: 1655,
    currency: "₼",
    location: "Bakı",
    images: ["/assets/img/example/carousel1.png"],
  };

  if (!listing) {
    return {
      title: "Elan tapılmadı - Bolbol.az",
      description: "Axtardığınız elan mövcud deyil və ya silinmişdir.",
    };
  }

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
      listing.title.split(" ").slice(0, 3), // First 3 words as keywords
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
      canonical: `/listing/${listingId}`,
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
  // In production, you might want to pre-generate popular listings
  // const popularListings = await getPopularListings();
  // return popularListings.map((listing) => ({ id: listing.id }));

  // For development, return some sample IDs
  return [
    { id: "1234567890" },
    { id: "1234567891" },
    { id: "1234567892" },
    { id: "1234567893" },
    { id: "1234567894" },
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

  // Validate listing ID format (should be numeric or alphanumeric)
  const isValidId = /^[a-zA-Z0-9]+$/.test(listingId);
  if (!isValidId) {
    notFound();
  }

  // In a real application, you would fetch the listing data here
  // try {
  //   const listing = await getListingById(listingId);
  //   if (!listing) {
  //     notFound();
  //   }
  //
  //   // Optional: Check if listing is active/published
  //   if (listing.status !== 'active') {
  //     notFound();
  //   }
  // } catch (error) {
  //   console.error('Error fetching listing:', error);
  //   throw error; // This will show the error page
  // }

  return (
    <main>
      <ProductDetailPage productId={listingId} />
    </main>
  );
};

export default ListingDetailPage;

// Alternative implementation with server-side data fetching:
/*
interface ListingData {
  id: string;
  title: string;
  price: number;
  currency: string;
  condition: string;
  location: string;
  viewCount: number;
  lastUpdated: string;
  images: string[];
  breadcrumb: { name: string; href?: string }[];
  features: {
    delivery: boolean;
    barter: boolean;
    credit: boolean;
  };
  specifications: Record<string, string>;
  description: string;
  storeInfo: {
    name: string;
    logo: string;
    address: string;
    hours: string;
    phones: string[];
    totalListings: number;
  };
  isFavorite: boolean;
  status: 'active' | 'inactive' | 'sold' | 'expired';
}

async function getListingById(id: string): Promise<ListingData | null> {
  try {
    // Replace with your actual API endpoint
    const response = await fetch(`${process.env.API_BASE_URL}/listings/${id}`, {
      next: { 
        revalidate: 300, // Revalidate every 5 minutes
        tags: [`listing-${id}`] // For on-demand revalidation
      },
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching listing:', error);
    throw error;
  }
}

// Usage with server-side data fetching:
const ListingDetailPageWithSSR: React.FC<ListingPageProps> = async ({ params }) => {
  const listingId = params.id;
  
  try {
    const listing = await getListingById(listingId);

    if (!listing) {
      notFound();
    }

    // Check if listing is available
    if (listing.status !== 'active') {
      notFound();
    }

    return (
      <main>
        <ProductDetailPage 
          productId={listingId} 
          productData={listing}
        />
      </main>
    );
  } catch (error) {
    console.error('Error in ListingDetailPage:', error);
    throw error; // Will show error.tsx page
  }
};
*/
