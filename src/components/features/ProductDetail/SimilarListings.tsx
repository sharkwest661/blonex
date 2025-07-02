"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PostCardData } from "@/types/post.types"; // ✅ Use central type
import styles from "./SimilarListings.module.scss";
import PostCard from "@/components/shared/PostCard";

interface SimilarListingsProps {
  className?: string;
}

interface BannerAd {
  id: string;
  type: "banner";
  imageUrl: string;
  href: string;
  alt: string;
}

type GridItem = PostCardData | BannerAd; // ✅ Use PostCardData

// Helper function to check if item is a banner
const isBannerAd = (item: GridItem): item is BannerAd => {
  return "type" in item && item.type === "banner";
};

// ✅ Generate PostCardData instead of local Post type
const generateMockListings = (): PostCardData[] => {
  const products = [
    { title: "Samsung Galaxy S12 Ultra", image: "post1.png", id: "2001" },
    { title: "iPhone 11 Pro Max 256GB", image: "post2.png", id: "2002" },
    { title: "MacBook Pro 13 M1 2021", image: "post3.png", id: "2003" },
    { title: "iPad Air 4 WiFi 64GB", image: "carousel1.png", id: "2004" },
    { title: "AirPods Pro 2nd Gen", image: "post1.png", id: "2005" },
    { title: "Samsung Galaxy Tab S8", image: "post2.png", id: "2006" },
    { title: "iPhone 13 128GB Blue", image: "post3.png", id: "2007" },
    { title: "Google Pixel 6 Pro", image: "carousel1.png", id: "2008" },
  ];

  // ✅ Create features without 'enabled' property
  const createFeatures = (
    barter: boolean = false,
    credit: boolean = false
  ): PostCardData["features"] => {
    const features: PostCardData["features"] = [];

    if (barter) {
      features!.push({
        type: "barter",
        icon: "/assets/images/barter.svg",
        tooltip: "Barter mümkündür",
      });
    }

    if (credit) {
      features!.push({
        type: "credit",
        icon: "/assets/images/percent.svg",
        tooltip: "Kredit mümkündür",
      });
    }

    return features;
  };

  return products.map((product, index) => {
    const day = 25 + index;
    const minute = 30 + index;

    return {
      id: product.id,
      title: product.title,
      subtitle: `Model ${index + 1}`,
      price: 1500 + index * 200,
      currency: "₼",
      location: index % 2 === 0 ? "Bakı" : "Gəncə",
      date: `${day}.04.2021`, // ✅ Separate date
      time: `16:${minute}`, // ✅ Separate time
      imageUrl: `/assets/images/example/${product.image}`, // ✅ Use 'image' not 'imageUrl'
      imageAlt: product.title,
      href: `/listings/${product.id}`,
      type: index % 3 === 0 ? "vip" : index % 3 === 1 ? "premium" : "regular",
      isChance: index % 5 === 0,
      features: createFeatures(index % 2 === 0, index % 3 === 0),
      store:
        index % 2 === 0
          ? {
              name: index % 4 === 0 ? "Kontakt Home" : "World Telecom",
              icon: "/assets/images/example/seller.svg",
              href: `/store/${product.id}`,
            }
          : undefined,
    };
  });
};

const SimilarListings: React.FC<SimilarListingsProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const [mockListings, setMockListings] = useState<PostCardData[]>([]); // ✅ Use PostCardData

  // Fix hydration issues
  useEffect(() => {
    setMockListings(generateMockListings());
    setMounted(true);
  }, []);

  // Create grid items with banners interspersed
  const createGridItems = (): GridItem[] => {
    if (!mounted || mockListings.length === 0) return [];

    const items: GridItem[] = [];

    // Add first batch of listings (first 3)
    items.push(...mockListings.slice(0, 3));

    // Add banner ad after first 3 items
    items.push({
      id: "banner-1",
      type: "banner",
      imageUrl: "/assets/images/example/banner.png",
      href: "/promo/banner-1",
      alt: "Reklam banneri",
    });

    // Add remaining listings (next 5)
    items.push(...mockListings.slice(3, 8));

    return items;
  };

  const gridItems = createGridItems();

  // ✅ Correct callback signature
  const handleFavoriteToggle = (listingId: string, isFavorite: boolean) => {
    console.log(
      "Toggle favorite for listing:",
      listingId,
      "New state:",
      isFavorite
    );
  };

  const renderGridItem = (item: GridItem, index: number) => {
    if (isBannerAd(item)) {
      return (
        <div key={item.id} className={styles.bannerItem}>
          <Link href={item.href}>
            <Image
              src={item.imageUrl}
              alt={item.alt}
              width={300}
              height={200}
              className={styles.bannerImage}
            />
          </Link>
        </div>
      );
    }

    // ✅ PostCard now expects PostCardData, which matches our GridItem type
    return (
      <PostCard
        key={item.id}
        post={item}
        onFavoriteToggle={handleFavoriteToggle}
      />
    );
  };

  // Loading skeleton
  if (!mounted) {
    return (
      <section className={`${styles.similarListings} ${className || ""}`}>
        <div className={styles.similarGrid}>
          {[...Array(8)].map((_, index) => (
            <div key={`skeleton-${index}`} className={styles.skeletonCard}>
              <div className={styles.skeletonImage}></div>
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonPrice}></div>
                <div className={styles.skeletonLocation}></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${styles.similarListings} ${className || ""}`}
      aria-label="Oxşar elanlar"
    >
      <div className={styles.similarGrid}>
        {gridItems.map((item, index) => renderGridItem(item, index))}
      </div>
    </section>
  );
};

export default SimilarListings;
