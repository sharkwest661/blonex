// src/components/Brands/BrandsGrid.tsx
"use client";
import React from "react";
import Link from "next/link";
import { useBrands } from "@/hooks/useBrands";
import styles from "./BrandsGrid.module.scss";
import Loader from "@/components/common/Loader";

export interface BrandsGridProps {
  className?: string;
  maxBrands?: number;
}

export const BrandsGrid: React.FC<BrandsGridProps> = ({
  className,
  maxBrands = 8,
}) => {
  // Fetch brands data
  const { brands, isLoading, error } = useBrands();

  // Show loading state
  if (isLoading) {
    return (
      <div className={`${styles.brands} ${className || ""}`}>
        <div className={styles.brandsLoading}>
          <Loader text="Markalar yüklənir..." />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={`${styles.brands} ${className || ""}`}>
        <div className={styles.brandsError}>
          <p>Markaları yükləyərkən xəta baş verdi</p>
        </div>
      </div>
    );
  }

  // Limit the number of brands to display
  const visibleBrands = brands.slice(0, maxBrands);

  return (
    <div className={`${styles.brands} ${className || ""}`}>
      <div className={styles.brandsHeading}>
        <h2 className={styles.brandsTitle}>Markalar</h2>
        <Link href="/neqliyyat/brands" className={styles.brandsLink}>
          Bütün markalar
        </Link>
      </div>

      <div className={styles.brandsGrid}>
        {visibleBrands.map((brand) => (
          <Link
            key={brand.id}
            href={`/neqliyyat/brands/${brand.slug}`}
            className={styles.brandsItem}
          >
            {brand.name}
            <span>{brand.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandsGrid;
