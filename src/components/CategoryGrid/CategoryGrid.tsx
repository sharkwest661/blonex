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

  // Handle button click - force re-render by updating state
  const handleToggleShow = () => {
    console.log("Button clicked, showAll before:", showAll);
    console.log("isMobile:", isMobile);
    setShowAll(true);
    console.log("Setting showAll to true");
  };

  // Determine button visibility
  const shouldShowButton =
    isMobile && showAllButton && sortedCategories.length > 4 && !showAll;

  return (
    <section className={`${styles.category} ${className || ""}`}>
      <div className={styles.category__list}>
        <div
          className={`${styles.category__inner} ${
            isMobile && showAll ? styles["show-all"] : ""
          }`}
        >
          {sortedCategories.map((category, index) => {
            // Show/hide logic: on mobile, hide items after index 3 unless showAll is true
            const shouldHide = isMobile && !showAll && index >= 4;
            const itemClassName = `${styles.category__item} ${
              isMobile && showAll ? styles["category__item--show-all"] : ""
            } ${shouldHide ? styles["d-none"] : ""}`;

            return (
              <CategoryItem
                key={category.id}
                category={category}
                className={itemClassName}
              />
            );
          })}
        </div>
      </div>

      {/* Show button only on mobile when there are more than 4 categories and not showing all */}
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
