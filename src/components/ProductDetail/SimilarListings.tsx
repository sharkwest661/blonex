"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PostCard } from "../PostCard";
import type { Post, PostFeature } from "@/types/post.types";
import styles from "./SimilarListings.module.scss";

interface SimilarListingsProps {
  className?: string;
}

interface BannerAd {
  id: string;
  type: "banner";
  image: string;
  href: string;
  alt: string;
}

type GridItem = Post | BannerAd;

// Helper function to check if item is a banner
const isBannerAd = (item: GridItem): item is BannerAd => {
  return "type" in item && item.type === "banner";
};

// Generate unique mock listings to avoid duplicate keys
const generateMockListings = (): Post[] => {
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

  const createFeatures = (
    barter: boolean = false,
    credit: boolean = false
  ): PostFeature[] => {
    const features: PostFeature[] = [];

    if (barter) {
      features.push({
        type: "barter",
        icon: "/assets/images/barter.svg",
        tooltip: "Barter mümkündür",
        enabled: true,
      });
    }

    if (credit) {
      features.push({
        type: "credit",
        icon: "/assets/images/percent.svg",
        tooltip: "Kredit mümkündür",
        enabled: true,
      });
    }

    return features;
  };

  return products.map((product, index) => ({
    id: product.id,
    title: product.title,
    price: 1500 + index * 200, // Varied prices
    currency: "₼",
    location: index % 2 === 0 ? "Bakı" : "Gəncə",
    date: `${25 + index}.04.2021, 16:${30 + index}`,
    imageUrl: `/assets/images/example/${product.image}`,
    href: `/listings/${product.id}`,
    type: index % 3 === 0 ? "vip" : index % 3 === 1 ? "premium" : "recent",
    hasVipBadge: index % 3 === 0,
    hasPremiumBadge: index % 3 === 1,
    features: createFeatures(index % 2 === 0, index % 3 === 0),
    storeInfo:
      index % 2 === 0
        ? {
            name: index % 4 === 0 ? "Kontakt Home" : "World Telecom",
            logo: "/assets/images/example/seller.svg",
            href: `/store/${product.id}`,
          }
        : undefined,
    isStore: index % 2 === 0,
  }));
};

const SimilarListings: React.FC<SimilarListingsProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const [mockListings, setMockListings] = useState<Post[]>([]);

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
      image: "/assets/images/example/banner.png",
      href: "/promo/banner-1",
      alt: "Reklam banneri",
    });

    // Add remaining listings (next 5)
    items.push(...mockListings.slice(3, 8));

    return items;
  };

  const gridItems = createGridItems();

  const handleFavoriteToggle = (listingId: string) => {
    // Handle favorite toggle logic
    console.log("Toggle favorite for listing:", listingId);
  };

  const renderGridItem = (item: GridItem, index: number) => {
    if (isBannerAd(item)) {
      return (
        <div key={item.id} className={styles.bannerItem}>
          <Link href={item.href}>
            <Image
              src={item.image}
              alt={item.alt}
              width={300}
              height={200}
              className={styles.bannerImage}
            />
          </Link>
        </div>
      );
    }

    // It's a Post item
    return (
      <PostCard
        key={item.id}
        post={item}
        onFavoriteToggle={() => handleFavoriteToggle(item.id)}
      />
    );
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <section className={`${styles.similarListings} ${className || ""}`}>
        <div className={styles.similarGrid}>
          {/* Render loading skeletons */}
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
    <section className={`${styles.similarListings} ${className || ""}`}>
      <div className={styles.similarGrid}>
        {gridItems.map((item, index) => renderGridItem(item, index))}
      </div>
    </section>
  );
};

export default SimilarListings;
