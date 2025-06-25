"use client";
import React, { useState, useCallback, useMemo } from "react";
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
import { useVehicleFilterStore } from "@/stores/useVehicleFilterStore";
import BrandsGrid from "@/components/Brands";
import type { VehicleData } from "@/types/vehicle.types";

export default function NeqliyyatPage() {
  // Mobile filter overlay state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // ✅ FIX 1: Get store values directly without selectors to prevent infinite loops
  const sortBy = useVehicleFilterStore((state) => state.sortBy);
  const setSortBy = useVehicleFilterStore((state) => state.setSortBy);
  const resetFilters = useVehicleFilterStore((state) => state.resetFilters);

  // ✅ FIX 2: Memoize the sort options to prevent recreation on every render
  const sortOptions = useMemo(
    () => [
      { id: "date", label: "Tarixə görə" },
      { id: "price_asc", label: "Əvvəlcə ucuz" },
      { id: "price_desc", label: "Əvvəlcə bahalı" },
      { id: "mileage", label: "Yürüş" },
      { id: "year", label: "Buraxılış ili" },
    ],
    []
  );

  // Fetch VIP and recent listings using our custom hooks
  const { listings: vipListings, isLoading: vipLoading } = useVipListings();
  const {
    listings: recentListings,
    isLoading: recentLoading,
    refetch: refetchListings,
  } = useRecentListings({ sortBy });

  // ✅ FIX 3: Use useCallback and prevent unnecessary refetch calls
  const handleSortChange = useCallback(
    (sortId: string) => {
      // The setSortBy function from the store is already stable and will only update if different
      setSortBy(sortId);
      // Remove the immediate refetch call as useRecentListings will automatically
      // refetch when sortBy changes due to the dependency in its queryKey
    },
    [setSortBy]
  );

  // ✅ FIX 4: Memoize event handlers to prevent unnecessary re-renders
  const openMobileFilter = useCallback(() => setIsMobileFilterOpen(true), []);
  const closeMobileFilter = useCallback(() => setIsMobileFilterOpen(false), []);

  // ✅ FIX 5: Remove the refetch call from handleFilterApply to prevent loops
  const handleFilterApply = useCallback(() => {
    // The useRecentListings hook will automatically refetch when filters change
    // due to its query dependencies, so we don't need to manually call refetch
    closeMobileFilter();
  }, [closeMobileFilter]);

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
            {/* ✅ FIX 6: Fix the incomplete defaultSelected prop */}
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
