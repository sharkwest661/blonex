// src/components/CategoryGrid/CategoryGrid.tsx (Semantically Corrected)
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Category } from "@/types/category.types";
import { useCategories } from "@/hooks/useCategories";
import styles from "./CategoryGrid.module.scss";

interface CategoryGridProps {
  categories?: Category[];
  showAllButton?: boolean;
  className?: string;
  useApi?: boolean; // Whether to fetch from API or use provided categories
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories: providedCategories,
  showAllButton = true,
  className,
  useApi = true,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Fetch categories from API if useApi is true and no categories provided
  const {
    categories: fetchedCategories,
    isLoading,
    error,
  } = useCategories({
    enabled: useApi && !providedCategories,
  });

  // Use provided categories or fetched categories
  const categories = providedCategories || fetchedCategories;

  // Handle screen size detection
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Reset showAll when switching from mobile to desktop
      if (!mobile) {
        setShowAll(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle loading state
  if (isLoading) {
    return (
      <nav
        className={`${styles.category} ${className || ""}`}
        aria-label="Kateqoriyalar"
      >
        <div className={styles.category__loading}>
          Kateqoriyalar yüklənir...
        </div>
      </nav>
    );
  }

  // Handle error state
  if (error) {
    return (
      <nav
        className={`${styles.category} ${className || ""}`}
        aria-label="Kateqoriyalar"
      >
        <div className={styles.category__error}>
          Kateqoriyalar yüklənərkən xəta baş verdi: {error.message}
        </div>
      </nav>
    );
  }

  // Handle empty state
  if (!categories || categories.length === 0) {
    return (
      <nav
        className={`${styles.category} ${className || ""}`}
        aria-label="Kateqoriyalar"
      >
        <div className={styles.category__empty}>
          Heç bir kateqoriya tapılmadı
        </div>
      </nav>
    );
  }

  // Sort categories by order
  const sortedCategories = [...categories].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  // Handle button click
  const handleToggleShow = () => {
    setShowAll(true);
  };

  // Determine button visibility - show button on mobile when there are more than 4 categories and not showing all
  const shouldShowButton =
    isMobile && showAllButton && sortedCategories.length > 4 && !showAll;

  return (
    <nav
      className={`${styles.category} ${className || ""}`}
      aria-label="Kateqoriyalar"
    >
      <ul className={styles.category__list} role="list">
        {sortedCategories.map((category, index) => {
          // Show/hide logic: on mobile, hide items after index 3 unless showAll is true
          const shouldHide = isMobile && !showAll && index >= 4;

          if (shouldHide) {
            return null;
          }

          return (
            <li key={category.id} role="listitem">
              <Link
                href={category.href}
                className={styles.category__item}
                aria-label={`${category.name} kateqoriyasına get`}
              >
                <Image
                  src={category.icon}
                  alt=""
                  width={32}
                  height={32}
                  priority={true}
                  role="presentation"
                />
                {category.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Show button only on mobile when there are more than 4 categories and not showing all */}
      {shouldShowButton && (
        <button
          type="button"
          className={`${styles.btn} ${styles.category__btn}`}
          onClick={handleToggleShow}
          aria-expanded={showAll}
          aria-label="Bütün kateqoriyaları göstər"
        >
          Bütün kateqoriyalar
        </button>
      )}
    </nav>
  );
};

export default CategoryGrid;
