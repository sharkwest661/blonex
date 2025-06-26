// src/components/HomePage/HomePageContent.tsx (Enhanced Usage)

"use client";
import React, { useState } from "react";
import { ListingSection } from "@/components/ListingSection";
import { FullWidthBanner } from "@/components/FullWidthBanner";
import { useVipPosts, useRecentPosts, usePremiumPosts } from "@/hooks/usePosts";

export const HomePageContent: React.FC = () => {
  const [recentPostsSort, setRecentPostsSort] = useState("-created_at");

  const vipPosts = useVipPosts(20);
  const recentPosts = useRecentPosts(20, { sortBy: recentPostsSort });
  const premiumPosts = usePremiumPosts(20);

  const handleSortChange = (value: string) => {
    setRecentPostsSort(value);
  };

  return (
    <>
      {/* VIP Listings with Enhanced Advertisement */}
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
          showSkeleton: true, // Enhanced loading
        }}
        advertisement={{
          desktopImage: "/assets/images/example/banner1.png",
          mobileImage: "/assets/images/example/banner-mob.png",
          altText: "Advertisement Banner",
          href: "#",
          variant: "featured", // Enhanced advertisement
          promotional: true,
        }}
      />

      {/* Enhanced Full Width Banner */}
      <FullWidthBanner
        imageSrc="/assets/images/example/banner2.png"
        altText="Full Width Advertisement"
        href="#"
        variant="promotional" // Enhanced banner
        priority={true}
      />

      {/* Recent Listings */}
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
          showSkeleton: true, // Enhanced loading
        }}
        advertisement={{
          desktopImage: "/assets/images/example/banner3.png",
          mobileImage: "/assets/images/example/banner-mob.png",
          altText: "Advertisement Banner",
          href: "#",
          variant: "compact", // Enhanced advertisement
        }}
        onSortChange={handleSortChange}
      />

      {/* Compact Banner */}
      <FullWidthBanner
        imageSrc="/assets/images/example/banner2.png"
        altText="Compact Advertisement"
        href="#"
        variant="compact"
      />

      {/* Premium Listings */}
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
          showSkeleton: true, // Enhanced loading
        }}
        advertisement={{
          desktopImage: "/assets/images/example/banner3.png",
          mobileImage: "/assets/images/example/banner-mob.png",
          altText: "Advertisement Banner",
          href: "#",
          variant: "minimal", // Enhanced advertisement
        }}
      />
    </>
  );
};

export default HomePageContent;