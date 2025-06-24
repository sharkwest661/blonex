"use client";
import React, { useState } from "react";
import { Container } from "@/components/Layout/Container";
import { DateSortFilter } from "@/components/Filters/DateSortFilter";
import { VehicleFilterBar } from "@/components/Filters/VehicleFilters";
import {
  MobileFilterTrigger,
  MobileFilterOverlay,
} from "@/components/Filters/MobileFilters";
import { VehicleListingsSection } from "@/components/Listings/VehicleListingsSection";
import { FullWidthBanner } from "@/components/FullWidthBanner";

import { useVipListings, useRecentListings } from "@/hooks/useListings";
import styles from "./page.module.scss";
import useVehicleFilterStore, {
  VehicleFilterState,
} from "@/stores/useVehicleFilterStore";
import BrandsGrid from "@/components/Brands";

export default function NeqliyyatPage() {
  // Mobile filter overlay state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Get filter state and actions from the store
  const { sortBy, setSortBy, resetFilters } = useVehicleFilterStore(
    (state: VehicleFilterState) => ({
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

  // Handle mobile filter open/close
  const openMobileFilter = () => setIsMobileFilterOpen(true);
  const closeMobileFilter = () => setIsMobileFilterOpen(false);

  // Handle filter apply
  const handleFilterApply = () => {
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
            <MobileFilterTrigger onClick={openMobileFilter} />
            <DateSortFilter
              options={sortOptions}
              defaultSelected={sortBy}
              onSortChange={handleSortChange}
            />
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        <MobileFilterOverlay
          isOpen={isMobileFilterOpen}
          onClose={closeMobileFilter}
          onApply={handleFilterApply}
        />

        {/* Brands Section */}
        <section className={styles.brandsSection}>
          <BrandsGrid />
        </section>

        {/* VIP Listings Section */}
        <VehicleListingsSection
          title="VIP Elanlar"
          listings={vipListings}
          isLoading={vipLoading}
          emptyMessage="VIP elan tapılmadı"
          seeAllLink="/neqliyyat/vip"
          seeAllText="Bütün VIP elanlar"
          className={styles.listingsSection}
        />

        {/* Banner Ad */}
        <FullWidthBanner
          imageSrc="/assets/images/example/banner2.png"
          altText="Full Width Advertisement"
          href="#"
        />

        {/* Recent Listings Section */}
        <VehicleListingsSection
          title="Yeni elanlar"
          listings={recentListings}
          isLoading={recentLoading}
          emptyMessage="Yeni elan tapılmadı"
          seeAllLink="/neqliyyat/recent"
          seeAllText="Bütün yeni elanlar"
          className={styles.listingsSection}
        />
      </Container>
    </main>
  );
}
