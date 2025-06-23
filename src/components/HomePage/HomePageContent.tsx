// src/components/HomePage/HomePageContent.tsx
"use client";
import React from "react";
import { ListingSection } from "@/components/ListingSection";
import { FullWidthBanner } from "@/components/FullWidthBanner";
import { useVipPosts, useRecentPosts, usePremiumPosts } from "@/hooks/usePosts";

export const HomePageContent: React.FC = () => {
  // Fetch data using React Query hooks
  const vipPosts = useVipPosts(20);
  const recentPosts = useRecentPosts(20);
  const premiumPosts = usePremiumPosts(20);

  return (
    <>
      {/* VIP Listings Section */}
      <ListingSection
        title={{
          title: "VIP Elanlar",
          icon: "/assets/images/vip-large.svg",
          iconWidth: 24,
          iconHeight: 24,
          seeAllText: "Bütün VIP elanlar",
          seeAllHref: "/vip-listings",
          align: "left",
        }}
        posts={{
          posts: vipPosts.posts,
          isLoading: vipPosts.isLoading,
          error: vipPosts.error,
          emptyMessage: "VIP elan tapılmadı",
        }}
        advertisement={{
          desktopImage: "/assets/images/example/banner1.png",
          mobileImage: "/assets/images/example/banner-mob.png",
          altText: "Advertisement Banner",
          href: "#",
        }}
      />

      {/* Full Width Banner 1 */}
      <FullWidthBanner
        imageSrc="/assets/images/example/banner2.png"
        altText="Full Width Advertisement"
        href="#"
      />

      {/* Recent Listings Section */}
      <ListingSection
        title={{
          title: "Yeni elanlar",
          seeAllText: "Bütün yeni elanlar",
          seeAllHref: "/recent-listings",
          align: "left",
          showSortDropdown: true,
        }}
        posts={{
          posts: recentPosts.posts,
          isLoading: recentPosts.isLoading,
          error: recentPosts.error,
          emptyMessage: "Yeni elan tapılmadı",
        }}
        advertisement={{
          desktopImage: "/assets/images/example/banner3.png",
          mobileImage: "/assets/images/example/banner-mob.png",
          altText: "Advertisement Banner",
          href: "#",
        }}
      />

      {/* Full Width Banner 2 */}
      <FullWidthBanner
        imageSrc="/assets/images/example/banner2.png"
        altText="Full Width Advertisement"
        href="#"
      />

      {/* Premium Listings Section */}
      <ListingSection
        title={{
          title: "Premium elanlar",
          icon: "/assets/images/premium-icon.svg",
          iconWidth: 24,
          iconHeight: 24,
          align: "center",
        }}
        posts={{
          posts: premiumPosts.posts,
          isLoading: premiumPosts.isLoading,
          error: premiumPosts.error,
          emptyMessage: "Premium elan tapılmadı",
        }}
        advertisement={{
          desktopImage: "/assets/images/example/banner3.png",
          mobileImage: "/assets/images/example/banner-mob.png",
          altText: "Advertisement Banner",
          href: "#",
        }}
      />
    </>
  );
};

export default HomePageContent;
