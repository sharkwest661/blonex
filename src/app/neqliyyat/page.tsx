/* ===== 13. src/app/neqliyyat/page.tsx ===== */
"use client";
import React, { useState, useCallback, useMemo } from "react";
import { Container } from "@/components/Layout/Container";
import { DateSortFilter } from "@/components/Filters/DateSortFilter";
import { VehicleFilterBar } from "@/components/Filters/VehicleFilters";
import {
  MobileFilterTrigger,
  VehicleFilterOverlay,
} from "@/components/Filters/MobileFilters";
import { VehicleListingsSection } from "@/components/Listings/VehicleListingsSection";
import { FullWidthBanner } from "@/components/FullWidthBanner";
import { useVipListings, useRecentListings } from "@/hooks/useListings";
import styles from "./page.module.scss";
import { useVehicleFilterStore } from "@/stores/useVehicleFilterStore";
import BrandsGrid from "@/components/Brands";
import type { VehicleData } from "@/types/vehicle.types";

export default function NeqliyyatPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const sortBy = useVehicleFilterStore((state) => state.sortBy);
  const setSortBy = useVehicleFilterStore((state) => state.setSortBy);
  const resetFilters = useVehicleFilterStore((state) => state.resetFilters);

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

  const { listings: vipListings, isLoading: vipLoading } = useVipListings();
  const {
    listings: recentListings,
    isLoading: recentLoading,
    refetch: refetchListings,
  } = useRecentListings({ sortBy });

  const handleSortChange = useCallback(
    (sortId: string) => {
      setSortBy(sortId);
    },
    [setSortBy]
  );

  const openMobileFilter = useCallback(() => setIsMobileFilterOpen(true), []);
  const closeMobileFilter = useCallback(() => setIsMobileFilterOpen(false), []);

  const handleFilterApply = useCallback(() => {
    closeMobileFilter();
  }, [closeMobileFilter]);

  return (
    <main>
      <Container>
        <h1 className={styles.pageTitle}>Nəqliyyat</h1>

        <div className={styles.desktopFilters}>
          <VehicleFilterBar />
        </div>

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

        <VehicleFilterOverlay
          isOpen={isMobileFilterOpen}
          onClose={closeMobileFilter}
          onApply={handleFilterApply}
        />

        <section className={styles.brandsSection}>
          <BrandsGrid />
        </section>

        <VehicleListingsSection
          title="VIP Elanlar"
          listings={vipListings}
          isLoading={vipLoading}
          emptyMessage="VIP elan tapılmadı"
          seeAllLink="/neqliyyat/vip"
          seeAllText="Bütün VIP elanlar"
          className={styles.listingsSection}
        />

        <FullWidthBanner
          imageSrc="/assets/images/example/banner2.png"
          altText="Full Width Advertisement"
          href="#"
        />

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
