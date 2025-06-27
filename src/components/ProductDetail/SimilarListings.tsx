import React from "react";
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

const SimilarListings: React.FC<SimilarListingsProps> = ({ className }) => {
  // Helper function to create features array
  const createFeatures = (
    barter: boolean = false,
    credit: boolean = false
  ): PostFeature[] => {
    const features: PostFeature[] = [];

    if (barter) {
      features.push({
        type: "barter",
        icon: "/assets/img/barter.svg", // Will be replaced by Lucide icon in PostCard
        tooltip: "Barter mümkündür",
        enabled: true,
      });
    }

    if (credit) {
      features.push({
        type: "credit",
        icon: "/assets/img/percent.svg", // Will be replaced by Lucide icon in PostCard
        tooltip: "Kredit mümkündür",
        enabled: true,
      });
    }

    return features;
  };

  // Mock data - replace with actual API call using Post interface
  const mockListings: Post[] = [
    {
      id: "2001",
      title: "Samsung Galaxy S12 16/256GB, Space Gray...",
      price: 2180,
      currency: "₼",
      location: "Bakı",
      date: "28.01.2021, 16:34",
      imageUrl: "/assets/img/example/post1.png",
      href: "/listing/2001", // Correct listing URL
      type: "vip",
      hasVipBadge: true,
      features: createFeatures(true, true),
      storeInfo: {
        name: "Kontakt Home",
        logo: "/assets/img/example/seller.svg",
        href: "/store/kontakt-home",
      },
      isStore: true,
    },
    {
      id: "2002",
      title: "Samsung Galaxy S12",
      price: 2180,
      currency: "₼",
      location: "Bakı",
      date: "28.01.2021, 16:34",
      imageUrl: "/assets/img/example/post2.png",
      href: "/listing/2002", // Correct listing URL
      type: "vip",
      hasVipBadge: true,
      features: createFeatures(true, true),
      storeInfo: {
        name: "World Telecom",
        logo: "/assets/img/example/seller.svg",
        href: "/store/world-telecom",
      },
      isStore: true,
    },
    {
      id: "2003",
      title: "Samsung Galaxy S12",
      price: 2180,
      currency: "₼",
      location: "Bakı",
      date: "28.01.2021, 16:34",
      imageUrl: "/assets/img/example/post3.png",
      href: "/listing/2003", // Correct listing URL
      type: "premium",
      hasPremiumBadge: true,
      features: createFeatures(),
    },
    {
      id: "2004",
      title: "Samsung Galaxy S12",
      price: 2180,
      currency: "₼",
      location: "Bakı",
      date: "28.01.2021, 16:34",
      imageUrl: "/assets/img/example/post4.png",
      href: "/listing/2004", // Correct listing URL
      type: "vip",
      hasVipBadge: true,
      features: createFeatures(true, true),
    },
    {
      id: "2005",
      title: "Samsung Galaxy S12",
      price: 2180,
      currency: "₼",
      location: "Bakı",
      date: "28.01.2021, 16:34",
      imageUrl: "/assets/img/example/post5.png",
      href: "/listing/2005", // Correct listing URL
      type: "vip",
      hasVipBadge: true,
      features: createFeatures(true, true),
    },
  ];

  // Create grid items with banners interspersed
  const createGridItems = (): GridItem[] => {
    const items: GridItem[] = [];

    // Add first batch of listings
    items.push(...mockListings.slice(0, 3));

    // Add more listings
    items.push(...mockListings.slice(0, 5));

    // Add banner ad
    items.push({
      id: "banner-1",
      type: "banner",
      image: "/assets/img/example/banner.png",
      href: "/promo/banner-1",
      alt: "Reklam banneri",
    });

    // Add remaining listings
    items.push(...mockListings.slice(0, 3));

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

  return (
    <section className={`${styles.similarListings} ${className || ""}`}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Bənzər elanlar</h2>

        <div className={styles.wrapper}>
          {/* Listings Grid */}
          <div className={styles.listingsGrid}>
            <div className={styles.postList}>
              {gridItems.map((item, index) => renderGridItem(item, index))}
            </div>
          </div>

          {/* Sidebar Banner */}
          <div className={styles.sidebar}>
            <div className={styles.stickyBanner}>
              {/* Desktop Banner */}
              <Link
                href="/promo/sidebar-banner"
                className={styles.desktopBanner}
              >
                <Image
                  src="/assets/img/example/banner1.png"
                  alt="Yan banner"
                  width={300}
                  height={400}
                  className={styles.sidebarBannerImage}
                />
              </Link>

              {/* Mobile Banner */}
              <Link
                href="/promo/sidebar-banner-mobile"
                className={styles.mobileBanner}
              >
                <Image
                  src="/assets/img/example/banner-mob.png"
                  alt="Mobil banner"
                  width={350}
                  height={200}
                  className={styles.sidebarBannerImage}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimilarListings;
