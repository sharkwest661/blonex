"use client";
import React from "react";
import { ChevronRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { VehicleCard, VehicleData } from "../VehicleCard";
import { Loader, SkeletonLoader } from "@/components/common";
import styles from "./VehicleListingsSection.module.scss";

export interface VehicleListingsSectionProps {
  title: string;
  listings: VehicleData[];
  isLoading?: boolean;
  error?: Error | null;
  emptyMessage?: string;
  seeAllLink?: string;
  seeAllText?: string;
  className?: string;
}

export const VehicleListingsSection: React.FC<VehicleListingsSectionProps> = ({
  title,
  listings,
  isLoading = false,
  error = null,
  emptyMessage = "Elan tapılmadı",
  seeAllLink,
  seeAllText = "Hamısına bax",
  className,
}) => {
  // Render loading state
  if (isLoading) {
    return (
      <section className={`${styles.section} ${className || ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {seeAllLink && (
            <Link href={seeAllLink} className={styles.seeAllLink}>
              {seeAllText}
              <ChevronRight size={16} />
            </Link>
          )}
        </div>
        <div className={styles.loadingGrid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className={styles.loadingItem}>
              <SkeletonLoader height={200} borderRadius={10} />
              <div className={styles.loadingContent}>
                <SkeletonLoader
                  height={24}
                  width="70%"
                  borderRadius={4}
                  className={styles.loadingTitle}
                />
                <SkeletonLoader
                  height={32}
                  width="30%"
                  borderRadius={4}
                  className={styles.loadingPrice}
                />
                <SkeletonLoader
                  height={16}
                  width="80%"
                  borderRadius={4}
                  className={styles.loadingMeta}
                />
                <SkeletonLoader
                  height={16}
                  width="60%"
                  borderRadius={4}
                  className={styles.loadingMeta}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Render error state
  if (error) {
    return (
      <section className={`${styles.section} ${className || ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.errorContainer}>
          <AlertCircle size={32} className={styles.errorIcon} />
          <p className={styles.errorMessage}>
            Elanları yükləyərkən xəta baş verdi. Zəhmət olmasa, yenidən cəhd
            edin.
          </p>
          <p className={styles.errorDetail}>{error.message}</p>
        </div>
      </section>
    );
  }

  // Render empty state
  if (!listings || listings.length === 0) {
    return (
      <section className={`${styles.section} ${className || ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.emptyContainer}>
          <p className={styles.emptyMessage}>{emptyMessage}</p>
        </div>
      </section>
    );
  }

  // Render listings
  return (
    <section className={`${styles.section} ${className || ""}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {seeAllLink && (
          <Link href={seeAllLink} className={styles.seeAllLink}>
            {seeAllText}
            <ChevronRight size={16} />
          </Link>
        )}
      </div>
      <div className={styles.grid}>
        {listings.map((vehicle) => (
          <div key={vehicle.id} className={styles.gridItem}>
            <VehicleCard vehicle={vehicle} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default VehicleListingsSection;
