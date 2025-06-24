"use client";
import React, { useState } from "react";
import { Container } from "@/components/Layout/Container";
import { DateSortFilter } from "@/components/Filters/DateSortFilter";
import { VehicleFilterBar } from "@/components/Filters/VehicleFilters";
import { BrandsGrid } from "@/components/Brands";
import { ListingSection } from "@/components/ListingSection";
import { FullWidthBanner } from "@/components/FullWidthBanner";
import { useVehicleFilterStore } from "@/stores/useVehicleFilterStore";
import { useVipListings, useRecentListings } from "@/hooks/useListings";
import styles from "./page.module.scss";

export default function NeqliyyatPage() {
  // Get filter state and actions from the store
  const { sortBy, setSortBy, resetFilters } = useVehicleFilterStore(
    (state) => ({
      sortBy: state.sortBy,
      setSortBy: state.setSortBy,
      resetFilters: state.resetFilters,
    })
  );

  // Fetch VIP and recent listings using our custom hooks
  const { listings: vipListings, isLoading: vipLoading } = useVipListings();
  const {
    listings: recentListings,
    isLoading: recentLoading,
    refetch: refetchListings,
  } = useRecentListings({ sortBy });

  // Handle sort change
  const handleSortChange = (sortId: string) => {
    setSortBy(sortId);
    refetchListings();
  };

  // Sort options for the DateSortFilter
  const sortOptions = [
    { id: "date", label: "Tarixə görə" },
    { id: "price_asc", label: "Əvvəlcə ucuz" },
    { id: "price_desc", label: "Əvvəlcə bahalı" },
    { id: "mileage", label: "Yürüş" },
    { id: "year", label: "Buraxılış ili" },
  ];

  return (
    <main>
      <Container>
        {/* Page Title */}
        <h1 className={styles.pageTitle}>Nəqliyyat</h1>

        {/* Desktop Filter Bar */}
        <div className={styles.desktopFilters}>
          <VehicleFilterBar />
        </div>

        {/* Mobile Filter & Sort Buttons */}
        <div className={styles.mobileFilters}>
          <div className={styles.filters767}>
            <div className={styles.filters767Inner}>
              <a href="/neqliyyat/filters" className={styles.filterLink}>
                <i className="fa-solid fa-arrow-down-short-wide"></i>
                <p>Filtrlər</p>
              </a>
            </div>
            <DateSortFilter
              options={sortOptions}
              defaultSelected={sortBy}
              onSortChange={handleSortChange}
            />
          </div>
        </div>

        {/* Brands Section */}
        <section className={styles.brandsSection}>
          <BrandsGrid />
        </section>

        {/* VIP Listings Section */}
        <ListingSection
          title={{
            title: "VIP Elanlar",
            icon: "/assets/images/vip-large.svg",
            iconWidth: 24,
            iconHeight: 24,
            seeAllText: "Bütün VIP elanlar",
            seeAllHref: "/neqliyyat/vip",
            align: "left",
          }}
          posts={{
            posts: vipListings,
            isLoading: vipLoading,
            emptyMessage: "VIP elan tapılmadı",
          }}
          advertisement={{
            desktopImage: "/assets/images/example/banner1.png",
            mobileImage: "/assets/images/example/banner-mob.png",
            altText: "Advertisement Banner",
            href: "#",
          }}
        />

        {/* Banner Ad */}
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
            seeAllHref: "/neqliyyat/recent",
            align: "left",
            showSortDropdown: true,
          }}
          posts={{
            posts: recentListings,
            isLoading: recentLoading,
            emptyMessage: "Yeni elan tapılmadı",
          }}
          advertisement={{
            desktopImage: "/assets/images/example/banner3.png",
            mobileImage: "/assets/images/example/banner-mob.png",
            altText: "Advertisement Banner",
            href: "#",
          }}
          onSortChange={handleSortChange}
        />
      </Container>
    </main>
  );
}
