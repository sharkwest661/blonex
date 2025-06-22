// src/components/CategoryGrid/CategoryGrid.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Category } from "@/types/category.types";
import { useCategories } from "@/hooks/useCategories";
import CategoryItem from "./CategoryItem/CategoryItem";
import CategoryButton from "./CategoryButton/CategoryButton";
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
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Reset showAll when screen size changes
  useEffect(() => {
    if (!isMobile) {
      setShowAll(false); // Reset on desktop
    }
  }, [isMobile]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className={`${styles.category} ${className || ""}`}>
        <div className={styles.category__loading}>
          Kateqoriyalar yüklənir...
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className={`${styles.category} ${className || ""}`}>
        <div className={styles.category__error}>
          Kateqoriyalar yüklənərkən xəta baş verdi: {error.message}
        </div>
      </div>
    );
  }

  // Handle empty state
  if (!categories || categories.length === 0) {
    return (
      <div className={`${styles.category} ${className || ""}`}>
        <div className={styles.category__empty}>
          Heç bir kateqoriya tapılmadı
        </div>
      </div>
    );
  }

  // Sort categories by order
  const sortedCategories = [...categories].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  // Determine which categories to show based on original logic
  const getVisibleCategories = () => {
    if (!isMobile) {
      // Desktop: Always show all categories
      return sortedCategories;
    } else {
      // Mobile: Show first 4, or all if showAll is true
      if (showAll || sortedCategories.length <= 4) {
        return sortedCategories;
      } else {
        return sortedCategories.slice(0, 4);
      }
    }
  };

  const visibleCategories = getVisibleCategories();

  // Show button only on mobile when there are more than 4 items and not showing all
  const shouldShowButton =
    isMobile && showAllButton && sortedCategories.length > 4 && !showAll;

  const handleToggleShow = () => {
    setShowAll(true); // Only allow expanding, not collapsing (matches original)
  };

  return (
    <section className={`${styles.category} ${className || ""}`}>
      <div className={styles.category__list}>
        <div className={styles.category__inner}>
          {visibleCategories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              className={styles.category__item}
            />
          ))}
        </div>
      </div>

      {/* Show button only on mobile when there are more than 4 categories */}
      {shouldShowButton && (
        <CategoryButton
          onClick={handleToggleShow}
          isExpanded={showAll}
          className={styles.category__btn}
        />
      )}
    </section>
  );
};

export default CategoryGrid;
